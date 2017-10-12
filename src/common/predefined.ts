/**
 * file with constants for all project
 */

export const constants = {
  SOURCE: '',
  API_URL: 'https://apiv2.gbooking.ru/rpc',
  DATA_SEND_URL: 'http//il.gbooking.ru',
  CRAC_URL: 'https://crac.dev.gbooking.ru/rpc',
  IS_MOBILE: false,
};

export const setSource = (source: string): void => {
  constants.SOURCE = source;
}

export const setApiEndpoint = (apiEndpoint: string): void => {
  constants.API_URL = apiEndpoint;
}

export const setDataSendongEndpoint = (dataSendongEndpoint: string): void => {
  constants.DATA_SEND_URL = dataSendongEndpoint;
}

export const setCrackEndpoint = (crackEndpoint: string): void => {
  constants.CRAC_URL = crackEndpoint;
}

export const setMobleStatus = (status: boolean): void => {
  constants.IS_MOBILE = status; 
}