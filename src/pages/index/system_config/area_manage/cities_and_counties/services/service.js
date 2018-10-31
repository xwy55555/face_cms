import * as projectAuth from '../../../../../../utils/rbacProjectAuth';
import * as projectApi from '../../../../../../utils/rbacProjectApi';

/**
 * 得到省份树
 * @param params
 * @returns {Object}
 */
export async function getProvinceTree(params) {
  return projectAuth.doPost(projectApi.URL_AREA_GET_PROVINCE_TREE, params);
}

/**
 * 得到树
 * @param params
 * @returns {Object}
 */
export async function getTree(params) {
  return projectAuth.doPost(projectApi.URL_AREA_GET_TREE, params);
}


/**
 * 得到以指定节点为根节点的树
 * @param params
 * @returns {Object}
 */
export async function getNodeTree(params) {
  return projectAuth.doPost(projectApi.URL_AREA_GET_NODE_TREE, params);
}

/**
 * 得到对象
 * @param params
 * @returns {Object}
 */
export async function getBean(params) {
  return projectAuth.doPost(projectApi.URL_AREA_GET_BEAN, params);
}

/**
 * 新增
 * @param params
 * @returns {Object}
 */
export async function add(params) {
  return projectAuth.doPost(projectApi.URL_AREA_ADD, params);
}

/**
 * 编辑
 * @param params
 * @returns {Object}
 */
export async function edit(params) {
  return projectAuth.doPost(projectApi.URL_AREA_EDIT, params);
}

/**
 * 删除
 * @param params
 * @returns {Object}
 */
export async function remove(params) {
  return projectAuth.doPost(projectApi.URL_AREA_DELETE, params);
}

/**
 * 批量删除
 * @param params
 * @returns {Object}
 */
export async function removeBatch(params) {
  return projectAuth.doPost(projectApi.URL_AREA_DELETE_BATCH, params);
}

/**
 * 排序: up、down
 * @param params
 * @returns {Object}
 */
export async function changeOrderBy(params) {
  return projectAuth.doPost(projectApi.URL_AREA_CHANGE_ORDER_BY, params);
}
