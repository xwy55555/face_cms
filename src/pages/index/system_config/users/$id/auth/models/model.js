import { parse } from 'qs';
import { routerRedux } from 'dva/router';
import pathToRegexp from 'path-to-regexp';
import { message } from 'antd';
import * as projectUtil from '../../../../../../../utils/rbacProjectUtil';
import * as projectConstant from '../../../../../../../utils/rbacProjectConstant';
import { getRoleList, edit, } from '../../../services/service';

export default {
  namespace: 'userAuth',

  state: {
    /* 当前记录项 */
    curRecord: {},
    /* 角色树：数据源 */
    roleTreeDataSource:[],
    /* 角色授权时，选中的角色Ids */
    selectedRoleIds: [],
    /* 角色授权时，展开的角色Ids */
    expandedRoleIds: ['0'],
    /* 角色授权时，是否自动展开父节点 */
    autoExpandParent: true,
    /* 角色授权时，搜索框的值 */
    searchValue:"",
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (pathToRegexp('/index/system_config/users/:id/auth').test(location.pathname)) {
          let pathname = location.pathname.substr(0, location.pathname.lastIndexOf("/"));
          let curId = pathname.substr(pathname.lastIndexOf("/") + 1);
          console.log('curId = ' + curId);
          dispatch({
            type: 'initAuth',
            payload: {id:curId, ...location.query},
          });
        }
      });
    },
  },

  effects: {
    *initAuth({ payload }, { call, put }) {
      const { data } = yield call(getRoleList);
      if (data) {
        //console.log('data:', JSON.stringify(data));
        if (data.code === projectConstant.CODE_SUCCESS) {
          let roleList = data.data;
          roleList = roleList.map((item)=>{
            item.key = item.id;
            return item;
          });
          let roleTreeDataSource = [{children: roleList, key: '0', value: '0', name: '系统角色'}];
          //console.log('roleTreeDataSource:', JSON.stringify(roleTreeDataSource));
          yield put({
            type: 'setValue',
            payload: {
              curAction: 'auth',
              curActionName: "角色授权",
              actionBarVisible: false,
              curRecord: payload,
              selectedRoleIds: (payload.role_ids === null || payload.role_ids === undefined) ? [] : payload.role_ids.split(','),
              roleTreeDataSource: roleTreeDataSource,
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
          message.success('编辑操作成功');
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
    selectRoles(state, action) {
      return { ...state, selectedRoleIds: action.payload };
    },
  },
}
