import { ISocialSharingConfig } from 'src/interfaces';

/**
 * IWidgetConfiguration is a part of IProfileResponce that represents widget configuration (ignored now)
 * ! need to correct with server version before using
 */

export interface IWidgetConfiguration {
  showMap: boolean;
  showDrinkQuestion: boolean;
  showTalkQuestion: boolean;
  skipMobileMap: boolean;
  crunchv2: boolean;
  useCRAC: boolean;
  useSortByName: boolean;
  useMiddleName: boolean;
  showSurnameFirst: boolean;
  hidePrices: boolean;
  theme: string;
  calendarMode: boolean;
  useCoupon: boolean;
  dontRequireEmail: boolean;
  emailIsMandatory: boolean;
  skipAuthentication: boolean;
  skipServiceSelection: boolean;
  showClientComment: boolean;
  socialSharing: ISocialSharingConfig;
  bookableDateRanges: {
    enabled: boolean;
    start: null;
    end: null;
  };
  discountedPriceRounding: {
    rule: string;
    value: number;
  };
  noDefaultImages: boolean;
  withoutWorkers: boolean;
  bookableMonthsCount: number;
  hideAnyWorkerBooking: boolean;
  disableMobileWidget: boolean;
  hideEmptyDays: boolean;
  hideGraySlots: boolean;
  extraVisitors: boolean;
  hideNewAppointmentButton: boolean;
  hideSocialNetworksAuthentication: boolean;
  skipServiceDurationAlignment: boolean;
  hideGBookingLogo: boolean;
  hideCallButton: boolean;
  enableOverrideFooter: boolean;
  overrideFooter: string;
  payment: string;
  paymentProvider: string;
  alignmentTaxonomySlots: boolean;
  multiServiceBooking: boolean;
  maxServiceBooking: number;
  multiTimeslotBooking: boolean;
  maxTimeslotBooking: number;
  requireEmailOnBooking: boolean;
  multiTimeslotBookingAllDays: boolean;
  showAllWorkers: boolean;
  skipTimeSelection: boolean;
  skipTimeSelectionServiceIDs: string[];
  requireAgreement: boolean;
  requireAgreementLink: string;
  warningContactDataText: string;
  enableWarningContactData: boolean;
  splitName: boolean;
  useDefaultWorkerImg: boolean;
  campaign: {
    provider: string,
  };
}
