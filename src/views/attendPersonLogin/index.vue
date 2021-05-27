<template>
    <div class="login">
        <div class="contain"
        >
            <span class="logo"></span>
            <span class="text font" @click="xxx()">石原金牛幸运大抽奖</span>
            <div class="login-box">
                <span class="font text1">姓名</span>
                <el-input class="input name" v-model="username" placeholder="请输入姓名"  clearable/>
                <span class="font text1">手机号</span>
                <el-input 
                    class="input phone" 
                    v-model="mobile" 
                    placeholder="请输入手机号"  
                    oninput="if(value.length > 11) value=value.slice(0, 11)" 
                    type="number" clearable/>
                <span class="font text1">数量</span>
                <el-input 
                    class="input password" r
                    placeholder="请输入购买数量" 
                    v-model="number" 
                    oninput="value=value.replace(/[^\d]/g,'')"
                />
                <div class="yanzheng">
                    <el-input class="input" maxlength="6" placeholder="请输入验证码" v-model="msgcode" />
                    <div class="yzm-btn" @click="refeshtimer()">{{timecount}}</div>
                </div>
            </div>
            <el-button :class='[active == false ?"botton font":"botton font active"]' type="primary" @click="goPraise()">参与抽奖</el-button>
        </div>
        <msgAlert 
            :isshow = isshow
            :msg = alertmsg
            @changeshow = changeshow
            ></msgAlert>
    </div>
</template>
<script>
import msgAlert from "@/components/msgAlert/msgAlert.vue"
import { mapState,mapMutations } from "vuex"
export default {
    data(){
        return{
            username:"",//姓名
            mobile:"",//手机号
            number:"",//数量
            msgcode:"",//验证码
            isshow:false,
            alertmsg:'',//弹窗提示信息
            timer:null,
            interval:null,//延时定时器的id
        }
    },
    components:{
        msgAlert
    },
    mounted(){
        this.setprizeId(this.$route.query.prize_id)
    },
    computed:{
        ...mapState(["timerCount","token1"]),
        active(){
            if(this.username&&this.mobile.length == 11 && this.number && this.msgcode.length == 4){
                return true
            }else{
                return false
            }
        },
        timecount(){
            if(this.timer == null){
                return "获取验证码"
            }else{
                return this.timer + "s"
            }
        }
    },
    methods:{
        ...mapMutations(["settimerCount","setToken1","setCount","setprizeId"]),
        //获取短信验证码
        getMsg(){
            this.request.post(
                "member/login/sendsms",
                {
                    mobile:this.mobile,
                }
            ).then(res=>{
                
            })
        },
        //参加抽奖按钮
        attendPrize(){
            this.request.post(
                "lottery/login/join_lottery",
                {
                    prize_id:this.$route.query.prize_id,
                    mobile:this.mobile,
                    username:this.username,
                    code:this.msgcode,
                    buyer_num:this.number
                }
            ).then(res=>{
                this.setToken1(res.data.token)
                this.setCount(res.data.re_num)
                if(res.code == 1){
                    this.$router.push({
                        path:"/prizeBystore"
                    })
                }else{
                    this.alertmsg = res.msg
                    this.isshow = true
                }
               
            })
        },
        goPraise(){
            this.attendPrize()
        },
        changeshow(val){
            this.isshow = val
        },
        refeshtimer(){
            if(this.timecount == "获取验证码"){
            let _this = this
            this.timer = 60
            this.interval = setInterval(()=>{
                if(_this.timer > 0){
                    _this.timer = _this.timer - 1
                }else{
                    clearInterval(_this.interval)
                    _this.timer = null
                }
                },1000)
            }
            
        },
    }, 
}
</script>
<style lang="stylus" scoped>
/deep/ .el-input__inner 
            border none !important
            border-bottom 1px solid #FFFFFF !important
            outline none !important
            border-radius 0
            background-color transparent
            padding 0
            color #FFFFFF
            &::placeholder 
                color #FFFFFF
                font-size 0.91rem
                font-family Microsoft YaHei
                font-weight 400
/deep/ .el-input__clear::before
            font-size 1.2rem !important
.login
    width 100%
    height 100%
    background #CB0C05
    overflow auto
    .contain
        padding 1.65rem 2.03rem 0
        .logo
            display block
            width 4rem
            height 1.92rem
            background-image url("../../assets/logo-white.png")
            background-size cover
        .text
            display block
            text-align cenetr
            margin 1.75rem 0 2.53rem
            font-size 1.33rem
            color #FFFFFF
        .login-box
            margin-top 50px auto
            &>.input
                height 2rem
                width 100%
                // font-size 20px
                font-size 0.91rem
                color #FFFFFF
                &:nth-child(1)
                    margin-bottom 20px
            .yanzheng
                margin-top 1.5rem
                position relative
                &>.input
                    height 2rem
                    width 100%
                    // font-size 20px
                    font-size 0.91rem
                    color #FFFFFF
                .yzm-btn
                    position absolute
                    color #FFFFFF
                    border 1px solid #FFFFFF
                    border-radius 0.21rem
                    width 5.33rem
                    height 2.13rem
                    right 0
                    top -0.6rem
                    font-size 0.8rem
                    line-height 2.13rem
                    font-family Microsoft YaHei
                    font-weight 400
            .text1
                text-align left 
                display block
                color #FFFFFF
                font-size 0.8rem
                margin-bottom 0.2rem
                margin-top 1.2rem
                font-weight bold
        .botton
            margin-top 4rem
            height 2.4rem
            border 0
            font-size 0.91rem
            color #FFFFFF
            width 100%
            background #A9A9A9
        .active
            background #FFE23C
            color #AF0601

</style>