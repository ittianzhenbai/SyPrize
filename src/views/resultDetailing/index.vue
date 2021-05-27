<template>
    <div class="contain">
        <div class="activity">
            <div class="title font">{{prizedetail.shop_name}}</div>
            <ul class="activity-info">
                <li>
                    <span class="text1">手机</span>号：
                    <span class="text2 num">{{prizedetail.phone}}</span>
                </li>
                <li>
                    <span class="text">地</span>址：
                    <span class="text2">{{prizedetail.address}}</span>
                </li>
                <li>
                    活动产品：{{prizedetail.goods_name}}
                </li>
                <li>
                    开始时间：{{prizedetail.start_date}}
                </li>
                <li>
                    结束时间：{{prizedetail.end_date}}
                </li>
                <li>
                    <span class="text1">执行</span>人：
                    <span class="text2 num">{{prizedetail.realname}}</span>
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
                    <li class="content font" v-for="item in prizeresult.prize" :key="item.id">
                        <span class="col-1">{{item.name}}</span>
                        <span class="col-2">{{item.money}}</span>
                        <span class="col-3">{{item.number}}</span>
                        <span class="col-4">{{item.prize_number}}</span>
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
                <li class="font" v-show="prizeresult.total == 0">
                    <span>暂无数据</span>
                </li>
                <li class="content font" v-for="item in prizeresult.list" :key="item.mid">
                    <span class="col-1">{{item.username}}</span>
                    <span class="col-2">{{item.phone}}</span>
                    <span class="col-3 text3">{{item.money}}</span>
                    <span class="col-4">{{item.num}}</span>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import { mapState} from "vuex"
export default {
    data(){
        return{
            isshow:false,
            isquxiao:false,
            alertmsg:'',
            prizedetail:{},//抽奖详情
            prizeresult:{},//中奖详情
        }
    },
    computed:{
        ...mapState(["userIdentity","token","prizeId","curname"]),
    },
    mounted(){
        this.getPrizeDetial()
        this.getPrizeResult()
    },
    methods:{
       getPrizeDetial(){
           //获取抽奖详情
           this.request.post(
               "lottery/prize/prize_detail",
               {
                   token:this.token,
                   prize_id:this.prizeId
               }
           ).then(res=>{
               console.log("获取到的抽奖的信息为",res)
              if(res.code == 1){
                  this.prizedetail = res.data
              }
           })
       },
       getPrizeResult(){
           //获取抽奖结果  中奖名单
           this.request.post(
               "lottery/prize/get_lottery_members",
               {
                   token:this.token,
                   prize_id:this.prizeId
               }
           ).then(res=>{
               if(res.code == 1){
                   this.prizeresult = res.data
                   console.log(res)
               }
           })
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
    overflow-x hidden
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