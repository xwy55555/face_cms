import { parse } from 'qs';
import { routerRedux } from 'dva/router';
import pathToRegexp from 'path-to-regexp';
import { message } from 'antd';
import * as projectConstant from '../../../../../../../utils/rbacProjectConstant';
import { getBean } from '../../../services/service';

export default {
  namespace: 'customerView',

  state: {
    /* 当前记录项 */
    curRecord: {},
    /* 列表：数据源 */
    dataSource: [],
    /* 查询条件：名称 */
    conditionName: '',
    /* 列表：选中的行的Keys */
    selectedRowKeys: [],
    /** 分组列表 */
    groupDataSource: [],
    /** 当前分组ID */
    curGroupID: '',
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (pathToRegexp('/index/customer_manage/customers/:id/view').test(location.pathname)) {
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
          yield put({ type: 'setValue', payload: { curAction: 'edit', curActionName: '编辑客户', curRecord: data.data, actionBarVisible: false } });
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
