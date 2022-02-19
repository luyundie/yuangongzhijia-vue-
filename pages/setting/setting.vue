<template>
	<view>
		<u-gap height="100" bg-color="#ffffff"></u-gap>
		<view @click="gotoPage('../updatePass/updatePass')" style="border: 1px solid rgba(187, 187, 187, 100);margin-top: 10vw;margin-left: 5vw;margin-right: 5vw;">
			<view
				style="display: inline-flex; color: rgba(16, 16, 16, 100);font-size: 36px;text-align: left;font-family: PingFangSC-regular;">
				<u-icon name="eye-off" size="100" style="margin-left: 5vw;"></u-icon>
				<view style="margin-left: 5vw;">修改密码</view>
			</view>
		</view>
<!-- 		<u-gap height="50" bg-color="#ffffff"></u-gap>
		<view style="border: 1px solid rgba(187, 187, 187, 100);margin-top: 10vw;margin-left: 5vw;margin-right: 5vw;">
			<view
				style="display: inline-flex; color: rgba(16, 16, 16, 100);font-size: 36px;text-align: left;font-family: PingFangSC-regular;">
				<u-icon name="star-fill" size="100" style="margin-left: 5vw;"></u-icon>
				<view style="margin-left: 5vw;">颜色主题</view>
			</view>
		</view> -->
		<u-gap height="50" bg-color="#ffffff"></u-gap>
		<view v-if="userMessage().isAdmin==true" @click="gotoPage('../guanliyuantongdao/guanliyuantongdao')" style="border: 1px solid rgba(187, 187, 187, 100);margin-top: 10vw;margin-left: 5vw;margin-right: 5vw;">
			<view
				style="display: inline-flex; color: rgba(16, 16, 16, 100);font-size: 36px;text-align: left;font-family: PingFangSC-regular;">
				<u-icon name="lock-opened-fill" size="100" style="margin-left: 5vw;"></u-icon>
				<view style="margin-left: 5vw;">管理员通道</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			gotoPage(url){
				uni.navigateTo({
					url: url
				})
			},
			userMessage() {
				console.log(this.$store.state.userMessage.isAdmin)
				return this.$store.state.userMessage
			}
		}
	}
</script>

<style>

</style>
