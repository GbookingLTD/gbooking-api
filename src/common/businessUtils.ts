import { constants } from "src/common";

/**
 * port of some nesessary utils from desktopWidget
 */

let cachedRefferer = '';

export const getSource = () => {
  return constants.IS_MOBILE ? constants.SOURCE :
  getQueryVariable('source') || constants.SOURCE;
}

export const getUTM = () => {
  if(!window || !window.location || constants.IS_MOBILE) {
    return '';
  }
  var query = window.location.search.substring(1);
  var vars = query.split('&');
  var utm = {};
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split('=');
    var key = decodeURIComponent(pair[0]);
    if (key.indexOf("utm_") !== -1) {
      utm[key] = decodeURIComponent(pair[1]).split('/').join('');
    }
  }
  return utm;
};

export const getRefererHost = () => {
  if(constants.IS_MOBILE) {
    return '';
  }
  var referer = getReferer();
  if(!referer) {
    return '';
  }
  var parser = document.createElement('a');
  parser.href = referer;
  return parser.hostname;
};

export const getReferer = () => {
  if(constants.IS_MOBILE) {
    return '';
  }
  if(cachedRefferer !== undefined) {
    return cachedRefferer;
  }
  cachedRefferer = readCookie('referer') || '';
  return cachedRefferer;
};

function readCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}

function getQueryVariable (variable) {
  var query = window.location.search.substring(1);
  var vars = query.split('&');
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split('=');
    if (decodeURIComponent(pair[0]) === variable) {
      return decodeURIComponent(pair[1]).split('/').join('');
    }
  }
  return undefined;
};