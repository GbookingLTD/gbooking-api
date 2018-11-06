/**
 * Service for processing different requests for user profile
 */

import moment from 'moment';
import {
  addClientRequest,
  axios,
  createClientRequest,
  createNewProfileObject,
  createRequest,
  createUpdateProfileObject,
  createUserHistoryRequest,
} from 'src/axios';
import { serializeData } from 'src/common';
import { IClientResponce, IResponce, IUserHistoryResponce, IUserProfileResponce } from 'src/interfaces';
import { IPhoneData } from 'src/interfaces/client';

export module UserProfileService {
    export function createProfile(
        name: string,
        surname: string,
        phone: IPhoneData,
        businessId: string,
        email: string,
        documentToken?: string,
        driverLicense?: string,
        gender?: string,
        birthday?: string,
    ): Promise<IResponce<IUserProfileResponce>> {
      const phoneData = {
        country_code: (phone.country_code as any).code,
        area_code: phone.area_code,
        number: phone.number,
      };
      const formattedBirthday = birthday ? `${moment(birthday,'DDMMYYYY').format('YYYY-MM-DDT00:00:00.000')}Z` : '';

      return axios.post('', serializeData(createRequest('client.add_client', createNewProfileObject(
                                          name,
                                          surname,
                                          phoneData,
                                          businessId,
                                          email,
                                          documentToken,
                                          driverLicense,
                                          false,
                                          undefined,
                                          undefined,
                                          gender,
                                          formattedBirthday,

    ))))
                  .then(response => response ? response.data
                    : Promise.reject('AN ERROR OCCURED'));
    }

    export function updateProfile(
      clientId: string,
      phone: IPhoneData,
      businessId: string,
      name: string,
      surname: string,
      email: string,
      documentToken?: string,
      driverLicense?: string,
      gender?: string,
      birthday?: string,
  ): Promise<IResponce<IUserProfileResponce>> {
      const phoneData = {
        country_code: (phone.country_code as any).code,
        area_code: phone.area_code,
        number: phone.number,
      };
      const formattedBirthday = birthday ? `${moment(birthday,'DDMMYYYY').format('YYYY-MM-DDT00:00:00.000')}Z` : '';

      return axios.post('', serializeData(createRequest('client.update_client', createUpdateProfileObject(
                                          clientId,
                                          phoneData,
                                          businessId,
                                          name,
                                          surname,
                                          email,
                                          documentToken,
                                          driverLicense,
                                          false,
                                          undefined,
                                          undefined,
                                          gender,
                                          formattedBirthday,

    ))))
                  .then(response => response ? response.data
                    : Promise.reject('AN ERROR OCCURED'));
                    // `No responce for creation of profile for user ${JSON.stringify(phone)}`
    }

    // business -- just any business from a network (network id provides by business from a request)
    export function getUserHistory(clientId: string, business: string): Promise<IResponce<IUserHistoryResponce[]>> {
      return axios.post('', createRequest('appointment.get_appointments_by_client_v2', createUserHistoryRequest(
        clientId,
        business,
      )))
                    .then(response => response ? response.data
                      : Promise.reject('AN ERROR OCCURED'));
                      // `No extra fields responce for profile on businessId ${businessId}`
    }

    export function getClient(clientId: string): Promise<IResponce<IClientResponce>> {
      return axios.post('', createRequest('client.get_client', createClientRequest(
        clientId,
      )))
                    .then(response => response ? response.data
                      : Promise.reject('AN ERROR OCCURED'));
                      // `No extra fields responce for profile on businessId ${businessId}`
    }

    export function addClient(businessId: string, countryCode: string, areaCode: string, phoneNumber: string):
     Promise<IResponce<IClientResponce>> {
      return axios.post('', createRequest('client.add_client', addClientRequest(
        businessId,  countryCode, areaCode, phoneNumber,
      )))
                    .then(response => response ? response.data
                      : Promise.reject('AN ERROR OCCURED'));
                      // `No extra fields responce for profile on businessId ${businessId}`
    }
 }
