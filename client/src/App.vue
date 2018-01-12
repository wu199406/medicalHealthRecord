<!--App.vue是项目入口文件。-->
<template>
    <div class="app" id="app" ref="app">
        <div class="app-content">
            <slider>
                <header-tab></header-tab>
                <div class="content">
                    <router-view></router-view>
                </div>
            </slider>
        </div>
    </div>
</template>

<script>
    import headerTab from './components/header.vue';
    import slider   from './components/slider.vue';
    export default {
        name: 'app',
        data () {
            let bodyEle = document.querySelector("body");
            return {
                appWidth:bodyEle.clientWidth,
                appHeight:bodyEle.clientHeight
            };
        },
        components:{
            headerTab,
            slider
        },
        created:function(){
            console.log("app创建");
        },
        mounted:function(){
            console.log("app加载完成");
        },
        updated:function(){
            console.log("app更新");
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
    h1, h2{
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
    .app{
        width:100%;
        height:100%;
    }
    .app-content{
        width:100%;
        height:100%;
    }
</style>