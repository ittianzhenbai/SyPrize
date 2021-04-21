<template>
    <div class="contain">
        <div class="activity">
            <div class="title font">石原金牛抽奖业务员名称</div>
            <ul class="activity-info">
                <li>
                    <span class="text1">手机</span>号：
                    <span class="text2 num">15038869802</span>
                </li>
                <li>
                    <span class="text">地</span>址：
                    <span class="text2">浙江省杭州市滨江区江虹路765号浙农科创园3 号楼3325室 </span>
                </li>
                <li>
                    开始时间：2121-2-1 9:00
                </li>
                <li>
                    结束时间：2121-2-28 9:00
                </li>
                <li>
                    <span class="text1">执行</span>人：
                    <span class="text2 num">洪永曦</span>
                </li>
            </ul>
             <div class="prasie-setting">
                <ul>
                    <li class="header">
                        <span class="col-1">奖项名称</span>
                        <span class="col-2">奖品</span>
                        <span class="col-3">数量</span>
                        <span class="col-4">中奖人数</span>
                    </li>
                    <li class="content font" v-for="(item,index) in 2" :key="index">
                        <span class="col-1">特别优胜奖</span>
                        <span class="col-2">热水壶</span>
                        <span class="col-3">5</span>
                        <span class="col-4">2</span>
                    </li>
                </ul>
            </div>
        </div>
        <div class="praise-person">
            <ul>
                <li class="font">
                    <span>中奖名单</span>
                </li>
                <li class="header font">
                    <span class="col-1">姓名</span>
                    <span class="col-2">电话</span>
                    <span class="col-3">中奖情况</span>
                    <span class="col-4">购买数量</span>
                </li>
                <li class="content font" v-for="(item,index) in 2" :key="index">
                    <span class="col-1">张小志</span>
                    <span class="col-2">13283659856</span>
                    <span class="col-3 text3">水壶测试</span>
                    <span class="col-4">3</span>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            isshow:false,
            isquxiao:false,
            alertmsg:'',
             tableData: [{
                date: '一等奖',
                name: '食用油',
                address: '5人'
                }, {
                date: '二等奖',
                name: '卫生纸',
                address: '15人'
                }, {
                date: '三等奖',
                name: '50元优惠券',
                address: '20人'
                }, {
                date: '纪念奖',
                name: '20元优惠券',
                address: '30人'
                }],
        }
    },
    mounted(){

    },
    components:{
    },
    methods:{
        rowStyle({ row, rowIndex}) {
            return {
                color:'#333333',
                lineHeight:'1.2rem',
                height:'1rem',
                fontSize:"0.85rem",
                cursor:'pointer',
                fontFamily:"MicrosoftYaHei",
                fontWeight:"Regular",
                borderBottom:"none"
            }
        }
    },
}
</script>
<style lang="stylus" scoped>
.contain
    background #F4F4F4
    width 100%
    height 100%
    overflow auto
    .activity
        background #FFFFFF
        margin-top 0.53rem
        padding 1.04rem 0.67rem 0.6rem 0.69rem
        .title
            text-align left
            color #333333
            font-weight regular
            font-size 0.9rem
            margin-bottom 0.8rem
        .activity-info
            display inline-block
            width 100%
            text-align left
            font-size 0.75rem
            line-height 1.87rem
            .text
                letter-spacing 1.6rem
            .text1
                letter-spacing 0.4rem
            .text2
                display inline-block
                width calc(100% - 5.5rem)
                vertical-align top
                line-height 1.3rem
                padding-top 8px
            .num
                padding-top 6px
        .prasie-setting
            font-size 0.75rem
            ul
                width 100%
                &>li
                    min-height 2.3rem
                    // line-height 2.64rem
                    color #333333
                    font-size 0.8rem
                    display flex
                    text-align center
                    align-items center
                    span
                        flex 1
                        padding 5px
                    .col-3,.col-4
                        flex 0.6
                .header
                    font-size 0.75rem
                    font-family Microsoft YaHei
                    font-weight 400
                    font-weight bold
    .praise-person
        margin-top 0.56rem
        background-color #FFFFFF
        ul
            width 100%
            &>li
                min-height 2.64rem
                // line-height 2.64rem
                border-bottom 2px solid #F4F4F4
                color #333333
                font-size 0.8rem
                display flex
                text-align center
                align-items center
                span
                    flex 1
                    padding 5px
                    word-wrap break-word
                    word-break break-all
                .text3
                    color #FF5F00
                    padding 5px
                .col-2,.col-3
                    flex 1.6
            .header
                font-size 0.75rem
                font-weight bold
                color #999999

</style>