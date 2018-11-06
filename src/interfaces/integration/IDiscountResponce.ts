import { IDiscount } from 'src/interfaces';

/**
 * description of server responce on extra fields request; it is element from array in responce
 */

export interface IDiscountResponce {
  business: {
    id: string,
  };
  taxonomy: {
    id: string,
  };
  discount: IDiscount;
}
