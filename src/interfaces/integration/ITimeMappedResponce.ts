import { IDate } from 'src/interfaces/client';

/**
 * It is an interface for mapped to client time service's responce
 */
export interface ITimeMappedResponce {
  data: IDate[];
  isEraisedSelectedResource: boolean;
  slotSize: number;
}
