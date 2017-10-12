/**
 * Service for obtaining and booking timeslots
 */

import { axios, createCRUNCHRequestObject, createRequest } from 'src/axios';
import { ICrunchResponse, IResponce } from 'src/interfaces';

export module CRUNCHService {
    export function getSlots(
        businessId: string,
        resources: string[],
        allTaxonomyResources: string[],
        taxonomies: string[],
        requestedClients: number,
        modifyRequestObj: (obj: any) => any,
        fromFilter: Date = new Date(),
        toFilter?: Date,
        isUsingNewMethod: boolean = false,
        isGT: boolean = false,
        isNeedExtraRequestParameter: boolean = false,
      ): Promise<ICrunchResponse> {

      let gtTaxonomyExcludedResources: string[] = [];
      const isTaxonomyRequest = resources.length > 1;
      const isNeedExtraRequest = isNeedExtraRequestParameter
                                            && isTaxonomyRequest && resources.length === allTaxonomyResources.length;
      const method = `appointment.${
        isTaxonomyRequest ? 'get_busy_slots_for_taxonomies' : 'get_busy_slots_for_resources'
      }`;
      const toFilterSafe = toFilter ? toFilter : (new Date((new Date()).setDate(fromFilter.getDate() + 7)));

      return axios.post('', createRequest(method, modifyRequestObj(createCRUNCHRequestObject(
          businessId,
          resources,
          taxonomies,
          requestedClients,
          fromFilter,
          toFilterSafe,
          isUsingNewMethod,
        ))))
                  .then(response => isGT && !isNeedExtraRequest ? getSlots(
                      businessId,
                      allTaxonomyResources,
                      allTaxonomyResources,
                      taxonomies,
                      requestedClients,
                      modifyRequestObj,
                      fromFilter,
                      toFilter,
                      isUsingNewMethod,
                      isGT,
                      false,
                  ).then((responseInner) => {
                    gtTaxonomyExcludedResources = responseInner.excludedResources;

                    return (response.data as IResponce<ICrunchResponse>).result;
                  }) : (response.data as IResponce<ICrunchResponse>).result).then(
                    (data: ICrunchResponse) => {
                      if (isGT && isTaxonomyRequest) {
                        data.excludedResources = gtTaxonomyExcludedResources;
                      }

                      return data;
                    },
                  );
    }
 }
