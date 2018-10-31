import { parse } from 'qs';
import { routerRedux } from 'dva/router';
import { message } from 'antd';
import * as projectUtil from '../../../../../../utils/rbacProjectUtil';
import * as projectConstant from '../../../../../../utils/rbacProjectConstant';
import { add } from '../../services/service';

export default {
  namespace: 'customerAdd',

  state: {
    /* 当前记录项 */
    curRecord: {},
    /** 分组列表 */
    groupDataSource: [],
    /** 当前分组ID */
    curGroupID: '',
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/index/customer_manage/customers/add') {
          console.log('location.query.group_id = ' + location.query.group_id);
          let groupID = location.query.group_id === undefined ? '0' : location.query.group_id;
          let curRecord = { group_id: groupID };
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
      yield put({ type: 'setValue', payload: { curAction: 'add', curActionName: '新增客户', curRecord: {}, actionBarVisible: false } });
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
    deleteSuccess(state, action) {
      const id = action.payload;
      const newList = state.dataSource.filter(customers => customers.id !== id);
      return { ...state, dataSource: newList, total: state.total - 1, loading: false };
    },
    select(state, action) {
      return { ...state, selectedRowKeys: action.payload };
    },
  },
}
