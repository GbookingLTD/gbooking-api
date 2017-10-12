/**
 * IDate is an interface with grouped data for timeslot component
 */

import { ICrunchDay } from 'src/interfaces';
import { ISlot } from 'src/interfaces/client';

export interface IDate {
  resourceId: string;
  date: Date;
  data: ISlot[];
  originalSlot: ICrunchDay;
}
