/**
 * IAdditionalPrice is a part of IProfileResponce for describing client prices
 */
import { IAddressInfo, IPhoneNumber, ITimeTable } from 'src/interfaces/integration';

export interface IBusinessGeneralInfo {
  name: string;
  address: IAddressInfo[];
  additionalFields?: never[];
  email: string;
  phone: IPhoneNumber[];
  description?: string;
  contactName?: string;
  website?: string;
  logo_url?: string;
  timezone?: string;
  timetable?: ITimeTable;
  social_network?: never[];
  accepted_currency?: string[];
  additional_info?: string;
  phone_mask?: null;
  min_booking_time?: null;
  language?: string;
  networkID?: number;
  images?: never[];
  autoAcceptAppointment?: boolean;
  showAppointmentTooltip?: boolean;
  pricingType?: string;
  schedulerTick?: number;
  showResourceWorkStatistics?: boolean;
  showWorkerProfession?: boolean;
  verticalTranslation?: string;
  isShowcase: boolean;
}
