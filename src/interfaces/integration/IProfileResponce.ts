/**
 * IProfileResponce is an interface
 * for describing of server responce on business.get_profile_by_id withot networks method
 */
import {
    IBusinessProfile,
} from 'src/interfaces/integration';

export interface IProfileResponce {
  business: IBusinessProfile;
  top_services: {
    status: boolean;
    services: string[];
  };
  active: boolean;
  freeSms: number;
  monthlyFreeSms: number;
}
