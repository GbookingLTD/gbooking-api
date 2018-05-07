import { IPrice } from 'src/interfaces';
import { IPhoneData } from '../client';

/**
 * IUserHistoryResponce an interface
 * for describing of server responce on appointment.get_appointments_by_client_v2
 */

export interface IUserHistoryResponce {
  additionalClientAppears: string[];
  additionalClientPayments: string[];
  additionalClientSources: {
    clientID: string;
    source: string;
    _id: string;
  };
  additionalClientStatuses: {
    clientID: string;
    history: {
      status: appointmenStatus;
      updated: string; // ISO Formatted date
      _id: string;
    } [];
    status: appointmenStatus;
    _id: string;
  };
  additionalClientUtms: {
    clientID: string;
    _id: string;
  } [];
  additionalClients: any[];
  additionalFields: any[];
  additionalTaxonomies: any[];
  appointment: {
    backofficeID: string;
    blockSMS: boolean;
    created: string; // ISO Formatted date
    drinkAnswer: string; // NOT_IMPORTANT | ?
    duration: number;
    hideAppointmentTime: boolean;
    id: string;
    integration_data: {
      extraId: string;
    };
    price: IPrice;
    start: string; // ISO Formatted date
    status: appointmenStatus;
    talkAnswer: string; // NOT_IMPORTANT | ?
    updated: string; // ISO Formatted date
  };
  business: {
    id: string;
  };
  cabinet: {};
  changeReason: string;
  client: {
    email: string[];
    extraVisitors: number;
    id: string;
    incomingPhone?: string;
    isVIP: boolean;
    israelCity: {};
    kupatHolim: {};
    language: string;
    name: string;
    phone: IPhoneData[];
    surname: string;
  };
  clientComment: string;
  client_appear: string; // NONE | ?
  client_payment: string; // NONE | ?
  extraFields: any[];
  feedback: {};
  moveCounter: number;
  movedByRobot: boolean;
  networkID: string;
  notes: string;
  order: {
    id: string;
  };
  referrer: string;
  reminder: {
    status: string; // NOT_SET | ?
    time_reminder: number;
  };
  removedClientsData: any[];
  resource: {
    extraID: string;
    id: string;
    name: string;
    surname: string;
  };
  review: {
    business: {};
    taxonomy: {};
    worker: {};
  };
  source: string;
  taxonomy: {
    alias: string;
    id: string;
  };
}

export enum appointmenStatus {
 CONFIRMED_BY_BUSINESS,
 CONFIRMED_BY_CLIENT,
 CANCELLED_BY_BUSINESS,
 CANCELLED_BY_CLIENT,
}
