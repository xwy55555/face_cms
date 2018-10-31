import { parse } from 'qs';
import { routerRedux } from 'dva/router';
import pathToRegexp from 'path-to-regexp';
import { message } from 'antd';
import * as projectUtil from '../../../../../../../utils/rbacProjectUtil';
import * as projectConstant from '../../../../../../../utils/rbacProjectConstant';
import {getBean, edit, getGroupList} from '../../../services/service';

export default {
  namespace: 'customerEdit',

  state: {
    /* 当前记录项 */
    curRecord: {},
    /** 分组列表 */
    groupDataSource: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (pathToRegexp('/index/customer_manage/customers/:id/edit').test(location.pathname)) {
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
      const { data: groupData } = yield call(getGroupList);
      const { data: beanData } = yield call(getBean, { id:payload });
      if (groupData && beanData) {
        console.log('groupData:', JSON.stringify(groupData));
        console.log('beanData:', JSON.stringify(beanData));
        if (groupData.code === projectConstant.CODE_SUCCESS && beanData.code === projectConstant.CODE_SUCCESS) {
          let groupList = groupData.data;
          groupList = groupList.map((item)=>{
            item.key = item.id;
            item.title = item.name;
            return item;
          });
          yield put({
            type: 'setValue',
            payload: {
              curRecord: beanData.data,
              groupDataSource: groupList,
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
  },
}
