/**
 * Service for obtaining categories, subcutegories, creation tree of it and for cutomer's services
 */

import {
  axios,
  createBusinessIdObject,
  createBusinessListObject,
  createDiscountExceptionsRequestObject,
  createDiscountRequestObject,
  createFieldRequestListObject,
  createFieldRequestObject,
  createRequest,
} from 'src/axios';
import { IDiscountResponce, IExtraFieldsResponce, IProfileResponce, IResponce } from 'src/interfaces';

export module ProfileService {
    export function getBusiness(businessId: string): Promise<IResponce<IProfileResponce>> {
      return axios.post('', createRequest('business.get_profile_by_id', createBusinessIdObject(businessId)))
                  .then(response => response ? response.data
                    : Promise.reject('AN ERROR OCCURED'));
                    // `No responce for profile on businessId ${businessId}`
    }

    export function getBusinessList(businessList: string[]): Promise<IResponce<IProfileResponce>> {
      return axios.post('', createRequest('business.get_profiles_list', createBusinessListObject(businessList)))
                  .then((response) => {
                    if (response) {
                      try {
                        const parsed = response.data.result.map(b => JSON.parse(b).result);
                        response.data.result = parsed;
                      } catch (e) {
                        // ignore
                      }

                      return response.data;
                    }

                    return Promise.reject('AN ERROR OCCURED');
                  });
                    // `No responce for profile on businessId ${businessId}`
    }

    export function getExtraFileds(businessId: string): Promise<IResponce<IExtraFieldsResponce[]>> {
      return axios.post('', createRequest('field.get_fields', createFieldRequestObject(businessId)))
                  .then(response => response ? response.data
                    : Promise.reject('AN ERROR OCCURED'));
                    // `No extra fields responce for profile on businessId ${businessId}`
    }

    export function getExtraFiledsList(businessList: string[]): Promise<IResponce<IExtraFieldsResponce[]>> {
      return axios.post('', createRequest('field.get_fields_list', createFieldRequestListObject(businessList)))
                  .then(response => response ? response.data
                    : Promise.reject('AN ERROR OCCURED'));
                    // `No extra fields responce for profile on businessId ${businessId}`
    }

    export function getTaxonomyDiscount(businessId: string): Promise<IResponce<IDiscountResponce[]>> {
      return axios.post('', createRequest('business.get_business_taxonomy_discount',
                                          createDiscountRequestObject(businessId)))
                  .then(response => response ? response.data
                    : Promise.reject('AN ERROR OCCURED'));
                    // `No extra fields responce for profile on businessId ${businessId}`
    }

    export function getTaxonomyDiscountException(request: any): Promise<IResponce<IDiscountResponce[]>> {
      return axios.post('', createRequest('business.get_business_taxonomy_discount_exception',
                                          createDiscountExceptionsRequestObject(request)))
                  .then(response => response ? response.data
                    : Promise.reject('AN ERROR OCCURED'));
                    // `No extra fields responce for profile on businessId ${businessId}`
    }
 }
