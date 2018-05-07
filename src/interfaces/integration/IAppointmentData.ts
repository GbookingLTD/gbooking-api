import { appointmenStatus, IPrice } from 'src/interfaces';
import { IPhoneData } from '../client';

/**
 * IAppointmentData an interface for appointment data for requests
 */

export interface IAppointmentData {
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
  notes: string;
  client: {
    id: string,
    phone: IPhoneData,
    name: string,
  };
}
