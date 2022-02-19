<template>
	<view>
		<image src="../../static/logintabbar/员工之家.png" mode="heightFix"
			style="margin-left: 30%;margin-top: 20%;height:40vw;line-height: 20px;color: rgba(16, 16, 16, 100);font-size: 14px;text-align: center;font-family: Arial;border: 1px solid #6f6f6f;">
		</image>
		<u-gap height="40" bg-color="#ffffff"></u-gap>
		<text class="titleText" style="margin-left: 20%; color: #747474;">CSI 员工之家</text>
		<u-gap height="70" bg-color="#ffffff"></u-gap>
		<view style="margin-left: 10vw;margin-right: 10vw;font-weight: 600;">
			<u-field v-model="account.login_name" border-top="true" style="font-size: x-large;color: #747474;"
				label-width="200" label="用户名 : " placeholder="请填写用户名">
			</u-field>
			<u-field v-model="account.password" :error-message="errorMessage" border-top="true"
				style="font-size: x-large;color: #747474;" label-width="200" label="密 码 : " placeholder="请填写密码"
				password=true>
			</u-field>
		</view>
		<u-gap height="80" bg-color="#ffffff"></u-gap>
		<view style="text-align: center; margin-left: 13%;margin-right: 15%;">
			<button @click="loginUser" class="btn" style="float: left;"> 登录</button>
			<button @click="regist" class="btn" style="float: right;"> 注册</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				account: {
					login_name: '',
					password: ''
				},
				errorMessage: '',
				newFile:[],
				newNotice:[]
			}
		},
		onLoad() {

		},
		methods: {
			loginUser(url) {
				
				uni.request({
					method: 'POST',
					url: 'http://42u47210c7.wicp.vip/api/updaten_new_notice',
					header: {
						"content-type": 'application/json',
					},
					data: {
						login_name: this.account.login_name,
					},
					success: (res1) => {
						this.$store.state.newNoticeList = res1.data.data.data;
						// this.newNotice = res1.data.data.data;
						// this.$store.dispatch('setNewNoticeList', this.newNotice);
						// console.log("noticeList",this.newNotice);
						// console.log("noticeList",this.$store.state.newNoticeList);
						uni.request({
							method: 'POST',
							url: 'http://42u47210c7.wicp.vip/api/updaten_new_file',
							header: {
								"content-type": 'application/json',
							},
							data: {
								login_name: this.account.login_name,
							},
							success: (res2) => {
								this.$store.state.newFileList = res2.data.data.data;
								// this.newFile = res2.data.data.data
								// console.log('newFile',this.newFile);
								// this.$store.dispatch('setNewFileList', this.newFile);
								uni.request({
									method: 'POST',
									url: 'http://42u47210c7.wicp.vip/api/Userlogin',
									header: {
										"content-type": 'application/json',
									},
									data: {
										login_name: this.account.login_name,
										password: this.account.password
									},
									success: (res) => {
										console.log(res.data.message)
										if (res.data.message == 'fail') {
											this.errorMessage = "账号或密码错误"
										} else {
											this.$store.dispatch('setUserMessage', res.data.data.data);
											uni.switchTab({
												url: '../homepage/homepage'
											})
										}
									}
								});
							}
						});
					}
				});
				
			},
			regist() {
				uni.navigateTo({
					url: '../regist/regist'
				})
			}
		}
	}
</script>

<style>
	.titleText {
		left: 80px;
		top: 250x;
		width: 290px;
		height: 90px;
		color: rgba(16, 16, 16, 100);
		font-size: 40px;
		text-align: match-parent;
		font-family: PingFangSC-regular;
	}

	.btn {
		width: 40%;
		height: 30%;
		border-radius: 4px;
		color: rgba(16, 16, 16, 100);
		font-size: 22px;
		text-align: center;
		font-family: Microsoft Yahei;
		border: 1px solid #000000;
		background-color: #FFFFFF;
	}
</style>
