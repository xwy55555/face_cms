import * as projectAuth from '../../../../../utils/rbacProjectAuth';
import * as projectApi from '../../../../../utils/rbacProjectApi';

/**
 * 得到级别列表
 * @param params
 * @returns {Object}
 */
export async function getLevelList(params) {
  return projectAuth.doPost(projectApi.URL_LEVEL_GET_LIST, params);
}

/**
 * 得到列表
 * @param params
 * @returns {Object}
 */
export async function getList(params) {
  return projectAuth.doPost(projectApi.URL_MEMBER_GET_LIST, params);
}

/**
 * 得到分页列表
 * @param params
 * @returns {Object}
 */
export async function getPageList(params) {
  return projectAuth.doPost(projectApi.URL_MEMBER_GET_PAGE_LIST, params);
}

/**
 * 得到对象
 * @param params
 * @returns {Object}
 */
export async function getBean(params) {
  return projectAuth.doPost(projectApi.URL_MEMBER_GET_BEAN, params);
}

/**
 * 新增
 * @param params
 * @returns {Object}
 */
export async function add(params) {
  return projectAuth.doPost(projectApi.URL_MEMBER_ADD, params);
}

/**
 * 编辑
 * @param params
 * @returns {Object}
 */
export async function edit(params) {
  return projectAuth.doPost(projectApi.URL_MEMBER_EDIT, params);
}

/**
 * 删除
 * @param params
 * @returns {Object}
 */
export async function remove(params) {
  return projectAuth.doPost(projectApi.URL_MEMBER_DELETE, params);
}

/**
 * 批量删除
 * @param params
 * @returns {Object}
 */
export async function removeBatch(params) {
  return projectAuth.doPost(projectApi.URL_MEMBER_DELETE_BATCH, params);
}

/**
 * 排序: up、down
 * @param params
 * @returns {Object}
 */
export async function changeOrderBy(params) {
  return projectAuth.doPost(projectApi.URL_MEMBER_CHANGE_ORDER_BY, params);
}
