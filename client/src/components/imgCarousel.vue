<!--图片轮播组件-->
<template>
    <div class="imgCarousel-content">
        <div ref="imgContainer" v-bind:style="{width:(componentWidth*3)+'px',height:(componentWidth*imgProportion)+'px'}"><!--轮播图片的容器-->
            <img v-for="(item, index) in imgArray" v-bind:src="item" v-bind:style="{width:componentWidth+'px',height:(componentWidth*imgProportion)+'px',left:(componentWidth*index)+'px',top:'0px'}"/>
        </div>
        <template v-if="imgArray.length>1"><!--使用包装元素-->
            <div class="imgCarousel-button imgCarousel-left-button wuiconfont wuicon-left-copy" v-on:click="pictureLeftMove"></div>
            <div class="imgCarousel-button imgCarousel-right-button wuiconfont wuicon-right-copy" v-on:click="pictureRightMove"></div>
        </template>
    </div>
</template>

<script>
    import img1 from '../assets/img/1.jpg';
    import img2 from '../assets/img/2.jpg';
    import img3 from '../assets/img/3.jpg';

    export default {
        name:'imgCarousel',
        props:{
            imgProportion:{
                type: Number,
                default: (800/1920),
                required: false,
                validator: function (value) {
                    return value >= 0
                }
            }
        },
        data:function(){
            return {
                componentWidth:0,//组件的宽度
                imgArray:[img1,img2,img3]
            };
        },
        methods:{
            /**
             * 左移动图片
             */
            pictureLeftMove:function(){
                let itme1 = this.imgArray.shift();
                this.imgArray.push(itme1);
            },
            /**
             * 右移动图片
             */
            pictureRightMove:function(){
                let itme1 = this.imgArray.pop();
                this.imgArray.unshift(itme1);
            },
            /**
             * 当组件的所在的窗口的大小发生变化时,修改width属性,以修改图片的高度
             * @param event
             */
            resize(event){
                let that = this;
                let flag  = false;
                return (function () {
                    if(flag == false)
                    {
                        flag = true;
                        setTimeout(()=>{
                            flag = false;
                            that.componentWidth = that.$el.clientWidth;
                        },300);
                    }
                });
            }
        },
        created:function(){
            console.log("图片轮播创建");
            window.addEventListener('resize', this.resize());
        },
        mounted:function(){
            console.log("图片轮播加载完成");
            this.componentWidth = this.$el.clientWidth;
        },
        updated:function(){
            console.log("图片轮播更新");
        }
    };
</script>

<style type="text/css">
    .imgCarousel-content{
        width:100%;
        position: relative;
        overflow: hidden;
    }
    .imgCarousel-content img{
        height: auto;
        display: none;
    }
    .imgCarousel-content img:first-child{
        display: block;
    }


    .imgCarousel-button{
        width: 40px;
        height: 40px;

        position:absolute;
        top: calc(50% - 20px);

        opacity: 0;
    }
    .imgCarousel-button:before{
        font-size: 20px;
        line-height: 20px;
        position: relative;
        top: 10px;
    }
    .imgCarousel-left-button{
        left:20px;
    }
    .imgCarousel-right-button{
        right:20px;
    }
    .imgCarousel-content:hover .imgCarousel-button{
        opacity: 1;
        background-color: rgba(0, 0, 0, 0.4);
    }
    .imgCarousel-content:hover .imgCarousel-button:before{
        color: rgba(255, 255, 255, 0.4);
    }
    .imgCarousel-content .imgCarousel-button:hover{
        opacity: 1;
        background-color: rgba(0, 0, 0, 0.8);
    }
    .imgCarousel-content .imgCarousel-button:hover:before{
        color: rgba(255, 255, 255, 0.8);
    }
</style>