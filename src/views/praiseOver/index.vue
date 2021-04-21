<template>
	<div class="contain">
		<span class="logo"></span>
		<div class="prasie-info font">
			{{this.info}}
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				info:"本次抽奖已结束，欢迎下次参与!",
				status:2
			};
		},
		mounted(){
			// if(this.status == 2){
			// 	this.info = "您已参与过此次抽奖！"
			// }
		},
		computed:{
			
		},
		methods:{
			
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
		display block
		height 1.92rem
		width 4rem
		margin-left 0.67rem
		margin-top 0.96rem
		background-image url('../../assets/logo-white.png')
		background-size cover
	.prasie-info
		color #FFDF39
		font-size 0.96rem
		font-weight bold
		position absolute
		top 50%
		left 50%
		width 80%
		transform translate(-50%,-50%)

			

</style>
