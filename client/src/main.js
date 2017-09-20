//main.js这是项目的核心文件。全局的配置都在这个文件里面配置
import Vue from 'vue'
import App from './App.vue'
import router from './routes.js'

import './assets/styles/base.css'

Vue.config.debug = true;//开启错误提示


//核心实例
new Vue({
    router,
    el: '#appId',
    render: h => h(App)
});
