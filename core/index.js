const config = require('./config'),
  { getCookie, delCookie, setCookie } = require('./cookie'),
  utils = Object.assign({}, require('./utils'), {
    setCookie,
    getCookie, 
    delCookie
  }),
  App=require('./app');

$.extend(window, { App });
$.extend($,{ utils });