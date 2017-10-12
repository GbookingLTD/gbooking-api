/**
 * IWeeklySchedule presense universal weekly schedule structure
 */

import { ITimeFrame } from 'src/interfaces/integration';

export interface IWeeklySchedule {
  sun: ITimeFrame; // Sunday
  mon: ITimeFrame; // Monday
  tue: ITimeFrame; // Tuesday
  wed: ITimeFrame; // Wednesday
  thu: ITimeFrame; // Thursday
  fri: ITimeFrame; // Friday
  sat: ITimeFrame; // Saturday
}
