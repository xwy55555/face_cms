import { parse } from 'qs';
import { routerRedux } from 'dva/router';
import { message } from 'antd';
import * as projectUtil from '../../../../../../utils/rbacProjectUtil';
import * as projectConstant from '../../../../../../utils/rbacProjectConstant';
import { getMobileAppList, removeBatch } from '../services/service';

export default {
  namespace: 'mobileAppConfigs',

  state: {
    /* 当前操作：新增、编辑、删除等 */
    curAction: '',
    /* 当前操作名称：新增、编辑、删除等 */
    curActionName: '',
    /* 是否显示actionBar */
    actionBarVisible: true,
    /* 列表：选中的行的Keys */
    selectedRowKeys: [],
    /** 配置列表 */
    mobileAppDataSource: [],
    /** 当前配置ID */
    curMobileAppID: '',
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/index/system_config/mobile_app_manage/mobile_app_configs') {
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
      let curMobileAppID = payload.mobile_app_id;
      curMobileAppID = curMobileAppID === undefined ? '' : curMobileAppID;
      const { data: mobileAppData } = yield call(getMobileAppList);
      if (mobileAppData) {
        if (mobileAppData.code === projectConstant.CODE_SUCCESS) {
          let mobileAppList = mobileAppData.data;
          mobileAppList = mobileAppList.map((item)=>{
            item.key = item.id;
            item.label = item.name;
            return item;
          });
          mobileAppList.unshift({id:'0', name:'全部'});
          curMobileAppID = curMobileAppID === '' && mobileAppList.length > 0 ? mobileAppList[0].id : curMobileAppID;
          yield put({
            type: 'setValue',
            payload: {
              curAction: '',
              curActionName: "",
              actionBarVisible: true,
              curMobileAppID: curMobileAppID,
              mobileAppDataSource: mobileAppList,
            },
          });
        }
      }
      yield put(routerRedux.push({
        pathname: projectUtil.getCurMenuLink() + "/list",
        query: payload,
      }));
    },
    *gotoAdd({ payload }, { call, put }) {
      yield put({
        type: 'setValue',
        payload: {
          curAction: 'add',
          curActionName: '新增配置',
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
          curActionName: "查看配置",
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
          curActionName: "编辑配置",
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
