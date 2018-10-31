import { parse } from 'qs';
import { routerRedux } from 'dva/router';
import { message } from 'antd';
import * as projectUtil from '../../../../../../../utils/rbacProjectUtil';
import * as projectConstant from '../../../../../../../utils/rbacProjectConstant';
import { getMobileAppList, getBean, add, edit, remove, removeBatch } from '../../services/service';

export default {
  namespace: 'mobileAppConfigAdd',

  state: {
    /* 当前记录项 */
    curRecord: {},
    /* 列表：选中的行的Keys */
    selectedRowKeys: [],
    /** 移动应用列表 */
    mobileAppDataSource: [],
    /** 当前移动应用ID */
    curMobileAppID: '',
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/index/system_config/mobile_app_manage/mobile_app_configs/add') {
          console.log('location.query.mobile_app_id = ' + location.query.mobile_app_id);
          let mobileAppId = location.query.mobile_app_id === undefined ? '0' : location.query.mobile_app_id;
          let curRecord = { mobile_app_id: mobileAppId };
          dispatch({
            type: 'initAdd',
            payload: curRecord,
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
          curRecord: payload,
        }
      });
    },
    *add({ payload }, { call, put }) {
      const { data } = yield call(add, parse(payload));
      if (data) {
        console.log('data:', JSON.stringify(data));
        if (data.code === projectConstant.CODE_SUCCESS) {
          message.success('新增操作成功');
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
