/**
 * interface for booking slot mechanics (used in AppointmentService)
 */
import { ICrunchDay } from 'src/interfaces';

export interface IBusySlots {
  days: ICrunchDay[];
}
