import { ITaxonomyChildren } from 'src/interfaces';
import { IBusinessGeneralInfo, ITaxonomyLevels } from 'src/interfaces/integration';

/**
 * IResourceProps is an interface for props of resource component in appointment wizard
 */

export interface IResourceProps {
  active: boolean;
  id: any;
  key: any;
  value: string;
  secondName: string;
  image: string;
  description: string;
  profession:string;
  taxonomyLevels: ITaxonomyLevels[];
  level: number;
  weight: number;
  taxonomies: string[];
  taxonomyChildren: ITaxonomyChildren[];
  businessId: string;
  origin_general_info?: IBusinessGeneralInfo;
}
