import { parse } from 'qs';
import { routerRedux } from 'dva/router';
import pathToRegexp from 'path-to-regexp';
import { message } from 'antd';
import * as projectUtil from '../../../../../../../../utils/rbacProjectUtil';
import * as projectConstant from '../../../../../../../../utils/rbacProjectConstant';
import * as projectConfig from "../../../../../../../../utils/projectConfig";
import { getAdPositionList, getPageList, getBean, add, edit, remove, removeBatch, changeOrderBy } from '../../../services/service';

export default {
  namespace: 'adEdit',

  state: {
    /* 当前记录项 */
    curRecord: {},
    /* 查询条件：名称*/
    conditionName: '',
    /* 当前广告位ID */
    curAdPositionID: '',
    /* 广告位列表 */
    adPositionDataSource: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (pathToRegexp('/index/content_manage/ad_manage/ads/:id/edit').test(location.pathname)) {
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
      const { data } = yield call(getBean, { id:payload });
      if (data) {
        console.log('data:', JSON.stringify(data));
        if (data.code === projectConstant.CODE_SUCCESS) {
          yield put({
            type: 'setValue',
            payload: {
              curRecord: data.data,
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
    *updateCurRecord({ payload }, { call, put }) {
      let curRecord = payload.curRecord;
      if (curRecord) {
        if(curRecord.image_path_name !== null && curRecord.image_path_name !== undefined) {
          curRecord.image_url = projectConfig.RESOURCE_API_URL_ROOT + curRecord.image_path_name;
        }
      }
      yield put({ type: 'setValue', curRecord });
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
