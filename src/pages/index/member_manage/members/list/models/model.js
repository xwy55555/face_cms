import { parse } from 'qs';
import { routerRedux } from 'dva/router';
import { message } from 'antd';
import * as projectUtil from '../../../../../../utils/rbacProjectUtil';
import * as projectConstant from '../../../../../../utils/rbacProjectConstant';
import { getLevelList, getPageList, remove, changeOrderBy } from '../../services/service';

export default {
  namespace: 'memberList',

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
    /** 级别列表 */
    levelDataSource: [],
    /** 当前级别ID */
    curLevelID: '',
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/index/member_manage/members/list') {
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
      let curLevelID = payload.level_id;
      curLevelID = curLevelID === undefined ? '' : curLevelID;
      const { data: levelData } = yield call(getLevelList);
      if (levelData) {
        if (levelData.code === projectConstant.CODE_SUCCESS) {
          let levelList = levelData.data;
          levelList = levelList.map((item)=>{
            item.key = item.id;
            item.title = item.name;
            return item;
          });
          curLevelID = curLevelID === '' && levelList.length > 0 ? levelList[0].id : curLevelID;
          yield put({
            type: 'setValue',
            payload: {
              curLevelID: curLevelID,
              levelDataSource: levelList,
            },
          });
        }
      }
      let pageListPayload = [];
      pageListPayload.level_id = curLevelID;
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
          yield put(routerRedux.push(projectUtil.getCurMenuLink() + '?level_id=' + payload));
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
      const newList = state.dataSource.filter(member => member.id !== id);
      return { ...state, dataSource: newList, total: state.total - 1, loading: false };
    },
  },
}
