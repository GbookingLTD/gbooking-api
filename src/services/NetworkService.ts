/**
 * Service for obtaining all businesses for predefined network
 */
import {
  axios,
  createNetworkConfigRequest,
  createProfileRequest,
  createRequest,
  createResourcesWeightRequest,
} from 'src/axios';
import { INetworkConfigResponce, INetworkResponce, IResponce, IWeightResponce } from 'src/interfaces';

export module NetworkService {
    export function getWidgetBusinesses(networkId: string): Promise<IResponce<INetworkConfigResponce>> {
      const value = createNetworkConfigRequest(networkId);

      return axios.post('', value)
          .then(response => response ? response.data
            : Promise.reject('AN ERROR OCCURED'));
    }

    export function getAllBusinesses(networkId: string): Promise<IResponce<INetworkResponce[]>> {
      const value = createProfileRequest(networkId);

      return axios.post('', value)
          .then(response => response ? response.data
            : Promise.reject('AN ERROR OCCURED'));
    }

    export function getResourcesWeight(networkId: string): Promise<IResponce<IWeightResponce[]>> {
      return axios.post('', createRequest('resource.get_workload_weights',
                                          createResourcesWeightRequest(networkId)))
          .then(response => response ? response.data
            : Promise.reject('AN ERROR OCCURED'));
    }
 }
