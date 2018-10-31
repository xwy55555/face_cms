import { parse } from 'qs';
import { routerRedux } from 'dva/router';
import { message } from 'antd';
import * as projectUtil from '../../../../../../utils/rbacProjectUtil';
import * as projectConstant from '../../../../../../utils/rbacProjectConstant';
import { getTopicList, removeBatch } from '../services/service';

export default {
  namespace: 'articles',

  state: {
    /* 当前操作：新增、编辑、删除等 */
    curAction: '',
    /* 当前操作名称：新增、编辑、删除等 */
    curActionName: '',
    /* 是否显示actionBar */
    actionBarVisible: true,
    /* 列表：选中的行的Keys */
    selectedRowKeys: [],
    /** 栏目列表 */
    topicDataSource: [],
    /** 当前栏目ID */
    curTopicID: '',
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/index/content_manage/article_manage/articles') {
          dispatch({
            type: 'gotoList',
            payload: location,
          });
        }
      });
    },
  },

  effects: {
    *gotoList({ payload }, { call, put }) {
      let curTopicID = "";
      if (payload !== undefined && payload.topic_id !== undefined) {
        curTopicID = payload.topic_id;
      }
      const { data } = yield call(getTopicList);
      if (data) {
        if (data.code === projectConstant.CODE_SUCCESS) {
          let topicList = topicData.data;
          topicList = topicList.map((item)=>{
            item.key = item.id;
            item.title = item.name;
            return item;
          });
          topicList.unshift({id:'0', name:'全部'});
          curTopicID = curTopicID === '' && topicList.length > 0 ? topicList[0].id : curTopicID;
          yield put({
            type: 'setValue',
            payload: {
              curAction: '',
              curActionName: "",
              actionBarVisible: true,
              curTopicID: curTopicID,
              topicDataSource: topicList,
            },
          });
        }
      }
      yield put(routerRedux.push(projectUtil.getCurMenuLink() + "/list?topic_id=" + curTopicID));
    },
    *gotoAdd({ payload }, { call, put }) {
      yield put({
        type: 'setValue',
        payload: {
          curAction: 'add',
          curActionName: "新增文章",
          actionBarVisible: false,
        }
      });
      let topicID = '0';
      if (payload !== undefined && payload.topic_id !== undefined) {
        topicID = payload.topic_id;
      }
      yield put(routerRedux.push(projectUtil.getCurMenuLink() + '/add?topic_id=' + topicID));
    },
    *gotoView({ payload }, { call, put }) {
      yield put({
        type: 'setValue',
        payload: {
          curAction: 'view',
          curActionName: "查看文章",
          actionBarVisible: false,
        }
      });
      yield put(routerRedux.push(projectUtil.getCurMenuLink() + '/' + payload + '/view'));
    },
    *gotoEdit({ payload }, { call, put }) {
      yield put({
        type: 'setValue',
        payload: {
          curAction: 'edit',
          curActionName: "编辑文章",
          actionBarVisible: false,
        }
      });
      yield put(routerRedux.push(projectUtil.getCurMenuLink() + '/' + payload + '/edit'));
    },
    *deleteBatch({ payload }, { call, put }) {
      let ids = JSON.stringify(payload);
      ids = ids.replace('[', '').replace(']', '');
      console.log('ids : ' + ids);
      yield put({ type: 'showLoading' });
      const { data } = yield call(removeBatch, { ids: ids });
      if (data) {
        if (data.code === projectConstant.CODE_SUCCESS) {
          let count = data.data.count;
          if (count !== null && count !== undefined && count > 0) {
            message.success('批量删除 ' + count + ' 条记录成功');
          } else {
            message.error(data.text);
          }
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
    select(state, action) {
      return { ...state, selectedRowKeys: action.payload };
    },
  },
}
