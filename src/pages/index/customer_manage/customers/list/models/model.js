import { parse } from 'qs';
import { routerRedux } from 'dva/router';
import { message } from 'antd';
import * as projectConstant from '../../../../../../utils/rbacProjectConstant';
import { getGroupList, getPageList, remove } from '../../services/service';

export default {
  namespace: 'customerList',

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
    /* 查询条件：名称 */
    conditionName: '',
    /** 分组列表 */
    groupDataSource: [],
    /** 当前分组ID */
    curGroupID: '',
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/index/customer_manage/customers/list') {
          dispatch({
            type: 'initList',
            payload: location,
          });
        }
      });
    },
  },

  effects: {
    *initList({ payload }, { call, put }) {
      yield put({ type: 'showLoading' });
      let curGroupID = (parse(payload.query).group_id);
      curGroupID = curGroupID === undefined ? '' : curGroupID;
      const { data: groupData } = yield call(getGroupList);
      if (groupData) {
        if (groupData.code === projectConstant.CODE_SUCCESS) {
          let groupList = groupData.data;
          groupList = groupList.map((item)=>{
            item.key = item.id;
            item.label = item.name;
            return item;
          });
          curGroupID = curGroupID === '' && groupList.length > 0 ? groupList[0].id : curGroupID;
          yield put({
            type: 'setValue',
            payload: {
              curGroupID: curGroupID,
              groupDataSource: groupList,
            },
          });
        }
      }
      let pageListPayload = [];
      pageListPayload.group_id = curGroupID;
      const { data: pageData } = yield call(getPageList, pageListPayload );
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
      const newList = state.dataSource.filter(customers => customers.id !== id);
      return { ...state, dataSource: newList, total: state.total - 1, loading: false };
    },
  },
}
