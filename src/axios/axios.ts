/**
 * here we have an axios configs and entry point for mocked data via axios-mock-adapter:
 * import MockAdapter from 'axios-mock-adapter';
 * ...
 * var mock = new MockAdapter(instance);
 * mock.onAny().reply(500);
 *
 * also here can be added some info about device, for example:
 * import DeviceInfo from 'react-native-device-info';
 * ...
 * instance.defaults.headers.common['X-Device-Id'] = DeviceInfo.getUniqueID();
 */
import axios from 'axios';
import { constants } from 'src/common';

const instance = axios.create();
instance.defaults.baseURL = constants.API_URL;
instance.defaults.headers.common['Content-Type'] = 'application/json; charset=utf-8';
instance.defaults.headers.common.Accept = 'application/json, text/plain, */*';

instance.defaults.timeout = 20000;
// TOFO: start using axios-cache-plugin or https://github.com/mzabriskie/felix for caching requests data
// in this manner: https://www.snip2code.com/Snippet/1824023/Axios-interceptor-for-cache-with-js-cach

export { instance as default };
