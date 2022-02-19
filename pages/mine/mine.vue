<template>
	<view>
		<view class="backgroundPic" style="width: 100%;height:50vw">
			<u-icon name="setting" @click="gotoPage('../setting/setting')" color="#00007f" size="60"
				style="margin-left: 90%; margin-top: 1%;">
			</u-icon>
		</view>
		<u-gap height="50" bg-color="#ffffff"></u-gap>
		<view class="u-flex user-box u-p-l-30 u-p-r-20 u-p-b-30">
			<view class="u-m-r-10">
				<u-avatar :src="pic" size="140"></u-avatar>
			</view>
			<view class="u-flex-1">
				<view
					style="font-size:40rpx; font-weight: 500; font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;">
					{{userMessage.name}}
				</view>
				<view
					style="font-size:34rpx; font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;color:#8a8a8a;">
					用户名: {{userMessage.login_name}}</view>
			</view>
		</view>
		<u-divider half-width="100%">个人信息</u-divider>
		<u-gap height="30" bg-color="#ffffff"></u-gap>
		<view style="margin-left: 5vw;">
			<view class="u-font-18 u-p-b-20">性别: {{userMessage.sex==1?'男':'女'}}</view>
			<view class="u-font-18 u-p-b-20">部门: {{userMessage.dept_name}}</view>
			<view class="u-font-18 u-p-b-20">职位: {{userMessage.job_name}}</view>
			<view class="u-font-18 u-p-b-20">地址: {{userMessage.address}}</view>
			<view class="u-font-18 u-p-b-20">手机号: {{userMessage.phone}}</view>
			<view class="u-font-18 u-p-b-20">Email: {{userMessage.email}}</view>
			<view class="u-font-18 u-p-b-20">爱好: {{userMessage.hobby}}</view>
		</view>
		<u-gap height="20" bg-color="#ffffff"></u-gap>
		<view style="margin-left:15%;margin-right: 15%; text-align: center; margin-bottom: 20vw;">
			<button size="default" @click="gotoPage('../updateInfo/updateInfo')"
				style=" float: left ;border-radius: 4px;background-color: #ffffff;font-size: 14px;text-align: center;font-family: Microsoft Yahei;border-color: #000000;border-style: solid;border-width:1px">编辑资料</button>
			<button size="default" @click="unlogin"
				style="float: right ;border-radius: 4px;background-color: #ffffff;font-size: 14px;text-align: center;font-family: Microsoft Yahei;border-color: #000000;border-style: solid;border-width:1px">注销登录</button>
		</view>
		<tabbar :list="tabbar"></tabbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pic: '/static/picture/头像3.jpg',
				userInfo:{}
			}
		},
		methods: {
			gotoPage(url) {
				uni.navigateTo({
					url: url
				})
			},
			unlogin() {
				this.$store.dispatch('clear')
				uni.navigateTo({
					url: '../index/index'
				})
			}
		},
		computed: {
			userMessage() {
				return this.$store.state.userMessage
			}
		},
		onShow() {},
		onLoad() {
			this.tabbar = [{
					iconPath: "/static/logintabbar/首页.png",
					selectedIconPath: "/static/logintabbar/首页1.png",
					pagePath: "/pages/homepage/homepage"
				},
				{
					iconPath: "/static/logintabbar/搜索.png",
					selectedIconPath: "/static/logintabbar/搜索1.png",
					pagePath: "/pages/search/search"
				},
				{
					iconPath: "/static/logintabbar/资源.png",
					selectedIconPath: "/static/logintabbar/资源1.png",
					pagePath: "/pages/files/files"
				},
				{
					iconPath: "/static/logintabbar/我的.png",
					selectedIconPath: "/static/logintabbar/我的1.png",
					pagePath: "/pages/mine/mine"
				},
			]
		}
	}
</script>

<style>
	.backgroundPic {
		background: url(../../static/picture/背景图3.jpg);
		width: 100%, ;
		height: 100%;
		/* position: fixed; */
		background-size: 100% 100%;
		background-position: center center;
		background-repeat: no-repeat;
		background-size: cover;
		-webkit-background-size: cover;
		-moz-background-size: cover;
	}
</style>
