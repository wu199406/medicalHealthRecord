<!--App.vue是项目入口文件。-->
<template>
    <div id="app">
        <header-tab></header-tab>
        <div>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import HeaderTab from './components/header.vue';
    export default {
        name: 'app',
        data () {
            return {
                msg: '欢迎，使用该vue app'
            }
        },
        components:{
            HeaderTab
        }
    }
</script>

<style type="text/css">
    /*这里sass编译正常*/
    /* $redColor:#f00;*/
     h2{
         color:#f00;
     }
     #app {
         text-align: center;
         color: #2c3e50;
     }
     h1, h2 {
         font-weight: normal;
     }
     ul {
         list-style-type: none;
         padding: 0;
     }
     li {
         text-align: left;
         margin: 0 10px;
     }
     a {
         color: #42b983;
     }
</style>