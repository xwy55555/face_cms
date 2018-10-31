import { parse } from 'qs';
import { routerRedux } from 'dva/router';
import pathToRegexp from 'path-to-regexp';
import { message } from 'antd';
import * as projectUtil from '../../../../../../../utils/rbacProjectUtil';
import * as projectConstant from '../../../../../../../utils/rbacProjectConstant';
import { getProvinceTree, getTree, getNodeTree, getBean, add, edit, remove, removeBatch, changeOrderBy } from '../../services/service';

export default {
  namespace: 'cityAndCountyList',

  state: {
    /* 树：数据源 */
    dataSource: [],
    /* 树：是否显示加载动画 */
    loading: false,
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
        if (location.pathname === "/index/system_config/area_manage/cities_and_counties/list") {
          dispatch({
            type: 'initTree',
            payload: location,
          });
        }
      });
    },
  },

  effects: {
    *initTree({ payload }, { call, put }) {
      yield put({ type: 'showLoading' });
      let curProvinceId = (parse(payload.query).parent_id);
      curProvinceId = curProvinceId === undefined ? "" : curProvinceId;
      const { data: provinceData } = yield call(getProvinceTree);
      if (provinceData) {
        if (provinceData.code === projectConstant.CODE_SUCCESS) {
          let provinceList = provinceData.data;
          provinceList = provinceList.map((item)=>{
            item.key = item.id;
            item.label = item.name;
            return item;
          });
          curProvinceId = curProvinceId === "" && provinceList.length > 0 ? provinceList[0].id : curProvinceId;
          yield put({
            type: 'setValue',
            payload: {
              curProvinceId: curProvinceId,
              provinceDataSource: provinceList,
            },
          });
        }
      }
      const { data } = yield call(getNodeTree, {parent_id: curProvinceId});
      if (data) {
        if (data.code === projectConstant.CODE_SUCCESS) {
          //console.log('data:', JSON.stringify(data));
          yield put({type: 'setValue', payload: {dataSource: data.data }});
        }
      }
    },
    *'delete'({ payload }, { call, put }) {
      yield put({ type: 'showLoading' });
      const { data } = yield call(remove, { id: payload });
      if (data) {
        if (data.code === projectConstant.CODE_SUCCESS) {
          yield put(routerRedux.push(projectUtil.getCurMenuLink()));
        }
      }
    },
    *changeOrderBy({ payload }, { call, put }) {
      const { data } = yield call(changeOrderBy, payload);
      if (data) {
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
