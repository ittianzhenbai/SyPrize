<template>
    <div class="contain">
        <div class="activity">
            <div class="title font">业务员：{{mobile}}</div>
            <ul class="activity-info">
                <li>
                    <span class="text1">手机</span>号：
                    <span class="text2 num">{{prizedetail.phone}}</span>
                </li>
                <li>
                    <span class="text">地</span>址：
                    <span class="text2">{{prizedetail.address}} </span>
                </li>
                <li>
                    开始时间：{{prizedetail.start_date}}
                </li>
                <li>
                    结束时间：{{prizedetail.end_date}}
                </li>
                <li>
                    <span class="text1">执行</span>人：
                    <span class="text2 num">洪永曦</span>
                </li>
            </ul>
             <div class="prasie-setting">
                 <ul>
                    <li>
                        <span class="text-title">奖项名称</span>
                        <span class="text-title">奖品</span>
                        <span class="text-title col-3">数量</span>
                    </li>
                    <li class="font" v-for="(item,index) in 2" :key="index">
                        <span class="text2">特别优胜奖</span>
                        <span class="text2">热水壶</span>
                        <span class="text3 col-3">5</span>
 
                    </li>
                    <li class="font">
                        <span class="text2">张志</span>
                        <span class="text2">热水壶</span>
                        <span class="text3 col-3">5</span>
                    </li>
                </ul>
            </div>
        </div>
       
        <ul class="btns" v-if="userIdentity == 'salesman'">
            <li>
               <el-button 
                    class="botton font" 
                    size="mini" 
                    @click="startOption()">
                    开始
                </el-button> 
            </li>
            <li>
                 <el-button 
                    class="botton font"  
                    size="mini" 
                    @click="updateOption()">
                    编辑
                </el-button> 
            </li>
            <li>
                 <el-button 
                    class="botton font" 
                    size="mini" 
                    @click="delOption()">
                    删除
                </el-button> 
            </li>
        </ul>
        <div 
            class="start-btn font" 
            v-if="userIdentity == '2'"
            @click="startOption()"
        >
            开始
        </div>
        <msgAlert 
            :isshow = isshow
            :msg = alertmsg
            @changeshow = changeshow
            :isquxiao = isquxiao
            ></msgAlert>
    </div>
</template>
<script>
import msgAlert from "@/components/msgAlert/msgAlert.vue"
import { mapState,mapMutations } from "vuex"
export default {
    data(){
        return{
            isshow:false,
            isquxiao:false,
            alertmsg:'',
            prizedetail:{},//抽奖详情
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
    computed:{
        ...mapState(["userIdentity","token","mobile","prizeId"])
    },
    mounted(){
        this.getPrizeDetail()
    },
    components:{
        msgAlert
    },
    methods:{
        getPrizeDetail(){
            this.request.post(
                "lottery/prize/prize_detail",
                {
                    token:this.token,
                    prize_id:this.prizeId
                }
            ).then(res=>{
                console.log(res)
                if(res.code == 1){
                    this.prizedetail = res.data
                }
            })
        },
        delPrize(){
            this.request.post(
                "lottery/prize/delete_prize",
                {
                    token:this.token,
                    prize_id:this.prizeId
                }
            ).then(res=>{
                console.log("删除抽奖的信息为：",res)
                if(res.code == 1){
                    this.$router
                }
            })
        },
        startOption(){
            console.log("开始")
            this.isshow = true
            this.isquxiao = true
            this.alertmsg = "是否开启本次抽奖？"
        },
        updateOption(){
            console.log("修改")
        },
        delOption(){
            this.isshow = true
            this.isquxiao = true
            this.alertmsg = "是否删除本次抽奖？"
        },
        changeshow(val){
            //控制弹窗是否显示
            this.isshow = val
            // console.log("666",val)
            if(this.alertmsg == "是否删除本次抽奖？"){
                console.log("这里执行了删除操作")
                this.delPrize()
            }
        },
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
            font-size 0.96rem
            margin-bottom 0.85rem
        .activity-info
            display inline-block
            width 100%
            text-align left
            fong-size 0.8rem
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
            font-size 0.8rem !important
    .btns
        margin 1.33rem auto
        &>li
            width 5.33rem
            height 2.13rem
            display inline-block
            margin-right 0.77rem
            &:nth-child(3)
                margin-right 0
            .botton
                width 100%
                height 100%
                border 1px solid #FF5F00
                color #FF5F00
                background #F4F4F4
                font-size 0.91rem
    .start-btn
        margin 1.33rem 1.15rem 1rem 1.23rem
        height 2.13rem
        border 1px solid #FF5F00
        color #FF5F00
        font-size 0.91rem
        line-height 2.13rem
        border-radius 0.21rem
</style>