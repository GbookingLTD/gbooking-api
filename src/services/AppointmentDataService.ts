import {
    axios,
    createAppointmentConfirmObject,
    createRequest,
    createReserveObject,
    createSendAppointmentDataObject,
} from 'src/axios';
import { constants, getPhone, getReferer, getRefererHost, getSource } from 'src/common';
import {
    IConfirmAppointmentResponce,
    IProfileResponce,
    IReserveSlotResponce,
    IResource,
    IResponce,
    ITaxonomy,
} from 'src/interfaces';
import { IPhoneData } from 'src/interfaces/client';

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
        resourceId: string,
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
        resourceId,
        totalDuration,
        orderID,
        cabinetID,
        additionalTaxonomyDiscount,
        additionalServices,
        ))).then(response => response ? response.data
            : Promise.reject(
        `Couldn't reserve slot for resource ${resourceId}, business ${businessId} and time: ${dateTime.toISOString()}`,
            ));
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
    ): Promise<IResponce<IConfirmAppointmentResponce>>  {
      return axios.post('', createRequest('appointment.client_confirm_appointment', createAppointmentConfirmObject(
          langCode,
          clientId,
          appointmentId,
          numVisitors,
          autoConfirmByBusiness,
          skipCheckSpaceLeft,
          GAClientID,
          clientPhone,
          profileId,
          profileName,
        )))
        .then(response => response ? response.data
        : Promise.reject(`No responce for confirmation of appointment for user ${JSON.stringify(clientPhone)}`));
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
        selectedClinic,
    ): Promise<void> {
      return axios.post('/index.php', createSendAppointmentDataObject(
            langCode,
            businessData.business,
            resource,
            currentService,
            appConfirmData.appointment.id,
            appConfirmData.appointment.start,
            clientData,
            getPhone(clientData.sms_phone, selectedClinic),
            appConfirmData.appointment.price,
            totalPrice,
            additionalFields,
            clientData.comment,
            additionalServices,
            appConfirmData.appointment.backofficeID,
            extraFieldValues,
            null, // profile
          ),            {
            baseURL: constants.DATA_SEND_URL,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          })
          .then(response => response ? response.data
          : Promise.reject(`No responce for confirmation of appointment for user ${JSON.stringify(clientData)}`));
    }

    export function updateAppointment(
        appointmentData,
        additionalFields,
        extraFields,
        resourceId,
        notes,
    ) {
      return axios.post('', createRequest('appointment.update_appointment', {
        additionalFields,
        extraFields,
        resourceId,
        notes,
        appointment: appointmentData,
        skipChecks: true,
      }))
      .then(response => response ? response.data
      : Promise.reject(`No pesponce. Cant update appointment for ${JSON.stringify(appointmentData)}`));
    }

    export function statOrder(businessId, appointmentId) {
      return axios.post('', createRequest('stat.count', {
        business: { id : businessId },
        source: getSource(),
        event : 'ORDER',
        appointment: { id : appointmentId },
        referer: getRefererHost(),
        fullReferer: getReferer(),
      }));
    }
}
