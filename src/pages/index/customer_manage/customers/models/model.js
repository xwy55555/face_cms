import { parse } from 'qs';
import { routerRedux } from 'dva/router';
import { message } from 'antd';
import * as projectUtil from '../../../../../utils/rbacProjectUtil';
import * as projectConstant from '../../../../../utils/rbacProjectConstant';
import { getGroupList, removeBatch } from '../services/service';

export default {
  namespace: 'customers',

  state: {
    /* 当前操作：新增、编辑、删除等 */
    curAction: '',
    /* 当前操作名称：新增、编辑、删除等 */
    curActionName: '',
    /* 是否显示actionBar */
    actionBarVisible: true,
    /* 查询条件：名称 */
    conditionName: '',
    /* 列表：选中的行的Keys */
    selectedRowKeys: [],
    /** 分组列表 */
    groupDataSource: [],
    /** 当前分组ID */
    curGroupID: '',
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === "/index/customer_manage/customers") {
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
      let curGroupID = "";
      if (payload !== undefined && payload.group_id !== undefined) {
        curGroupID = payload.group_id;
      }
      const { data } = yield call(getGroupList);
      if (data) {
        if (data.code === projectConstant.CODE_SUCCESS) {
          let groupList = data.data;
          groupList = groupList.map((item)=>{
            item.key = item.id;
            item.title = item.name;
            return item;
          });
          curGroupID = curGroupID === "" && groupList.length > 0 ? groupList[0].id : curGroupID;
          yield put({
            type: 'setValue',
            payload: {
              curAction: '',
              curActionName: "",
              actionBarVisible: true,
              curGroupID: curGroupID,
              groupDataSource: groupList,
            },
          });
        }
      }
      yield put(routerRedux.push(projectUtil.getCurMenuLink() + "/list?group_id=" + curGroupID));
    },
    *gotoAdd({ payload }, { call, put }) {
      yield put({
        type: 'setValue',
        payload: {
          curAction: 'add',
          curActionName: "新增客户",
          actionBarVisible: false,
        }
      });
      let groupID = '0';
      if (payload !== undefined && payload.group_id !== undefined) {
        groupID = payload.group_id;
      }
      yield put(routerRedux.push(projectUtil.getCurMenuLink() + '/add?group_id=' + groupID));
    },
    *gotoView({ payload }, { call, put }) {
      yield put({
        type: 'setValue',
        payload: {
          curAction: 'view',
          curActionName: "查看客户",
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
          curActionName: "编辑客户",
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
