<template>
	<div class="contain">
		<span class="logo"></span>
		<div class="time">当前时间为：{{curtime}}</div>
		<div class="praise-box">
			<LuckyWheel
				ref="LuckyWheel"
				class="box"
				width="13.5rem"
				height="13.5rem"
				style="margin:15.72rem auto 0"
				:prizes="prizes"
				:default-style="defaultStyle"
				:blocks="blocks"
				:buttons="buttons"
				@start="startCallBack"
				@end="endCallBack"
			/>
		</div>
		<div class="prasie-info font">
			<span class="count">剩余抽奖次数：{{count}}次</span>
			<div class="prize-result">
				<div 
					class="my-prize"
					@click="watchMyPrize()"
				>我的奖品</div>
			</div>
		</div>
		<div class="start-btn" @click="startPrize()">
			立即抽奖
		</div>
		<div class="my-prize-box" v-if="prizeshow">
			<div class="prize-box-content">
				<div class="prize-box">
					<div class="prize-top">
						恭喜你获得
					</div>
					<div class="prize-bottom">
						<ul>
							<li 
								v-for="item in myprize_result"
								:key="item.mid"
							>
								{{item.name}}:{{item.money}}
							</li>
						</ul>
					</div>
				</div>
				<div 
					class="close-btn"
					@click="closePrizeAlert()">
				</div>
			</div>
			
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
		data() {
			return {
				prizes: [],//抽奖列表
				prizeshow:false,//控制显示
				// goods_id:"",//抽中奖的id
				myprize_result:[],//我的抽奖结果
				re_num:"",//剩余抽奖次数
				isshow:false,//控制通知弹窗显示
				timer:null,//当前循环定时器的下标
				curtime:"",//当前本地时间
            	alertmsg:'',
				islimit:false,//设置一个标志为控制开始按钮是否可以点击
				defaultStyle: {
					//抽奖转盘的外边框 具体配置参考文档https://100px.net/docs/wheel/buttons.html
					fontColor: '#d64737',
					fontSize: '14px'
				},
				blocks: [
					{ padding: '10px', background: '#d64737' },
				],
				//控制中间按钮样式显示
				buttons: [
					{ radius: '40px', background: '#d64737' },
        			{ radius: '35px', background: '#f6c66f', pointer: true },
					{
					radius: '30px', background: '#fff',
					fonts: [{ text: '开始抽奖', top: '-10px' }]
					}
				],
			};
		},
		components:{
        	msgAlert
    	},
		created(){
			this.timer = setInterval(() => {
				this.getLocalTimer()	
			}, 1000);
		},
		mounted(){
			this.getPrizeList()
			this.getLocalTimer()
		},
		beforeDestroy(){
			//销毁的时候清空定时器
			clearInterval(this.timer)
			this.timer = null
		},
		computed:{
			...mapState(["count","token1","token","prizeId"]),
		},
		methods:{
			 ...mapMutations(["setCount"]),
			//关闭抽奖弹窗
			closePrizeAlert(){
				this.prizeshow = false
			},
			//获取本地时间
			getLocalTimer(){
				let format = ""
				let nTime = new Date()
				format += nTime.getFullYear()+"-";//获取当前的年份
				format += (nTime.getMonth()+1)<10?"0"+(nTime.getMonth()+1):(nTime.getMonth()+1);//获取当前月份，不足两位前面补0
				format += "-";
				format += nTime.getDate()<10?"0"+(nTime.getDate()):(nTime.getDate());//获取当前的日期，不足两位前面补0
				format += "T";
				format += nTime.getHours()<10?"0"+(nTime.getHours()):(nTime.getHours());//获取当前的小时数，不足两位前面补0
				format += ":";
				format += nTime.getMinutes()<10?"0"+(nTime.getMinutes()):(nTime.getMinutes());//获取当前的分钟数，不足两位前面补0
		　　	format += ":";
			　	format += nTime.getSeconds()<10?"0"+(nTime.getSeconds()):(nTime.getSeconds());//获取当前的秒数，不足两位前面补0
				format = format.replace("T"," ");//找到一个为'T'的字符，替换成" "
				this.curtime = format
			},
			//从子组件中获取到弹窗的状态并且通知父组件进行更新
			changeshow(val){
				this.isshow = val
			},
			//开始进行抽奖
			doPrize(){
				let that = this
				this.request.post(
					"lottery/lottery/do_prize",
					{
						mtoken:this.token1
					}
				).then(res=>{
					switch(res.code){
						case 1:
							this.$refs.LuckyWheel.play()
							this.re_num = res.data.re_num
							this.setCount(res.data.re_num)
							setTimeout(() => {
								let index = that.prizes.findIndex(function(item){
									return item.fonts[0].id == res.data.goods_id
								})
								that.$refs.LuckyWheel.stop(index)
							}, 3000)
							break;
						case 0:
							//表示已经结束抽奖
							this.isshow = true
							this.alertmsg = res.msg
							// this.$router.push({
							// 	path:"/prizeOver"
							// })
							break;
						default:
							break;
					}
				})
			},
			getPrizeList () {
				//获取抽奖详情
				this.request.post(
					"/lottery/lottery/get_prize_list",
					{
						mtoken:this.token1
					}
				).then(res=>{
					if(res.code == 1){
						let prizelist = res.data.prize
						switch(prizelist.length){
							case 1:
								prizelist.splice(1,0,{"id":Math.random(),"name":"差一点","money":"","number":"10"})
								prizelist.splice(2,0,{"id":Math.random()*2,"name":"马上就要中奖了","money":"","number":"10"})
								prizelist.splice(3,0,{"id":Math.random()*3,"name":"谢谢参与","money":"","number":"10"})
								prizelist.splice(4,0,{"id":Math.random()*4,"name":"马上就要中奖了","money":"","number":"10"})
								prizelist.splice(5,0,{"id":Math.random()*5,"name":"谢谢参与","money":"","number":"10"})
							case 2:
								prizelist.splice(1,0,{"id":Math.random()*2,"name":"马上就要中奖了","money":"","number":"10"})
								prizelist.splice(3,0,{"id":Math.random()*3,"name":"谢谢参与","money":"","number":"10"})
								prizelist.splice(4,0,{"id":Math.random()*4,"name":"马上就要中奖了","money":"","number":"10"})
								prizelist.splice(5,0,{"id":Math.random()*5,"name":"谢谢参与","money":"","number":"10"})
							case 3:
								prizelist.splice(1,0,{"id":Math.random(),"name":"差一点","money":"","number":"10"})
								prizelist.splice(3,0,{"id":Math.random(),"name":"马上就要中奖了","money":"","number":"10"})
								prizelist.splice(5,0,{"id":Math.random(),"name":"谢谢参与","money":"","number":"10"})
								break;
							case 4:
								prizelist.splice(3,0,{"id":Math.random(),"name":"谢谢参与","money":"","number":"10"})
								prizelist.splice(5,0,{"id":Math.random(),"name":"谢谢参与","money":"","number":"10"})
								break;
							case 5:
								prizelist.splice(5,0,{"id":Math.random(),"name":"谢谢参与","money":"","number":"10"})
								break;
							default:
								break;
						}
						const prizes = []
						prizelist.forEach((item, index) => {
							prizes.push({
								title: item.name,
								background: index % 2 == 1? '#f9e3bb' : '#f8d384',
								fonts: [{ text: item.name + " " + item.money, id:item.id, top: '25%' }],
							})
						})
						this.prizes = prizes
					}
				})
			},
			//转盘开始的回调
			startCallBack () {
				if(this.count > 0&&this.islimit == false){
					//当剩余奖项为0 且转盘动画结束以后才可以进行再次的抽奖
					this.islimit = true
					this.doPrize()
				}else if(this.count == 0){
					this.isshow = true
					this.alertmsg = "您的抽奖次数已用完"
				}else{
					this.isshow = true
				}
			},
			//转盘动画结束的回调
			endCallBack (prize) {
				const h = this.$createElement;
				this.$notify({
					position: 'top-left',
					duration:3000,
					offset:200,
					showClose:false,
					message: h('span', 
					{ style: 'color: #FFFFFF'}, 
					`恭喜抽中${prize.fonts[0].text}`)
				});
				//当转盘完全停止后解除限制
				this.islimit = false
			},
			//点击开始抽奖按钮，触发转盘转动效果
			startPrize(){
				this.startCallBack()
			},
			//查看我的奖品的弹窗
			watchMyPrize(){
				this.prizeshow = true
			},
			//获取我的奖品名单
			getMyPrize(){
				this.request.post(
					"lottery/member/get_my_prize",
					{
						mtoken:this.token1
					}
				).then(res=>{
					if(res.code == 1){
						this.myprize_result = res.data.list
					}
				})
			}
		},
		watch:{
			prizeshow(newVal){
				if(newVal == true){
					this.getMyPrize()
				}
			}
		}
	}
</script>

<style lang="stylus" scoped>
.contain
	width 100%
	min-height 100%
	overflow-y scroll
	background-image url('../../assets/praise-bg1.png')
	background-size cover
	background-position center center
	overflow auto
	.logo
		display block
		height 1.92rem
		width 4rem
		margin-left 0.67rem
		margin-top 0.96rem
		background-image url('../../assets/logo-white.png')
		background-size cover
	.time
		font-size 0.8rem
		color #FFE33E
		margin-top 1rem
	.praise-box
		.box
			border 5px solid #FFE33E
			border-radius 50%
	.prasie-info
		margin-top 0.72rem
		color #FFE33E
		font-size 0.8rem
		font-weight bold
		display flex
		line-height 1.6rem
		.count
			flex 1
			justify-self start
		.prize-result
			flex 1
			.my-prize
				float right
				width 4.65rem
				height 1.6rem
				margin-right 1.6rem
				background #CB0C05
				border 1px solid #FFE33F
				border-radius 1rem
	.start-btn
		margin 1.52rem auto 1.81rem
		width 7.89rem
		height 3.55rem
		background-image url('../../assets/start-btn.png')
		background-size 100%
		line-height 3rem
		font-size 1.3rem
		font-family MF LangQian (Noncommercial)
		color #AF0601
		font-weight Regular
	.my-prize-box
		position fixed 
		top 0
		left 0
		z-index 99
		width 100%
		height 100%
		background #CB0C05
		.prize-box-content
			position absolute
			top 50%
			left 50%
			transform translate(-50%,-50%)
			--webkit-transform translate(-50%,-50%)
			.prize-box
				width 15rem
				height 12.5rem
				background #FC5362
				border-radius 1rem
				.prize-top 
					width 100%
					height 3.23rem
					line-height 3.23rem
					font-family Microsoft YaHei
					font-weight 400
					color #FFFFFF
				.prize-bottom
					overflow-y scroll
					height 7.88rem
					margin-bottom 1.49rem
					ul li
						width 12.13rem
						height 1.5rem
						background #FFFFFF
						border-radius 1rem
						margin 0 auto 0.5rem
						font-size 0.85rem
						font-family Microsoft YaHei
						font-weight 400
						color #FC5362
						line-height 1.5rem
			.close-btn
				height 2rem
				width 2rem
				background-image url('../../assets/close-icon.png')
				background-size 100%
				margin 1.25rem auto 0

</style>
