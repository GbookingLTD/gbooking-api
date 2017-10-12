/**
 * Utils for phone number processing
 */
import { IMarkerProps, IPhoneData } from 'src/interfaces/client';
import WidgetUtils from 'widget-utils';

export const getPhone = (phoneString: string, selectedClinic: IMarkerProps): IPhoneData => {
  const phone = WidgetUtils.phoneUtils.getPhoneData(selectedClinic.country).phoneExtractorWidget(phoneString);

  return {
    country_code: WidgetUtils.phoneUtils.getPhoneData(selectedClinic.country),
    area_code: phone[0],
    number: phone[1],
  };
};
