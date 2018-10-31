import { parse } from 'qs';
import { routerRedux } from 'dva/router';
import pathToRegexp from 'path-to-regexp';
import { message } from 'antd';
import * as projectUtil from '../../../../../../../../utils/rbacProjectUtil';
import * as projectConstant from '../../../../../../../../utils/rbacProjectConstant';
import { getTree, getBean, edit } from '../../../services/service';

export default {
  namespace: 'cityAndCountyEdit',

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
        if (pathToRegexp("/index/system_config/area_manage/cities_and_counties/:id/edit").test(location.pathname)) {
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
        //console.log('treeData:', JSON.stringify(treeData));
        //console.log('beanData:', JSON.stringify(beanData));
        if (treeData.code === projectConstant.CODE_SUCCESS && beanData.code === projectConstant.CODE_SUCCESS) {
          yield put({
            type: 'setValue',
            payload: {
              curRecord: beanData.data,
              areaDataSource: treeData.data,
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
