/**
 * Utils for phone number processing
 */
import { IMarkerProps, IPhoneData } from 'src/interfaces/client';
import WidgetUtils from 'widget-utils';

export const checkPhone = (phone: string, selectedClinic: IMarkerProps): boolean => {
  const countryData = WidgetUtils.phoneUtils.getPhoneData(selectedClinic.country);
  const phoneData = WidgetUtils.phoneUtils.getPhoneSettingsPhone(countryData, phone);

  return WidgetUtils.phoneUtils.isValidPhone(phoneData);
};

export const getPhone = (phoneString: string, selectedClinic: IMarkerProps): IPhoneData => {
  const phoneData = WidgetUtils.phoneUtils.getPhoneData(selectedClinic.country);
  const phone = phoneData.phoneExtractor(phoneString);
  let i = 0;

  if (!phone[0]) {
    ++i;
  }

  return {
    country_code: phoneData,
    area_code: phone[++i],
    number: phone[++i] + phone[++i],
  };
};
