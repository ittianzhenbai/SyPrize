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
                            <div class="add-btn"  @click="addOption()">添加奖项</div>
                        </div>
                    </li>
                    <li 
                        class="content"
                        v-for="(item,index) in prizelist"
                        :key="index"
                    >
                        <div class="col-1">{{item.name}}</div>
                        <div class="col-2">{{item.money}}</div>
                        <div class="col-3">{{item.num}}</div>
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
                    <input type="text" v-model="name" placeholder="请输入奖项名称"/>
                    <input type="text" v-model="money" placeholder="请输入奖项金额"/>
                    <input type="text" v-model="num" placeholder="请输入奖项人数"/>
                </div>
                <div class="content" v-show ="modAlert == true">
                    <input type="text" v-model="modname" placeholder="请修改奖项名称"/>
                    <input type="text" v-model="modmoney" placeholder="请修改奖项金额"/>
                    <input type="text" v-model="modnum" placeholder="请修改奖项人数"/>
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
    data(){
        return{
            name: '',//奖项名称
            money:'',//奖项金额
            num:'',//奖项人数
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
        ...mapState(["token"]),
        addactive(){
            if(this.addAlert == true&&this.name !=""&&this.money !=""&&this.num !=""){
                return true
            }else{
                return false
            }
        },
        modactive(){
            if(this.modAlert == true&&this.modname !=""&&this.modmoney !=""&&this.modnum !=""){
                return true
            }else{
                return false
            }
        }
    },
    mounted(){
        if(this.alertStatus == "addPer"){
            this.title = "增加执行人"
        }
    },
    methods:{
        ...mapMutations(["setPrizeList"]),
        handleEdit(item,index) {
            console.log("我是修改按钮",item)
            //修改之前要关闭修改窗口
            this.modAlert = true
            this.isshow = true
            this.addAlert = false
            //进行修改初始化
            this.modname = item.name
            this.modmoney = item.money
            this.modnum = item.num
            //替换原数组中的元素
           this.curindex = index
        },
        handleDelete(item,index) {
            // console.log("我是删除按钮",index,row)
            this.prizelist.splice(index,1)
            this.$emit("getPrizeList",this.prizelist)
        },
        addOption(){
            // console.log("增加一个奖项设置")
            //增加之前 关闭修改窗口 
            this.addAlert = true
            this.modAlert = false
            this.isshow = true
            //每次进入初始化
            this.name = ""
            this.money = ""
            this.num = ""
        },
        sure(){
            if(this.addactive == true){
                this.isshow = false
                this.prizelist.push({name:this.name,money:this.money,num:this.num})
            }else if(this.modactive == true){
                this.isshow = false
                this.prizelist.splice(this.curindex,1,{name:this.modname,money:this.modmoney,num:this.modnum})
            }
            this.$emit("getPrizeList",this.prizelist)
        },
    },
    watch:{
        
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