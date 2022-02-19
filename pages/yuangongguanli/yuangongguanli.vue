<template>
	<view>
		<view style="text-align: center;">
			<view style="background-color: #ffffff; margin-top: 3vw;float: left;">
				<u-icon style="margin-left: 3vw;" name="account-fill" color="#000000" size="50" top="5"></u-icon>
				<text
					style="margin-left: 2vw; width: 50px;height: 20px;color: rgba(0, 0, 0, 100);font-size: 20px;text-align: left;font-family: PingFangSC-regular;">员工查询</text>
			</view>
		</view>
		<u-gap height="100" bg-color="#ffffff"></u-gap>
		<u-form :model="searchForm" ref="uForm">
			<view style="display: inline-flex;margin-left:4vw">
				<u-form-item label="职位:" style="width: 46vw;">
					<u-input v-model="searchForm.job_name" />
				</u-form-item>
				<u-form-item label="姓名:" style="width: 46vw;">
					<u-input v-model="searchForm.name" />
				</u-form-item>
			</view>
			<view style="display: inline-flex;margin-left:4vw">
				<u-form-item label="性别:" style="width: 46vw;">
					<u-input v-model="searchForm.sex" />
				</u-form-item>
				<u-form-item label="部门:" style="width: 46vw;">
					<u-input v-model="searchForm.dept_name" />
				</u-form-item>
			</view>
			<view style="margin-left: 4vw;">
				<u-form-item label="手机号:" label-width="110">
					<u-input v-model="searchForm.phone" />
				</u-form-item>
				<u-form-item label="身份证号: " label-width="130">
					<u-input v-model="searchForm.card_id" />
				</u-form-item>
			</view>
		</u-form>
		<u-button style="margin-left:6.5vw;margin-right: 6.5vw;" @click="searchUser">查询</u-button>
		<u-gap height="40" bg-color="#ffffff"></u-gap>
		<view v-if="this.userList[0].name !=''">
			<view :index="index" v-for="(item, index) in userList" :key="item.login_name">
				<view
					style="margin-left: 2vw;margin-right: 2vw;margin-bottom: 2vw; height: auto; border: 1px solid rgba(187, 187, 187, 100);line-height: 20px;border-radius: 10px 10px 10px 10px;color: rgba(16, 16, 16, 100)">
					<view style="margin-left: 2vw;margin-right: 2vw;">
						<u-gap height="50" bg-color="#ffffff"></u-gap>
						<text class="title u-line-2" style="font-size:large; font-weight: 600;">姓名: {{ item.name }}</text>
						<u-gap height="20" bg-color="#ffffff"></u-gap>
						<text class="title u-line-2" style="font-size:large;">部门： {{ item.dept_name }}</text>
						<u-gap height="20" bg-color="#ffffff"></u-gap>
						<text class="title u-line-2" style="font-size:large;">职位： {{ item.job_name }}</text>
						<u-gap height="20" bg-color="#ffffff"></u-gap>
						<text class="title u-line-2" style="font-size:large;">手机号： {{ item.phone }}</text>
						<u-gap height="30" bg-color="#ffffff"></u-gap>
						<view style="margin-left: 70%;">
							<u-button @tap="changeName(index)" size="mini" class="btn" style="float: right;"> 详情
							</u-button>
							<u-button @click="mamagepop(index)" size="mini">管理</u-button>
						</view>
					</view>
				</view>
			</view>
		</view>
		<u-popup v-model="popManageShow" mode="center" height="30%" width="80%" border-radius="14">
			<view style="margin-left: 5vw;margin-top: 8vw;margin-right: 5vw;">
				<u-form-item label="职位:"label-width="110">
					<u-input v-model="userList[indexPop].job_name" />
				</u-form-item>
				<u-form-item label="部门: " label-width="130">
					<u-input v-model="userList[indexPop].dept_name" />
				</u-form-item>
				<u-gap height="40" bg-color="#ffffff"></u-gap>
				<view style="text-align: center;">
					<u-button @click="deleteUser" style="float: left;">删除</u-button>
					<u-button @click="changeUser" style="float: right;">修改</u-button>
				</view>
			</view>
		</u-popup>
		<u-gap height="70" bg-color="#ffffff"></u-gap>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				popManageShow: false,
				searchForm: {
					job_name: '',
					name: '',
					sex: '',
					dept_name: '',
					phone: '',
					card_id: ''
				},
				userList: [{
					login_name: '',
					password: '',
					statue: '',
					name: '',
					dept_name: '',
					job_name: '',
					card_id: '',
					address: '',
					post_code: ' ',
					phone: '',
					qq_num: '',
					email: '',
					sex: '',
					party: '',
					birthday: '',
					race: '',
					education: '',
					speciality: '',
					hobby: '',
					remark: '',
					creat_date: ''
				}],
				indexPop: 0,
			}
		},
		methods: {
			searchUser() {
				uni.request({
					url: 'http://42u47210c7.wicp.vip/api/Empsearch_A',
					method: 'POST',
					data: {
						job_name: this.searchForm.job_name,
						name: this.searchForm.name,
						sex: this.searchForm.sex,
						dept_name: this.searchForm.dept_name,
						phone: this.searchForm.phone,
						card_id: this.searchForm.card_id
					},
					success: (res) => {
						this.userList = res.data.data.data
						if (this.userList.length > 1) {
							this.userList = res.data.data.data;
						} else {
							this.userList = []
							this.userList.push(res.data.data.data)
						}
						console.log(res.data.data.data)
						this.searchForm.name = ''
						this.searchForm.dept_name = ''
						this.searchForm.job_name = ''
						this.searchForm.sex = ''
						this.searchForm.phone = ''
						this.searchForm.card_id = ''
					}
				})
			},
			mamagepop(index) {
				this.indexPop = index;
				this.popManageShow = true;
			},
			deleteUser() {
				uni.request({
					url: 'http://42u47210c7.wicp.vip/api/Empdelete',
					method: 'POST',
					data: {
						login_name: this.userList[this.indexPop].login_name
					},
					header: {
						"content-type": 'application/json',
					},
					success: (res) => {
						console.log(res)
						this.popManageShow = false;
						uni.navigateTo({
							url: '../empty/empty'
						})
					}
				})
			},
			changeUser() {
				uni.request({
					url: 'http://42u47210c7.wicp.vip/api/AdminEditEmployeeInfo',
					method: 'POST',
					data: {
						login_name: this.userList[this.indexPop].login_name,
						job_name: this.userList[this.indexPop].job_name,
						dept_name: this.userList[this.indexPop].dept_name
					},
					header: {
						"content-type": 'application/json',
					},
					success: (res) => {
						console.log(res.data);
						uni.navigateTo({
							url: '../empty/empty'
						})
					}
				})
				this.popManageShow = false;
			},
			changeName: function(index) {
				var data = JSON.stringify(this.userList[index])
				// var data = this.userList[index]
				uni.navigateTo({
					url: '../../pages/xiangqing/xiangqing?data=' + data
				})
			}
		}
	}
</script>

<style>

</style>
