/**
 * ITimeTable sturcture implementation
 */

import { IWeeklySchedule } from 'src/interfaces/integration';

export interface ITimeTable {
  active: boolean;
  week: IWeeklySchedule;
}
