/**
 * ICrunchSlot is a part of ICrunchSlotsContainer (ICrunchDay => ICrunchResponse)
 * @time DateTime in ISO
 * @partial_busy unused
 */
export interface ICrunchSlot {
  time: string;
  duration: number;
  space_left: number;
  partial_busy: any;
}
