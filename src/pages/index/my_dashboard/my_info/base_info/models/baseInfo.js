import { parse } from 'qs';
import { routerRedux } from 'dva/router';
import { message } from 'antd';
import * as projectUtil from '../../../../../../utils/rbacProjectUtil';
import * as projectConstant from '../../../../../../utils/rbacProjectConstant';
import { getCurUser, editCurUser } from '../services/baseInfo';

export default {
  namespace: 'baseInfo',

  state: {
    /* 当前操作：新增、编辑、删除等 */
    curAction: '',
    /* 当前操作名称：新增、编辑、删除等 */
    curActionName: '',
    /* 是否显示actionBar */
    actionBarVisible: true,
    /* 当前记录项 */
    curRecord: {},
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === "/index/my_dashboard/my_info/base_info") {
          dispatch({
            type: 'initEdit',
            payload: location,
          });
        }
      });
    },
  },

  effects: {
    *initEdit({ payload }, { call, put }) {
      yield put({ type: 'showLoading' });
      const { data } = yield call(getCurUser);
      if (data) {
        if (data.code === projectConstant.CODE_SUCCESS) {
          //console.log('data:', JSON.stringify(data));
          yield put({ type: 'setValue', payload: { curRecord: data.data } });
        }
      }
    },
    *edit({ payload }, { call, put }) {
      const { data } = yield call(editCurUser, parse(payload));
      if (data) {
        console.log('data:', JSON.stringify(data));
        if (data.code === projectConstant.CODE_SUCCESS) {
          message.success('保存成功');
          yield put(routerRedux.push(projectUtil.getCurMenuLink()));
        } else {
          message.error(data.text);
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
