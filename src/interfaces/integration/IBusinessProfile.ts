/**
 * ICabinet is a part of IProfileResponce that represents clients cabinets
 */
import { IBusinessGeneralInfo, ICabinet, IResource, ITaxonomy, IWidgetConfiguration } from 'src/interfaces/integration';

export interface IBusinessProfile {
  general_info: IBusinessGeneralInfo;
  resources: IResource[];
  vertical: string;
  flatTaxonomyDisplay: boolean;
  allowCategoryBooking: boolean;
  cabinets: ICabinet[];
  socialTokenEnabled: boolean;
  cabinetsEnabled: boolean;
  stateLevelHolidaysNotWorking: boolean;
  taxonomies: ITaxonomy[];
  integration_data: any;
  id: string;
  group: string;
  backofficeType: string;
  widget_configuration: IWidgetConfiguration;
  taxonomiesComplex: [ {
    name: string;
    taxonomies:[string];
  } ];
}
