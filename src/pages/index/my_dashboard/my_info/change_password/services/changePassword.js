import * as projectAuth from '../../../../../../utils/rbacProjectAuth';
import * as projectApi from '../../../../../../utils/rbacProjectApi';

/**
 * 修改密码
 * @param params
 * @returns {Object}
 */
export async function changePassword(params) {
  return projectAuth.doPost(projectApi.URL_USER_CHANGE_PASSWORD, params);
}
