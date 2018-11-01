import { parse } from 'qs';
import { routerRedux } from 'dva/router';
import * as projectUtil from '../../utils/rbacProjectUtil';

export default {
  namespace: 'index',

  state: {
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        dispatch({
          type: 'initMenuLink',
          payload: location,
        });
      });
    },
  },

  effects: {
    /**
     * 初始化当前菜单链接
     * @param payload
     * @param call
     * @param put
     */
    *initMenuLink({ payload }, { call, put }) {
      let menuLink = payload.pathname;
      let curMenuLink = projectUtil.setCurMenuLink(menuLink);
      if (curMenuLink !== menuLink) {
        yield put(routerRedux.push(curMenuLink));
      }
    },
  },
}
