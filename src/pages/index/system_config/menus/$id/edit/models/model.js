import { parse } from 'qs';
import { routerRedux } from 'dva/router';
import pathToRegexp from 'path-to-regexp';
import { message } from 'antd';
import * as projectUtil from '../../../../../../../utils/rbacProjectUtil';
import * as projectConstant from '../../../../../../../utils/rbacProjectConstant';
import { getTree, getBean, edit, } from '../../../services/service';

export default {
  namespace: 'menuEdit',

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
        if (pathToRegexp("/index/system_config/menus/:id/edit").test(location.pathname)) {
          let pathname = location.pathname.substr(0, location.pathname.lastIndexOf("/"));
          let curId = pathname.substr(pathname.lastIndexOf("/") + 1);
          console.log('curId = ' + curId);
          dispatch({
            type: 'initEdit',
            payload: curId,
          });
        }
      });
    },
  },

  effects: {
    *initEdit({ payload }, { call, put }) {
      const { data: treeData } = yield call(getTree);
      const { data: beanData } = yield call(getBean, {id:payload});
      if (treeData && beanData) {
        console.log('treeData:', JSON.stringify(treeData));
        console.log('beanData:', JSON.stringify(beanData));
        if (treeData.code === projectConstant.CODE_SUCCESS && beanData.code === projectConstant.CODE_SUCCESS) {
          yield put({ type: 'setValue', payload: {
            curAction: 'edit',
            curActionName: "编辑菜单",
            curRecord: beanData.data,
            actionBarVisible: false,
            dataSource: treeData.data
          }});
        }
      }
    },
    *edit({ payload }, { call, put }) {
      const { data } = yield call(edit, parse(payload));
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
