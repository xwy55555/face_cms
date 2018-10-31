import { parse } from 'qs';
import { routerRedux } from 'dva/router';
import { message } from 'antd';
import * as projectUtil from '../../../../../utils/rbacProjectUtil';
import * as projectConstant from '../../../../../utils/rbacProjectConstant';
import { removeBatch } from '../services/service';

export default {
  namespace: 'users',

  state: {
    /* 当前操作：新增、编辑、删除等 */
    curAction: '',
    /* 当前操作名称：新增、编辑、删除等 */
    curActionName: '',
    /* 是否显示actionBar */
    actionBarVisible: true,
    /* 查询条件：姓名*/
    conditionName: '',
    /* 查询条件：帐号*/
    conditionAccount: '',
    /* 查询条件：手机号码*/
    conditionMobile: '',
    /* 查询条件：工号*/
    conditionCode: '',
    /* 列表：选中的行的Keys */
    selectedRowKeys: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === "/index/system_config/users") {
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
      yield put({
        type: 'setValue',
        payload: {
          curAction: '',
          curActionName: '',
          actionBarVisible: true,
          //------------------------
          conditionName: payload.name,
          conditionAccount: payload.account,
          conditionMobile: payload.mobile,
          conditionCode: payload.code,
        }
      });
      yield put(routerRedux.push({
        pathname: projectUtil.getCurMenuLink() + "/list",
        query: payload
      }));
    },
    *gotoAdd({ payload }, { call, put }) {
      yield put({
        type: 'setValue',
        payload: {
          curAction: 'add',
          curActionName: '新增用户',
          actionBarVisible: false,
        }
      });
      yield put(routerRedux.push(projectUtil.getCurMenuLink() + '/add'));
    },
    *gotoView({ payload }, { call, put }) {
      yield put({
        type: 'setValue',
        payload: {
          curAction: 'view',
          curActionName: "查看用户",
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
          curActionName: "编辑用户",
          actionBarVisible: false,
        }
      });
      yield put(routerRedux.push(projectUtil.getCurMenuLink() + '/' + payload + '/edit'));
    },
    *gotoAuth({ payload }, { call, put }) {
      yield put({
        type: 'setValue',
        payload: {
          curAction: 'auth',
          curActionName: "角色授权",
          actionBarVisible: false,
        }
      });
      yield put(routerRedux.push('/index/system_config/users/' + payload.id + '/auth?' + 'name=' + payload.name + '&role_ids=' + payload.role_ids));
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
    deleteSuccess(state, action) {
      const id = action.payload;
      const newList = state.dataSource.filter(user => user.id !== id);
      return { ...state, dataSource: newList, total: state.total - 1, loading: false };
    },
    select(state, action) {
      return { ...state, selectedRowKeys: action.payload };
    },
    selectRoles(state, action) {
      return { ...state, selectedRoleIds: action.payload };
    },
  },
}
