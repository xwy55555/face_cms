import { parse } from 'qs';
import { routerRedux } from 'dva/router';
import { message } from 'antd';
import * as projectUtil from '../../../../../../../utils/rbacProjectUtil';
import * as projectConstant from '../../../../../../../utils/rbacProjectConstant';
import { getTree, add } from '../../services/service';

export default {
  namespace: 'cityAndCountyAdd',

  state: {
    /* 当前记录项 */
    curRecord: {},
    /** 省份列表 */
    provinceDataSource: [],
    /** 当前省份Id */
    curProvinceId: '',
    /** 区域列表 */
    areaDataSource: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === "/index/system_config/area_manage/cities_and_counties/add") {
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
          yield put({
            type: 'setValue',
            payload: {
              areaDataSource: data.data,
              curRecord: payload,
            }
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
