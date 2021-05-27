<template>
    <div class="msg-alert" v-if="isshow == true">
        <div class="alert-box">
            <div class="alert-msg font">{{msg}}</div>
            <!-- <el-button class="botton" v-show="isquxiao == true" type="primary" @click="closeAlert()">取消</el-button>
            <el-button class="botton" type="primary" @click="closeAlert()">确定</el-button> -->
            <div class="btn" v-show="isquxiao == false" @click="closeAlert()">
                <span>确定</span>
            </div>
            <div class="btn" v-show="isquxiao == true">
                <span class="btn1" @click="cancle()">取消</span>
                <span class="btn2" @click="deterMine()" >确定</span>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState} from "vuex"
export default {
    props:{
        isshow:{
            type:Boolean,
            default:false
        },
        msg:{
            type:String,
            default:""
        },
        isquxiao:{
            type:Boolean,
            default:false
        }
    },
    computed:{
        ...mapState(["userIdentity","token","mobile","prizeId"])
    },
    data(){
        return{
           
        }
    },
   
    methods:{
        cancle(){
            this.$emit("changeshow",false)
            this.$emit("msgstatus","cancle")
        },
        deterMine(){
            // console.log(this.msg)
            if(this.msg =="是否结束本次抽奖？"){
                this.$router.push({
                    path:"/prizeOver",
                     query:{
                        prizeid:this.prizeId
                    }
                })
            }
            this.$emit("changeshow",false)
            this.$emit("msgstatus","determine")
        },
        closeAlert(){
            this.$emit("changeshow",false)
        }
    }
}
</script>
<style lang="stylus" scoped>
.msg-alert
    position fixed
    top 0
    width 0
    width 100%
    height 100vh
    background-color rgba(000,000,000,0.3)
    z-index 99
    .alert-box
        width 16rem
        height 8rem
        position absolute
        top 45%
        left 50%
        -webkit-transform translate(-50%,-50%)
        -moz-transform translate(-50%,-50%)
        transform translate(-50%,-50%)
        background-color #FFFFFF
        border-radius 0.53rem
        .alert-msg
            margin 2.13rem 2.73rem 0
            font-size 1.01rem
            color #3333333
            text-align center
        .btn
            width 100%
            height 2.64rem
            line-height 2.64rem
            text-align center
            color #EA5413
            font-size 1.01rem
            border-top 0.03rem solid #999999
            position absolute
            bottom 0
            .btn1
                display inline-block
                width 49%
                border-right 1px solid #999999
                color #666666
            .btn2
                display  inline-block
                width 50%
</style>