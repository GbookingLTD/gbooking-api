/**
 * file with helpers for creation and processing RPC2.0 requests
 */
import * as _ from 'lodash';
import moment from 'moment';
import { constants, getUTM, getSource } from 'src/common';
import { IBusinessProfile, IRequest, IResource, ITaxonomy } from 'src/interfaces';
import { IPhoneData } from 'src/interfaces/client';
import WidgetUtils from 'widget-utils';

let idCounter = 0;

export function createRequest<T>(methodName: string, params?: T): IRequest<T> {
  return {
    jsonrpc: '2.0',
    id: ++idCounter,
    cred: {},
    method: methodName,
    ...(params ? { params } : {}),
  };

}

export function createProfileRequest(networkId: string): IRequest<{}> {
  return {
    jsonrpc: '2.0',
    id: ++idCounter,
    cred: {},
    method: 'business.get_businesses_by_network',
    params: {
      network: {
        id: networkId,
      },
      with_networks: true,
    },
  };
}

export function createBusinessIdObject(businessId: string, withNetworks: boolean = false) {
  return {
    with_networks: withNetworks,
    business: {
      id: businessId,
    },
  };
}

export function createCRACKRequestObject(businessId: string, resources: string[], fromFilter: Date, toFilter: Date) {
  return {
    resources,
    business: {
      id: businessId,
    },
    filters: {
      from: fromFilter.toISOString(),
      to: toFilter.toISOString(),
    },
  };
}

export function createCRUNCHRequestObject(
  businessId: string,
  resources: string[],
  taxonomies: string[],
  requestedClients: number,
  fromFilter: Date,
  toFilter: Date,
  isUsingNewMethod: boolean,
) {
  return {
    new_method: isUsingNewMethod,
    proxy:false,
    business: {
      id: businessId,
    },
    filters: {
      resources,
      taxonomies,
      requestedClients,
      date: {
        from: fromFilter.toISOString(),
        to: toFilter.toISOString(),
      },
    },
  };
}

export function createNewProfileObject(
  name: string,
  surname: string,
  phone: IPhoneData,
  businessId: string,
  email: string,
  documentToken: string = '',
  driverLicense: string = '',
  isUserLoggedInProfile: boolean = false,
  profileId?: string,
  profileName?: string,
) {
  return {
    business: {
      id: businessId,
    },
    client: {
      name,
      surname,
      email,
      driverLicense,
      fromSms : true,
      phone: [phone],
      document_token: documentToken,
      skipEmailCheck: isUserLoggedInProfile,
      creatorProfileID: profileId,
      creatorProfileName: profileName,
    },
    skipEmailCheck: isUserLoggedInProfile,
  };
}

export function createAppointmentConfirmObject(
  langCode: string,
  clientId: string,
  appointmentId: string,
  extraVisitors: number = 0,
  autoConfirmByBusiness: boolean = false,
  skipCheckSpaceLeft: boolean = false,
  GAClientID?: number,
  clientPhone?: IPhoneData,
  profileId?: string,
  profileName?: string,
) {
  return {
    autoConfirmByBusiness,
    skipCheckSpaceLeft,
    language: langCode,
    client: {
      GAClientID,
      extraVisitors,
      id: clientId,
      phone: clientPhone,
      creatorProfileID: profileId,
      creatorProfileName: profileName,
    },
    appointment: {
      id: appointmentId,
      source: getSource(),
    },
    utm: getUTM(),
  };
}

const smsIntegrationNumberExtractor = (smsNumber, length) => {
  let smsIntegrationNumber = length > 0
  ? smsNumber : '';
  smsIntegrationNumber = smsIntegrationNumber.replace(/[\(\)+ .\-']+/g,'');
  smsIntegrationNumber = smsIntegrationNumber.indexOf('+') === -1 ? `+${smsIntegrationNumber}` : smsIntegrationNumber;

  return smsIntegrationNumber;
};

// tslint:disable-next-line:max-func-body-length
export function createSendAppointmentDataObject(
  langCode: string,
  business: IBusinessProfile,
  resource: IResource,
  currentService: ITaxonomy,
  appointmentId,
  appointmentStartTime: Date,
  clientData,
  clientPhone: IPhoneData,
  actualPrice,
  discountedPrice,
  additionalFields,
  clientComment,
  additionalServices,
  backofficeID,
  extraFieldValues,
  profile,
) {
  const generalInfo = business.general_info;
  const widgetConfiguration = business.widget_configuration;
  const hideAppointmentTime  = (widgetConfiguration && widgetConfiguration.calendarMode)
    || (widgetConfiguration.skipTimeSelection && widgetConfiguration.skipTimeSelectionServiceIDs
      && widgetConfiguration.skipTimeSelectionServiceIDs.indexOf(`${currentService.id}`) >= 0);

  const endDate = moment(appointmentStartTime).add(currentService.duration, 'minutes').toISOString();
  if (clientData.client === undefined) {
    clientData.client = {
      name: clientData.client_first_name,
      surname: clientData.client_last_name,
    };
  }

  let name;
  let surname;
  if (widgetConfiguration.splitName) {
    name = clientData.client.name;
    surname = clientData.client.surname;
  } else {
    const splitName = clientData.client_name.split(' ');
    name = splitName[0];
    surname = splitName.slice(1).join(' ').replace(/^\s+|\s+$/g, '');
  }

  const smsIntegrationNumber = smsIntegrationNumberExtractor(
    business.integration_data.notification.sms.length,
    business.integration_data.notification.sms[0].number,
  );

  const emails = business.integration_data.notification.email.filter((n) => {
    return !n.trigger || n.trigger.indexOf('BUSINESS_NOTIFICATION') !== -1;
    }).map((n) => {
      return n.email;
    });

  let country;
  let lang;
  if (business.group === 'LATVIAN') {
    country = 'LV';
    lang = 'lv-lv';
  } else if (generalInfo.address && generalInfo.address.length && generalInfo.address[0].country) {
    country = generalInfo.address[0].country;
    lang = generalInfo.language;
  }

  return {
    data: {
      appointment:{
        hideAppointmentTime,
        backofficeID,
        hidePrice: business.id && (business.id === '4000000002178' || business.id === '4000000003095'),
        appointment_id: appointmentId,
        business_id: business.id,
        business_internal_id: business.id,
        client_id: clientData.client.id,
        from_time: moment(appointmentStartTime).toISOString(),
        price: actualPrice.amount || actualPrice.originalAmount,
        originalAmount: actualPrice.originalAmount,
        discountedPrice: discountedPrice.amount,
        currency: actualPrice.currency,
        discount: actualPrice.discount,
        discountType: actualPrice.discountType,
        service_internal_id: currentService.id,
        till_time: endDate,
        worker_internal_id: resource.id,
        additionals: additionalFields,
        use_coupon: business.widget_configuration.useCoupon,
      },
      user_info:{
        clientComment,
        business_internal_ids: [business.id],
        email: clientData.email,
        first_name: clientData.client.name,
        internal_id: clientData.client.id,
        last_name: clientData.client.surname,
        phone: clientData.client.phone,
        updateUserInfo: [
          clientData,
        ],
        user_object:{
          first_name: name,
          last_name: surname,
          phone: clientPhone,
          email: profile ? clientData.email : undefined,
        },
      },
      service_info:{
        service_id: currentService.id,
        service_object: additionalServices && additionalServices.length ?
          additionalServices.join(', ') : currentService.alias[langCode],
        service_decrease: currentService.capacity_decrease,
      },
      worker_info:{
        worker_id: resource.id,
        worker_object: {
          business_internal_id: business.id,
          email: resource.email,
          icon_url: resource.icon_url,
          internal_id: resource.id,
          name: resource.name + (!_.isUndefined(resource.surname) ? ` ${resource.surname}` : ''),
          occupation: resource.description,
          phone: resource.phone[0],
          taxonomy_terms: resource.taxonomies,
        },
      },
      bussines_info:{
        bussines_id: business.id,
        bussines_object: {
          country,
          name: generalInfo.name,
          msg_language:  lang,
          currency: generalInfo.accepted_currency ? generalInfo.accepted_currency[0] : {},
          internal_id: business.id,
          timezone: (WidgetUtils.DateTime.businessTimezoneUtcOffset({ business }) / 60).toFixed(1),
          integration_allowed:'1',
          integration_info:{
            sms: smsIntegrationNumber,
            email: emails.join(','),
          },
        },
      },
      extra_fields: extraFieldValues,
      app_source: getSource(),
    },
    request_type: 'add_event',
  };
}

export function createReserveObject(
  hideAppointmentTime: boolean,
  socialToken: string,
  dateTime: Date,
  amount: string,
  originalAmount: number,
  discount: number,
  discountType: string,
  discountProvider: string,
  currency: string,
  duration: number,
  businessId: string,
  serviceId: string,
  resourceId: string,
  totalDuration?: number,
  orderID?: string,
  cabinetID?: string,
  additionalTaxonomyDiscount?: string[],
  additionalServices?: ITaxonomy[],
  masterImportance: string = '',
) {
  return {
    hideAppointmentTime,
    source: discountProvider && discountProvider !== 'LOCAL' ? discountProvider :
      getSource(),
    appointment: {
      socialToken,
      masterImportance,
      start: dateTime.toUTCString(),
      referrer: '',
      price: {
        amount,
        originalAmount,
        discount,
        discountType,
        discountProvider,
        currency,
        additionalTaxonomyDiscount,
      },
      duration: totalDuration && totalDuration > 0 ? totalDuration : duration,
    },
    utm: getUTM(),
    taxonomy: {
      id: serviceId,
    },
    resource: {
      id: resourceId,
    },
    business: {
      id: businessId,
    },
    additionalServices: additionalServices ? additionalServices.map(service => ({
      taxonomyID: service.id,
      id: service.id,
      alias: service.alias,
    }),
    ) : [],
    order: orderID ? {
      id: orderID,
    } : undefined,
    cabinet: cabinetID ? {
      id: cabinetID,
    } : undefined,
  };
}

export function createFieldRequestObject(
  businessId: string,
) {
  return {
    business: { id: businessId },
    field: {
      active: true,
      modelType: 'APPOINTMENT',
    },
  };
}
