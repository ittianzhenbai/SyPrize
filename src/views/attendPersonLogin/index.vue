<template>
    <div class="login">
        <div class="contain"
        >
            <span class="logo"></span>
            <span class="text font" @click="xxx()">石原金牛幸运大抽奖</span>
            <div class="login-box">
                <span class="font text1">姓名</span>
                <el-input class="input name" v-model="username" placeholder="请输入姓名" clearable/>
                <span class="font text1">手机号</span>
                <el-input class="input name" v-model="mobile" placeholder="请输入手机号" clearable/>
                <span class="font text1">数量</span>
                <el-input 
                    class="input password" 
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
            msgcode:"",
            isshow:false,
            alertmsg:'用户名/密码错误',
            timer:"获取验证码",
            interval:null,
            
        }
    },
    components:{
        msgAlert
    },
    mounted(){
        console.log("重新加载")
        var starttime = (new Date()).getTime();
        if(this.timerCount - starttime >0){
             let _this = this
            setInterval(()=>{
                var curtimer = (new Date()).getTime();
                _this.timer =   Math.floor((_this.timerCount - curtimer)/1000 - 1)
                console.log("666")
            },1000)
        }
    },
    computed:{
        ...mapState(["timerCount","prizeId","Token1"]),
        active(){
            if(this.mobile.length == 11 && this.money && this.msgcode.length == 4){
                return true
            }else{
                return false
            }
        },
        timecount(){
            if(this.timer == "获取验证码"){
                return "获取验证码"
            }else{
                return this.timer + "s"
            }
        }
    },
    methods:{
        ...mapMutations(["settimerCount","setToken1","setAmount","setCount"]),
        attendPrize(){
            this.request.post(
                "lottery/login/join_lottery",
                {
                    prize_id:this.prizeId,
                    mobile:this.mobile,
                    code:this.msgcode,
                    money:this.money
                }
            ).then(res=>{
                console.log("参与抽奖的信息为：",res)
                this.setToken1(res.data.token)
                this.setCount(res.data.re_num)
                this.setAmount(res.data.amount)
                if(res.code == 1){
                    this.$router.push({
                        path:"/praiseBystore"
                    })
                }
               
            })
        },
        goPraise(){
            this.attendPrize()
        },
        changeshow(val){
            this.isshow = val
            console.log("666",val)
        },
        refeshtimer(){
            var starttime = (new Date()).getTime();
            var endtimer = starttime+8000
            this.settimerCount(endtimer)
            let _this = this
            this.interval = setInterval(()=>{
                var curtimer = (new Date()).getTime();
                _this.timer =   Math.floor((_this.timerCount - curtimer)/1000 - 1)
                // console.log("666")
            },1000)
        },
        xxx(){
            clearInterval(this.interval)
        }
    },
    watch:{
        timer(newVal,oldVal){
            console.log(newVal)
            if(newVal == 0){
                console.log("666")
                clearInterval(this.interval)
                this.timer = "获取验证码"
                this.active = true
                
            }
        }
    }
    
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