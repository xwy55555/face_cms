import { parse } from 'qs';
import { routerRedux } from 'dva/router';
import { message } from 'antd';
import * as projectUtil from '../../../../../../../utils/rbacProjectUtil';
import * as projectConfig from '../../../../../../../utils/projectConfig';
import * as projectConstant from '../../../../../../../utils/rbacProjectConstant';
import { getTopicList, getPageList, getBean, add, edit, remove, removeBatch } from '../../services/service';

export default {
  namespace: 'articleAdd',

  state: {
    /* 当前记录项 */
    curRecord: {},
    /** 栏目列表 */
    topicDataSource: [],
    /** 当前栏目ID */
    curTopicID: '',
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/index/content_manage/article_manage/articles/add') {
          console.log('location.query.topic_id = ' + location.query.topic_id);
          let topicId = location.query.topic_id === undefined ? '0' : location.query.topic_id;
          let curRecord = { topic_id: topicId };
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
      yield put({ type: 'setValue', payload: { curAction: 'add', curActionName: '新增文章', curRecord: payload, actionBarVisible: false } });
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
  },
}
