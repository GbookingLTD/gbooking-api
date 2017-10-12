import { ICrunchSlot } from 'src/interfaces/integration';

/**
 * ICrunchSlotsContainer is a part of ICrunchDay (ICrunchResponse)
 */
export interface ICrunchSlotsContainer {
  available: boolean;
  busy: ICrunchSlot[];
}
