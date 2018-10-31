import { parse } from 'qs';
import { routerRedux } from 'dva/router';
import { message } from 'antd';
import * as projectUtil from '../../../../../../utils/rbacProjectUtil';
import * as projectConstant from '../../../../../../utils/rbacProjectConstant';
import {add, getLevelList} from '../../services/service';

export default {
  namespace: 'memberAdd',

  state: {
    /* 当前记录项 */
    curRecord: {},
    /** 级别列表 */
    levelDataSource: [],
    /** 当前级别ID */
    curLevelID: '',
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/index/member_manage/members/add') {
          console.log('location.query.level_id = ' + location.query.level_id);
          let levelId = location.query.level_id === undefined ? '0' : location.query.level_id;
          dispatch({
            type: 'initAdd',
            payload: levelId
          });
        }
      });
    },
  },

  effects: {
    *initAdd({ payload }, { call, put }) {
      let curLevelID = payload;
      curLevelID = curLevelID === undefined ? "" : curLevelID;
      const { data } = yield call(getLevelList);
      if (data) {
        if (data.code === projectConstant.CODE_SUCCESS) {
          let levelList = data.data;
          levelList = levelList.map((item)=>{
            item.key = item.id;
            item.title = item.name;
            return item;
          });
          curLevelID = curLevelID === "" && levelList.length > 0 ? levelList[0].id : curLevelID;
          yield put({
            type: 'setValue',
            payload: {
              curRecord: {level_id: curLevelID},
              levelDataSource: levelList,
            },
          });
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
  },
}
