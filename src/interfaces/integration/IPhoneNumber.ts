/**
 * IPhoneNumber is standart structure
 */

export interface IPhoneNumber {
  countryCode: string;
  areaCode: string;
  // tslint:disable no-reserved-keywords
  // ...because this is server-side schema
  number: string;
}
