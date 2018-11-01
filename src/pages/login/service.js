import * as projectAuth from '../../utils/rbacProjectAuth';
import * as projectApi from '../../utils/rbacProjectApi';
import * as projectUtil from '../../utils/rbacProjectUtil';

/**
 * 用户登录
 * @param params
 * @returns {Object}
 */
export async function loginByAccount(params) {
  let passwordString = params.password;
  console.log('password:', passwordString);
  passwordString = projectUtil.passwordEncrypt(passwordString);
  params.password = passwordString;
  console.log('passwordEncrypt(password):', params.password);
  return projectAuth.doPost(projectApi.URL_LOGIN_BY_ACCOUNT, params);
}
