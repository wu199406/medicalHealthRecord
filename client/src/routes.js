// 引用模板
import Vue from 'vue';
import Router from 'vue-router';

import homePage from './views/home.vue';
import caseVue from './views/case.vue';
import caseDetail from './views/caseDetail.vue';
import contact from './views/contact.vue';
import recruit from './views/recruit.vue';


Vue.use(Router);

export default new Router({
    routes:[
        {path:'/',component:homePage},//主页
        {path:'/case',component:caseVue},//所有的案例展示页面
        {path:'/caseDetail/:id',component:caseDetail},//案例详情页面页面,id参数是案例的id主键
        {path:'/recruit',component:recruit},//公司的招聘信息页面
        {path:'/contact',component:contact}//公司的概要信息和联系信息
    ]
})