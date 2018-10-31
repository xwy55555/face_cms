import * as projectAuth from '../utils/rbacProjectAuth';
import * as projectApi from '../utils/rbacProjectApi';

/**
 * 图形验证码鉴权通过后，得到短信验证码
 * @param params
 * @returns {Object}
 */
export async function getCodeWithImageAuth(params) {
  return projectAuth.doPost(projectApi.URL_SMS_AUTH_GET_WITH_IMAGE_AUTH, params);
}

/**
 * 鉴权短信验证码
 * @param params
 * @returns {Object}
 */
export async function authCode(params) {
  return projectAuth.doPost(projectApi.URL_SMS_AUTH_AUTH, params);
}
