import * as projectAuth from '../../../../../../utils/rbacProjectAuth';
import * as projectApi from '../../../../../../utils/rbacProjectApi';

/**
 * 得到轮播图列表
 * @param params
 * @returns {Object}
 */
export async function getCarouselList(params) {
  return projectAuth.doPost(projectApi.URL_CAROUSEL_GET_LIST, params);
}

/**
 * 得到分页列表
 * @param params
 * @returns {Object}
 */
export async function getPageList(params) {
  return projectAuth.doPost(projectApi.URL_CAROUSEL_ITEM_GET_PAGE_LIST, params);
}

/**
 * 得到列表
 * @param params
 * @returns {Object}
 */
export async function getList(params) {
  return projectAuth.doPost(projectApi.URL_CAROUSEL_ITEM_GET_LIST, params);
}

/**
 * 得到对象
 * @param params
 * @returns {Object}
 */
export async function getBean(params) {
  return projectAuth.doPost(projectApi.URL_CAROUSEL_ITEM_GET_BEAN, params);
}

/**
 * 新增
 * @param params
 * @returns {Object}
 */
export async function add(params) {
  return projectAuth.doPost(projectApi.URL_CAROUSEL_ITEM_ADD, params);
}

/**
 * 编辑
 * @param params
 * @returns {Object}
 */
export async function edit(params) {
  return projectAuth.doPost(projectApi.URL_CAROUSEL_ITEM_EDIT, params);
}

/**
 * 删除
 * @param params
 * @returns {Object}
 */
export async function remove(params) {
  return projectAuth.doPost(projectApi.URL_CAROUSEL_ITEM_DELETE, params);
}

/**
 * 批量删除
 * @param params
 * @returns {Object}
 */
export async function removeBatch(params) {
  return projectAuth.doPost(projectApi.URL_CAROUSEL_ITEM_DELETE_BATCH, params);
}

/**
 * 排序: up、down
 * @param params
 * @returns {Object}
 */
export async function changeOrderBy(params) {
  return projectAuth.doPost(projectApi.URL_CAROUSEL_ITEM_CHANGE_ORDER_BY, params);
}
