const state = {
  editMode: null,
  routes: {}
}

const mutations = {
  TOGGLE_SIDEBAR: (state, payload)=> {
    state.editMode = payload
  },
  SET_ROUTES: (state, payload) => {
    state.routes = payload
  }
}

export default {
  namespaced: true,
  state,
  mutations,
}
