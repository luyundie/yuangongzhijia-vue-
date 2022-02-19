<template>
	<view>
		<u-gap height="30" bg-color="#ffffff"></u-gap>
		<view style="margin-left: 2vw;">
			<u-form-item label="用户名:" label-width="150">
				<u-input v-model="userMessage.login_name" disabled="true" />
			</u-form-item>
			<u-form-item label="旧密码:" label-width="150">
				<u-input v-model="old_pass" />
			</u-form-item>
			<u-form-item label="新密码:" label-width="150">
				<u-input v-model="newPass" :placeholder="请输入新密码" />
			</u-form-item>
			<u-form-item label="新密码:" label-width="150">
				<u-input v-model="newPass1" :placeholder="请确认新密码" />
			</u-form-item>
			<u-toast ref="uToast" />
		</view>
		<u-gap height="30" bg-color="#ffffff"></u-gap>
		<u-button @click="pass" style="margin-left: 2vw;margin-right: 2vw;">确认修改</u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				newPass: '',
				newPass1: '',
				login_name: '',
				old_pass: '',
				message: ''
			}
		},
		methods: {
			pass() {
				if (this.newPass != this.newPass1) {
					this.$refs.uToast.show({
						title: "请确保两次输入的新密码一致",
						type: 'error',
					})
					this.newPass1 = ''
				} else {
					uni.request({
						method: 'POST',
						url: 'http://42u47210c7.wicp.vip/api/passwordupdate',
						header: {
							"content-type": 'application/json',
						},
						data: {
							login_name: this.$store.state.userMessage.login_name,
							bepassword: this.old_pass,
							password: this.newPass
						},
						success: (res) => {
							console.log(res)
						}
					})
				}
			}
		},
		computed: {
			userMessage() {
				return this.$store.state.userMessage
			}
		},
	}
</script>

<style>

</style>
