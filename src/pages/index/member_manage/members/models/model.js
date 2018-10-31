import { parse } from 'qs';
import { routerRedux } from 'dva/router';
import { message } from 'antd';
import * as projectUtil from '../../../../../utils/rbacProjectUtil';
import * as projectConstant from '../../../../../utils/rbacProjectConstant';
import { getLevelList, removeBatch } from '../services/service';

export default {
  namespace: 'members',

  state: {
    /* 当前操作：新增、编辑、删除等 */
    curAction: '',
    /* 当前操作名称：新增、编辑、删除等 */
    curActionName: '',
    /* 是否显示actionBar */
    actionBarVisible: true,
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
        if (location.pathname === "/index/member_manage/members") {
          dispatch({
            type: 'gotoList',
            payload: location.query,
          });
        }
      });
    },
  },

  effects: {
    *gotoList({ payload }, { call, put }) {
      let curLevelID = payload.level_id;
      curLevelID = curLevelID === undefined ? "" : curLevelID;
      const { data } = yield call(getLevelList);
      if (data) {
        if (data.code === projectConstant.CODE_SUCCESS) {
          let levelList = data.data;
          levelList = levelList.map((item)=>{
            item.key = item.id;
            item.title = item.name;
            return item;
          });
          curLevelID = curLevelID === "" && levelList.length > 0 ? levelList[0].id : curLevelID;
          yield put({
            type: 'setValue',
            payload: {
              curAction: '',
              curActionName: "",
              actionBarVisible: true,
              curLevelID: curLevelID,
              levelDataSource: levelList,
            },
          });
        }
      }
      yield put(routerRedux.push(projectUtil.getCurMenuLink() + "/list?level_id=" + curLevelID));
    },
    *gotoAdd({ payload }, { call, put }) {
      yield put({
        type: 'setValue',
        payload: {
          curAction: 'add',
          curActionName: "新增会员",
          actionBarVisible: false,
        }
      });
      let levelID = '0';
      if (payload !== undefined && payload.level_id !== undefined) {
        levelID = payload.level_id;
      }
      yield put(routerRedux.push(projectUtil.getCurMenuLink() + '/add?level_id=' + levelID));
    },
    *gotoView({ payload }, { call, put }) {
      yield put({
        type: 'setValue',
        payload: {
          curAction: 'view',
          curActionName: "查看会员",
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
          curActionName: "编辑会员",
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
