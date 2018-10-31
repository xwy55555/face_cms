import { parse } from 'qs';
import { routerRedux } from 'dva/router';
import pathToRegexp from 'path-to-regexp';
import { message } from 'antd';
import * as projectUtil from '../../../../../../../../utils/rbacProjectUtil';
import * as projectConstant from '../../../../../../../../utils/rbacProjectConstant';
import { getMobileAppList, getPageList, getBean, add, edit, remove, removeBatch } from '../../../services/service';

export default {
  namespace: 'mobileAppConfigView',

  state: {
    /* 当前记录项 */
    curRecord: {},
    /** 移动应用列表 */
    mobileAppDataSource: [],
    /** 当前移动应用ID */
    curMobileAppID: '',
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (pathToRegexp('/index/system_config/mobile_app_manage/mobile_app_configs/:id/view').test(location.pathname)) {
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
