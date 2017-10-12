import { ISlotSplittedResourceResponce } from 'src/interfaces/integration';

/**
 * ISlotSplittedResponce is a part of ICrackSplittedResponce for requested resources schedule
 * @field intersection
 * value expample:
 * "0000000000000000000000000000000011111111111111111111111111111111.1111111111111111111111111111
 * 000000000000000000000000000000000000.000000000000000000000000000000000000000000000000000000000
 * 0000000.0000000000000000000011111111111111111111111111111111111111111111.111111111111111111111
 * 1111111111111111111111111111111111111111111."
 * One bit here is 5 minutes.
 * 0 is for busy time
 * 1 for available time
 * Started from business start of work day.
 *
 * Applyed to all resources.
 */

export interface ISlotSplittedResponce {
  resources: ISlotSplittedResourceResponce[];
  date: string;
  intersection: string;
}
