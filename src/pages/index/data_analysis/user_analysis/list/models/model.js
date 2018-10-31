import { parse } from 'qs';
import * as projectConstant from '../../../../../../utils/rbacProjectConstant';
import { getSexData, getAgeData } from '../../services/service';

export default {
  namespace: 'userAnalysisList',

  state: {
    /* 当前操作：新增、编辑、删除等 */
    curAction: '',
    /* 当前操作名称：新增、编辑、删除等 */
    curActionName: '',
    /* 是否显示actionBar */
    actionBarVisible: true,
    /* 性别分布 */
    sexData: [],
    /* 年龄分布 */
    ageData: [],
    /* 列表：是否显示加载动画 */
    loading: false,
    /* 查询条件：起始日期 */
    beginDT: undefined,
    /* 查询条件：截止日期 */
    endDT: undefined,
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/index/data_analysis/user_analysis/list') {
          dispatch({
            type: 'initData',
            payload: location.query,
          });
        }
      });
    },
  },

  effects: {
    *initData({ payload }, { call, put }) {
      yield put({ type: 'showLoading' });
      const { data:sexData } = yield call(getSexData, parse(payload));
      if (sexData) {
        if (sexData.code === projectConstant.CODE_SUCCESS) {
          //console.log('data:', JSON.stringify(data));
          yield put({
            type: 'setValue',
            payload: {
              sexData: sexData.data,
            },
          });
        }
      }
      const { data:ageData } = yield call(getAgeData, parse(payload));
      if (ageData) {
        if (ageData.code === projectConstant.CODE_SUCCESS) {
          //console.log('data:', JSON.stringify(data));
          yield put({
            type: 'setValue',
            payload: {
              ageData: ageData.data,
            },
          });
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
