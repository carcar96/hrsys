import { createStore } from 'vuex'

export default createStore({
  state: {
    bcList: [], // 面包屑
  },
  getters: {
    getStateByKey: (state) => (key => {
      return state[key];
    })
  },
  mutations: {
    updateStateByKey(state, params) {
      state[params.key] = params.value;
    }
  },
  actions: {
    setStateByKey(context, params) {
      context.commit('updateStateByKey', params);
    }
  },
  modules: {
  }
})
