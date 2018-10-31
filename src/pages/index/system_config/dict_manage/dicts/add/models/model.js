import { parse } from 'qs';
import { routerRedux } from 'dva/router';
import pathToRegexp from 'path-to-regexp';
import { message } from 'antd';
import * as projectUtil from '../../../../../../../utils/rbacProjectUtil';
import * as projectConstant from '../../../../../../../utils/rbacProjectConstant';
import { getTypeList, getPageList, getBean, add, edit, remove, removeBatch, changeOrderBy } from '../../services/service';

export default {
  namespace: 'dictAdd',

  state: {
    /* 当前记录项 */
    curRecord: {},
    /** 类型列表 */
    typeDataSource: [],
    /** 当前类型Id */
    curTypeId: '',
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === "/index/system_config/dict_manage/dicts/add") {
          console.log("location.query.type_id = " + location.query.type_id);
          let typeId = location.query.type_id === undefined ? "0" : location.query.type_id;
          let curRecord = { type_id: typeId };
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
          yield put(routerRedux.push(projectUtil.getCurMenuLink() + '?type_id=' + payload.type_id));
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
