/**
 * is an interface for booking slot method (adapted from desctopWidget)
 */
import moment from 'moment';
import { IPrice } from 'src/interfaces';

export interface IBookingSlot {
  servicePrice?: IPrice;
  start?: number;
  end?: number;
  discount?: number;
  provider?: string;
  slotSize?: number;
  actualSlot?: moment.Moment;
  slotItems?: IBookingSlot[];
  price?: IPrice;
  isException: boolean;
}
