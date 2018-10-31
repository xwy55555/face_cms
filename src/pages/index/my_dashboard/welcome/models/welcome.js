
export default {
  namespace: 'welcome',

  state: {
    /* 当前操作：新增、编辑、删除等 */
    curAction: '',
    /* 当前操作名称：新增、编辑、删除等 */
    curActionName: '',
    /* 是否显示actionBar */
    actionBarVisible: true,
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === "/index/my_dashboard/welcome") {
          dispatch({
            type: 'initView',
            payload: location,
          });
        }
      });
    },
  },

  effects: {
    *initView({ payload }, { call, put }) {
    },
  },
}
