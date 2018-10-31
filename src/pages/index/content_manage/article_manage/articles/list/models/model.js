import { parse } from 'qs';
import { routerRedux } from 'dva/router';
import { message } from 'antd';
import * as projectConfig from '../../../../../../../utils/projectConfig';
import * as projectConstant from '../../../../../../../utils/rbacProjectConstant';
import { getTopicList, getPageList, remove } from '../../services/service';

export default {
  namespace: 'articleList',

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
    /** 栏目列表 */
    topicDataSource: [],
    /** 当前栏目ID */
    curTopicID: '',
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/index/content_manage/article_manage/articles/list') {
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
      let curTopicID = (parse(payload.query).topic_id);
      curTopicID = curTopicID === undefined ? '' : curTopicID;
      const { data: topicData } = yield call(getTopicList);
      if (topicData) {
        if (topicData.code === projectConstant.CODE_SUCCESS) {
          let topicList = topicData.data;
          topicList = topicList.map((item)=>{
            item.key = item.id;
            item.label = item.name;
            return item;
          });
          curTopicID = curTopicID === '' && topicList.length > 0 ? topicList[0].id : curTopicID;
          yield put({
            type: 'setValue',
            payload: {
              curTopicID: curTopicID,
              topicDataSource: topicList,
            },
          });
        }
      }
      let pageListPayload = [];
      pageListPayload.topic_id = curTopicID;
      const { data } = yield call(getPageList, pageListPayload);
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
    *updateCurRecord({ payload }, { call, put }) {
      let curRecord = payload.curRecord;
      if (curRecord) {
        if(curRecord.image_path_name !== null && curRecord.image_path_name !== undefined) {
          curRecord.image_url = projectConfig.RESOURCE_API_URL_ROOT + curRecord.image_path_name;
        }
      }
      yield put({ type: 'setValue', curRecord });
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
      const newList = state.dataSource.filter(articles => articles.id !== id);
      return { ...state, dataSource: newList, total: state.total - 1, loading: false };
    },
    select(state, action) {
      return { ...state, selectedRowKeys: action.payload };
    },
  },
}
