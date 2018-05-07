/**
 * Service for obtaining categories, subcutegories, creation tree of it and for cutomer's services
 */

import { axios, createBusinessIdObject, createFieldRequestObject, createRequest } from 'src/axios';
import { IExtraFieldsResponce, IProfileResponce, IResponce } from 'src/interfaces';

export module ProfileService {
    export function getBusiness(businessId: string): Promise<IResponce<IProfileResponce>> {
      return axios.post('', createRequest('business.get_profile_by_id', createBusinessIdObject(businessId)))
                  .then(response => response ? response.data
                    : Promise.reject('AN ERROR OCCURED'));
                    // `No responce for profile on businessId ${businessId}`
    }

    export function getExtraFileds(businessId: string): Promise<IResponce<IExtraFieldsResponce[]>> {
      return axios.post('', createRequest('field.get_fields', createFieldRequestObject(businessId)))
                  .then(response => response ? response.data
                    : Promise.reject('AN ERROR OCCURED'));
                    // `No extra fields responce for profile on businessId ${businessId}`
    }
 }
