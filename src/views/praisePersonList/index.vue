<template>
    <div class="contain">
        <div class="row-box">
            <ul>
                <li class="font">中奖情况</li>
                <li class="font row-head">
                    <span>金额</span>
                    <span>人数</span>
                    <span>中奖人数</span>
                </li>
                <li class="font row">
                    <span class="text1">100</span>
                    <span class="text1">8</span>
                    <span class="text1">6</span>
                </li>
            </ul>
        </div>
         <div class="row-box">
            <ul 
                v-infinite-scroll="load" 
                style="overflow:auto"
                :infinite-scroll-distance="50"
            >
                <li class="font">中奖名单</li>
                <li 
                    class="font row" 
                >
                    <span class="text1 username">姓名</span>
                    <span class="text1">电话</span>
                    <span class="text1">中奖情况</span>
                    <span class="text1 buynumber">购买数量</span>
                </li>
                <li class="font row infinite-list-item" 
                    v-for="(index,item) in count" 
                    :key="index"
                >
                    <span class="text1 username">某某</span>
                    <span class="text1">15038869802</span>
                    <span class="text1">电动热水壶</span>
                    <span class="text1 text2 buynumber">{{count}}</span>
                </li>
                <li @click="xxx()">
                    <span>查看更多</span>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            count:0,
            test:13514785254
        }
    },
    mounted(){

    },
    components:{

    },
    methods:{
        load () {
            // this.count += 2
            // this.test +=1
            
            // this.count +=1
        },
        xxx(){
            this.count +=10
        }
    },
}
</script>
<style lang="stylus" scoped>
.contain
    width 100%
    height 100%
    background #CB0C05
    overflow auto
    .row-box
        margin 0.61rem 0.67rem 0.51rem
        // height 10rem
        background rgba(229,229,229,0.2)
        // opacity 0.2
        border-radius 0.21rem
        ul
            &>li
                min-height 2.64rem
                font-size 0.85rem
                // line-height 2.64rem
                color #FFFFFF
                border-bottom 1px solid rgba(245,245,245,0.2)
                align-items center
                &:nth-child(1)
                    font-size 0.9rem
                    color #FFE33F
                    font-weight bold
                    line-height 2.64rem
                &:last-child
                    border none
                    line-height 2.64rem
            .row-head,.row
                display flex
                align-items center
                &>span
                    flex 1
                    font-size 0.75rem
                    overflow hidden;
                    word-wrap break-word
                    word-break break-all
                    padding 5px
                .username,.buynumber
                    flex 0.6
                .text1
                    font-size 0.75rem
                
</style>