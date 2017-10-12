
/**
 * @providesModule GbookingApi
 */
import { 
  setSource,
  setApiEndpoint,
  setDataSendongEndpoint,
  setCrackEndpoint,
  setMobleStatus,
 } from 'src/common';
import * as services from 'src/services';

export default {
  settings: {
    setSource,
    setApiEndpoint,
    setDataSendongEndpoint,
    setCrackEndpoint,
    setMobleStatus,
  },
  ...services,
};
