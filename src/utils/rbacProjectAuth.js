import request from './request';
import * as rbacProjectUtil from './rbacProjectUtil';
import * as projectConfig from './projectConfig';
import qs from 'qs';

let cryptoJS = require('crypto-js');

/** 得到Client对象 */
function getClient(){
  let resultValue = {
    type:'web',
    web:{
      version : projectConfig.API_VERSION,
      language : 'zh-CN',
      ua : ''
    }
  };
  return rbacProjectUtil.hexEncode(JSON.stringify(resultValue));
}

/**
 * 得到Auth对象
 * @param apiKey
 * @param secretKey
 * @param signatureParams
 * @returns {{token: *, apiKey, timestamp: number, signature}}
 */
function getAuth(apiKey, secretKey, signatureParams){
  let timestamp = new Date().getTime();
  let resultValue = {
    apiKey : apiKey,
    timestamp : timestamp,
    signature : cryptoJS.HmacSHA1(apiKey + timestamp + signatureParams, secretKey).toString(cryptoJS.enc.Hex)
  };
  return rbacProjectUtil.hexEncode(JSON.stringify(resultValue));
}

/**
 * 发起Get请求
 * @param url
 * @param params
 * @returns {Object}
 */
export function doGet(url, params) {
  let paramsString = qs.stringify(params);
  console.log('params:', paramsString);
  let client = getClient();
  //console.log('client:', client);
  let auth = getAuth(projectConfig.API_KEY, projectConfig.API_SECRET_KEY, '');
  //console.log('auth:', auth);
  let token = sessionStorage.token === undefined ? '' : sessionStorage.token;
  //console.log('token:', token);
  let urlString = projectConfig.API_ROOT_URL + url + '?' + paramsString + '&client=' + client + '&auth=' + auth + '&token=' + token;
  console.log('url:', urlString);
  return request(urlString);
}

/**
 * 发起Get请求
 * @param url
 * @param params
 * @returns {Object}
 */
export function doGetByFullUrl(url, params) {
  let paramsString = qs.stringify(params);
  console.log('params:', paramsString);
  let client = getClient();
  //console.log('client:', client);
  let auth = getAuth(projectConfig.API_KEY, projectConfig.API_SECRET_KEY, '');
  //console.log('auth:', auth);
  let token = sessionStorage.token === undefined ? '' : sessionStorage.token;
  //console.log('token:', token);
  let urlString = url + '?' + paramsString + '&client=' + client + '&auth=' + auth + '&token=' + token;
  console.log('url:', urlString);
  return request(urlString);
}

/**
 * 发起Post请求
 * @param url
 * @param params
 * @returns {Object}
 */
export function doPost(url, params) {
  let urlString = projectConfig.API_ROOT_URL + url;
  console.log('url:', urlString);
  let options = {
    method: 'post',
    body: toFormData(params),
  };
  return request(urlString, options);
}

/**
 * 生成表单数据
 * @param params
 * @returns {*}
 */
function toFormData(params) {
  let resultValue = new FormData();
  let client = getClient();
  //console.log('client:', client);
  let auth = getAuth(projectConfig.API_KEY, projectConfig.API_SECRET_KEY, '');
  //console.log('auth:', auth);
  let token = sessionStorage.token === undefined ? '' : sessionStorage.token;
  //console.log('token:', token);
  resultValue.append('client', client);
  resultValue.append('auth', auth);
  resultValue.append('token', token);
  for(let key in params) {
    resultValue.append(key, params[key]);
  }
  return resultValue
}

/** 得到资源链接：二进制上传 */
export function getResourceUrl_uploadByByte() {
  let client = getClient();
  //console.log('client:', client);
  let auth = getAuth(projectConfig.API_KEY, projectConfig.API_SECRET_KEY, '');
  //console.log('auth:', auth);
  return projectConfig.RESOURCE_API_URL_ROOT + projectConfig.RESOURCE_API_URL_UPLOAD_BY_BYTE + '?client=' + client + '&auth=' + auth + '&token=' + sessionStorage.token;
}

