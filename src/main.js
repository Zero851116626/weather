// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//引入vuex
import Vuex from "vuex";
Vue.use(Vuex);

//引入ui
import { Tag,Area,Popup} from 'vant';
Vue.use(Tag);
Vue.use(Area);
Vue.use(Popup);

//引入请求方法
import Axios from "axios";
Vue.prototype.axios = Axios;

const store = new Vuex.Store({
  state:{
    judge:"",
  },
  computed:{
    judge(){
      return store.state.judge;
    }
  },
});

Vue.config.productionTip = false
/* eslint-disable no-new */

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store,
})
