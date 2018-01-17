<template>
    <div>
        <div class="case-title">项目案例</div>

        <div class="case-list-ul">
            <div class="case-list-li">

            </div>
        </div>
    </div>
</template>

<script>

    export default{
        name:"casePage",
        props:[],
        data(){
            return {

            };
        },
        methods:{

        },
        computed:{

        },
        components:{
           /* "case-item":{
                props:[],
                render: function (createElement) {
                    return createElement('h1', this.blogTitle)
                }
            }*/
        }
    }

</script>
<style type="text/css">
    .case-title{
        height: 200px;
        background-color: #cccccc;
        width: 100%;
        text-align: center;
        line-height: 200px;
        font-size: 36px;
    }

    .case-list-ul{
        padding: 20px 20%;
        width: 100%;
        box-sizing: border-box;
    }
    .case-list-li{
        width: 25%;
        padding: 0px 10px;
        float: left;
    }
</style>