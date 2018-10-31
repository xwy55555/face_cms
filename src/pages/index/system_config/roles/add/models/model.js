import { parse } from 'qs';
import { routerRedux } from 'dva/router';
import { message } from 'antd';
import * as projectUtil from '../../../../../../utils/rbacProjectUtil';
import * as projectConstant from '../../../../../../utils/rbacProjectConstant';
import { add } from '../../services/service';

export default {
  namespace: 'roleAdd',

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
        if (location.pathname === '/index/system_config/roles/add') {
          dispatch({
            type: 'initAdd'
          });
        }
      });
    },
  },

  effects: {
    *initAdd({ payload }, { call, put }) {
      yield put({
        type: 'setValue',
        payload: {
          curRecord: {},
        }
      });
    },
    *add({ payload }, { call, put }) {
      const { data } = yield call(add, parse(payload));
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
