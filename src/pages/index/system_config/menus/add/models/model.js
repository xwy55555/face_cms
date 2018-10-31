import { parse } from 'qs';
import { routerRedux } from 'dva/router';
import { message } from 'antd';
import * as projectUtil from '../../../../../../utils/rbacProjectUtil';
import * as projectConstant from '../../../../../../utils/rbacProjectConstant';
import {add, getTree} from '../../services/service';

export default {
  namespace: 'menuAdd',

  state: {
    /* 当前记录项 */
    curRecord: {},
    /* 树：数据源 */
    dataSource: [],
    /* 树：是否显示加载动画 */
    loading: false,
    /* 是否显示选择图标的Modal */
    selectIconModalVisible: false,
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === "/index/system_config/menus/add") {
          console.log("location.query.parent_id = " + location.query.parent_id);
          let parentId = location.query.parent_id === undefined ? "0" : location.query.parent_id;
          let curRecord = { parent_id: parentId };
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
      const { data } = yield call(getTree);
      if (data) {
        if (data.code === projectConstant.CODE_SUCCESS) {
          //console.log('data:', JSON.stringify(data));
          yield put({type: 'setValue', payload: {
            dataSource: data.data,
            curAction: 'add',
            curActionName: "新增菜单",
            curRecord: payload,
            actionBarVisible: false
          }});
        }
      }
    },
    *add({ payload }, { call, put }) {
      const { data } = yield call(add, parse(payload));
      if (data) {
        console.log('data:', JSON.stringify(data));
        if (data.code === projectConstant.CODE_SUCCESS) {
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
    showSelectIconModal(state) {
      return { ...state, selectIconModalVisible: true };
    },
    hideSelectIconModal(state, action) {
      if (action.payload === null || action.payload === undefined) {
        return { ...state, selectIconModalVisible: false };
      } else {
        console.log("hideSelectIconModal, action.payload : " + JSON.stringify(action.payload));
        return { ...state, selectIconModalVisible: false, curRecord: action.payload };
      }
    },
  },

}
