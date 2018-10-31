import { getProjectInfo } from '../../../services/systemConfig';
import { loginByAccount } from '../services/service';
import { parse } from 'qs';
import { message } from 'antd';
import { routerRedux } from 'dva/router';
import * as projectConstant from '../../../utils/rbacProjectConstant'
import * as projectUtil from '../../../utils/rbacProjectUtil';

export default {
  namespace: 'userLogin',

  state: {
    /* 加载动画开关 */
    loading: false,
    /* 工程配置信息 */
    projectInfo:[],
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/' || location.pathname === '/login') {
          dispatch({
            type: 'initProjectInfo'
          });
        }
      });
    },
  },

  effects: {
    /**
     * 初始化工程配置参数
     * @param payload
     * @param call
     * @param put
     */
    *initProjectInfo({ payload }, { call, put }) {
      yield put({ type: 'hideLoading' });
      let projectInfo = projectUtil.getProjectInfo();
      //console.log('projectInfo:', projectInfo);
      if (projectInfo === null || projectInfo === undefined) {
        const { data } = yield call(getProjectInfo, parse(payload));
        if (data) {
          //console.log('data:', data);
          if (data.code === projectConstant.CODE_SUCCESS) {
            projectUtil.setProjectInfo(data.data);
            projectInfo = projectUtil.getProjectInfo();
          }
        }
      }
      yield put({ type: 'setProjectInfo', payload: projectInfo });
    },
    *login({ payload }, { call, put }) {
      yield put({ type: 'showLoading' });
      yield put({ type: 'loginByAccount', payload });
      console.log('payload:', payload);
      const { data } = yield call(loginByAccount, parse(payload));
      if (data) {
        yield put({ type: 'hideLoading' });
        //console.log('data:', data);
        //console.log('data.code:', data.code);
        //console.log('data.data.token:', data.data.token);
        //console.log('data.data.main_menu_s:', JSON.stringify(data.data.main_menu_s));
        //console.log('data.data.side_menu_s:', JSON.stringify(data.data.side_menu_s));
        if (data.code === projectConstant.CODE_SUCCESS) {
          //登录成功
          //--------- token
          sessionStorage.removeItem(projectConstant.KEY_TOKEN);
          sessionStorage.setItem(projectConstant.KEY_TOKEN, data.data.token);
          //--------- main menu s
          sessionStorage.removeItem(projectConstant.KEY_MAIN_MENU_S);
          sessionStorage.setItem(projectConstant.KEY_MAIN_MENU_S, JSON.stringify(data.data.main_menu_s));
          //--------- side menu s
          sessionStorage.removeItem(projectConstant.KEY_SIDE_MENU_S);
          sessionStorage.setItem(projectConstant.KEY_SIDE_MENU_S, JSON.stringify(data.data.side_menu_s));
          //--------- menu map
          sessionStorage.removeItem(projectConstant.KEY_MENU_MAP);
          sessionStorage.setItem(projectConstant.KEY_MENU_MAP, JSON.stringify(data.data.menu_map));
          //取菜单
          let curMenus = projectUtil.initMenus();
          //console.log("curMenus : " + JSON.stringify(curMenus));
          if (curMenus !== null) {
            //--------- cur menu link
            projectUtil.setCurMenuLink(curMenus.sideMenu.link);
            yield put(routerRedux.push(projectUtil.getCurMenuLink()));
          }
        } else {
          //登录失败
          message.error(data.text);
        }
      }
    },
  },

  reducers: {
    showLoading(state, action) {
      return { ...state, loading: true };
    },
    hideLoading(state, action) {
      return { ...state, loading: false };
    },
    setProjectInfo(state, action) {
      return { ...state, projectInfo: action.payload, loading: false };
    },
  },

}
