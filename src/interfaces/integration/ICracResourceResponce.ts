/**
 * ICracResourceResponce is a part of ICracResponce for requested resources schedule
 * @field bitset|taxonomyBitSet
 * value expample:
 * "0000000000000000000000000000000011111111111111111111111111111111.1111111111111111111111111111
 * 000000000000000000000000000000000000.000000000000000000000000000000000000000000000000000000000
 * 0000000.0000000000000000000011111111111111111111111111111111111111111111.111111111111111111111
 * 1111111111111111111111111111111111111111111."
 * One bit here is 5 minutes.
 * 0 is for busy time
 * 1 for available time
 * Started from business start of work day.
 */

export interface ICracResourceResponce {
  resourceId: string;
  durations: string[];
  bitset: string;
  taxonomyBitSet: string;
}
