<!--图片轮播组件-->
<template>
    <div class="imgCarousel-content">
        <div ref="imgContainer" v-bind:style="{width:(parentWidth*3)+'px'}"><!--轮播图片的容器-->
            <img v-for="(item, index) in imgArray" v-bind:src="item" v-bind:style="{width:parentWidth+'px',left:(parentWidth*index)+'px',top:'0px'}"/>
        </div>
        <template v-if="imgArray.length>1"><!--使用包装元素-->
            <div class="imgCarousel-button imgCarousel-left-button iconfont icon-leftjiantou" v-on:click="pictureLeftMove"></div>
            <div class="imgCarousel-button imgCarousel-right-button iconfont icon-youjiantou" v-on:click="pictureRightMove"></div>
        </template>
    </div>
</template>

<script>
    import img1 from '../assets/img/1.jpg';
    import img2 from '../assets/img/2.jpg';
    import img3 from '../assets/img/3.jpg';

    export default {
        name:'imgCarousel',
        props:["parentWidth"],
        data:function(){
            return {
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
            }
        },
        created:function(){
            console.log("图片轮播创建");
        },
        mounted:function(){
            console.log("图片轮播加载完成");
            console.log(this.$props);
        },
        update:function(){
            console.log(this.$props)
        }
    };
</script>

<style type="text/css">
    .imgCarousel-content{
        width:100%;
        position: relative;
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