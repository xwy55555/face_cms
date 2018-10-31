import { parse } from 'qs';
import { routerRedux } from 'dva/router';
import pathToRegexp from 'path-to-regexp';
import { message } from 'antd';
import * as projectUtil from '../../../../../../../../utils/rbacProjectUtil';
import * as projectConstant from '../../../../../../../../utils/rbacProjectConstant';
import { getAreaNodeTree, getBean, edit, } from '../../../services/service';

export default {
  namespace: 'userAddressEdit',

  state: {
    /* 当前记录项 */
    curRecord: {},
    /* 区域树：数据源 */
    areaTreeDataSource:[],
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (pathToRegexp("/index/my_dashboard/my_info/user_addresses/:id/edit").test(location.pathname)) {
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
      const { data: beanData } = yield call(getBean, {id:payload});
      const { data: treeData } = yield call(getAreaNodeTree);
      if (beanData && treeData) {
        //console.log('beanData:', JSON.stringify(beanData));
        //console.log('treeData:', JSON.stringify(treeData));
        if (beanData.code === projectConstant.CODE_SUCCESS && treeData.code === projectConstant.CODE_SUCCESS) {
          yield put({
            type: 'setValue',
            payload: {
              curAction: 'edit',
              curActionName: "编辑地址",
              curRecord: beanData.data,
              actionBarVisible: false,
              areaTreeDataSource: treeData.data,
            }
          });
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
  },
}
