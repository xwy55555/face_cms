import { parse } from 'qs';
import { routerRedux } from 'dva/router';
import pathToRegexp from 'path-to-regexp';
import { message } from 'antd';
import * as projectUtil from '../../../../../../../utils/rbacProjectUtil';
import * as projectConstant from '../../../../../../../utils/rbacProjectConstant';
import { getPageList, getBean, add, edit, remove, removeBatch } from '../../../services/service';

export default {
  namespace: 'roleEdit',

  state: {
    /* 当前记录项 */
    curRecord: {},
    /* 查询条件：名称*/
    conditionName: '',
    /* 查询条件：代码*/
    conditionCode: '',
    /* 列表：选中的行的Keys */
    selectedRowKeys: [],
    /* 菜单树：数据源 */
    menuTreeDataSource:[],
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (pathToRegexp('/index/system_config/roles/:id/edit').test(location.pathname)) {
          let pathname = location.pathname.substr(0, location.pathname.lastIndexOf("/"));
          let curId = pathname.substr(pathname.lastIndexOf("/") + 1);
          console.log('curId = ' + curId);
          dispatch({
            type: 'initEdit',
            payload: curId,
          });
        }
      });
    },
  },

  effects: {
    *initEdit({ payload }, { call, put }) {
      const { data } = yield call(getBean, {id:payload});
      if (data) {
        console.log('data:', JSON.stringify(data));
        if (data.code === projectConstant.CODE_SUCCESS) {
          yield put({
            type: 'setValue',
            payload: {
              curRecord: data.data,
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
  },
}
