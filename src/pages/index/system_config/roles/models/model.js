import { parse } from 'qs';
import { routerRedux } from 'dva/router';
import { message } from 'antd';
import * as projectUtil from '../../../../../utils/rbacProjectUtil';
import * as projectConstant from '../../../../../utils/rbacProjectConstant';
import { removeBatch } from '../services/service';

export default {
  namespace: 'roles',

  state: {
    /* 当前操作：新增、编辑、删除等 */
    curAction: '',
    /* 当前操作名称：新增、编辑、删除等 */
    curActionName: '',
    /* 是否显示actionBar */
    actionBarVisible: true,
    /* 查询条件：名称*/
    conditionName: '',
    /* 查询条件：代码*/
    conditionCode: '',
    /* 列表：选中的行的Keys */
    selectedRowKeys: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === "/index/system_config/roles") {
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
          curActionName: '新增角色',
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
          curActionName: "查看角色",
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
          curActionName: "编辑角色",
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
          curActionName: "菜单授权",
          actionBarVisible: false,
        }
      });
      yield put(routerRedux.push('/index/system_config/roles/' + payload.id + '/auth?' + 'name=' + payload.name + '&menu_ids=' + payload.menu_ids));
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
    }
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
