<template>
	<view>
		<view style="margin-left: 2vw;">
			<u-field v-model="userInfo.name" label="姓名 :" :placeholder="userMessage.name" border-bottom="false" disabled="true">
			</u-field>
			<u-field v-model="userInfo.login_name" label="用户名 :" :placeholder="userMessage.login_name" border-bottom="false" disabled="true">
			</u-field>
			<u-field v-model="userInfo.dept_name" label="部门 :" :placeholder="userMessage.dept_name" border-bottom="false" disabled="true">
			</u-field>
			<u-field v-model="userInfo.job_name" label="职位 :" :placeholder="userMessage.job_name" border-bottom="false" disabled="true">
			</u-field>
			<u-field v-model="userInfo.sex" label="性别 :" :placeholder="userMessage.sex==1?'男':'女'" border-bottom="false" disabled="true">ususerInfo.sex==}}</u-field>
		</view>
		<view style="margin-left: 2vw;font-weight: 600;">
			<u-field v-model="userInfo.email" :placeholder="userMessage.email" label="邮箱 :">
			</u-field>
			<u-field v-model="userInfo.card_id" :placeholder="userMessage.card_id" label="身份证号 :">
			</u-field>
			<u-field v-model="userInfo.phone" :placeholder="userMessage.phone" label="手机号 :">
			</u-field>
			<u-field v-model="userInfo.qq_num" :placeholder="userMessage.qq_num" label="QQ :">
			</u-field>
			<u-field v-model="userInfo.education" :placeholder="userMessage.education" label="学历 :">
			</u-field>
			<u-field v-model="userInfo.address" :placeholder="userMessage.address" label="住址 :">
			</u-field>
			<u-field v-model="userInfo.post_code" :placeholder="userMessage.post_code" label="邮政编码 :">
			</u-field>
			<u-field v-model="userInfo.party" :placeholder="userMessage.party" label="政治面貌 :">
			</u-field>
			<u-field v-model="userInfo.birthday" :placeholder="userMessage.birthday" label="生日 :">
			</u-field>
			<u-field v-model="userInfo.race" :placeholder="userMessage.race" label="民族 :">
			</u-field>
			<u-field v-model="userInfo.speciality" :placeholder="userMessage.education" label="专业 :">
			</u-field>
			<u-field v-model="userInfo.hobby" :placeholder="userMessage.hobby" label="爱好 :">
			</u-field>
		</view>
		<u-button style="margin-left:75%; margin-bottom: 5vw;margin-top: 2vw; margin-right: 2vw;" @click="update">确认修改</u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo: {
					login_name: '',
					card_id: '',
					address: '',
					post_code: '',
					phone: '',
					qq_num: '',
					email: '',
					party: '',
					birthday: '',
					race: '',
					education: '',
					speciality: '',
					hobby: ''
				},
			}
		},
		// async onShow() {
		// 	var rs = await this.setInfo()
		// },
		methods: {
			update() {
				console.log(this.userInfos)
				uni.request({
					method: 'POST',
					url: 'http://42u47210c7.wicp.vip/api/updateInfo_U',
					header: {
						"content-type": 'application/json',
					},
					data: {
						login_name: this.$store.state.userMessage.login_name,
						card_id: this.userInfo.card_id==''?this.$store.state.userMessage.card_id:this.userInfo.card_id,
						address: this.userInfo.address==''?this.$store.state.userMessageaddress: this.userInfo.address,
						post_code: this.userInfo.post_code==''?this.$store.state.userMessage.post_code:this.userInfo.post_code,
						phone: this.userInfo.phone==''?this.$store.state.userMessagephone:this.userInfo.phone,
						qq_num: this.userInfo.qq_num==''?this.$store.state.userMessage.qq_num:this.userInfo.qq_num,
						email: this.userInfo.email==''?this.$store.state.userMessage.email:this.userInfo.email,
						party: this.userInfo.party==''?this.$store.state.userMessage.party: this.userInfo.party,
						birthday: this.userInfo.birthday==''?this.$store.state.userMessage.birthday:this.userInfo.birthday,
						race: this.userInfo.race==''?this.$store.state.userMessagerace:this.userInfo.race,
						education: this.userInfo.education==''?this.$store.state.userMessage.education:this.userInfo.education,
						speciality: this.userInfo.speciality==''?this.$store.state.userMessage.speciality:this.userInfo.speciality,
						hobby: this.userInfo.hobby==''?this.$store.state.userMessage.hobby:this.userInfo.hobby,
					},
					success: (res) => {
						// this.data = res.data;
						// this.$store.dispatch('setUserMessage', this.userInfo)
						// console.log(this.userInfo)
						uni.navigateBack({

						})
					}
				})
			}
		},
		computed: {
			userMessage() {
				return this.$store.state.userMessage
			}
		},
		onLoad() {
		}
	}
</script>

<style>

</style>
