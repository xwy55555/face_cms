import { parse } from 'qs';
import { routerRedux } from 'dva/router';
import { message } from 'antd';
import * as projectConstant from '../../../../../../../utils/rbacProjectConstant';
import { getPageList, remove } from '../../services/service';

export default {
  namespace: 'taskList',

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
    /* 查询条件：名称*/
    conditionName: '',
    /* 查询条件：起始日期 */
    beginDT: undefined,
    /* 查询条件：截止日期 */
    endDT: undefined,
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/index/system_config/task_manage/tasks/list') {
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
      const { data } = yield call(getPageList, parse(payload));
      if (data) {
        if (data.code === projectConstant.CODE_SUCCESS) {
          //console.log('data:', JSON.stringify(data));
          yield put({
            type: 'setValue',
            payload: {
              dataSource: data.data.dataSource,
              total: data.data.total,
              current: data.data.current,
              pageSize: data.data.pageSize,
              //---------------------
              conditionName: payload.name,
              beginDT: payload.begin_dt,
              endDT: payload.end_dt,
            },
          });
        }
      }
    },
    *'delete'({ payload }, { call, put }) {
      yield put({ type: 'showLoading' });
      const { data } = yield call(remove, { id: payload });
      if (data) {
        if (data.code === projectConstant.CODE_SUCCESS) {
          message.success('删除操作成功');
          yield put({
            type: 'deleteSuccess',
            payload,
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
    deleteSuccess(state, action) {
      const id = action.payload;
      const newList = state.dataSource.filter(tasks => tasks.id !== id);
      return { ...state, dataSource: newList, total: state.total - 1, loading: false };
    },
  },
}
