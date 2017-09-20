<!--首页的内容-->
<template>
   <!--顶部图片区域-->
   <ImgCarousel></ImgCarousel>
</template>

<script>
   import ImgCarousel from "../components/imgCarousel.vue";
    export default {
        name: 'home',
        data () {
            return {
                todos: [
                    { text: 'Learn JavaScript' },
                    { text: 'Learn Vue' },
                    { text: 'Build something awesome' }
                ]
            }
        },
        methods:{
            eClick(){
                console.log(9999);
            }
        },
        components:{
            ImgCarousel
        }
    }
</script>
