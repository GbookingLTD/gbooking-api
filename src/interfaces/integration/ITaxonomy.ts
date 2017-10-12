/**
 * ITaxonomy is service info structure
 */

import {
  IAdditionalDuration,
  IAdditionalPrice,
  IAdditionalTaxonomyExtraId,
  IConsumable,
  IDiscount,
  IException,
  IPrice,
  ITaxonomyNameAlias,
  ITimeTable,
} from 'src/interfaces/integration';

export interface ITaxonomy {
  name: string;
  id: string;
  taxonomyParentID: string;
  taxonomyCategoryExtraID: string; // external category id
                                  // if our tree and an external tree is differ
  taxonomyAppExtraID: string; // external service id for booking
  extraId: string;
  cabinets: string[];
  alias: ITaxonomyNameAlias;
  price: IPrice; // default price for resource with 0 level
  socialPrice: IPrice;
  capacity_decrease: number;
  duration: number;
  active: boolean;
  order: number;
  leaves: string[];
  images: string[];
  discounts: IDiscount;
  additionalPrices: IAdditionalPrice[];
  additionalDurations: IAdditionalDuration[];
  additionalTaxonomyExtraId: IAdditionalTaxonomyExtraId[];
  parallelTaxonomies: string[]; // can be served in parallel with this taxonomies
  onlyAfterTaxonomies: string[]; // can be served only after this taxonomies
  displayInWidget: boolean;
  taxonomyType:  'CATEGORY' | 'SERVICE';
  designs: string[]; // associated designs identifiers
  forPay: boolean;
  isOther?: boolean; // Other services are hidden on a client
  capacity?: number;
  taxonomyID?: string;
  taxonomyExtraID?: string;
  timetable?: ITimeTable;
  exceptions?: [ IException ];
  popularity?: number;
  rooms?: [ string ];
  specialCabinet?: string;
  lastModified?: Date;
  slotDuration?: number;
  extraLink?: string;
  priceLink?: string;
  extraDescription?: string;
  bookableSubTaxonomies?: [ string ];
  color?: string;
  consumables?: [ IConsumable ];
  chargeUnitsStep?: number; // > 0
}
