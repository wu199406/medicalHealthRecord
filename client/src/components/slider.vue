<!--
    滑动条组件
-->
<template>
    <!--start 滑动区域-->
    <div class="slider-area" v-bind:style="sliderAreaStyle" ref="sliderArea">

        <!--start 滑动的内容-->
        <div class="slider-content" ref="sliderContent">
            <slot></slot>
        </div>
        <!--end 滑动的内容-->

        <!--start 水平滑动条-->
        <div class="slider-level" v-bind:style="sliderLevelStyle" ref="sliderLevel"></div>
        <!--end 水平滑动条-->

        <!--start 垂直滑动条-->
        <div class="slider-vertical" v-bind:style="sliderVerticalStyle" ref="sliderVertical"></div>
        <!--end 垂直滑动条-->

        <!--start 遮盖区域-->
        <div class="slider-cover" ref="sliderCover"></div>
        <!--end 遮盖区域-->

    </div>
    <!--end 滑动区域-->
</template>

<script>
    export default{
        name:'slider',
        props:{
            /**
             * 用于设置容器的宽度,当等于0时,默认为100%
             **/
            width:{
                type: Number,
                'default': 0,
                required: false,
                validator: function (value) {
                    return value >= 0
                }
            },
            /**
             * 用于设置容器的宽度,当等于0时,默认为100%
             **/
            height:{
                type: Number,
                'default': 0,
                required: false,
                validator: function (value) {
                    return value >= 0
                }
            },
            /**
             * 滚动条的宽度
             */
            sliderWidth:{
                type: Number,
                'default': 20,
                required: false,
                validator: function (value) {
                    return value >= 0
                }
            },
            /**
             * 滚动速度
             */
            rollVelocity:{
                type: Number,
                'default': 0.2,
                required: false,
                validator: function (value) {
                    return value >= 0
                }
            }
        },
        data(){
            return {
                sliderLevelLength:0,    //水平滚动条的长度
                sliderVerticalLength:0, //垂直滚动条的长度
                sliderLevelFlag:false,  //水平滚动条是否开启
                sliderVerticalFlag:false//垂直滚动条是否开启
            };
        },
        methods:{
            /**
             * 获取滑动区域和滑动容器的大小
             *
             * @return {Object}
             */
            getSliderSize(){
                let sliderSize = {};
                let $sliderArea = this.$refs.sliderArea;
                let $sliderContent = this.$refs.sliderContent;

                sliderSize.sliderAreaWidth = ( $sliderArea != undefined && $sliderArea!=null)?$sliderArea.clientWidth:0 ;
                sliderSize.sliderAreaHeight = ( $sliderArea != undefined && $sliderArea!=null)?$sliderArea.clientHeight:0 ;

                sliderSize.sliderContentWidth = ( $sliderContent != undefined && $sliderContent!=null)?$sliderContent.clientWidth:0 ;
                sliderSize.sliderContentHeight = ( $sliderContent != undefined && $sliderContent!=null)?$sliderContent.clientHeight:0 ;

                return sliderSize;
            },
            /**
             * 显示拖动滑动条时的遮盖层
             */
            showSliderCover(){
                this.$refs.sliderCover.style.display = "block";
            },
            /**
             * 隐藏拖动滑动条时的遮盖层
             */
            hideSliderCover(){
                this.$refs.sliderCover.style.display = "none";
            },
            /**
             * 添加滑动条需要的事件处理器
             */
            addEventListeners(){
                let that = this;

                //监听鼠标在滚动区域滚动滑轮的事件,滑动滚动内容
                this.$el.addEventListener("wheel",(event)=>{
                    let deltaX = event.deltaX;
                    let deltaY = event.deltaY;
                    if( deltaY !== 0 || deltaY !== -0  )
                    {
                        that.VerticalRoll( (deltaY>0) );
                    }
                },false);


                //监听拖动垂直滚动条的事件,滑动滚动内容
                let isVerticalDrag = false;
                this.$refs.sliderVertical.addEventListener("mousedown",(event)=>{
                    isVerticalDrag = true;
                    that.showSliderCover();
                },false);
                this.$el.addEventListener("mousemove",(event)=>{
                    if( isVerticalDrag === true )
                    {
                        let y = event.movementY;
                        if(y!==0)
                        {
                            that.VerticalRoll( true , y );
                        }
                    }
                },false);
                this.$el.addEventListener("mouseup",(event)=>{
                    if(isVerticalDrag === true)
                    {
                        isVerticalDrag = false;
                        that.hideSliderCover();
                    }
                },false);
                //需要关闭滚动条上的拖放开始事件,防止影响滚动条的拖放
                this.$refs.sliderVertical.addEventListener("dragstart",(event)=>{
                    event.preventDefault();
                    event.stopPropagation();
                },false);
            },
            /**
             * 垂直滚动
             * @param {Boolean} flag    true:表示向下滚动;false:表示向上滚动;
             * @param {Number} [dragSize=null] 拖动的距离,当它为大于0的数字时,表示通过拖动滚动条实现的滚动的距离;否则表示通过鼠标滚轮的滚动.
             */
            VerticalRoll(flag,dragSize=null){
                let sliderSize = this.getSliderSize();

                if(sliderSize.sliderAreaHeight>=sliderSize.sliderContentHeight)//如果区域的高度大于容器的高度就无需滑动
                {
                    return null;
                }

                /*start 使内容区域垂直滚动*/
                let sliderContent = this.$refs.sliderContent;

                let rollLength = (dragSize!==null)?(dragSize*sliderSize.sliderContentHeight/sliderSize.sliderAreaHeight):Math.round( ( sliderSize.sliderContentHeight - sliderSize.sliderAreaHeight ) * this.rollVelocity );
                let oldTop = (sliderContent.style.top)?Number(sliderContent.style.top.replace("px","")):0;
                let newTop = flag?(oldTop - rollLength):(oldTop + rollLength);

                if( newTop < ( sliderSize.sliderAreaHeight - sliderSize.sliderContentHeight ) )
                {
                    sliderContent.style.top = (sliderSize.sliderAreaHeight - sliderSize.sliderContentHeight)+"px";
                }
                else if( newTop > 0 )
                {
                    sliderContent.style.top = "0px";
                }
                else
                {
                    sliderContent.style.top = newTop+"px";
                }
                /*end 使内容区域垂直滚动*/

                /*start 使垂直滚动条滚动*/
                let sliderVertical = this.$refs.sliderVertical;

                rollLength = (dragSize!==null)?dragSize:Math.round( ( sliderSize.sliderAreaHeight - this.sliderVerticalLength ) * this.rollVelocity );
                oldTop = (sliderVertical.style.top)?Number(sliderVertical.style.top.replace("px","")):0;
                newTop = flag?(oldTop + rollLength):(oldTop - rollLength);
                if( newTop > ( sliderSize.sliderAreaHeight - this.sliderVerticalLength )  )
                {
                    sliderVertical.style.top = (sliderSize.sliderAreaHeight - this.sliderVerticalLength)+"px";
                }
                else if( newTop < 0 )
                {
                    sliderVertical.style.top = "0px";
                }
                else
                {
                    sliderVertical.style.top = newTop+"px";
                }
                /*end 使垂直滚动条滚动*/
            },
            /**
             * 水平滚动
             *
             * @param {Boolean} flag    true:表示向右滚动;false:表示向左滚动;
             */
            levelRoll(flag){

            },
            initSlider:function(){
                let sliderSize = this.getSliderSize();
                if( sliderSize.sliderAreaHeight < sliderSize.sliderContentHeight )
                {
                    let sliderVerticalLength = sliderSize.sliderAreaHeight * sliderSize.sliderAreaHeight / sliderSize.sliderContentHeight;

                    this.$data.sliderVerticalLength = sliderVerticalLength;
                    this.$data.sliderVerticalFlag = true;

                    this.$refs.sliderVertical.style.height = sliderVerticalLength;
                }

                if( sliderSize.sliderAreaWidth < sliderSize.sliderContentWidth )
                {
                    let sliderLevelLength = sliderSize.sliderAreaWidth * sliderSize.sliderAreaWidth / sliderSize.sliderContentWidth;

                    this.$data.sliderLevelLength = sliderLevelLength;
                    this.$data.sliderLevelFlag = true;

                    this.$refs.sliderLevel.style.height = sliderLevelLength;
                }
            }
        },
        computed:{
            /**
             * 生成滚动区域的样式
             * @return {Object} 返回滚动区域的样式
             */
            sliderAreaStyle(){
                let style = {};
                if( this.$props.width > 0 )
                {
                    style.width = this.$props.width + "px";
                }
                if( this.$props.height > 0 )
                {
                    style.height = this.$props.height + "px";
                }
                return style;
            },
            /**
             * 生成水平滚动条的样式
             * @return {{}} 返回水平滚动条的样式
             */
            sliderLevelStyle(){
                let style = {
                    height : this.sliderWidth+'px',
                    height: this.sliderLevelLength + 'px'
                };
                return style;
            },
            /**
             * 垂直滚动条的样式
             * @return {{}}
             */
            sliderVerticalStyle(){
                let style = {
                    width : this.sliderWidth+'px',
                    height: this.sliderVerticalLength + 'px'
                };
                return style;
            }
        },
        created:function(){
            console.log("滑动条创建");
        },
        mounted:function(){
            console.log("滑动条加载完成");

            //添加用于实现滚动的事件
            this.addEventListeners();

            this.$nextTick(function () {
                this.initSlider();
            });
        },
        updated:function(){
            console.log("滑动条更新");
        }
    };
</script>

<style type="text/css">
    .slider-area{
        width:100%;
        height: 100%;

        position: relative;
        overflow: hidden;
    }
    .slider-content{
        width: auto;
        height:auto;
        position: relative;
        top:0;
        right: 0;

        /*transition:top 0.1s ease-in 0s , left 0.1s ease-in 0s;*/
    }
    .slider-level,.slider-vertical{
        position: absolute;
        width: 0;
        height: 0;

        z-index: 100;
        background-color: rgba(93, 93, 93, 0.4);
        border-radius: 3px;

        cursor: pointer;

        /*transition:top 0.1s ease-in 0s , left 0.1s ease-in 0s;*/
    }
    .slider-level:hover,.slider-vertical:hover{
        background-color: rgba(93, 93, 93, 0.8);
    }
    .slider-level{
        left: 0;
        bottom: 0;
    }
    .slider-vertical{
        top:0;
        right: 0;
    }
    .slider-cover{
        display: none;
        z-index:50;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
    }
</style>