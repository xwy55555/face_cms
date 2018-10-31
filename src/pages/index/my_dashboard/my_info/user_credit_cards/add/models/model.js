import { parse } from 'qs';
import { routerRedux } from 'dva/router';
import pathToRegexp from 'path-to-regexp';
import { message } from 'antd';
import * as projectUtil from '../../../../../../../utils/rbacProjectUtil';
import * as projectConstant from '../../../../../../../utils/rbacProjectConstant';
import { getPageList, getBean, add, edit, remove, removeBatch } from '../../services/service';

export default {
  namespace: 'userCreditCardAdd',

  state: {
    /* 当前记录项 */
    curRecord: {},
    /* 查询条件：名称*/
    conditionName: '',
    /* 查询条件：代码*/
    conditionCode: '',
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === "/index/my_dashboard/my_info/user_credit_cards/add") {
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
