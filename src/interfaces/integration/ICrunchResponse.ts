import { ICrunchDay, ICrunchDayOff } from 'src/interfaces/integration';

/**
 * ICrunchResponse is an interface for responces from API for CRUNCH timeschedule
 * @excludedResources array of workers ids
 */
export interface ICrunchResponse {
  taxonomyId: string;
  slot_size: number;
  maxSlotCapacity: number;
  days: ICrunchDay[];
  excludedResources: string[];
  daysOff: ICrunchDayOff[];
}
