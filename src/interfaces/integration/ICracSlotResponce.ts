import { ICracResourceResponce } from 'src/interfaces/integration';
/**
 * ICracSlotResponce is a part of ICracResponce for requested resources schedule
 */

export interface ICracSlotResponce {
  resources:ICracResourceResponce[];
  date: string;
  rooms:[];
}
