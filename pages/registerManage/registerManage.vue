<template>
	<view>
		<u-gap height="30" bg-color="#ffffff"></u-gap>
		<view :index="index" v-for="(item, index) in registerList" :key="item.name">
			<view @click="managePop(item)"
				style="margin-left: 2vw;margin-right: 2vw;margin-top: 2vw;height: auto; border: 1px solid rgba(187, 187, 187, 100);line-height: 20px;border-radius: 10px 10px 10px 10px;color: rgba(16, 16, 16, 100);">
				<view style="margin-left: 2vw;margin-right: 2vw; display: inline-flex;">
					<view style="margin-left: 3vw; width: 75vw;">
						<u-gap height="10" bg-color="#ffffff"></u-gap>
						<text style="font-size:medium; font-weight: 500;">姓名：{{ item.name }}</text>
						<u-gap height="10" bg-color="#ffffff"></u-gap>
						<text style="font-size:medium; font-weight: 500;">用户名：{{ item.login_name }}</text>
						<u-gap height="10" bg-color="#ffffff"></u-gap>
						<text style="font-size:medium; font-weight: 500;margin-bottom: 3vw;">职位：{{ item.job_name }}</text>
					</view>
					<u-icon name="man-add-fill" size="80" top="5"></u-icon>
				</view>
			</view>
		</view>
		<u-popup v-model="popManageShow" mode="center" height="40%" width="80%" border-radius="14">
			<view style="margin-left: 5vw;margin-top: 8vw;margin-right: 5vw;">
				<view style="color: rgba(16, 16, 16, 100);font-size: 18px;font-family: PingFangSC-regular;">姓名：
					{{managerForm.name}}
				</view>
				<u-gap height="15" bg-color="#ffffff"></u-gap>
				<view style="color: rgba(16, 16, 16, 100);font-size: 18px;font-family: PingFangSC-regular;">用户名：
					{{managerForm.login_name}}
				</view>
				<u-gap height="15" bg-color="#ffffff"></u-gap>
				<view style="color: rgba(16, 16, 16, 100);font-size: 18px;font-family: PingFangSC-regular;">部门：
					{{managerForm.dept_name}}
				</view>
				<u-gap height="15" bg-color="#ffffff"></u-gap>
				<view style="color: rgba(16, 16, 16, 100);font-size: 18px;font-family: PingFangSC-regular;">职位：
					{{managerForm.job_name}}
				</view>
				<u-gap height="15" bg-color="#ffffff"></u-gap>
				<view style="color: rgba(16, 16, 16, 100);font-size: 18px;font-family: PingFangSC-regular;">邮箱：
					{{managerForm.email}}
				</view>
<!-- 				<u-gap height="15" bg-color="#ffffff"></u-gap>
				<view style="color: rgba(16, 16, 16, 100);font-size: 18px;font-family: PingFangSC-regular;">身份证号：
					{{managerForm.card_id}}
				</view> -->
				<u-gap height="60" bg-color="#ffffff"></u-gap>
				<view style="text-align: center;">
					<u-button @click="pass" style="float: left;">审核通过</u-button>
					<u-button @click="nopass" style="float: right;">审核不通过</u-button>
				</view>
			</view>
		</u-popup>
	</view>
	</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				popManageShow: false,
				managerForm: {
					name: '',
					sex: '',
					dept_name: '',
					job_name: '',
				},
				registerList: [
				],
			}
		},
		async onShow() {
			var rs = await this.getFileList()
			this.registerList = rs
			// this.newList = this.$store.state.newFileList
		},
		methods: {
			getFileList() {
				return new Promise((resolve, reject) => {
					uni.request({
						method: 'POST',
						url: 'http://42u47210c7.wicp.vip/api/refresh_underReview',
						header: {
							"content-type": 'application/json',
						},
						success: (res) => {
							resolve(res.data.data.data);
						}
					})
				})
			},
			managePop(item) {
				this.popManageShow = true;
				this.managerForm = item;
			},
			pass() {
				uni.request({
					method: 'POST',
					url: 'http://42u47210c7.wicp.vip/api/reviewpassed',
					header: {
						"content-type": 'application/json',
					},
					data:{
						login_name:this.managerForm.login_name
					},
					success: (res) => {
						uni.navigateTo({
							url:'../empty/empty'
						})
					}
				})
				this.popManageShow = false;
			},
			nopass() {
				uni.request({
					method: 'POST',
					url: 'http://42u47210c7.wicp.vip/api/reviewfailed',
					header: {
						"content-type": 'application/json',
					},
					data:{
						login_name:this.managerForm.login_name
					},
					success: (res) => {
						uni.navigateTo({
							url:'../empty/empty'
						})
					}
				})
				this.popManageShow = false;
			}
		}
	}
</script>

<style>

</style>
