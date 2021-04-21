<template>
	<div class="contain">
		<span class="logo"></span>
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
		<div class="start-btn">
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
							<li v-for="item in 10">
								一等奖：水壶
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
	</div>
</template>

<script>
	import { mapState,mapMutations } from "vuex"
	export default {
		data() {
			return {
				prizes: [],
				prizeshow:false,//控制显示
				defaultStyle: {
					fontColor: '#d64737',
					fontSize: '14px'
				},
				blocks: [
					{ padding: '13px', background: '#d64737' }
				],
				buttons: [
					{ radius: '50px', background: '#d64737' },
					{ radius: '45px', background: '#fff' },
					{ radius: '41px', background: '#f6c66f', pointer: true },
					{
					radius: '35px', background: '#ffdea0',
					// imgs: [{ src: require('./img/button.png'), width: '65%', top: '-50%' }]
					}
				],
			};
		},
		mounted(){
			this.getPrizesList()
			this.request.post(
				"lottery/lottery/get_prize",
				{
					mtoken:this.token1
				}
			).then(res=>{
				console.log(res)
			})
			// this.$notify({
			// 		position: 'top-left',
			// 		duration:0,
			// 		showClose:false,
			// 		// message: h('i', { style: 'color: teal;width:5.45rem;height:1.6rem'}, '这是提示文案这是提示文案')
			// 		message: '这是一条不会自动关闭的消息',
			// });
		},
		computed:{
			...mapState(["amount","count","token1"]),
		},
		methods:{
			 ...mapMutations(["setAmount","setCount"]),
			closePrizeAlert(){
				this.prizeshow = false
			},
			getPrizesList () {
				const prizes = []
				let data = ['1元红包', '100元红包', '0.5元红包','0.3元红包', '5元红包','10元红包']
				data.forEach((item, index) => {
					prizes.push({
					title: item,
					background: index % 2 == 1? '#f9e3bb' : '#f8d384',
					fonts: [{ text: item, top: '10%' }],
					})
			})
				this.prizes = prizes
			},
			startCallBack () {
				this.$refs.LuckyWheel.play()
				setTimeout(() => {
					this.$refs.LuckyWheel.stop(0)
				}, 3000)
			},
			endCallBack (prize) {
				// alert(`恭喜你获得${prize.title}`)
				// this.$message(`恭喜你获得${prize.title}`)
				const h = this.$createElement;
				this.$notify({
					position: 'top-left',
					duration:10000,
					offset:200,
					showClose:false,
					message: h('span', 
					{ style: 'color: #FFFFFF'}, 
					`恭喜抽中${prize.title}`)
					// message: '这是一条不会自动关闭的消息',
				});
			},
			watchMyPrize(){
				this.prizeshow = true
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
