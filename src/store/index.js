import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)
// Storeを生成
const store = new Vuex.Store({
    state: {
        userId: null
    },
    mutations: {
        getUserId(state, userId) {
            state.userId = userId
        }
    }
});
export default store;