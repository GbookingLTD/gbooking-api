/**
 * interface for exceptions field for IDiscount
 */
import moment from 'moment';
import { IBookingSlot } from 'src/interfaces';

export interface IExceptionDiscount {
  active: boolean;
  date: moment.Moment;
  slots: IBookingSlot[];
}
