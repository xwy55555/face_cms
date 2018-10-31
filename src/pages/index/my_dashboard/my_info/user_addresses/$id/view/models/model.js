import { parse } from 'qs';
import { routerRedux } from 'dva/router';
import pathToRegexp from 'path-to-regexp';
import { message } from 'antd';
import * as projectConstant from '../../../../../../../../utils/rbacProjectConstant';
import { getAreaNodeTree, getBean, } from '../../../services/service';

export default {
  namespace: 'userAddressView',

  state: {
    /* 当前记录项 */
    curRecord: {},
    /* 区域树：数据源 */
    areaTreeDataSource:[],
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (pathToRegexp("/index/my_dashboard/my_info/user_addresses/:id/view").test(location.pathname)) {
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
      const { data: beanData } = yield call(getBean, {id:payload});
      const { data: treeData } = yield call(getAreaNodeTree);
      if (beanData && treeData) {
        //console.log('beanData:', JSON.stringify(beanData));
        //console.log('treeData:', JSON.stringify(treeData));
        if (beanData.code === projectConstant.CODE_SUCCESS && treeData.code === projectConstant.CODE_SUCCESS) {
          yield put({
            type: 'setValue',
            payload: {
              curRecord: beanData.data,
              areaTreeDataSource: treeData.data,
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
