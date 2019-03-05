const state = {
  user: {
    username: '',
    password: '',
  },
}
const getters = {
  getUser: state => state.user,
}
const mutations = {
  setUser(state, data) {
    state.user = data;
  },
};
export default {
  namespaced: true,
  state,
  getters,
  mutations,
};