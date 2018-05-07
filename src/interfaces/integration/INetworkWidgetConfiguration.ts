import { IBusinessConfigEntry } from 'src/interfaces';

/**
 * INetworkWidgetConfiguration is a part of INetworkConfigResponce that represents business configuration for widget
 */

export interface INetworkWidgetConfiguration {
  source: 'GENERAL' | 'LOOK_IDEAL' | 'MEDBOOKING'
        | 'GROUPON' | 'YANDEX' | 'ZOON' | 'PROFI'
        | 'VK_APP' | 'ALOL_TNT_APP' | 'ALLIANZ'
        | 'VSK';
  _id: string;
  __v: number;
  businesses: [ IBusinessConfigEntry ];
  defaultServiceID: string;
  showDefaultService: boolean;
  showOnMap: boolean;
  showBranchSelector: boolean;
}
