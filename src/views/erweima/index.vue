<template>
	<div class="contain">
		<span class="logo"></span>
		<div 
			class="watch-btn font" 
			@click="watchPrizeList()"
		>查看中奖情况</div>
        <div class="sao-ma"
		@click="goPrize()"
		>
			<img :src="qrcode" alt="">
		</div>
		<div 
			class="over-btn font"
			@click="overPrize()"
		>结束抽奖</div>
		<msgAlert 
            :isshow = isshow
            :msg = alertmsg
			:isquxiao = isquxiao
            @changeshow = changeshow
			@msgstatus = getMsgStatus
        ></msgAlert>
	</div>
</template>

<script>
	import msgAlert from "@/components/msgAlert/msgAlert.vue"
	import { mapState } from "vuex"
	export default {
		data() {
			return {
				status:2,
				alertmsg:"是否结束本次抽奖？",
				isshow:false,
				isquxiao:true,
				qrcode:"",//抽奖二维码
				isexecutor:"",//当前用户的身份是否是执行人,true代表是执行人，否则是业务员
			};
		},
		mounted(){
			// console.log(this.userIdentity)
			this.getPrizeDetail()
		},
		computed:{
			...mapState(["userIdentity","prizeId","token","userId"])
		},
		components:{
			msgAlert
		},
		methods:{
			watchPrizeList(){
				this.$router.push({
					path:"/prizePersonList"
				})
			},
			goPrize(){
				this.$router.push({
					path:"/attendPersonLogin",
					query:{
						prize_id:this.prizeId
					}
				})
			},
			overPrize(){
				this.isshow = true
			},
			changeshow(val){
				//更新弹窗状态
				this.isshow = val
			},
			updatePrize(status){
				//更新抽奖状态 数字1代表开始 2代表结束
				this.request.post(
					"/lottery/prize/update_prize_status",
					{
						token:this.token,
						prize_id:this.prizeId,
						status:status
					}
				).then(res=>{
					console.log("抽奖状态更新以后的操作为：",res)
					if(res.code == 1){
						this.$router.push({
							path:"/activityList"
						})
					}
				})
			},
			getPrizeDetail(){
				//获取抽奖详情
				this.request.post(
					"lottery/prize/prize_detail",
					{
						token:this.token,
						prize_id:this.prizeId
					}
				).then(res=>{
					if(res.code == 1){
						this.qrcode = res.data.qrcode
						//理论上只要可以获取到该活动列表都可以停止
						// if(this.userId != res.data.user_id){
						// 	this.isexecutor = true
						// }else{
						// 	this.isexecutor = false
						// }
					}
				})
			},
			getMsgStatus(val){
				//点击了确定按钮
				if(val == "determine"){
					//更新抽奖状态为结束抽奖
					this.updatePrize(2)
				}
			}
		}
	}
</script>

<style lang="stylus" scoped>
.contain
	width 100%
	height 100%
	background-image url('../../assets/praise-bg1.png')
	background-size cover
	background-position center center
	overflow auto
	.logo
		display inline-block
		height 1.92rem
		width 4rem
		margin-left 0.67rem
		margin-top 0.96rem
		float left
		background-image url('../../assets/logo-white.png')
		background-size cover
	.watch-btn
		float right
		width 5.97rem
		height 1.87rem
		margin-right 0.67rem
		margin-top 0.96rem
		background #FFE23C
		font-size 0.8rem
		color #CB0C05
		line-height 1.87rem
		border-radius 0.21rem
	.sao-ma
		border 0.3rem solid #FFE23C
		width 9.07rem
		height 9.07rem
		background #FFFFFF
		position absolute
		top 60%
		left 50%
		transform translate(-50%,-50%)
		border-radius 0.21rem
		img 
			width 100%
			height 100%
	.over-btn
		position absolute
		bottom 1.79rem
		left 50%
		transform translateX(-50%)
		width 7.89rem
		height 3.55rem
		background-image url('../../assets/start-btn.png')
		background-size 100%
		line-height 3rem
		font-size 1.3rem
		font-family MF LangQian (Noncommercial)
		color #AF0601
		font-weight Regular
</style>
