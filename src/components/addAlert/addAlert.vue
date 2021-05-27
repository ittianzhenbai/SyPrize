<template>
    <div class="add-praise">
        <div class="contain">
            <!-- <h1>石原金牛幸运大抽奖</h1> -->
            <div class="option" >
                <ul class="table font">
                    <li class="header">
                        <div class="col-1">奖品名称</div>
                        <div class="col-2">奖品</div>
                        <div class="col-3">数量</div>
                        <div class="col-4">
                            <div :class="[islimit == false?'add-btn':'add-btn limit-btn']" @click="addOption()">添加奖项</div>
                        </div>
                    </li>
                    <li 
                        class="content"
                        v-for="(item,index) in prizelist"
                        :key="index"
                    >
                        <div class="col-1">{{item.name}}</div>
                        <div class="col-2">{{item.money}}</div>
                        <div class="col-3">{{item.number}}</div>
                        <div class="col-4 con-col-4">
                            <span @click="handleEdit(item,index)">修改</span>
                            <span @click="handleDelete(item,index)">删除</span>
                        </div>
                    </li>
                    <li 
                        class="no-data"
                        v-if="prizelist.length == 0"
                    >
                        <div class="col-1">暂无奖项</div>
                    </li>
                </ul>
            </div>
        </div>
       <van-overlay  z-index="999" :show="isshow" @click="isshow = false">
            <div class="wrapper" @click.stop>
                <div class="content" v-show ="addAlert == true">
                    <input type="text" v-model="name" maxlength="4" placeholder="请输入奖项名称"/>
                    <input type="text" v-model="money" maxlength="6" placeholder="请输入奖品"/>
                    <input type="number" v-model="number" placeholder="请输入奖项人数"/>
                </div>
                <div class="content" v-show ="modAlert == true">
                    <input type="text" v-model="modname" maxlength="4" placeholder="请修改奖项名称"/>
                    <input type="text" v-model="modmoney" maxlength="6" placeholder="请修改奖品"/>
                    <input type="number" v-model="modnum" placeholder="请修改奖项人数"/>
                </div>
                <div class="dialog-footer" v-show ="addAlert == true">
                    <span :class='[addactive == false?"font save-btn":"font active-btn"]' @click="sure()">保存</span>
                </div>
                 <div class="dialog-footer" v-show ="modAlert == true">
                    <span :class='[modactive == false?"font save-btn":"font active-btn"]' @click="sure()">保存</span>
                </div>
            </div>
        </van-overlay>
    </div>
</template>
<script>
import { mapState,mapMutations } from "vuex"
export default {
    props:{
        editstatus:{
            type:String,
            default:""
        }
    },
    data(){
        return{
            name: '',//奖项名称
            money:'',//奖项金额
            number:'',//奖项人数
            modname: '',//要修改的奖项名称
            modmoney:'',//要修改的奖项金额
            modnum:'',//要修改的奖项人数
            curindex:"",//当前要替换的数组的下标
            // title:'',//弹窗标题
            formLabelWidth: '80px',
            prizelist:[],//奖项列表
            addAlert:false,//控制增加奖项弹窗的显示
            modAlert:false,//控制修改奖项弹窗的显示
            isshow:false,

        }
    },
    computed:{
        ...mapState(["token","prizeId"]),
        //增加奖项弹窗的按钮是否是激活状态
        addactive(){
            if(this.addAlert == true&&this.name !=""&&this.money !=""&&this.number !=""){
                return true
            }else{
                return false
            }
        },
        //修改奖项弹窗的按钮是否是激活状态
        modactive(){
            if(this.modAlert == true&&this.modname !=""&&this.modmoney !=""&&this.modnum !=""){
                return true
            }else{
                return false
            }
        },
        //是否限制增加奖项
        islimit(){
            if(this.prizelist.length<6){
                //限制最多可以设置5个奖项，最少设置3个奖项
                return false
            }else{
                return true
            }
        }
    },
    mounted(){
    },
    methods:{
        ...mapMutations(["setPrizeList"]),
        //如果处于编辑状态，首先要获取详情
        getPrizeDetail(){
            this.request.post(
                "lottery/prize/prize_detail",
                {
                    token:this.token,
                    prize_id:this.prizeId
                }
            ).then(res=>{
                if(res.code == 1){
                    this.prizelist = res.data.prize
                    this.$emit("getPrizeList",this.prizelist)
                }
            })
        },
        //执行奖项修改操作
        handleEdit(item,index) {
            //修改之前要关闭修改窗口
            this.modAlert = true
            this.isshow = true
            this.addAlert = false
            //进行修改初始化
            this.modname = item.name
            this.modmoney = item.money
            this.modnum = item.number
            //替换原数组中的元素
           this.curindex = index
        },
        //执行删除奖项操作
        handleDelete(item,index) {
            this.prizelist.splice(index,1)
            this.$emit("getPrizeList",this.prizelist)
        },
        //增加奖项设置
        addOption(){
            //当奖项增加到5个的时候开始限制不能进行增加
            if(this.islimit == false){
                //增加之前 关闭修改窗口
                this.addAlert = true
                this.modAlert = false
                this.isshow = true
                //每次进入初始化
                this.name = ""
                this.money = ""
                this.number = ""
            }
        },
        sure(){
            //确定修改或者增加以后的操作
            if(this.addactive == true){
                this.isshow = false
                this.prizelist.push({name:this.name,money:this.money,number:this.number})
            }else if(this.modactive == true){
                this.isshow = false
                this.prizelist.splice(this.curindex,1,{name:this.modname,money:this.modmoney,number:this.modnum})
            }
            //通知父组件进行状态更新
            this.$emit("getPrizeList",this.prizelist)
        },
    },
    watch:{
        editstatus(newVal){
            if(newVal == "update"){
                this.getPrizeDetail()
            }
        }
    }
}
</script>
<style lang="stylus" scoped>
.add-praise
    width 100%
    .wrapper
        background-color #FFFFFF
        width 16rem
        position absolute
        top 50%
        left 50%
        transform translate(-50%,-50%)
        border-radius 1rem
        .content
            margin-top 1.15rem
            &>input
                height 2.67rem
                width 13.6rem
                border 1px solid #999999
                border-radius 0.21rem
                margin-bottom 0.51rem
                outline none
                font-size 0.85rem
                color #3333333
                text-align center
                font-family Microsoft YaHei
                font-weight regular
        .dialog-footer
            border-top 1px solid #999999
            height 2.64rem
            line-height 2.64rem
            .save-btn
                color #999999
                font-size 1.01rem
            .active-btn
                color #FF5F00
                font-size 1.01rem
    .contain
        width 100%
        .option
            // width 700px
            margin 0 auto
            .table
                width 100%
                background-color #FFFFFF
                li
                    display flex
                    min-height 2.5rem
                    align-items center
                    border-bottom 1px solid #E5E5E5
                    font-size 0.75rem
                    font-family Microsoft YaHei
                    font-weight 400
                    color #333333
                    div 
                        flex 1
                        padding 5px
                        box-sizing border-box
                    .col-4
                        flex 1.6
                        .add-btn
                            margin 0 auto
                            width 4.5rem
                            height 1.75rem
                            border 1px solid #FF5F00
                            color #FF5F00
                            border-radius 0.2rem
                        .limit-btn
                            color #FFFFFF
                            border 1px solid #A9A9A9
                            background #A9A9A9
                    .con-col-4
                        flex 1.6
                        display flex 
                        span 
                            flex 1
                            color #1AA93A
            .botton
                height 1.87rem
                width 4.8rem
                color #FF5F00
                font-size 0.75rem
                border 1px solid #FF5F00
                padding 0
                margin-left 16px
            .botton1
                border none
                color #1AA93A
                font-size 0.8rem
                padding 7px 10px
                background none
</style>