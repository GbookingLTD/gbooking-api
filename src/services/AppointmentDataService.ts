import {
  axios,
  createAppointmentConfirmObject,
  createRequest,
  createReserveObject,
  createSendAppointmentDataObject,
} from 'src/axios';
import { getPhone } from 'src/common';
import {
  IAppointmentData,
  IConfirmAppointmentResponce,
  IProfileResponce,
  IReserveSlotResponce,
  IResource,
  IResponce,
  ITaxonomy,
} from 'src/interfaces';
import { IMarkerProps, IPhoneData, IResourceProps } from 'src/interfaces/client';

/**
 * Service for creation of appointment, obtaining appointments and etc
 */

export module AppointmentDataService {
  export function reserveSlot(
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
  ): Promise<IResponce<IReserveSlotResponce>> {
    return axios.post('', createRequest('appointment.reserve_appointment', createReserveObject(
      hideAppointmentTime,
      socialToken,
      dateTime,
      amount,
      originalAmount,
      discount,
      discountType,
      discountProvider,
      currency,
      duration,
      businessId,
      serviceId,
      resources,
      totalDuration,
      orderID,
      cabinetID,
      additionalTaxonomyDiscount,
      additionalServices,
    ))).then(response => response ? response.data
      : Promise.reject('AN ERROR OCCURED'));
    // `Couldn't reserve slot for resource ${resourceId}, business ${businessId} and time: ${dateTime.toISOString()}`,
  }

  export function confirmAppointment(
    langCode: string,
    clientId: string,
    appointmentId: string,
    numVisitors: number,
    GAClientID?: number,
    clientPhone?: IPhoneData,
    profileId?: string,
    profileName?: string,
    autoConfirmByBusiness: boolean = false,
    skipCheckSpaceLeft: boolean = false,
  ): Promise<IResponce<IConfirmAppointmentResponce>> {
    const fixedPhone = clientPhone;
    if (fixedPhone && typeof fixedPhone.country_code === 'object') {
      fixedPhone.country_code = fixedPhone.country_code.code;
    }

    return axios.post('', createRequest('appointment.client_confirm_appointment', createAppointmentConfirmObject(
      langCode,
      clientId,
      appointmentId,
      numVisitors,
      autoConfirmByBusiness,
      skipCheckSpaceLeft,
      GAClientID,
      fixedPhone,
      profileId,
      profileName,
    )))
      .then(response => response ? response.data
        : Promise.reject('AN ERROR OCCURED'));
    // `No responce for confirmation of appointment for user ${JSON.stringify(clientPhone)}`)
  }

  export function sendAppointmentData(
    langCode: string,
    businessData: IProfileResponce,
    resource: IResource,
    currentService: ITaxonomy,
    appConfirmData,
    clientData,
    totalPrice,
    additionalFields,
    additionalServices,
    extraFieldValues,
    selectedLocation: IMarkerProps,
  ): Promise<void> {
    const phone = getPhone(clientData.sms_phone, selectedLocation);
    const phoneData = {
      country_code: (phone.country_code as any).code,
      area_code: phone.area_code,
      number: phone.number,
    };

    return axios.post('/index.php', createSendAppointmentDataObject(
      langCode,
      businessData.business,
      resource,
      currentService,
      appConfirmData.appointment.id,
      appConfirmData.appointment.start,
      clientData,
      phoneData,
      appConfirmData.appointment.price,
      totalPrice,
      additionalFields,
      clientData.comment,
      additionalServices,
      appConfirmData.appointment.backofficeID,
      extraFieldValues,
      null, // profile
    ),                {
      baseURL: 'http//il.gbooking.ru',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    })
      .then(response => response ? response.data
        : Promise.reject('AN ERROR OCCURED'));
    // `No responce for confirmation of appointment for user ${JSON.stringify(clientData)}`
  }

  export function updateAppointment(
    appointmentData: IAppointmentData,
    additionalFields: any[],
    extraFields: any[],
    resourceId: string,
    businessId: string,
    taxonomyId: string,
    notes: string,
  ) {
    appointmentData.notes = notes;

    return axios.post('', createRequest('appointment.update_appointment', {
      additionalFields,
      extraFields,
      resourceId,
      appointment: appointmentData,
      taxonomy: {
        id: taxonomyId,
      },
      resource: {
        id: resourceId,
      },
      business: {
        id: businessId,
      },
      skipChecks: true,
    }))
      .then(response => response ? response.data
        : Promise.reject('AN ERROR OCCURED'));
    // `No pesponce. Cant update appointment for ${JSON.stringify(appointmentData)}`
  }



  export function clearResevedSlot(businessId: string, appointmentId: string) {
    return axios.post('', createRequest('appointment.client_remove_empty_appointment', {
      appointment: {
        id: appointmentId,
      },
      business: {
        id: businessId,
      },
    }))
      .then(response => response ? response.data
        : Promise.reject('AN ERROR OCCURED'));
  }

  export function cancelAppointment(appointmentId: string, clientId: string) {
    return axios.post('', createRequest('appointment.cancel_appointment_by_client', {
      appointment: {
        id: appointmentId,
      },
      client: {
        clientID: clientId,
      },
    }))
      .then(response => response ? response.data
        : Promise.reject('AN ERROR OCCURED'));
  }
}
