import { parse } from 'qs';
import { routerRedux } from 'dva/router';
import { message } from 'antd';
import * as projectUtil from '../../../../../../../utils/rbacProjectUtil';
import * as projectConstant from '../../../../../../../utils/rbacProjectConstant';
import { getTypeList, getPageList, remove, changeOrderBy } from '../../services/service';

export default {
  namespace: 'dictList',

  state: {
    /* 列表：数据源 */
    dataSource: [],
    /* 列表：是否显示加载动画 */
    loading: false,
    /* 列表：总记录数 */
    total: 0,
    /* 列表：当前页码 */
    current: 1,
    /* 列表：每页显示的最大记录数 */
    pageSize:10,
    /** 类型列表 */
    typeDataSource: [],
    /** 当前类型Id */
    curTypeId: '',
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === "/index/system_config/dict_manage/dicts/list") {
          dispatch({
            type: 'initList',
            payload: location.query,
          });
        }
      });
    },
  },

  effects: {
    *initList({ payload }, { call, put }) {
      yield put({ type: 'showLoading' });
      let curTypeId = payload.type_id;
      curTypeId = curTypeId === undefined ? "" : curTypeId;
      const { data: pageData } = yield call(getPageList, {type_id: curTypeId} );
      if (pageData) {
        if (pageData.code === projectConstant.CODE_SUCCESS) {
          //console.log('data:', JSON.stringify(data));
          yield put({
            type: 'setValue',
            payload: {
              dataSource: pageData.data.dataSource,
              total: pageData.data.total,
              current: pageData.data.current,
              pageSize: pageData.data.pageSize,
            },
          });
        }
      }
    },
    *'delete'({ payload }, { call, put }) {
      yield put({ type: 'showLoading' });
      const { data } = yield call(remove, { id: payload });
      if (data) {
        yield put({
          type: 'deleteSuccess',
          payload,
        });
      }
    },
    *changeOrderBy({ payload }, { call, put }) {
      const { data } = yield call(changeOrderBy, payload);
      if (data) {
        if (data.code === projectConstant.CODE_SUCCESS) {
          yield put(routerRedux.push(projectUtil.getCurMenuLink() + '?type_id=' + payload));
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
      const newList = state.dataSource.filter(dict => dict.id !== id);
      return { ...state, dataSource: newList, total: state.total - 1, loading: false };
    },
  },
}
