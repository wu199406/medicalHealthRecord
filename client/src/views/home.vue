<!--首页的内容-->
<template>
   <div class="home-content" ref="homeRef">
      <!--顶部图片区域-->
      <ImgCarousel v-bind:parentWidth="homeContentWidth"></ImgCarousel>
   </div>
</template>

<script>
   import ImgCarousel from "../components/imgCarousel.vue";
    export default {
        name: 'home',
        data () {
            return {
                homeContentWidth:0
            };
        },
        methods:{

        },
        computed:{

        },
        components:{
            ImgCarousel
        },
        created:function(){
            console.log("首页轮播创建");
        },
        mounted:function(){
            console.log("首页加载完成");
            this.$data.homeContentWidth = this.$el.clientWidth;
        }
    }
</script>

<style type="text/css">
   .home-content{
      width: 100%;
   }
</style>