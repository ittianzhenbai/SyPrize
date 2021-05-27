<template>
    <div class="praise-setting">
        <div class="title font">新增抽奖</div>
        <div class="set-form">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="商家" prop="shopname">
                    <el-input placeholder="请输入店铺名或者商家姓名" v-model="ruleForm.shopname"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="phonenumber">
                    <el-input placeholder="请输入商家的手机号" type="number" v-model="ruleForm.phonenumber"></el-input>
                </el-form-item>
                <el-form-item label="地址" prop="address">
                    <el-input placeholder="请输入商家的地址" v-model="ruleForm.address"></el-input>
                </el-form-item>
                 <el-form-item label="商品" prop="tradename">
                    <el-input placeholder="请输入促销商品" v-model="ruleForm.tradename"></el-input>
                </el-form-item>
                <el-form-item label="数量" prop="buynumber">
                    <el-input placeholder="请输入满足抽奖的购买数量" v-model="ruleForm.buynumber"></el-input>
                </el-form-item>
                 <el-form-item label="执行人">
                    <el-select 
                        v-model="ruleForm.addperson" 
                        :value-key="String(enforcer_id)"
                        placeholder="请选择执行人"
                        @change="getSelvalue"
                        clearable
                        >
                        <el-option
                            v-for="item in sel_options"
                            :key="item.enforcer_id"
                            :label="item.realname"
                            :value="item"></el-option>
                    </el-select>
                     <el-button
                        class="addperson"
                        size="mini"
                        @click="addPerson()"
                    >新增执行人</el-button>
                </el-form-item>
                <el-form-item label="时间">
                        <span 
                            class="text"
                            :class="[mintime == ''&&maxtime == ''?'text':'text text1']"
                            @click="selStartTime()">
                            {{mintime == ""?"选择开始时间":mintime}}
                        </span>
                        <span class="cut-line"></span>
                        <span 
                            class="max-time"
                            :class="[mintime == ''&&maxtime == ''?'text':'text text1']"
                            @click="selEndTime()">
                            {{maxtime == ""?"选择结束时间":maxtime}}
                        </span>
                        <van-popup
                            position="bottom"
                            :style="{ height: '45%' }"
                            round  
                            v-model="start_timeshow">
                            <van-datetime-picker
                                v-model="currentDate"
                                type="datetime"
                                title="选择开始时间"
                                :min-date="minDate"
                                :max-date="maxDate"
                                @cancel="startCancel"
                                @confirm="startConfirm"
                            />
                        </van-popup>
                         <van-popup
                            position="bottom"
                            :style="{ height: '45%' }"
                            round  
                            v-model="end_timeshow">
                            <van-datetime-picker
                                v-model="currentDate"
                                type="datetime"
                                title="选择开始时间"
                                :min-date="minDate"
                                :max-date="maxDate"
                                @cancel="endCancel"
                                @confirm="endConfirm"
                            />
                        </van-popup>  
                        <span v-show="istrue == false" class="err-msg">结束时间或者开始时间不能为空</span>                      
                </el-form-item>
            </el-form>
        </div>
        <div class="title font">
            奖项设置
            <span v-show="prizeisnull == false && prizelist_isfull == false" class="err-msg">奖项设置必须大于1个，小于等于6个</span>    
         </div>
        <addAlert
            :editstatus="editstatus"
            @getPrizeList="getPrizeList"
        ></addAlert>
        <van-overlay  z-index="999" :show="isshow" @click="isshow = false">
            <div class="wrapper" @click.stop>
                <div class="content">
                    <input type="text" v-model="executor"  placeholder="请输入执行人姓名"/>
                    <input 
                        type="number" 
                        maxlength="11"
                        oninput="if(value.length > 11) value=value.slice(0, 11)" 
                        v-model="phonenumber" placeholder="请输入执行人手机号"/>
                </div>
                 <div class="dialog-footer">
                    <span :class='[addactive == false?"font save-btn":"font active-btn"]' @click="sure()">保存</span>
                </div>
            </div>
        </van-overlay>
        <el-button class="start-botton font" @click="reservePrize()">保存</el-button>
    </div>
</template>
<script>
import addAlert from "../../components/addAlert/addAlert.vue" //增加奖项的列表和增加的弹窗
import { mapState,mapMutations } from "vuex"
export default {
    data(){
        let checkMoney = (rule, value, callback) => {
            //满足的抽奖金额验证
            if (!value) {
                return callback(new Error('最低抽奖数量不能为空'));
            }
            let that = this
            setTimeout(() => {
                if (!Number.isInteger(value-0)) {
                    callback(new Error('请输入数字值'));
                } else {
                    if (value < 0) {
                    callback(new Error('数量不能为负数'));
                    } else {
                    callback();
                    }
                }
                }, 500)
        }
        let checkMobile = (rule, value, callback) => {
            //手机号验证
            if (!value) {
                return callback(new Error('商家手机号不能为空'));
            }
            let that = this
            setTimeout(() => {
                let reg = /^1(3[0-9]|4[5,7]|5[0,1,2,3,5,6,7,8,9]|6[2,5,6,7]|7[0,1,7,8]|8[0-9]|9[0-9])\d{8}$/;
                if (!reg.test(value)) {
                    callback(new Error('请输入正确的手机号格式'));
                }else{
                    callback()
                }
                }, 500)
        }
        return{
            type:1,
            isshow:false,//控制增加执行人弹窗是否执行
            executor:'',//增加的执行人名称
            phonenumber:'',//增加执行人的手机号
            start_timeshow:false,//选择开始时间弹窗是否显示
            end_timeshow:false,//选择结束时间弹窗是否显示
            minDate: new Date(2020, 0, 1),//最小时间的时间戳
            maxDate: new Date(2030, 12, 31),//最大时间的时间戳
            currentDate: new Date(),//当前的时间
            mintime:"",//最小的时间
            maxtime:"",//最大的时间
            prizelist: [],//奖项列表
            curIndex:0,//当前要修改的奖项的下标值
            sel_options:[],//执行人列表
            istrue:true,//检验开始时间和结束时间不能为空
            enforcer_id:"",//执行者id
            editstatus:"",//控制奖品列表是否是编辑状态
            prizelist_isfull:true,//奖项列表长度大于1个且小于等于6
            ruleForm: {
                shopname:"",//店铺名
                phonenumber:"",//商家手机号
                address:"",//商家地址
                tradename:"",//商品名称
                buynumber:"",//抽奖金额
                addperson:"",//执行人
                },
            rules: {
                shopname: [
                    { required: true, message: '请填写商家店铺名称或者商家姓名', trigger: 'blur' },
                    { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
                ],
                address: [
                    { required: true, message: '请填写商家地址', trigger: 'blur' }
                ],
                tradename: [
                    { required: true, message: '请输入促销商品', trigger: 'blur' }
                ],
                buynumber: [
                    {required: true,validator: checkMoney, trigger: 'blur' }
                ],
                phonenumber: [
                    {required: true,validator: checkMobile, trigger: 'blur' }
                ],
            }
        }
    },
    mounted(){
        this.getExecutorList(1,10)
        this.editstatus = this.$route.query.form
        if(this.$route.query.form == "update"){
            this.getPrizeDetail()
        }
        this.$toast.setDefaultOptions({
            color:"red"
        })
    },
    computed:{
        ...mapState(["userIdentity","token","prizeId","userId"]),
        //判断添加执行人的按钮保存是否是激活状态
        addactive(){
            if(this.executor !="" && this.phonenumber !=""){
                return true
            }else{
                return false
            }
        },
        timevalidate(){
            //时间验证
            if(this.mintime !=""&&this.maxtime != ""){
                return true
            }else{
                return false
            }
        },
        //判断一下是否奖项设置是大于两个的
        prizeisnull(){
            if(this.prizelist.length>1){
                return true
            }else{
                return false
            }
        }
    },
    components:{
        addAlert
    },
    methods:{
        ...mapMutations(["setaddAlertIsShow","setPrizeList"]),
        //日期格式化函数
        dateFormat(fmt, date) {
            let ret;
            const opt = {
                "Y+": date.getFullYear().toString(),        // 年
                "m+": (date.getMonth() + 1).toString(),     // 月
                "d+": date.getDate().toString(),            // 日
                "H+": date.getHours().toString(),           // 时
                "M+": date.getMinutes().toString(),         // 分
                "S+": date.getSeconds().toString()          // 秒
                // 有其他格式化字符需求可以继续添加，必须转化成字符串
            };
            for (let k in opt) {
                ret = new RegExp("(" + k + ")").exec(fmt);
                if (ret) {
                    fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
                };
            };
            return fmt;
        },
        //打开开始时间选择 并且初始化最小时间 
        selStartTime(){
            this.start_timeshow = true
            this.minDate = new Date(2020, 0, 1)
        },
        //取消开始时间选择
        startCancel(){
            this.start_timeshow = false
        },
         //选择开始时间，返回的时间是中国标准时间 需要格式化
        startConfirm(val){
            this.start_timeshow = false
            this.minDate = val
            this.mintime = this.dateFormat("YYYY-mm-dd HH:MM", val)
        },
        //打开结束时间选择 并且初始化最大时间
        selEndTime(){
            this.end_timeshow = true
            this.maxDate = new Date(2030,12,31)
        },
        //取消结束时间选择
        endCancel(){
            this.end_timeshow = false
        },
        //选择结束时间 ，返回的时间是中国标准时间 需要格式化
        endConfirm(val){
            this.end_timeshow = false
            this.maxDate = val
            this.maxtime = this.dateFormat("YYYY-mm-dd HH:MM", val)
        },
        //获取执行人列表
        getExecutorList(page,pagesize){
            let that = this
            this.request.post(
                "lottery/prize/get_enforcer",
                {
                    token:this.token,
                    page:page,
                    pagesize:pagesize
                }
            ).then(res=>{
                switch(res.code){
                    case 210:
                        that.sel_options = []
                        break;
                    case 1:
                        that.sel_options = res.data.list
                      break;
                    default:
                        break;  
                }
            })
        },
        //获取执行人的id
        getSelvalue(val){
            this.ruleForm.addperson = val.realname
            this.enforcer_id = val.enforcer_id
        },
        //增加一个新的抽奖
        addPrize(data){
            let that = this
            this.request.post(
                "/lottery/prize/add_prize",
                {
                    token:that.token,
                    shop_name:data.shopname,
                    phone:data.phonenumber,
                    address:data.address,
                    goods_name:data.tradename,
                    once_num:data.buynumber,
                    start_date:that.mintime,
                    enforcer_id:that.enforcer_id?that.enforcer_id:that.userId,
                    end_date:that.maxtime,
                    prize_list:that.prizelist
                }
            ).then(res=>{
                if(res.code == 1){
                    //保存之后跳转到创建的活动列表中
                    this.$router.push({
                        path:"/activityList"
                    })
                }
            })
        },
        //修改现有的一个抽奖数据
        updatePrize(data){
            let that = this
            this.request.post(
                "/lottery/prize/update_prize",
                {
                    token:that.token,
                    shop_name:data.shopname,
                    phone:data.phonenumber,
                    address:data.address,
                    goods_name:data.tradename,
                    enforcer_id:that.userId,
                    once_num:data.buynumber,
                    start_date:that.mintime,
                    enforcer_id:that.enforcer_id,
                    end_date:that.maxtime,
                    prize_list:that.prizelist,
                    prize_id:that.prizeId,
                }
            ).then(res=>{
                if(res.code == 1){
                    //保存之后跳转到创建的活动列表中
                    this.$router.push({
                        path:"/activityList"
                    })
                }
            })
        },
        //打开增加执行人的弹窗 并且增加一个执行人
        addPerson(){
            //打开增加联系人的弹窗
            this.isshow = true
            //每次打开初始化弹窗中的输入框内容
            this.executor = ""
            this.phonenumber = ""
        },
        //保存要添加的执行人
        sure(){
            let that= this
            if(this.addactive == true){
                this.request.post(
                    "/lottery/prize/add_enforcer",
                    {
                        token:this.token,
                        realname:this.executor,
                        phone:this.phonenumber
                    }
                ).then(res=>{
                    if(res.code == 1){
                        that.getExecutorList(1,20)
                        that.isshow = false
                         that.$toast({
                            message: res.msg,
                            position: 'top',
                            duration:1500
                        });
                    }else if(res.code == 0){
                        that.$toast({
                            message: res.msg,
                            position: 'top',
                        });
                    }
                })
            }
        },
        //从addalert组件中接收修改后的奖项列表
        getPrizeList(val){
            this.prizelist = val
        },
        //如果是要修改抽奖内容，进去的时候需要先获取抽奖详情
        getPrizeDetail(){
            this.request.post(
                "lottery/prize/prize_detail",
                {
                    token:this.token,
                    prize_id:this.prizeId
                }
            ).then(res=>{
                if(res.code == 1){
                    this.ruleForm.shopname = res.data.shop_name
                    this.ruleForm.phonenumber = res.data.phone
                    this.ruleForm.address = res.data.address
                    this.ruleForm.tradename = res.data.goods_name
                    this.ruleForm.addperson = res.data.realname
                    this.mintime = res.data.start_date
                    this.maxtime = res.data.end_date
                    this.ruleForm.buynumber = res.data.once_num
                }
            })
        },
        //保存抽奖，并进行抽奖表单验证
        reservePrize(){
            this.$refs.ruleForm.validate((vaild)=>{
                if(vaild){
                    //验证一下必填项是否完成
                   if(this.timevalidate == false){
                       //验证一下活动开始和结束时间是否全部选择
                       this.istrue = false
                   }else{
                       if(this.prizeisnull){
                           //进行开始抽奖的操作，判断一下是否符合抽奖的要求
                           this.prizelist_isfull = true
                           if(this.$route.query.form == "update"){
                               //如果是更新的操作
                               this.updatePrize(this.ruleForm)
                           }else{
                               this.addPrize(this.ruleForm)
                           }
                       }else{
                           //这里面抽奖列表条数不满足要求
                          this.prizelist_isfull = false
                       }
                   }
                }else{
                    if(this.timevalidate == false){
                        this.istrue = false
                    }
                }
            })
        },
    },
    watch:{
        timevalidate(newVal){
            //如果时间不为空去掉提示
            if(newVal == true){
                this.istrue = true
            }
        },
        
    }
}
</script>
<style lang="stylus" scoped>
/deep/ .el-form-item
            border-bottom  0.03px solid #E5E5E5
            font-size 0.75rem
            color #333333
            font-weight regular
            font-family Microsoft YaHei
            margin-bottom 0
            padding 5px 0
            .el-form-item__label
                text-align left
                width 3.8rem !important
                font-size 0.75rem
                &::before
                    display none
                &::after
                    content "*"
                    color #FF5F00
                    font-size 1rem
                    vertical-align middle
                    margin-left 0.3rem
                    position relative
                    top -0.2rem
            &:nth-child(6)
                .el-form-item__label
                    &::after
                        display none
            .el-form-item__content
                margin-left 3.8rem !important
                // text-align left
                .el-input__inner
                    border none
                    font-weight regular
                    font-family Microsoft YaHei
                    color #333333
                    font-size 0.8rem
                input::-webkit-input-placeholder
                    color #999999
                    font-size 0.8rem
                input::-moz-placeholder
                    color #999999
                    font-size 0.8rem
                input::-ms-input-placeholder
                    color #999999
                    font-size 0.8rem
                input::-moz-placeholder
                    color #999999
                    font-size 0.8rem
                .el-select
                    width 8rem
                    right 1rem
                .el-form-item
                    width 100% !important
                .el-form-item__error
                    top 70%
                    left 16px
            &:nth-child(7)
                .el-form-item__content
                    padding 0 15px
                    text-align left
                    .text
                        color #999999
                        font-size 0.8rem
                    .text1
                        color #333333
                        font-size 0.70rem
                    .max-time
                        float right
                    .cut-line
                        display block
                        position absolute
                        height 1px
                        width 1.05rem
                        top 50%
                        left 50%
                        transform translate(-50%,-50%)
                        background #999999
                    .err-msg
                        color #F56C6C
                        font-size 12px
                        position absolute
                        top 50%
                        left 16px
                        transition all 5s ease

.praise-setting
    width 100%
    height 100%
    background-color #F4F4F4
    .title
        height 2.27rem
        padding 0 0.67rem
        line-height 2.27rem
        text-align left
        color #999999
        font-size 0.69rem
        .err-msg
            color #F56C6C
            font-size 12px
            padding-left 30px
            transition all 1s ease
    .set-form
        padding 0 0.64rem
        margin 0 auto
        background #FFFFFF
        .addperson
            height 1.87rem
            width 4.8rem
            color #FF5F00
            font-size 0.75rem
            border 1px solid #FF5F00
            padding 0
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
    .start-botton
        // bottom 3rem
        margin 1.31rem 0.61rem 0.88rem 0.69rem
        width calc(100% - 1.3rem)
        height 2.25rem
        color #FFFFFF
        background-color #FF5F00
        border-radius 0.21rem
        font-size 0.85rem
    
</style>