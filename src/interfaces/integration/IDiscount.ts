import { IExceptionDiscount } from 'src/interfaces';

/**
 * IDiscount is a part of IProfileResponce that represents client's discounts
 */

interface ITimeframeSlot {
  start: number; // 1-1140
  end: number; // 1-1140
  resources: [string];
  roomID: string;
  capacity: number;
  minClients: number;
  extraId: string;
  startDate: Date;
  endDate: Date;
}

export interface IDiscount {
  active: boolean;
  start: Date;
  repeats: 'none' | 'daily' | 'weekly' ;
  weeklyRepeat: number; // only relevant when 'repeats' field equals 'weekly'
  unlimWeeklyRepeat: boolean;
  daysOfWeek: 'sun' | 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat';
  slots: [ { time: [ ITimeframeSlot ], amount: number } ];
  week: string[];
  regular: IDiscount[];
  exceptions?: [ IExceptionDiscount ];
  // note: at least one slot is required. by default, it should be a slot covering the whole day
}
