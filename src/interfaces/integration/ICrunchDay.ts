import { ICrunchSlotsContainer } from 'src/interfaces/integration';

/**
 * ICrunchDay is a part of ICrunchResponse
 * @date Date in ISO
 * @start_time Date in ISO
 * @end_time Date in ISO
 */
export interface ICrunchDay {
  date: string;
  start_time: string;
  end_time: string;
  slots: ICrunchSlotsContainer;
}
