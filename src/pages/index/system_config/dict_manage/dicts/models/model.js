import { parse } from 'qs';
import { routerRedux } from 'dva/router';
import { message } from 'antd';
import * as projectUtil from '../../../../../../utils/rbacProjectUtil';
import * as projectConstant from '../../../../../../utils/rbacProjectConstant';
import {getTypeList, removeBatch} from '../services/service';

export default {
  namespace: 'dicts',

  state: {
    /* 当前操作：新增、编辑、删除等 */
    curAction: '',
    /* 当前操作名称：新增、编辑、删除等 */
    curActionName: '',
    /* 是否显示actionBar */
    actionBarVisible: true,
    /* 列表：选中的行的Keys */
    selectedRowKeys: [],
    /** 类型列表 */
    typeDataSource: [],
    /** 当前类型Id */
    curTypeId: '',
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === "/index/system_config/dict_manage/dicts") {
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
      let curTypeId = payload.type_id;
      curTypeId = curTypeId === undefined ? "" : curTypeId;
      const { data } = yield call(getTypeList);
      if (data) {
        if (data.code === projectConstant.CODE_SUCCESS) {
          let typeList = data.data;
          typeList = typeList.map((item)=>{
            item.key = item.id;
            item.title = item.name;
            return item;
          });
          curTypeId = curTypeId === "" && typeList.length > 0 ? typeList[0].id : curTypeId;
          yield put({
            type: 'setValue',
            payload: {
              curAction: '',
              curActionName: "",
              actionBarVisible: true,
              curTypeId: curTypeId,
              typeDataSource: typeList,
            },
          });
        }
      }
      yield put(routerRedux.push(projectUtil.getCurMenuLink() + "/list?type_id=" + curTypeId));
    },
    *gotoAdd({ payload }, { call, put }) {
      yield put({
        type: 'setValue',
        payload: {
          curAction: 'add',
          curActionName: "新增字典",
          actionBarVisible: false,
        }
      });
      let parentID = '0';
      if (payload !== undefined) {
        parentID = payload;
      }
      yield put(routerRedux.push(projectUtil.getCurMenuLink() + '/add?parent_id=' + parentID));
    },
    *gotoView({ payload }, { call, put }) {
      yield put({
        type: 'setValue',
        payload: {
          curAction: 'view',
          curActionName: "查看字典",
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
          curActionName: "编辑字典",
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
