import { parse } from 'qs';
import { routerRedux } from 'dva/router';
import { message } from 'antd';
import * as projectUtil from '../../../../../../utils/rbacProjectUtil';
import * as projectConstant from '../../../../../../utils/rbacProjectConstant';
import * as projectConfig from "../../../../../../utils/projectConfig";
import { add, edit, remove, removeBatch, changeOrderBy } from '../services/service';

export default {
  namespace: 'carouselItems',

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
    /* 当前轮播图ID */
    curCarouselID: '',
    /* 轮播图列表 */
    carouselDataSource: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/index/content_manage/carousel_manage/carousel_items') {
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
      let curCarouselID = "";
      if (payload !== undefined && payload.carousel_id !== undefined) {
        curCarouselID = payload.carousel_id;
      }
      const { data } = yield call(getCarouselList);
      if (data) {
        if (data.code === projectConstant.CODE_SUCCESS) {
          let carouselList = carouselData.data;
          carouselList = carouselList.map((item)=>{
            item.key = item.id;
            item.title = item.name;
            return item;
          });
          carouselList.unshift({id:'0', name:'全部'});
          curCarouselID = curCarouselID === '' && carouselList.length > 0 ? carouselList[0].id : curCarouselID;
          yield put({
            type: 'setValue',
            payload: {
              curAction: '',
              curActionName: "",
              actionBarVisible: true,
              curCarouselID: curCarouselID,
              carouselDataSource: carouselList,
            },
          });
        }
      }
      yield put(routerRedux.push(projectUtil.getCurMenuLink() + "/list?carousel_id=" + curCarouselID));
    },
    *gotoAdd({ payload }, { call, put }) {
      yield put({
        type: 'setValue',
        payload: {
          curAction: 'add',
          curActionName: "新增轮播页",
          actionBarVisible: false,
        }
      });
      let carouselID = '0';
      if (payload !== undefined && payload.carousel_id !== undefined) {
        carouselID = payload.carousel_id;
      }
      yield put(routerRedux.push(projectUtil.getCurMenuLink() + '/add?carousel_id=' + carouselID));
    },
    *gotoView({ payload }, { call, put }) {
      yield put({
        type: 'setValue',
        payload: {
          curAction: 'view',
          curActionName: "查看轮播页",
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
          curActionName: "编辑轮播页",
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
  },
}
