import { axios, createCRACKRequestObject, createRequest } from 'src/axios';
import { ICrackResponce, ICrackSplittedResponce, IResponce } from 'src/interfaces';
import { ISplittedBusinessesRequestData } from 'src/interfaces/client';
import { constants } from 'src/common';

/**
 * Service for integration with CRACK and for obtaining and booking timeslots
 * Based on documentation from https://docs.google.com/document/d/1ugl-Ejst8z46vsaoaVWskK7NAV_D0BFDYnPenNP6t0c/edit
 *
 * WARNING:prefer to use Crac.GetCRACResourcesAndRooms
 */

export module CRACKService {
    export function getTimeResources(
        businessId: string,
        resources: string[],
        fromFilter: Date = new Date(),
        toFilter?: Date,
    ): Promise<IResponce<ICrackResponce>> {
      return axios.post('', createRequest('Crac.GetCRACResources', [
        createCRACKRequestObject(
          businessId,
          resources,
          fromFilter,
          toFilter ? toFilter : (new Date((new Date()).setDate(fromFilter.getDate() + 7)))),
      ]),               {
        baseURL: constants.CRAC_URL,
      })
          .then(response => response ? response.data
            : Promise.reject(`No responce for CRACK timeslots on businessId ${businessId} and resources: ${
              resources.join(' ,')}`));
    }

    /**
     * @depracated
     */
    export function getTimeResourcesSplitted(
      data: ISplittedBusinessesRequestData[],
      fromFilter: Date = new Date(),
      toFilter?: Date,
  ): Promise<IResponce<ICrackSplittedResponce>> {
      const toFilterSafe = toFilter ? toFilter : (new Date((new Date()).setDate(fromFilter.getDate() + 7)));

      return axios.post('', createRequest('Crac.GetCRACResourcesSplitted',
                                          data.map(requestData => createCRACKRequestObject(
          requestData.businessId,
          requestData.resources,
          fromFilter,
          toFilterSafe,
        )),
      ),                {
        baseURL: constants.CRAC_URL,
      })
        .then(response => response ? response.data :
          Promise.reject(`No responce for CRACK request ${JSON.stringify(data)}`));
    }
 }
