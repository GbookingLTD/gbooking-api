import { ISlotResponce } from 'src/interfaces/integration';
/**
 * ICracResponce is a CRAC's responce for requested resources schedule
 *
 * @example
 * {
 *  "slots": [
 *     {
 *       "resources": [
 *         "587757d47e0ce8fc3c6ed4f0",
 *        "587757d47e0ce8fc3c6ed4f1"
 *      ],
 *       "date": "2017-05-23T00:00:00Z",
 *      "bitset": "0000000000000000000000000000000011111111111111111111111111111111.
 *                 1111111111111111111111111111000000000000000000000000000000000000.
 *                 0000000000000000000000000000000000000000000000000000000000000000.
 *                 0000000000000000000011111111111111111111111111111111111111111111.
 *                 1111111111111111111111111111111111111111111111111111111111111111."
 *     }
 *  ]
 * }
 *
 */

export interface ICracResponce {
  slots: ISlotResponce[];
}
