/**
 * IPrice is standart price structure
 */

export interface IPrice {
  servicePrice?: IPrice;
  currency?: string; // 'RUB'
  amount: string | number;
  stockAmount: string;
  originalAmount?: number;
  discountAmount?: number;
  discountType?: string;
  // tslint:disable no-reserved-keywords
  type: string; // 'equal'
}
