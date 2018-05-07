/**
 * port of some nesessary utils from desktopWidget
 */
import * as _ from 'lodash';
import moment from 'moment';
// tslint:disable-next-line:no-import-side-effect
import 'moment/locale/ru';
import { IBookingSlot, IPrice, IProfileResponce, ISocialSharingConfig, ITaxonomy } from 'src/interfaces';
import { IResourceProps } from 'src/interfaces/client';
import WidgetUtils from 'widget-utils';

const weekDaysMap = {
  sun: 0,
  mon: 1,
  tue: 2,
  wed: 3,
  thu: 4,
  fri: 5,
  sat: 6,
};

// recursively checks for parent's (ancestor's) discounts
export const checkForParentDiscounts = (
  businessData: IProfileResponce,
  taxonomyParentID: string,
  time: moment.Moment,
) => {
  let parentDiscount: IBookingSlot = {
      // discount: 0,
      // provider: 'LOCAL'
    isException: false,
  };
  const timeInMinutes = time.hour() * 60 + time.minute();

  const t = businessData.business.taxonomies.filter((el) => {
    return el.id === taxonomyParentID;
  });
  if (t && t[0]) {
    if (!parentDiscount.discount && t[0].discounts.regular) {
      t[0].discounts.regular.forEach((discount) => {
        const end = moment(discount.start).add(discount.weeklyRepeat, 'weeks');
        if (discount.active && (discount.unlimWeeklyRepeat || (time.isAfter(discount.start) && time.isBefore(end)))) {
          discount.week.forEach((day) => {
            discount.week[day].forEach((slot) => {
              if (time.day() === weekDaysMap[day]
                && timeInMinutes >= slot.start && timeInMinutes <= slot.end) {
                parentDiscount = slot;
              }
            });
          });
        }
      });
    } else {
      if (!parentDiscount.discount && t[0].taxonomyParentID) {
        parentDiscount = checkForParentDiscounts(businessData, t[0].taxonomyParentID, time);
      }
    }
  }

  return parentDiscount;
};

    // recursively checks for parent's (ancestor's) discount exceptions
export const checkForParentDiscountExceptions = (
  businessData: IProfileResponce,
  taxonomyParentID: string,
  time: moment.Moment,
  service: ITaxonomy,
) => {
  let parentDiscount: IBookingSlot = {
          // discount: 0,
    provider: 'LOCAL',
    isException: false,
  };
  const timeInMinutes = time.hour() * 60 + time.minute();

  businessData.business.taxonomies.forEach((t) => {
    if (t.id === taxonomyParentID  && t.discounts.exceptions) {
      t.discounts.exceptions.forEach((exception) => {
        const date = moment(exception.date);
        if (exception.active && time.format('YYYY-MM-DD') === date.format('YYYY-MM-DD')) {
          exception.slots.forEach((slot) => {
            if (slot.start && timeInMinutes >= slot.start && slot.end && timeInMinutes <= slot.end) {
              parentDiscount = slot;
            }
          });
        }
      });

            // if no discount exception found, check for parent's discount exceptions recursively
      if ((parentDiscount.discount === undefined || parentDiscount.discount == null)
        && service.taxonomyParentID) {
        parentDiscount = checkForParentDiscountExceptions(businessData, taxonomyParentID, time, service);
      }

      return;
    }
  });

  return parentDiscount;
};

export const getServiceDiscountsAndExceptions = (
    businessData: IProfileResponce,
    service: ITaxonomy,
    time: moment.Moment,
    campaignProvider?: string,
) => {
  if (!service || !service.discounts) {
    return null;
  }

  let slot: IBookingSlot = {
    isException: false,
  };

  const timeInMinutes = time.hour() * 60 + time.minute();

    // Checking for Exception Discounts, it has higher priority than Regular Discounts
  if (service.discounts.exceptions) {
    service.discounts.exceptions.forEach((exception) => {
      const date = moment(exception.date);
      if (exception.active && time.format('YYYY-MM-DD') === date.format('YYYY-MM-DD')) {
        exception.slots.forEach((s) => {
          if (s.start && timeInMinutes >= s.start && s.end && timeInMinutes <= s.end) {
            slot = s;
            slot.isException = true;
          }
        });
      }
    });
  }

    // Checking for Campaign & Regular Discounts, Regular Discounts has lower priority than Campaign Discounts
  if (!slot.discount && service.discounts.regular) {
    service.discounts.regular.forEach((discount) => {
      const end = moment(discount.start).add(discount.weeklyRepeat,'weeks');
      if (discount.active && ((time.isAfter(discount.start) && time.isBefore(end)) || discount.unlimWeeklyRepeat)) {
        discount.week.forEach((day) => {
          discount.week[day].forEach((s) => {
            if (time.day() === weekDaysMap[day] && timeInMinutes >= s.start && timeInMinutes <= s.end) {
                // If Discount from Campagin is found, then overwrite even d. exceptions are set
              if (campaignProvider && s.provider === campaignProvider.toUpperCase()) {
                slot = s;

                return;
              } else if (!slot.discount) {
                // set regular Discount, if Discount Exception is not found
                slot = s;
              }
            }
          });
        });
      }
    });
  }

    // If no Discount Exception found, check for Parent's (Ancestor's) Discount Exceptions recursively
  if ((slot.discount === undefined || slot.discount == null) && service.taxonomyParentID) {
    slot = checkForParentDiscountExceptions(businessData, service.taxonomyParentID, time, service);
    slot.isException = true;
  }

    // If no Regular Discount found, check for Parent's (Ancestor's) Regular Discounts recursively
  if ((slot.discount === undefined || slot.discount == null) && service.taxonomyParentID) {
    slot = checkForParentDiscounts(businessData, service.taxonomyParentID, time);
  }

  return slot;
};

export const calculateBookingPrice = (
  slot: IBookingSlot,
  resource: IResourceProps,
  service: ITaxonomy,
  socialSharing: ISocialSharingConfig,
  businessData: IProfileResponce,
):IPrice => {
  if (slot.slotItems) {
    return _.reduce(slot.slotItems, (ret, item) => {
      const itemPrice = item.price = calculateBookingPrice(item, resource, service, socialSharing, businessData);
      if (itemPrice.servicePrice) {
        ret.servicePrice.amount = (ret.servicePrice.amount as number) + (itemPrice.servicePrice.amount as number);
        ret.servicePrice.currency = itemPrice.servicePrice.currency as string;
      }
      if (itemPrice.originalAmount) {
        ret.originalAmount += itemPrice.originalAmount;
      }
      ret.discountType = itemPrice.discountType as any;
      if (itemPrice.discountAmount) {
        ret.discountAmount += itemPrice.discountAmount;
      }

      return ret;
    },              {
      // tslint:disable-next-line:no-object-literal-type-assertion
      servicePrice: <IPrice>{
        amount: 0,
        stockAmount: '',
        type: '',
      },
      discountType: '',
      amount: 0,
      originalAmount: 0,
      discountAmount: 0,
      stockAmount: '',
      type: '',
    });
  }

  let discountType = 'PERCENT';
  const servicePrice = _.clone(service.price);
  let originalAmount;

  if (resource
    && !_.isUndefined(resource.level)
    && !_.isUndefined(service.additionalPrices)
    && !_.isUndefined(service.additionalPrices[resource.level])) {
    const price = service.additionalPrices[resource.level];
    servicePrice.amount = + price.amount;
    servicePrice.currency = price.currency;
  }
  originalAmount = servicePrice.amount;

  if (businessData
    && businessData.business
    && businessData.business.socialTokenEnabled
    && socialSharing
    && socialSharing.discountEnabled) {
    discountType = socialSharing.discountType;
    slot.discount = socialSharing.discountAmount;
    let discountedPrice;
    if (socialSharing.discountType === 'PERCENT') {
      discountedPrice = (servicePrice.amount as number) * (1 - (socialSharing.discountAmount / 100));
      discountedPrice = WidgetUtils.roundNumberUsingRule(discountedPrice, businessData);
      servicePrice.amount = discountedPrice;
    } else {
      discountedPrice = (servicePrice.amount as number) - socialSharing.discountAmount;
      discountedPrice = WidgetUtils.roundNumberUsingRule(discountedPrice, businessData);
      servicePrice.amount = discountedPrice;
    }
  } else if (slot.discount) {
    servicePrice.amount = (servicePrice.amount as number) * (1 - slot.discount / 100);
    servicePrice.amount = WidgetUtils.roundNumberUsingRule(servicePrice.amount, businessData);
  }

  return {
    servicePrice,
    originalAmount,
    discountType,
    discountAmount: slot.discount || 0,
    amount: 0,
    type: '',
    stockAmount: '',
  };
};

/*
 * todo
 */
export const getUTM = () => {
  return {};
};

export const getRefererHost = (required: boolean = false) => {
  if (required) {
    return '';
  }

  return '';
};

export const getReferer = (required: boolean = false) => {
  if (required) {
    // tslint:disable-next-line:no-http-string
    return '';
  }

  return '';
};