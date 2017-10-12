/**
 * IException is a part of IProfileResponce that represents occured exceptions
 */

interface IExceptionEntry {
  // tslint:disable-next-line:no-reserved-keywords
  from: number; // 1-1440
  to: number; // 1-1440
  reason: 'EDUCATION' | 'OFFICE' | 'SICK' | 'NOT_SPECIFIED';
  resources: [ string ];
  roomID: string;
  capacity: number;
  extraId: string;
}

export interface IException {
  exceptionID: string;
  date: Date;
  exceptionEntries: [ IExceptionEntry ];
  // tslint:disable-next-line:no-reserved-keywords
  type: string;
  isManual: boolean;
}
