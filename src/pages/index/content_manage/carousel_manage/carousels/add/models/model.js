import { parse } from 'qs';
import { routerRedux } from 'dva/router';
import { message } from 'antd';
import * as projectUtil from '../../../../../../../utils/rbacProjectUtil';
import * as projectConstant from '../../../../../../../utils/rbacProjectConstant';
import { getPageList, getBean, add, edit, remove, removeBatch } from '../../services/service';

export default {
  namespace: 'carouselAdd',

  state: {
    /* 当前记录项 */
    curRecord: {},
    /* 查询条件：名称*/
    conditionName: '',
    /* 列表：选中的行的Keys */
    selectedRowKeys: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/index/content_manage/carousel_manage/carousels/add') {
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
        } });
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
