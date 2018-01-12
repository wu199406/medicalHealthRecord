<!--首页的内容-->
<template>
   <div class="home-content" ref="homeRef">
      <!--顶部图片区域-->
      <ImgCarousel></ImgCarousel>
      <case-list></case-list>
   </div>
</template>

<script>
   import ImgCarousel from "../components/imgCarousel.vue";
   import CaseList from "../components/caseList.vue";

    export default {
        name: 'home',
        data () {
            return {
            };
        },
        methods:{
        },
        computed:{

        },
        components:{
            ImgCarousel,
            CaseList
        },
        created:function(){
            console.log("首页创建");
        },
        mounted:function(){
            console.log("首页加载完成");
        },
        updated:function(){
            console.log("首页更新");

        }
    }
</script>

<style type="text/css">
   .home-content{
      width: 100%;
   }
</style>