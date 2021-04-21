<template>
	<div class="contain">
		<span class="logo"></span>
		<div 
			class="watch-btn font" 
			v-if="userIdentity =='salesman'"
			@click="watchPraiseList()"
		>查看中奖情况</div>
        <div class="sao-ma"
			@click="goPraise()"
		></div>
		<div 
			class="over-btn font"
			@click="overPrasie()"
			v-if="userIdentity =='salesman'"
		>结束抽奖</div>
		<msgAlert 
            :isshow = isshow
            :msg = alertmsg
			:isquxiao = isquxiao
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
				status:2,
				alertmsg:"是否结束本次抽奖？",
				isshow:false,
				isquxiao:true
			};
		},
		mounted(){
			console.log(this.userIdentity)
		},
		computed:{
			...mapState(["userIdentity"])
		},
		components:{
			msgAlert
		},
		methods:{
			watchPraiseList(){
				this.$router.push({
					path:"/praisePersonList"
				})
			},
			goPraise(){
				this.$router.push({
					path:"/attendPersonLogin"
				})
			},
			overPrasie(){
				this.isshow = true
			},
			changeshow(val){
				this.isshow = val
				console.log("666",val)
			},
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
