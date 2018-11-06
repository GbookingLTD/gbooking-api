/**
 * file with helpers for creation and processing RPC2.0 requests
 */
import * as _ from 'lodash';
import moment from 'moment';
// tslint:disable-next-line:no-import-side-effect
import 'moment/locale/ru';
import { constants, getUTM } from 'src/common';
import { IBusinessProfile, IRequest, IResource, ITaxonomy } from 'src/interfaces';
import { IPhoneData, IResourceProps } from 'src/interfaces/client';
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

export function createNetworkConfigRequest(networkId: string): IRequest<{}> {
  return {
    jsonrpc: '2.0',
    id: ++idCounter,
    cred: {},
    method: 'business.get_network_data',
    params: {
      networkID: networkId,
    },
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

export function createBusinessListObject(businessList: string[]) {
  return {
    use_optimized_cache: true,
    use_raw_data: true,
    business: {
      list: businessList,
    },
  };
}

export function createCRACRequestObject(businessId: string, resources: string[],
                                        taxonomies: string[], fromFilter: Date, toFilter: Date) {
  return {
    business: {
      id: businessId,
    },
    filters: {
      resources,
      taxonomies,
      date:{
        from: fromFilter.toISOString(),
        to: toFilter.toISOString(),
      },
      rooms: [],
    },
  };
}

export function createCRACDistributedRequestObject(businessId: string, resourceList: IResourceProps[],
                                                   taxonomies: string[], fromFilter: Date, toFilter: Date) {
  return {
    business: {
      id: businessId,
    },
    filters: {
      taxonomies,
      resources: resourceList.map(r => mapDistributedResToCrac(r, taxonomies)),
      date:{
        from: fromFilter.toISOString(),
        to: toFilter.toISOString(),
      },
      rooms: [],
    },
  };
}

export function mapDistributedResToCrac(resource: IResourceProps, taxonomies: string[]) {
  return {
    taxonomies,
    resource: resource.id,
    business: {
      id: resource.businessId,
    },
  };
}

export function createCRACRequestFirstAvailableObject(resources: string[], duration: number) {
  return {
    resources,
    duration,
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
    proxy: false,
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
  gender?: string,
  birthday?: string,
) {
  return {
    business: {
      id: businessId,
    },
    client: {
      name,
      surname,
      email: [email],
      fromSms: true,
      phone: [phone],
      driverLicense: driverLicense ? driverLicense : undefined,
      document_token: documentToken ? documentToken : undefined,
      birthday: birthday ? birthday : undefined,
      sex: gender ? gender : undefined,
      skipEmailCheck: isUserLoggedInProfile,
      creatorProfileID: profileId,
      creatorProfileName: profileName,
    },
    skipEmailCheck: isUserLoggedInProfile,
  };
}
export function createUpdateProfileObject(
  id: string,
  phone: IPhoneData,
  businessId: string,
  name: string = '',
  surname: string = '',
  email: string = '',
  documentToken: string = '',
  driverLicense: string = '',
  isUserLoggedInProfile: boolean = false,
  profileId?: string,
  profileName?: string,
  gender?: string,
  birthday?: string,
) {
  return {
    business: {
      id: businessId,
    },
    client: {
      id,
      name,
      surname,
      email: [email],
      phone: [phone],
      driverLicense: driverLicense ? driverLicense : undefined,
      document_token: documentToken ? documentToken : undefined,
      skipEmailCheck: isUserLoggedInProfile,
      creatorProfileID: profileId,
      creatorProfileName: profileName,
      birthday: birthday ? birthday : undefined,
      sex: gender ? gender : undefined,
    },
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
      source: constants.SOURCE,
      id: appointmentId,
    },
    utm: getUTM(),
  };
}

const smsIntegrationNumberExtractor = (smsNumber, length) => {
  let smsIntegrationNumber = length > 0
    ? smsNumber : '';
  smsIntegrationNumber = smsIntegrationNumber.replace(/[\(\)+ .\-']+/g, '');
  smsIntegrationNumber = smsIntegrationNumber.indexOf('+') === -1 ? `+${smsIntegrationNumber}` : smsIntegrationNumber;

  return smsIntegrationNumber;
};

// tslint:disable-next-line:max-func-body-length cyclomatic-complexity
export function createSendAppointmentDataObject(
  langCode: string,
  business: IBusinessProfile | undefined,
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
  const generalInfo = business ? business.general_info : undefined;
  const widgetConfiguration = business ? business.widget_configuration : undefined;
  const hideAppointmentTime = (widgetConfiguration && widgetConfiguration.calendarMode)
    || (widgetConfiguration && widgetConfiguration.skipTimeSelection && widgetConfiguration.skipTimeSelectionServiceIDs
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
  if (widgetConfiguration && widgetConfiguration.splitName) {
    name = clientData.client.name;
    surname = clientData.client.surname;
  } else {
    const splitName = clientData.client_name.split(' ');
    name = splitName[0];
    surname = splitName.slice(1).join(' ').replace(/^\s+|\s+$/g, '');
  }

  const smsIntegrationNumber = smsIntegrationNumberExtractor(
    business ? business.integration_data.notification.sms.length : 0,
    business ? business.integration_data.notification.sms[0].number : '',
  );

  const emails = business ? business.integration_data.notification.email.filter((n) => {
    return !n.trigger || n.trigger.indexOf('BUSINESS_NOTIFICATION') !== -1;
  }).map((n) => {
    return n.email;
  }) : [];

  let country;
  let lang;
  if (business && business.group === 'LATVIAN') {
    country = 'LV';
    lang = 'lv-lv';
  } else if (generalInfo && generalInfo.address && generalInfo.address.length && generalInfo.address[0].country) {
    country = generalInfo.address[0].country;
    lang = generalInfo.language;
  }

  return {
    data: {
      appointment: {
        hideAppointmentTime,
        backofficeID,
        hidePrice: business && business.id && (business.id === '4000000002178' || business.id === '4000000003095'),
        appointment_id: appointmentId,
        business_id: business ? business.id : '',
        business_internal_id: business ? business.id : '',
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
        use_coupon: business && business.widget_configuration ? business.widget_configuration.useCoupon : false,
      },
      user_info: {
        clientComment,
        business_internal_ids: business ? [business.id] : [],
        email: clientData.email,
        first_name: clientData.client.name,
        internal_id: clientData.client.id,
        last_name: clientData.client.surname,
        phone: clientData.client.phone,
        updateUserInfo: [
          clientData,
        ],
        user_object: {
          first_name: name,
          last_name: surname,
          phone: clientPhone,
          email: profile ? clientData.email : undefined,
        },
      },
      service_info: {
        service_id: currentService.id,
        service_object: additionalServices && additionalServices.length ?
          additionalServices.join(', ') : currentService.alias[langCode],
        service_decrease: currentService.capacity_decrease,
      },
      worker_info: {
        worker_id: resource.id,
        worker_object: {
          business_internal_id: business ? business.id : undefined,
          email: resource.email,
          icon_url: resource.icon_url,
          internal_id: resource.id,
          name: resource.name + (!_.isUndefined(resource.surname) ? ` ${resource.surname}` : ''),
          occupation: resource.description,
          phone: resource.phone[0],
          taxonomy_terms: resource.taxonomies,
        },
      },
      bussines_info: {
        bussines_id: business ? business.id : undefined,
        bussines_object: {
          country,
          name: generalInfo ? generalInfo.name : '',
          msg_language: lang,
          currency: generalInfo && generalInfo.accepted_currency ? generalInfo.accepted_currency[0] : {},
          internal_id: business ? business.id : undefined,
          timezone: business && business.general_info ?
            (WidgetUtils.DateTime.businessTimezoneUtcOffset({ business }) / 60).toFixed(1) : undefined,
          integration_allowed: '1',
          integration_info: {
            sms: smsIntegrationNumber,
            email: emails.join(','),
          },
        },
      },
      extra_fields: extraFieldValues,
      app_source: constants.SOURCE,
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
  resources: IResourceProps[],
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
    constants.SOURCE,
    appointment: {
      masterImportance,
      start: dateTime.toUTCString(),
      referrer: '',
      price: {
        originalAmount,
        discount,
        discountType,
        currency,
        additionalTaxonomyDiscount,
        amount,
        discountProvider: discountProvider ? discountProvider : undefined,
      },
      duration: totalDuration && totalDuration > 0 ? totalDuration : duration,
      socialToken: socialToken ? socialToken : undefined,
    },
    utm: getUTM(),
    taxonomy: {
      id: serviceId,
    },
    resource: {
      id: resources.map(r => r.businessId),
    },
    business: {
      id: businessId,
    },
    additionalServices: additionalServices ? additionalServices.map(service => ({
      taxonomyID: service.id,
      id: service.id,
      alias: service.alias,
    }),
    ) : undefined,
    order: orderID ? {
      id: orderID,
    } : undefined,
    cabinet: cabinetID ? {
      id: cabinetID,
    } : undefined,
    originBusinessID: resources[0].businessId,
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

export function createFieldRequestListObject(
  businessList: string[],
) {
  return {
    business: { list: businessList },
    field: {
      active: true,
      modelType: 'APPOINTMENT',
    },
  };
}

export function createDiscountRequestObject(
  businessId: string,
) {
  return {
    business: { id: businessId },
  };
}

export function createDiscountExceptionsRequestObject(
  data: any,
) {
  return {
    business: { id: data.business.id },
    start: data.start,
    end: data.end,
  };
}


export function createUserHistoryRequest(
  clientId: string,
  business: string,
  networkId: string = '',
) {
  const params: any = {};
  params.business = {
    id: business,
  };

  if (networkId) {
    params.network = {
      id: networkId,
    };
  }

  return {
    client: {
      id: clientId,
    },
    pageSize: 999,
    limit: 999,
    skip: 0,
    ...params,
  };
}

export function createClientRequest(
  clientId: string,
) {
  return {
    client: {
      id: clientId,
    },
  };
}

export function addClientRequest(
  businessId: string,
  countryCode: string,
  areaCode: string,
  phoneNumber: string,
) {
  return {
    business: {
      id: businessId,
    },
    client: {
      phone: [{
        number: phoneNumber,
        country_code: countryCode,
        area_code: areaCode,
      }],
    },
  };
}

export function createResourcesWeightRequest(
  networkId: string,
) {
  return {
    network: {
      id: networkId,
    },
  };
}
