/**
 * Service for processing different requests for user profile
 */

import {
    axios,
    createClientRequest,
    createNewProfileObject,
    createRequest,
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
      ): Promise<IResponce<IUserProfileResponce>> {
        const phoneData = {
          country_code: (phone.country_code as any).code,
          area_code: phone.area_code,
          number: phone.number,
        };
  
        return axios.post('', serializeData(createRequest('client.add_client', createNewProfileObject(
                                            name,
                                            surname,
                                            phoneData,
                                            businessId,
                                            email,
                                            documentToken,
                                            driverLicense,
      ))))
                    .then(response => response ? response.data
                      : Promise.reject('AN ERROR OCCURED'));
                      // `No responce for creation of profile for user ${JSON.stringify(phone)}`
      }
  
      export function getUserHistory(clientId: string, networkId: string, businessId: string): Promise<IResponce<IUserHistoryResponce[]>> {
        return axios.post('', createRequest('appointment.get_appointments_by_client_v2', createUserHistoryRequest(
          networkId,
          businessId,
          clientId,
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
   }
  