import { IBusinessEntry, INetworkWidgetConfiguration } from 'src/interfaces';

/**
 * INetworkConfigResponce is an interface that represents an answer for get_network_data
 */

export interface INetworkConfigResponce {
  _id: string;
  networkID: string;
  __v: number;
  grantGroups: [ any ];
  clientVIPPhones: [ string ];
  networkWidgetConfiguration: [ INetworkWidgetConfiguration ];
  businesses: [ IBusinessEntry ];
}
