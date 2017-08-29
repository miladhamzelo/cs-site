

import Vue from 'vue/dist/vue.js'
import Vuex from 'vuex'

Vue.use(Vuex)


const state = {
  count: 0
}



const mutations = {
  increment (state) {
    state.count++
  }
}




const actions = {
  increment (context) {
    context.commit('increment')
  }
}



export default new Vuex.Store({
  state,
  mutations,
  actions,
})