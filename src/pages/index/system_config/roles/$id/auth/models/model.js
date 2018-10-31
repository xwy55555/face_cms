import { parse } from 'qs';
import { routerRedux } from 'dva/router';
import pathToRegexp from 'path-to-regexp';
import { message } from 'antd';
import * as projectUtil from '../../../../../../../utils/rbacProjectUtil';
import * as projectConstant from '../../../../../../../utils/rbacProjectConstant';
import { getMenuTree, edit } from '../../../services/service';

export default {
  namespace: 'roleAuth',

  state: {
    /* 当前记录项 */
    curRecord: {},
    /* 菜单树：数据源 */
    menuTreeDataSource:[],
    /* 菜单授权时，选中的菜单Ids */
    selectedMenuIds: [],
    /* 菜单授权时，展开的菜单Ids */
    expandedMenuIds: ['0'],
    /* 菜单授权时，是否自动展开父节点 */
    autoExpandParent: true,
    /* 菜单授权时，搜索框的值 */
    searchValue:"",
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (pathToRegexp('/index/system_config/roles/:id/auth').test(location.pathname)) {
          let pathname = location.pathname.substr(0, location.pathname.lastIndexOf("/"));
          let curId = pathname.substr(pathname.lastIndexOf("/") + 1);
          console.log('curId = ' + curId);
          dispatch({
            type: 'initAuth',
            payload: {id:curId, ...location.query},
          });
        }
      });
    },
  },

  effects: {
    *initAuth({ payload }, { call, put }) {
      const { data } = yield call(getMenuTree);
      if (data) {
        //console.log('data:', JSON.stringify(data));
        if (data.code === projectConstant.CODE_SUCCESS) {
          let menuTreeDataSource = [{children: data.data, key: '0', value: '0', name: '系统菜单'}];
          yield put({
            type: 'setValue',
            payload: {
              curAction: 'auth',
              curActionName: "菜单授权",
              curRecord: payload,
              actionBarVisible: false,
              selectedMenuIds: (payload.menu_ids === null || payload.menu_ids === undefined) ? [] : payload.menu_ids.split(','),
              menuTreeDataSource: menuTreeDataSource,
            }
          });
        }
      }
    },
    *edit({ payload }, { call, put }) {
      const { data } = yield call(edit, parse(payload));
      if (data) {
        console.log('data:', JSON.stringify(data));
        if (data.code === projectConstant.CODE_SUCCESS) {
          yield put(routerRedux.push(projectUtil.getCurMenuLink()));
        }
      }
    },
  },

  reducers: {
    showLoading(state) {
      return { ...state, loading: true };
    },
    setValue(state, action) {
      return { ...state, ...action.payload, loading: false };
    },
    selectMenus(state, action) {
      return { ...state, selectedMenuIds: action.payload };
    },
  },
}
