/**
 * description of responce for reserving appointment server call
 */

export interface IReserveSlotResponce {
  appointment: {
    id: string,
  };
  resource: {
    id: string,
  };
  slots: any[];
}
