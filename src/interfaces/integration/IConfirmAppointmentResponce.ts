import { IPrice } from 'src/interfaces';

/**
 * description of responce for reserving appointment server call
 */

export interface IConfirmAppointmentResponce {
  multibooking: boolean;
  confirmData: {
    client_exists: boolean,
    appointment: {
      id: string,
      start: number, // timespamp
      price: IPrice,
      backofficeID: string,
      notes: string,
      clientComment: string,
      status: string,
      client: {
        id: string,
      },
    },

  };
}
