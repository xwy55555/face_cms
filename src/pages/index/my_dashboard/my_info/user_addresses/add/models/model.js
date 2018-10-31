import { parse } from 'qs';
import { routerRedux } from 'dva/router';
import { message } from 'antd';
import * as projectUtil from '../../../../../../../utils/rbacProjectUtil';
import * as projectConstant from '../../../../../../../utils/rbacProjectConstant';
import { getAreaNodeTree, add } from '../../services/service';

export default {
  namespace: 'userAddressAdd',
  state: {
    /* 当前记录项 */
    curRecord: {},
    /* 区域树：数据源 */
    areaTreeDataSource:[],
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === "/index/my_dashboard/my_info/user_addresses/add") {
          dispatch({
            type: 'initAdd'
          });
        }
      });
    },
  },

  effects: {
    *initAdd({ payload }, { call, put }) {
      const { data } = yield call(getAreaNodeTree);
      if (data) {
        //console.log('data:', JSON.stringify(data));
        if (data.code === projectConstant.CODE_SUCCESS) {
          let areaTreeDataSource = data.data;
          yield put({
            type: 'setValue',
            payload: {
              curAction: 'add',
              curActionName: "新增地址",
              curRecord: {},
              actionBarVisible: false,
              areaTreeDataSource: areaTreeDataSource,
            }
          });
        }
      }
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
  },
}
