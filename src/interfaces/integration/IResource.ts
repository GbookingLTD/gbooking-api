/**
 * IResource interface presence business workers
 */
import {
  IException,
  IGeneralLocation,
  IPhoneNumber,
  ITaxonomyChildren,
  ITaxonomyLevels,
  ITimeTable,
  IUserData,
} from 'src/interfaces/integration';

export interface IResource {
  email: string;
  capacity: number;
  icon_url: string;
  id: string;
  name: string;
  surname: string;
  nickname: string;
  loaned: boolean;
  description: string;
  extraId: string;
  order: number;
  taxonomies: string[];
  taxonomyLevels: ITaxonomyLevels[];
  taxonomyChildren: ITaxonomyChildren[];
  level: number; // for now 0: master 1: top master
  displayInWidget: boolean;
  manualChanges: boolean;
  phone: IPhoneNumber[];
  status: string;
  userData: IUserData;
  location: IGeneralLocation;
  timetable: ITimeTable;
  smsEnabled?: boolean;
  rating?: number;
  iconURL?: string;
  internalID?: string;
  loan?: {
    active: boolean,
    loanedTo: string,
    returnTo: string,
    returnWhen: Date,
  };
  profession?: string;
  extraLink?: string;
  extraDescription?: string;
  extraMediaId?: string;
  departmentId?: string;
  workPlace?: string;
  profileData?:{
    email: string,
    profileID: string,
    userID: string,
    accessType: string,
  };
  perk?: string; // value for resource perk
  exceptions?: [ IException ];
  history?: [
    {
      status: string,
      updated: Date,
    }
  ];
  image?: string;
}
