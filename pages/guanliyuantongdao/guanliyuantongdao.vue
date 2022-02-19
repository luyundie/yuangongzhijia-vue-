<template>
	<view>
		<view style="margin-top: 10%;">
			<view style="display: inline-flex;">
				<view class="abtn" @click="zhiwei">
					<view>
						<u-gap height="25" bg-color="#ffffff"></u-gap>
						<text
							style="margin-left:1rpx;color: rgba(16, 16, 16, 100);font-size: 20px;font-weight: 600; text-align: left;font-family: PingFangSC-regular;">
							职位管理</text>
						<u-icon name="account-fill" size="50" style="margin-left: 1vw;"></u-icon>
					</view>
					<text
						style="left: 41px;color: rgba(16, 16, 16, 100);font-size: 14px;font-weight: 600; text-align: left;font-family: PingFangSC-regular;">Position Management</text>
				</view>
				<view class="abtn" @click="bumen" style="margin-left: 6vw;">
					<view>
						<u-gap height="25" bg-color="#ffffff"></u-gap>
						<text
							style="margin-left:1rpx;color: rgba(16, 16, 16, 100);font-size: 20px;font-weight: 600; text-align: left;font-family: PingFangSC-regular;">
							部门管理</text>
						<u-icon name="account-fill" size="50" style="margin-left: 1vw;"></u-icon>
					</view>
					<text
						style="left: 41px;color: rgba(16, 16, 16, 100);font-size: 14px;font-weight: 600; text-align: left;font-family: PingFangSC-regular;">Divisional Management</text>
				</view>
			</view>
			<u-gap height="30" bg-color="#ffffff"></u-gap>
			<view style="display: inline-flex;">
				<view class="abtn" @click="yuangong">
					<view>
						<u-gap height="25" bg-color="#ffffff"></u-gap>
						<text
							style="margin-left:1rpx;color: rgba(16, 16, 16, 100);font-size: 20px;font-weight: 600; text-align: left;font-family: PingFangSC-regular;">
							员工管理</text>
						<u-icon name="account-fill" size="50" style="margin-left: 1vw;"></u-icon>
					</view>
					<text
						style="left: 41px;color: rgba(16, 16, 16, 100);font-size: 14px;font-weight: 600; text-align: left;font-family: PingFangSC-regular;">Employee Management</text>
				</view>
				<view class="abtn" @click="gonggao()" style="margin-left: 6vw;">
					<view>
						<u-gap height="25" bg-color="#ffffff"></u-gap>
						<text
							style="margin-left:1rpx;color: rgba(16, 16, 16, 100);font-size: 20px;font-weight: 600; text-align: left;font-family: PingFangSC-regular;">
							公告管理</text>
						<u-icon name="account-fill" size="50" style="margin-left: 1vw;"></u-icon>
					</view>
					<text
						style="left: 41px;color: rgba(16, 16, 16, 100);font-size: 14px;font-weight: 600; text-align: left;font-family: PingFangSC-regular;">Notice
						Management</text>
				</view>
			</view>
					<u-gap height="30" bg-color="#ffffff"></u-gap>
			<view style="display: inline-flex;">
				<view class="abtn" @click="wenjian()">
					<view>
						<u-gap height="25" bg-color="#ffffff"></u-gap>
						<text
							style="margin-left:1rpx;color: rgba(16, 16, 16, 100);font-size: 20px;font-weight: 600; text-align: left;font-family: PingFangSC-regular;">
							文档管理</text>
						<u-icon name="account-fill" size="50" style="margin-left: 1vw;"></u-icon>
					</view>
					<text
						style="left: 41px;color: rgba(16, 16, 16, 100);font-size: 14px;font-weight: 600; text-align: left;font-family: PingFangSC-regular;">File
						Management</text>
				</view>
				<view class="abtn" @click="zhuce()" style="margin-left: 6vw;">
					<view>
						<u-gap height="25" bg-color="#ffffff"></u-gap>
						<text
							style="margin-left:1rpx;color: rgba(16, 16, 16, 100);font-size: 20px;font-weight: 600; text-align: left;font-family: PingFangSC-regular;">
							注册审核</text>
						<u-icon name="account-fill" size="50" style="margin-left: 1vw;"></u-icon>
					</view>
					<text
						style="left: 41px;color: rgba(16, 16, 16, 100);font-size: 14px;font-weight: 600; text-align: left;font-family: PingFangSC-regular;">Register
						Management</text>
				</view>
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
		onLoad() {

		},
		methods: {
			zhiwei() {
				uni.navigateTo({
					url: "../zhiweiguanli/zhiweiguanli"
				}) /*设置跳转到职位管理界面*/
			},
			bumen() {
				uni.navigateTo({
					url: "../bumenguanli/bumenguanli"
				})
			},
			/*部门*/
			yuangong() {
				uni.navigateTo({
					url: "../yuangongguanli/yuangongguanli"
				})
			},
			/*员工*/
			gonggao() {
				uni.navigateTo({
					url: "../announcement/announcement"
				})
			},
			/*公告*/
			wenjian() {
				uni.navigateTo({
					url: "../document/document"
				})
			},
			/*文件*/
			zhuce() {
				uni.navigateTo({
					url: "../registerManage/registerManage"
				})
			},
			
			/*注册审核*/
		}
	}
</script>

<style>
	.abtn {
		margin-left: 6.5vw;
		top: 232px;
		width: 40vw;
		height: 96px;
		border-radius: 6px 6px 6px 6px;
		text-align: center;
		border: 1px solid #000000;
	}
</style>
