import moment from 'moment';
import {
  axios,
  createCRACDistributedRequestObject,
  createCRACRequestFirstAvailableObject,
  createCRACRequestObject,
  createRequest,
 } from 'src/axios';
import { ICracFirstAvailableResponce, ICracSplittedResponce, IProfileResponce, IResponce  } from 'src/interfaces';
import { IResourceProps, ISplittedBusinessesRequestData } from 'src/interfaces/client';

const FETCH_SLOTS_RANGE_IN_DAYS = 7;
/**
 * Service for integration with CRAC and for obtaining and booking timeslots
 * Based on documentation from https://docs.google.com/document/d/1ugl-Ejst8z46vsaoaVWskK7NAV_D0BFDYnPenNP6t0c/edit
 *
 * WARNING:prefer to use Crac.GetCRACResourcesAndRooms
 */

export module CRACService {
    export function getTimeResources(
        businessData: IProfileResponce,
        resourceList: IResourceProps[],
        taxonomies: string[],
        fromFilter: Date = new Date(),
        toFilter?: Date,
    ): Promise<IResponce<ICracSplittedResponce>> {

      const isShowCase = businessData.business.general_info.isShowcase;
      const businessId = businessData.business.id;
      const resourceIdList = resourceList.map(r => r.businessId);
      if (!isShowCase) {
        return getTimeResourcesAndRooms(businessId, resourceIdList, taxonomies, fromFilter, toFilter);
      } else {
        return getDistributedResourcesAndRooms(businessId, resourceList, taxonomies, fromFilter, toFilter);
      }
    }

    export function getTimeResourcesAndRooms(
        businessId: string,
        resources: string[],
        taxonomies: string[],
        fromFilter: Date = new Date(),
        toFilter?: Date,
    ): Promise<IResponce<ICracSplittedResponce>> {

      return axios.post('', createRequest('Crac.GetCRACResourcesAndRooms', [
        createCRACRequestObject(
          businessId,
          resources,
          taxonomies,
          fromFilter,
          toFilter ? toFilter : moment.utc(fromFilter).add(FETCH_SLOTS_RANGE_IN_DAYS,'days').toDate()),
      ]),               {
        baseURL: `http://crac.gbooking.ru/rpc`,
      })
          .then(response => response ? response.data :
            Promise.reject('AN ERROR OCCURED'));
        // `No responce for CRACK timeslots on businessId ${businessId} and resources: ${resources.join(' ,')}`
    }

    export function getDistributedResourcesAndRooms(
        businessId: string,
        resourceList: IResourceProps[],
        taxonomies: string[],
        fromFilter: Date = new Date(),
        toFilter?: Date,
    ): Promise<IResponce<ICracSplittedResponce>> {

      return axios.post('', createRequest('Crac.GetCRACDistributedResourcesAndRooms', [
        createCRACDistributedRequestObject(
          businessId,
          resourceList,
          taxonomies,
          fromFilter,
          toFilter ? toFilter : moment.utc(fromFilter).add(FETCH_SLOTS_RANGE_IN_DAYS,'days').toDate()),
      ]),               {
        baseURL: `http://crac.gbooking.ru/rpc`,
      })
      .then(response => response ? response.data
        : Promise.reject('AN ERROR OCCURED'));
    // `No responce for CRACK timeslots on businessId ${businessId} and resources: ${resources.join(' ,')}`
    }

    export function getFirstAvailable(
      resources: string[],
      slotDuration,
    ): Promise<IResponce<ICracFirstAvailableResponce>> {
      return axios.post('', createRequest('Crac.CRACResourcesFreeByDate', [
        createCRACRequestFirstAvailableObject(resources, slotDuration),
      ]),               {
        baseURL: `http://crac.gbooking.ru/rpc`,
      })
        .then(response => response ? response.data
          : Promise.reject('AN ERROR OCCURED'));
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
          requestData.taxonomies,
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
