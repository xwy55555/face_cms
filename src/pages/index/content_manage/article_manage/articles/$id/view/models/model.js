import { parse } from 'qs';
import { routerRedux } from 'dva/router';
import pathToRegexp from 'path-to-regexp';
import { message } from 'antd';
import * as projectUtil from '../../../../../../../../utils/rbacProjectUtil';
import * as projectConfig from '../../../../../../../../utils/projectConfig';
import * as projectConstant from '../../../../../../../../utils/rbacProjectConstant';
import { getTopicList, getPageList, getBean, add, edit, remove, removeBatch } from '../../../services/service';

export default {
  namespace: 'articleView',

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
        if (pathToRegexp('/index/content_manage/article_manage/articles/:id/view').test(location.pathname)) {
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
          yield put({
            type: 'setValue',
            payload: {
              curRecord: data.data,
            }
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
  },
}
