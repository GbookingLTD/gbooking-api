/**
 * INetworkResponce is an interface that represents an answer for network request
 */
import { IBusinessGeneralInfo } from 'src/interfaces/integration';

export interface INetworkResponce {
  id: number;
  general_info: IBusinessGeneralInfo;
}
