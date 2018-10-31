import { parse } from 'qs';
import { message } from 'antd';
import * as projectConstant from '../../../../../../utils/rbacProjectConstant';
import { changePassword } from '../services/changePassword';

export default {
  namespace: 'changePassword',

  state: {
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === "/index/my_dashboard/my_info/change_password") {
          dispatch({
            type: 'initEdit',
            payload: location,
          });
        }
      });
    },
  },

  effects: {
    *initEdit({ payload }, { call, put }) {
    },
    *changePassword({ payload }, { call, put }) {
      const { data } = yield call(changePassword, parse(payload));
      if (data) {
        console.log('data:', JSON.stringify(data));
        if (data.code === projectConstant.CODE_SUCCESS) {
          message.success('密码修改成功');
        } else {
          message(data.text);
        }
      }
    },
  },
}
