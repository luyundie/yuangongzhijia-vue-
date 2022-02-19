<template>
	<view>
		<view class="u-flex user-box u-p-l-30 u-p-r-20 u-p-b-30">
			<view class="u-m-r-10" style="margin-top: 15%;margin-left: 35%;">
				<u-avatar :src="pic" size="200"></u-avatar>
			</view>
		</view>
		<u-gap height="80" bg-color="#ffffff"></u-gap>
		<u-field v-model="registerInfo.name" label="姓名 : " placeholder="请填写姓名">
		</u-field>
		<u-field v-model="registerInfo.login_name" label="用户名 : " placeholder="请填写用户名">
		</u-field>
		<u-field v-model="registerInfo.dept_name" label="部门 : " placeholder="请填写部门">
		</u-field>
		<u-field v-model="registerInfo.job_name" label="职位 : " placeholder="请填写职位">
		</u-field>
		<u-field v-model="registerInfo.email" label="邮箱 : " placeholder="请填写邮箱">
		</u-field>
		<u-field v-model="registerInfo.card_id" label="身份证号 : " placeholder="请填写身份证号">
		</u-field>
		<u-field v-model="registerInfo.password" label="密码 : " placeholder="请填写密码" password="true">
		</u-field>
		<u-gap height="80" bg-color="#ffffff"></u-gap>
		<u-button @click="regist" style="margin-left: 2vw;margin-right: 2vw;">注册</u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pic: '/static/picture/头像3.jpg',
				registerInfo: {
					name: '',
					dept_name: '',
					job_name: '',
					email: '',
					card_id: '',
					login_name: '',
					password: ''
				}
			}
		},
		methods: {
			regist() {
				uni.request({
					method: 'POST',
					url: 'http://42u47210c7.wicp.vip/api/Register_new_user',
					header: {
						"content-type": 'application/json',
					},
					data: {
						name: this.registerInfo.name,
						dept_name: this.registerInfo.dept_name,
						job_name: this.registerInfo.job_name,
						email: this.registerInfo.email,
						card_id: this.registerInfo.email,
						login_name: this.registerInfo.login_name,
						password: this.registerInfo.password
					},
					success: (res) => {
						// this.noticeList = res.data.data;
						// if(this.noticeList.data.length>1){
						// 	this.noticeList = res.data.data.data;
						// }
						// console.log(this.noticeList)
						uni.navigateBack({
							
						})
					}
				})
			}
		}
	}
</script>

<style>

</style>
