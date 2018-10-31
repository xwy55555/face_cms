import * as projectAuth from '../../../../../../utils/rbacProjectAuth';
import * as projectApi from '../../../../../../utils/rbacProjectApi';

/**
 * 得到当前用户基础信息
 * @param params
 * @returns {Object}
 */
export async function getCurUser(params) {
  return projectAuth.doPost(projectApi.URL_USER_GET_CUR_USER, params);
}

/**
 * 编辑当前用户基础信息
 * @param params
 * @returns {Object}
 */
export async function editCurUser(params) {
  return projectAuth.doPost(projectApi.URL_USER_EDIT_CUR_USER, params);
}
