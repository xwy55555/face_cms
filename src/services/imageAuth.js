import * as projectAuth from '../utils/rbacProjectAuth';
import * as projectApi from '../utils/rbacProjectApi';

/**
 * 得到图形验证码
 * @param params
 * @returns {Object}
 */
export async function getAuthImage(params) {
  return projectAuth.doPost(projectApi.URL_IMAGE_AUTH_GET, params);
}
