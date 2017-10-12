/**
 * Service for obtaining all businesses for predefined network
 */
import { axios, createProfileRequest } from 'src/axios';
import { INetworkResponce, IResponce } from 'src/interfaces';

export module NetworkService {
    export function getAllBusinesses(networkId: string): Promise<IResponce<INetworkResponce[]>> {
      const value = createProfileRequest(networkId);

      return axios.post('', value)
          .then(response => response ? response.data
            : Promise.reject(`No responce for network on id ${networkId}`));
    }
 }
