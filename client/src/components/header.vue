<template>
    <div class="header">
        <div class="header-title">{{title}}</div>
        <div class="header-content">
            <ul>
                <nav-li v-for="item in navData" v-bind:item="item" :key="item.name">12</nav-li>
            </ul>
        </div>
    </div>
</template>

<script type="application/javascript">
    export default{
        name : "header",
        data () {
            return {
                title:"背景墙",
                navData:[
                    {name:"首页",url:"/"},
                    {name:"项目案例",url:"/"},
                    {name:"招聘信息",url:"/about"},
                    {name:"联系",url:"/"}
                ]
            };
        },
        components:{
            'nav-li':{
                props:['item'],
                template:'<li>' +
                '   <router-link class="nav-item" v-bind:to="item.url" v-on:mouseover.native="mouseIOverHandler" v-on:mouseout.native="mouseOutHandler">{{ item.name }}</router-link>' +
                '</li>',
                methods:{
                    mouseIOverHandler:function(event){
                        let target = event.target;
                        target.className += " open";
                    },
                    mouseOutHandler:function(event){
                        let target = event.target;
                        target.className = target.className.replace("open","").replace(/^\s+|\s+$/g,"");
                    }
                }
            }
        }
    };
</script>

<style type="text/css">
    .header{
        height: 60px;
        line-height: 60px;
    }
    .header-title{
        float: left;
    }
    .header-content{
        float:right;
    }
    .header-content ul{
        line-height: 60px;
        margin: 0;
    }
    .header-content li {
        float: left;
    }
    .header-content li a{
        text-decoration:none;
        color:black;
        display: block;
        position: relative;
    }
    .header-content li a:after{
        content: '';
        width: 0;
        background-color: #696969;
        left: 0;
        position: absolute;
        top: 0;
        height: 2px;
        transition: all 0.3s ease 0s;
        z-index: -1;
    }
    .header-content li a.open:after{
        content: '';
        width: 100%;
        background-color: #696969;
        left: 0;
        position: absolute;
        top: 0;
        height: 2px;
        transition: all 0.3s ease 0s;
        z-index: -1;
    }
    .header-content li a.router-link-exact-active:after{
        content: '';
        width: 100%;
        background-color: #696969;
        left: 0;
        position: absolute;
        top: 0;
        height: 2px;
        transition: all 0.3s ease 0s;
        z-index: -1;
    }
</style>