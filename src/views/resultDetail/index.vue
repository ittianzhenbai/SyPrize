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
                    <span class="text2 address">{{prizedetail.address}} </span>
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
                    <li>
                        <span class="text-title">奖项名称</span>
                        <span class="text-title">奖品</span>
                        <span class="text-title col-3">数量</span>
                    </li>
                    <li class="font" v-for="item in prizelist" :key="item.id">
                        <span class="text2">{{item.name}}</span>
                        <span class="text2">{{item.money}}</span>
                        <span class="text3 col-3">{{item.number}}</span>
 
                    </li>
                </ul>
            </div>
        </div>
       
        <ul class="btns" v-if="userIdentity == 'salesman'&& isexecutor == false">
            <li 
                >
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
            v-if="isexecutor == true"
            @click="startOption()"
        >
            开始
        </div>
        <msgAlert 
            :isshow = isshow
            :msg = alertmsg
            @changeshow = changeshow
            @msgstatus = getMsgstatus
            :isquxiao = isquxiao
            ></msgAlert>
    </div>
</template>
<script>
import msgAlert from "@/components/msgAlert/msgAlert.vue"
import { mapState} from "vuex"
export default {
    data(){
        return{
            isshow:false,
            isquxiao:false,
            alertmsg:'',
            prizedetail:{},//抽奖详情
            prizelist:[],//抽奖列表
            prizeid:"",//抽奖的id
            isexecutor:"",//当前用户的身份是否是执行人
            curstatus:"",//当前奖项的状态 避免用户回退后执行删除和编辑无感知
        }
    },
    computed:{
        ...mapState(["userIdentity","token","mobile","prizeId","curname","userId"])
    },
    created(){
        this.getPrizeDetail()
    },
    components:{
        msgAlert
    },
    methods:{
        //获取抽奖详情
        getPrizeDetail(){
            this.request.post(
                "lottery/prize/prize_detail",
                {
                    token:this.token,
                    prize_id:this.prizeId
                }
            ).then(res=>{
                if(res.code == 1){
                    this.prizedetail = res.data
                    this.prizelist = res.data.prize
                    this.prizeid = res.data.prize_id
                    this.curstatus = res.data.status
                    if(this.userId != res.data.user_id ){
                        //如果当前用户的userId  不等于创建者的用户user_id,表示他是执行者
                        this.isexecutor = true
                    }else{
                        this.isexecutor = false
                    }
                }
            })
        },
        delPrize(){
            //删除抽奖
            this.request.post(
                "lottery/prize/delete_prize",
                {
                    token:this.token,
                    prize_id:this.prizeid
                }
            ).then(res=>{
                if(res.code == 1){
                    this.$router.push({
                        path:"/activityList"
                    })
                }
            })
        },
        updatePrize(status){
            //更新抽奖状态 数字1代表开始 2代表结束
            this.request.post(
                "/lottery/prize/update_prize_status",
                {
                    token:this.token,
                    prize_id:this.prizeid,
                    status:status
                }
            ).then(res=>{
                //抽奖状态更新以后的操作为
                if(res.code == 1){
                    this.$router.push({
                        path:"/erweima",
                        query:{
                            prizeid:this.prizeid
                        }
                    })
                } 
            })
        },
        //点击开始抽奖按钮 控制弹窗状态 修改提示信息
        startOption(){
            this.isshow = true
            this.isquxiao = true
            this.alertmsg = "是否开启本次抽奖？"
        },
        //点击修改按钮 执行修改操作
        updateOption(){
            //这里添加判断 防止抽奖结束或者开始后用户回退以后操作无感知
            switch(this.curstatus - 0){
                case 0:
                    //未开始状态，跳转到修改页面
                    this.$router.push({
                        path:"/prizeSetting",
                        query:{
                            form:"update"
                        }
                    })
                    break;
                case 1:
                    //已开始状态，增加一个toast提示
                    this.$toast.fail({
                        message: "抽奖已开始无法编辑",
                    });
                    break;
                case 2:
                    this.$toast.fail({
                        message: "抽奖已结束无法编辑",
                    });
                    break;
                default:
                    break;
            }
            
        },
         //点击删除按钮 控制弹窗状态 修改弹窗信息
        delOption(){
            switch(this.curstatus - 0){
                case 0:
                    this.isshow = true
                    this.isquxiao = true
                    this.alertmsg = "是否删除本次抽奖？"
                    break;
                 case 1:
                    //已开始状态，增加一个toast提示
                    this.$toast.fail({
                        message: "抽奖已开始无法删除",
                    });
                    break;
                case 2:
                    this.$toast.fail({
                        message: "抽奖已结束无法删除",
                    });
                    break;
                default:
                    break;

            }
        },
        //控制弹窗是否显示
        changeshow(val){   
            this.isshow = val
        },
        getMsgstatus(val){
            console.log("父组件获取到的信息",val)
            switch(this.alertmsg){
                case "是否开启本次抽奖？":
                    if(val == "determine"){
                        this.updatePrize(1)
                    }
                    break;
                case "是否删除本次抽奖？":
                    if( val == "determine"){
                        this.delPrize()
                    }
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
            font-size 0.8rem
            line-height 1.87rem
            .text
                // letter-spacing 1.6rem
            .text1
                // letter-spacing 0.4rem
            .text2
                display inline-block
                width calc(100% - 3.5rem)
                vertical-align top
                line-height 1.3rem
                padding-top 8px
            .address
                width calc(100% - 2.9rem)
            .num
                padding-top 6px
        .prasie-setting
            font-size 0.8rem !important
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
        .executor
            margin-left 1.05rem
            margin-right 1.08rem
            width calc(100% - 2.13rem)
    .start-btn
        margin 1.33rem 1.15rem 1rem 1.23rem
        height 2.13rem
        border 1px solid #FF5F00
        color #FF5F00
        font-size 0.91rem
        line-height 2.13rem
        border-radius 0.21rem
</style>