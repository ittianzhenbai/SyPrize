<template>
    <div class="login">
        <div class="contain">
            <span class="logo"></span>
            <span class="text font">业务员站店促销抽奖</span>
            <div class="login-box">
                <span class="font text1">手机号</span>
                <el-input class="input name" v-model="username" placeholder="请输入用户名" clearable/>
                <span class="font text1">密码</span>
                <el-input class="input password" placeholder="请输入密码" v-model="password" show-password/>
            </div>
            <el-button :class='[active==false?"botton font":"botton font active"]' @click="login()">登录</el-button>
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
import md5 from "../../common/js/md5.js"
export default {
    data(){
        return{
            username:"",//用户名
            password:"",//密码
            isshow:false,//控制通知弹窗显示
            alertmsg:'用户名/密码错误',
            active:false//判断登录按钮是否激活
        }
    },
    components:{
        msgAlert
    },
    computed:{
        ...mapState(["userIdentity"])
    },
    mounted(){
        // this.isshow = false
        // console.log(this.axios.defaults.baseURL,process.env.NODE_ENV,process.env)
        // console.log(this.request)
    },
    methods:{
        ...mapMutations(["setuserIdentity","setToken","setMobile"]),
        // gosetting(){
        //     this.$router.push({
        //         path:"/activityList"
        //     })
        //     this.setuserIdentity("1")
        // },
        changeshow(val){
            this.isshow = val
            console.log("666",val)
        },
        login(){
            let password = md5(this.password)
            let that = this
            this.request.post(
                "/lottery/login/login_pass",
                {
                    mobile:this.username,
                    password:password
                }
            ).then(res=>{
                console.log("登录请求的信息为：",res.data)
                let user_type = res.data.user_type
                let mobile = res.data.mobile
                let token = res.data.token
                console.log(res.code)
                if(res.code == 0){
                    that.alertmsg = res.msg
                    that.isshow = true
                }else{
                    that.setuserIdentity(user_type)
                    that.setToken(token)
                    that.setMobile(mobile)
                    that.$router.push({
                        name:"activityList",
                        params:{
                            user_type:user_type
                        }
                    })
                }
            })
        },
    },
    watch:{
        username(newVal){
             if(newVal.length>0){
                this.active = true
            }else{
                this.active = false
            }
        },
        password(newVal){
             if(newVal.length>0){
                this.active = true
            }else{
                this.active = false
            }
        },
    }
    
}
</script>
<style lang="stylus" scoped>
/deep/ .el-input__inner 
            border none !important
            border-bottom 1px solid #A9A9A9 !important
            outline none !important
            border-radius 0
            padding 0
/deep/ .el-input__clear::before
            font-size 1.2rem !important
.login
    width 100%
    height 100%
    background-image url('../../assets/login-bg.png')
    background-size cover
    overflow auto
    .contain
        padding 1.65rem 2.03rem 0
        .logo
            display block
            width 3.75rem
            height 1.8rem
            background-image url("../../assets/logo.png")
            background-size cover
        .text
            display block
            text-align left
            margin 1.75rem 0 2.53rem
            font-size 1.25rem
            color #333333
        .login-box
            margin-top 50px auto
            &>.input
                height 2rem
                width 100%
                // font-size 20px
                font-size 0.85rem
                color #A9A9A9
                &:nth-child(1)
                    margin-bottom 20px
            .text1
                text-align left 
                display block
                color #333333
                font-size 0.75rem
                margin-bottom 1rem
                margin-top 1.2rem
                font-weight bold
        .botton
            margin-top 3.75rem
            height 2.25rem
            border 0
            font-size 0.85rem
            color #FFFFFF
            width 100%
            background #A9A9A9
        .active
            background linear-gradient(90deg, #FF4200, #FFB400)
            box-shadow 0rem 0rem 0rem 0rem rgba(255, 132, 0, 0.53)

</style>