<!--
    案例列表:用于首页中的案例列表
-->
<template>
    <div class="case-list-content">
        <div class="case-list-title">
            <span class="case-list-title-cn">案例</span>
            <span class="case-list-title-en">—CASE—</span>
        </div>
        <div class="case-list" v-bind:style="{height:caseListHeight+'px'}" ref="caseList">
            <div class="case-list-left"></div>
            <case-list v-for="(item,index) in cases" v-bind:index="index" v-bind:item="item" :key="item.title"></case-list>
            <div class="case-list-right"></div>
        </div>
        <div class="case-list-action">
            <div class="case-list-left-shift wuiconfont wuicon-left-copy" v-on:click="leftShiftHandler"></div>
            <router-link class="nav-item" v-bind:to="'/case'">
                <div class="case-list-info wuiconfont wuicon-liebiao"></div>
            </router-link>
            <div class="case-list-right-shift wuiconfont wuicon-right-copy" v-on:click="rightShiftHandler"></div>
        </div>
    </div>
</template>

<script>
    import img1 from "../assets/img/case/1/1.jpg";
    import img2 from "../assets/img/case/1/2.jpg";
    import img3 from "../assets/img/case/1/3.jpg";
    import img4 from "../assets/img/case/1/4.jpg";
    import img5 from "../assets/img/case/1/5.jpg";
    import img6 from "../assets/img/case/1/6.jpg";
    import img7 from "../assets/img/case/1/7.jpg";

    /**
     * 点击展示案例时,跳转到案例的详情页面
     * @type {string}
     */
    const url = "/caseDetail/";

    export default {
        name:"caseList",
        props:[],
        data(){
            /**
             * @property {Number} _lastMoveTime - 上一次移动的时间
             */
            return {
                cases:[],
                caseListHeight:0,
                moveNeedNum:5,
                lastMoveTime:0
            };
        },
        methods:{
            /**
             * 获取需要显示的数据
             */
            getCaseAbstractInfo:function () {
                this.cases = [
                    {id:1,title:"测试案例",imgs:[img1],url:url+"1",index:0},
                    {id:2,title:"测试案例1",imgs:[img2],url:url+"2",index:1},
                    {id:3,title:"测试案例2",imgs:[img3],url:url+"3",index:2},
                    {id:4,title:"测试案例3",imgs:[img4],url:url+"4",index:3},
                    {id:5,title:"测试案例5",imgs:[img5],url:url+"5",index:4},
                    {id:6,title:"测试案例6",imgs:[img6],url:url+"6",index:5}
                ];
            },
            leftShiftHandler(){
                if( (new Date()).getTime() - this.lastMoveTime > 500  )
                {
                    this.shiftHandler(1);
                    this.lastMoveTime = (new Date()).getTime();
                }
            },
            rightShiftHandler(){
                if( (new Date()).getTime() - this.lastMoveTime > 500  )
                {
                    this.shiftHandler(2);
                    this.lastMoveTime = (new Date()).getTime();
                }
            },
            /**
             *
             * @param {Number} direction - 1:左移;2:右移;
             */
            shiftHandler(direction){
                let listItems = this.$refs.caseList.querySelectorAll(".case-list-item");
                var firstEle = null;
                var lastEle = null;

                for(let i=0;i<listItems.length;i++)
                {
                    if(firstEle == null)
                    {
                        firstEle =  listItems[i];
                    }
                    else if( Number(firstEle.style.left.replace('%','')) > Number(listItems[i].style.left.replace('%','')) )
                    {
                        firstEle =  listItems[i];
                    }

                    if(lastEle == null)
                    {
                        lastEle =  listItems[i];
                    }
                    else if( Number(lastEle.style.left.replace('%','')) < Number(listItems[i].style.left.replace('%','')) )
                    {
                        lastEle =  listItems[i];
                    }
                }

                if( listItems.length && listItems.length>this.moveNeedNum)
                {
                    if(direction == 1)
                    {
                        if(lastEle.style.left.replace('%','') == "75")//如果最后一个元素已经显示了,就把第一个元素插入到最后
                        {
                            firstEle.style.transition = "none";
                            firstEle.style.left = "100%";
                        }
                    }
                    else if(direction == 2)
                    {
                        if(firstEle.style.left.replace('%','') == "0")//如果第一个元素已经显示了,就把最后一个元素插入到最前
                        {
                            lastEle.style.transition = "none";
                            lastEle.style.left = "-25%";
                        }
                    }

                    setTimeout(()=>{
                        for(let i=0;i<listItems.length;i++)
                        {
                            let oldLeft = Number(listItems[i].style.left.replace("%",""));
                            let newLeft = ( oldLeft + (direction==1?-25:25) ) + "%";
                            listItems[i].style.left = newLeft;

                            listItems[i].style.transition = "left 0.3s ease-in 0s";
                        }
                    },200);
                }
            }
        },
        created:function(){
            console.log("案例列表创建");
        },
        mounted:function(){
            console.log("案例列表加载完成");

            var that = this;

            this.caseListHeight = ( this.$refs.caseList.clientWidth ) / 6 + 51;

            this.getCaseAbstractInfo();
        },
        updated:function(){
            console.log("案例列表更新");
        },
        components:{
            "case-list":{
                props:['item','index'],
                template:
                    '<div class="case-list-item" v-bind:style="{left:left}" v-on:click="clickFun">'
                        +'<router-link :to="item.url">'
                            +'<div class="case-list-ct">'
                                +'<div class="case-list-img" v-bind:style="{height:imgHeight+\'px\',\'background-image\':\'url(\'+backgroundImgUrl+\')\'}"></div>'
                                +'<div class="case-list-img-title">{{item.title}}</div>'
                            +'</div>'
                        +'</router-link>'
                    +'</div>',
                data:function(){
                    let url = this.$props.item.imgs[0];
                    return {
                        imgHeight:0,
                        backgroundImgUrl:url
                    };
                },
                methods:{
                    clickFun:function(){
                        console.log(this.item)
                    }
                },
                computed:{
                    left(){
                        return  (0.25*this.index*100) + "%";
                    }
                },
                created:function(){
                },
                mounted:function(){
                    this.imgHeight = this.$el.offsetWidth*2/3;
                },
                updated:function(){
                }
            }
        }
    };
</script>

<style type="text/css">
    .case-list-content{
        padding: 60px 5%;
        width: 90%;
    }

    .case-list-title-cn{
        display: block;
        font-size: 34px;
    }
    .case-list-title-en{
        display: block;
        font-size: 16px;
    }

    .case-list{
        width: 100%;
        position: relative;
        margin: 10px 0px;
    }
    .case-list-item{
        width: 25%;
        display: inline-block;
        position: absolute;
        z-index: 20;
    }
    .case-list-item>a{
        display: block;
        text-decoration: none;
    }

    .case-list-ct{
        width:100%;
        height: 100%;
        padding: 0px 10px 10px 10px;
        box-sizing: border-box;
    }
    .case-list-ct::after{
        position: relative;
        content: "";
        height: 1px;
        width: 80%;
        bottom: 0px;
        left: 10%;
        z-index: 1;
        display: block;
        background-color: #8b8b8b;
    }
    .case-list-img{
        width: 100%;
        height: 100%;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
    }
    .case-list-img-title{
        color: #666;
        font-size: 16px;
        line-height: 20px;
        padding: 10px 0px;
    }

    .case-list-left{
        height: 100%;
        width: 25%;
        position: absolute;
        z-index: 30;
        background-color: white;
        left: -25%;
    }
    .case-list-right{
        height: 100%;
        width: 25%;
        position: absolute;
        z-index: 30;
        background-color: white;
        right: -25%;
    }

    .case-list-action{
        width: 190px;
        height: 40px;
        margin: 0px auto;
    }
    .case-list-left-shift,.case-list-right-shift,.case-list-info{
        width: 40px;
        height: 100%;
        display: inline-block;
        line-height: 40px;
        box-shadow: 0 0 3px #4c4c4c;
        border-radius: 5px;
        margin: 0px 10px;
    }
    .case-list-left-shift:active,.case-list-right-shift:active,.case-list-info:active{
        background-color: #cccccc;
        color: white;
    }
    .case-list-left-shift:hover,.case-list-right-shift:hover,.case-list-info:hover{
        cursor: pointer;
        box-shadow: 0 0 3px black;
    }
</style>