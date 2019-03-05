import Vue from 'vue';
import Vuex from 'vuex';
import login from './modules/login';
Vue.use(Vuex);
const reportStore = {
  state: {
    curTaskApkId: '',
    curTaskApkName: '',
    curTaskApkVersion: '',
  },
  mutations: {
    setTaskId(state, id) {
      state.curTaskApkId = id;
    },
    setTaskName(state, name) {
      state.curTaskApkName = name;
    },
    setTaskApkVersion(state, version) {
      state.curTaskApkVersion = version;
    },
  },
  actions: {
    setTask({ commit }, data) {
      commit('setTaskId', data.id);
      commit('setTaskName', data.name);
      commit('setTaskApkVersion', data.version);
    },
  },
};
export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    login,
  },
  ...reportStore,
});