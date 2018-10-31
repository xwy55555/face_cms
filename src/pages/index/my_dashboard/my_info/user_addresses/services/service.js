import * as projectAuth from '../../../../../../utils/rbacProjectAuth';
import * as projectApi from '../../../../../../utils/rbacProjectApi';

/**
 * 得到以指定节点为根节点的树
 * @param params
 * @returns {Object}
 */
export async function getAreaNodeTree(params) {
  return projectAuth.doPost(projectApi.URL_AREA_GET_NODE_TREE, params);
}

/**
 * 得到列表
 * @param params
 * @returns {Object}
 */
export async function getList(params) {
  return projectAuth.doPost(projectApi.URL_USER_ADDRESS_GET_LIST, params);
}

/**
 * 得到分页列表
 * @param params
 * @returns {Object}
 */
export async function getPageList(params) {
  return projectAuth.doPost(projectApi.URL_USER_ADDRESS_GET_PAGE_LIST, params);
}

/**
 * 得到对象
 * @param params
 * @returns {Object}
 */
export async function getBean(params) {
  return projectAuth.doPost(projectApi.URL_USER_ADDRESS_GET_BEAN, params);
}

/**
 * 新增
 * @param params
 * @returns {Object}
 */
export async function add(params) {
  return projectAuth.doPost(projectApi.URL_USER_ADDRESS_ADD, params);
}

/**
 * 编辑
 * @param params
 * @returns {Object}
 */
export async function edit(params) {
  return projectAuth.doPost(projectApi.URL_USER_ADDRESS_EDIT, params);
}

/**
 * 删除
 * @param params
 * @returns {Object}
 */
export async function remove(params) {
  return projectAuth.doPost(projectApi.URL_USER_ADDRESS_DELETE, params);
}

/**
 * 批量删除
 * @param params
 * @returns {Object}
 */
export async function removeBatch(params) {
  return projectAuth.doPost(projectApi.URL_USER_ADDRESS_DELETE_BATCH, params);
}
