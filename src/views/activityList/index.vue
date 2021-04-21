<template>
    <div class="contain" >
        <div class="cur-account">
            <div class="acc-left font">
                账号：{{mobile}}
            </div>
            <div 
                v-show="userIdentity == 'salesman'"
                class="acc-right font"  
                @click="addPraise()">
                新增抽奖
            </div>
        </div>
        <div class="list-box" v-if="praiselist.length != 0" >
            <ul class="activity-list">
                <li 
                    class="single-activity" 
                    @click="goDetail(item)"
                    v-for="(item,index) in praiselist"
                    :key="index"
                >
                    <div class="row1 font">
                        <p class="name">{{item.shop_name}}</p>
                        <span 
                            :class='[item.status == 0? "status":item.status == 1 ? "status ing":"status over"]'
                        >{{item.status == 0? "未开始":item.status == 1 ? "已开始":"已结束"}}</span>
                    </div>
                    <ul class="act-info font">
                        <li>
                             <span class="text1">手机</span>号：
                             <span class="text2 num">{{item.phone}}</span>
                        </li>
                        <li>
                            <span class="text">地</span>址：
                            <p class="text2 p">{{item.address}}</p>
                        </li>
                        <li>
                            开始时间：<span class="text2 time">{{item.start_date}}</span>
                        </li>
                        <li>
                            结束时间：<span class="text2 time">{{item.end_date}}</span>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <div class="no-activity font" v-if="praiselist.length == 0">暂无抽奖数据</div>
    </div>
</template>
<script>
import { mapState,mapMutations } from "vuex"
export default {
    data(){
        return{
            status:'2',
            praiselist:[],//中奖列表
            page:1,//当前页
            pagesize:10//每页数据量
        }
    },
    computed:{
        ...mapState(["userIdentity","token","mobile"])
    },
    created(){
    },
    mounted(){
        console.log(this.userIdentity,this.mobile)
        this.getPraiseList(this.page,this.pagesize)
    },
    components:{

    },
    methods:{
        ...mapMutations(["setprizeId"]),
        addPraise(){
            this.$router.push({
                path:"/praiseSetting",
            })
        },
        getPraiseList(page,pagesize){
            //获取抽奖列表
            let that = this
            this.request.post(
                "lottery/prize/get_prize",
                `token=${this.token}&page=${page}&pagesize=${pagesize}`
            ).then(res=>{
                console.log("获取到的抽奖列表信息为：",res)
                console.log(res.code)
                switch(res.code){
                    case 0:
                        console.log("获取数据失败")
                        that.praiselist = []
                        break;
                    case 1:
                        console.log("获取数据成功")
                        that.praiselist = res.data.list
                        break;
                    case 210:
                        that.praiselist = []
                        break;
                    default:
                        break;
                }
            })
        },
        goDetail(item){
            console.log(item)
            this.setprizeId(item.prize_id)
            switch(item.status){
                case 0:
                    this.$router.push({
                        path:"/resultDetail"
                    })
                    break;
                case 2:
                    this.$router.push({
                        path:"/resultDetailing"
                    })
                    break;
                case 1:
                   this.$router.push({
                        path:"/resultDetailing"
                    })
                    break; 
            }
        }
    },
}
</script>
<style lang="stylus" scoped>
.contain
    overflow auto
    height 100%
    width 100%
    background-color #F4F4F4
    .cur-account
        width 100%
        height 3.2rem
        background #FFFFFF
        .acc-left 
            float left
            font-size 0.96rem
            padding-left 0.67rem
            line-height 3.2rem
        .acc-right
            float right
            width 5.33rem
            height 2.13rem
            line-height 2.13rem
            margin 0.53rem 0.64rem 0 0
            background-color #FF5F00
            font-size 0.91rem
            color #FFFFFF
            border-radius 0.21rem
    .list-box
        padding 0 0.64rem 0 0.67rem
        .activity-list
            .single-activity
                font-size 1rem
                margin-top 0.53rem
                background #FFFFFF
                min-height 9.6rem
                box-shadow 0rem 0rem 0rem 0rem rgba(145, 145, 145, 0.32)
                border-radius 0.21rem
                padding-left 0.86rem
                .row1
                    padding 1.07rem 0 0.35rem 0
                    text-align left
                    .name
                        clear both
                        margin 0
                        width calc(100% - 5rem)
                        display inline-block
                        overflow hidden
                        text-overflow ellipsis
                        white-space nowrap
                    .status
                        float right
                        width 4rem
                        height 1.6rem
                        background #FF5F00
                        display block
                        border-top-left-radius 0.8rem
                        border-bottom-left-radius 0.8rem
                        text-align center
                        font-size 0.8rem
                        line-height 1.6rem
                        color #FFFFFF
                        position relative
                        bottom 0.3rem
                    .ing
                        background #1AA93A
                    .over
                        background #919191
                .act-info
                    width 100%
                    text-align left
                    font-size 0.75rem
                    color #666666
                    line-height 1.5rem
                    padding-right 0.88rem
                    .text
                        letter-spacing 1.5rem
                    .text1
                        letter-spacing 0.375rem
                    .text2
                        display inline-block
                        width calc(100% - 5.2rem)
                        vertical-align top
                    .p
                        margin 0
                        width calc(100% - 5.2rem)
                        overflow hidden
                        text-overflow ellipsis
                        white-space nowrap
                    .time
                        padding-left 0.2rem
    .no-activity
        margin-top 4.59rem
        color #999999
        font-size 0.8rem
</style>
