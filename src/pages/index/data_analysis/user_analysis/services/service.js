import * as projectAuth from '../../../../../utils/rbacProjectAuth';
import * as projectApi from '../../../../../utils/rbacProjectApi';

/**
 * 得到性别分布列表
 * @param params
 * @returns {Object}
 */
export async function getSexData(params) {
  return projectAuth.doPost(projectApi.URL_USER_ANALYSIS_SEX_DATA, params);
}

/**
 * 得到年龄分布列表
 * @param params
 * @returns {Object}
 */
export async function getAgeData(params) {
  return projectAuth.doPost(projectApi.URL_USER_ANALYSIS_AGE_DATA, params);
}
