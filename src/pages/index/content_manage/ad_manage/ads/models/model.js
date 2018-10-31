import { parse } from 'qs';
import { routerRedux } from 'dva/router';
import { message } from 'antd';
import * as projectUtil from '../../../../../../utils/rbacProjectUtil';
import * as projectConstant from '../../../../../../utils/rbacProjectConstant';
import { getAdPositionList, removeBatch } from '../services/service';

export default {
  namespace: 'ads',

  state: {
    /* 当前操作：新增、编辑、删除等 */
    curAction: '',
    /* 当前操作名称：新增、编辑、删除等 */
    curActionName: '',
    /* 是否显示actionBar */
    actionBarVisible: true,
    /* 查询条件：名称*/
    conditionName: '',
    /* 列表：选中的行的Keys */
    selectedRowKeys: [],
    /* 当前广告位ID */
    curAdPositionID: '',
    /* 广告位列表 */
    adPositionDataSource: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === "/index/content_manage/ad_manage/ads") {
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
      let curAdPositionID = "";
      if (payload !== undefined && payload.ad_position_id !== undefined) {
        curAdPositionID = payload.ad_position_id;
      }
      const { data } = yield call(getAdPositionList);
      if (data) {
        if (data.code === projectConstant.CODE_SUCCESS) {
          let adPositionList = adPositionData.data;
          adPositionList = adPositionList.map((item)=>{
            item.key = item.id;
            item.title = item.name;
            return item;
          });
          adPositionList.unshift({id:'0', name:'全部'});
          curAdPositionID = curAdPositionID === '' && adPositionList.length > 0 ? adPositionList[0].id : curAdPositionID;
          yield put({
            type: 'setValue',
            payload: {
              curAction: '',
              curActionName: "",
              actionBarVisible: true,
              curAdPositionID: curAdPositionID,
              adPositionDataSource: adPositionList,
            },
          });
        }
      }
      yield put(routerRedux.push(projectUtil.getCurMenuLink() + "/list?ad_position_id=" + curAdPositionID));
    },
    *gotoAdd({ payload }, { call, put }) {
      yield put({
        type: 'setValue',
        payload: {
          curAction: 'add',
          curActionName: "新增广告",
          actionBarVisible: false,
        }
      });
      let adPositionID = '0';
      if (payload !== undefined && payload.ad_position_id !== undefined) {
        adPositionID = payload.ad_position_id;
      }
      yield put(routerRedux.push(projectUtil.getCurMenuLink() + '/add?ad_position_id=' + adPositionID));
    },
    *gotoView({ payload }, { call, put }) {
      yield put({
        type: 'setValue',
        payload: {
          curAction: 'view',
          curActionName: "查看广告",
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
          curActionName: "编辑广告",
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
