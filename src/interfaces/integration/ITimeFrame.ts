/**
 * ITimeFrame is time frame in IWeeklySchedule
 */

export interface ITimeFrame {
  id: string;
  start: number; // start minutes;
  end: number; // end minutes
}
