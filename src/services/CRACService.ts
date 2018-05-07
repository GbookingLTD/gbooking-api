import { axios, createCRACRequestObject, createRequest } from 'src/axios';
import { ICracResponce, ICracSplittedResponce, IResponce } from 'src/interfaces';
import { ISplittedBusinessesRequestData } from 'src/interfaces/client';

/**
 * Service for integration with CRAC and for obtaining and booking timeslots
 * Based on documentation from https://docs.google.com/document/d/1ugl-Ejst8z46vsaoaVWskK7NAV_D0BFDYnPenNP6t0c/edit
 *
 * WARNING:prefer to use Crac.GetCRACResourcesAndRooms
 */

export module CRACService {
    export function getTimeResources(
        businessId: string,
        resources: string[],
        fromFilter: Date = new Date(),
        toFilter?: Date,
    ): Promise<IResponce<ICracResponce>> {
      return axios.post('', createRequest('Crac.GetCRACResources', [
        createCRACRequestObject(
          businessId,
          resources,
          fromFilter,
          toFilter ? toFilter : (new Date((new Date()).setDate(fromFilter.getDate() + 7)))),
      ]),               {
        baseURL: `http://crac.gbooking.ru/rpc`,
      })
          .then(response => response ? response.data
            : Promise.reject('AN ERROR OCCURED'));
        // `No responce for CRACK timeslots on businessId ${businessId} and resources: ${resources.join(' ,')}`
    }

    /**
     * @depracated
     */
    export function getTimeResourcesSplitted(
      data: ISplittedBusinessesRequestData[],
      fromFilter: Date = new Date(),
      toFilter?: Date,
  ): Promise<IResponce<ICracSplittedResponce>> {
      const toFilterSafe = toFilter ? toFilter : (new Date((new Date()).setDate(fromFilter.getDate() + 7)));

      return axios.post('', createRequest('Crac.GetCRACResourcesSplitted',
                                          data.map(requestData => createCRACRequestObject(
          requestData.businessId,
          requestData.resources,
          fromFilter,
          toFilterSafe,
        )),
      ),                {
        baseURL: `http://crac.gbooking.ru/rpc`,
      })
        .then(response => response ? response.data :
          Promise.reject('AN ERROR OCCURED'));
          // `No responce for CRACK request ${JSON.stringify(data)}`
    }
 }
