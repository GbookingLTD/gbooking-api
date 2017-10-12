/**
 * IAdditionalPrice is a part of IProfileResponce for describing client prices
 */
import { IPrice } from 'src/interfaces/integration';

export interface IAdditionalPrice extends IPrice {
  resourceLevel: number;
}
