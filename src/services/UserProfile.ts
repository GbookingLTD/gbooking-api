/**
 * Service for creation of user profile and authorization
 */

import { axios, createNewProfileObject, createRequest } from 'src/axios';
import { IResponce, IUserProfileResponce } from 'src/interfaces';
import { IPhoneData } from 'src/interfaces/client';

export module UserProfile {
    export function createProfile(
        name: string,
        surname: string,
        phone: IPhoneData,
        businessId: string,
        email: string,
        documentToken?: string,
        driverLicense?: string,
    ): Promise<IResponce<IUserProfileResponce>> {
      return axios.post('', createRequest('client.add_client', createNewProfileObject(
                                          name,
                                          surname,
                                          phone,
                                          businessId,
                                          email,
                                          documentToken,
                                          driverLicense,
    )))
                  .then(response => response ? response.data
                    : Promise.reject(`No responce for creation of profile for user ${JSON.stringify(phone)}`));
    }
 }
