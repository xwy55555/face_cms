import * as projectAuth from '../utils/rbacProjectAuth';
import * as projectApi from '../utils/rbacProjectApi';

/**
 * 得到项目配置参数
 * @param params
 * @returns {Object}
 */
export async function getProjectInfo(params) {
  return projectAuth.doPost(projectApi.URL_PROJECT_GET_INFO, params);
}
