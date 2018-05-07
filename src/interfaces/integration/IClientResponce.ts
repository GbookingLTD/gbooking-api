import { IPhoneData } from '../client';

/**
 * IClientResponce an interface
 * for describing of server responce on client.get_client
 */

export interface IClientResponce {
  business: {
    id: string;
  };
  client: IClient;
  documents: any[];
  profile: {
    id: string;
  };
  source: string;
}

export interface IClient {
  twoFAUserID: string;
  address: string;
  blackList: boolean;
  childrenClients: string[];
  clientCardNumber: string;
  clientContractNumber: string;
  created: string; // ISO Formatted date
  description: string;
  email: string[]; // array of chars
  extraFields: any[];
  favResources: any[];
  fax: string;
  fullAddress: string[];
  houseNumber: string;
  id: string;
  integrationData: {};
  israelCity: {};
  kupatHolim: {};
  lastCreatedAppointment: IClientAppointment;
  lastVisitedAppointment: IClientAppointment;
  loyaltyInfo: {
    bonusPoints: number;
    presents: any[];
    purchases: any[];
  };
  name: string;
  passportId: string;
  passportIssued: string;
  passportSeries: string;
  phone: IPhoneData[];
  receiveSmsAfterService: boolean;
  sex: string; // NOT_SPECIFIED | MALE | FEMALE (?)
  skipMarketingNotifications: boolean;
  skipNotifications: boolean;
  statistics: {
    appointmentsCount: number;
    businesses: {
      count: number;
      id: string;
      lastVisit: string; // ISO Formatted date
      _id: string;
    } [];
    lastAppointment: string; // ISO Formatted date
    lastBusinessId: string;
    lastWorkerId: string;
    services: {
      count: number;
      id: string;
      _id: string;
    };
    totalPrices: any[];
  };
  status: 'ACTIVE' | 'INACTIVE';
  surname: string;
  updated: string; // ISO Formatted date
  workPlace: string;
  childrenClient?: IChildrenClient[];
  isChild: boolean;
}

export interface IChildrenClient {
  extraID: string;
  clientID: string;
  name: string;
  surname: string;
  isChild: boolean;
}

export interface IClientAppointment {
  appointmentID: string;
  businessID: string;
  created: string; // ISO Formatted date
  lastUpdate: string; // ISO Formatted date
  resourceID: string;
  source: string;
  start: string; // ISO Formatted date
  taxonomies: {
    taxonomyID: string;
    _id: string;
  }[];
  _id: string;
}
