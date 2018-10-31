import { parse } from 'qs';
import { routerRedux } from 'dva/router';
import pathToRegexp from 'path-to-regexp';
import { message } from 'antd';
import * as projectConstant from '../../../../../../../utils/rbacProjectConstant';
import { getBean } from '../../../services/service';

export default {
  namespace: 'userView',

  state: {
    /* 当前记录项 */
    curRecord: {},
    /* 列表：数据源 */
    dataSource: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
       if (pathToRegexp('/index/system_config/users/:id/view').test(location.pathname)) {
         let pathname = location.pathname.substr(0, location.pathname.lastIndexOf("/"));
         let curId = pathname.substr(pathname.lastIndexOf("/") + 1);
         console.log('curId = ' + curId);
         dispatch({
           type: 'initView',
           payload: curId,
         });
       }
      });
    },
  },

  effects: {
    *initView({ payload }, { call, put }) {
      const { data } = yield call(getBean, { id:payload });
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
