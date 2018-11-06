/**
 * IResoureFreeAvailable is an interface for resource first available date
 */

export interface IResoureFreeAvailable {
  resource: string;
  date: Date;
  maxFreeMinutes: number;
}
