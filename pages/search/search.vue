<template>
	<view>
		<u-swiper :list="pictureList" height="400"  title=false mode="none"></u-swiper>
		<u-gap height="30" bg-color="#ffffff"></u-gap>
		<view style="display: inline-flex;">
			<view :class="[searchE==true?'searchSelected':'search']" @click="searchChangeE">
				<view>
					<u-gap height="25" bg-color="#ffffff"></u-gap>
					<text
						style="margin-left:1rpx;color: rgba(16, 16, 16, 100);font-size: 20px;font-weight: 600; text-align: left;font-family: PingFangSC-regular;">
						员工查询</text>
					<u-icon name="account-fill" size="50" style="margin-left: 1vw;"></u-icon>
				</view>
				<text
					style="left: 41px;color: rgba(16, 16, 16, 100);font-size: 14px;font-weight: 600; text-align: left;font-family: PingFangSC-regular;">search
					employee</text>
			</view>
			<view :class="[searchD==true?'searchSelected':'search']" @click="searchChangeD">
				<view>
					<u-gap height="25" bg-color="#ffffff"></u-gap>
					<text
						style="margin-left:1rpx;color: rgba(16, 16, 16, 100);font-size: 20px;font-weight: 600; text-align: left;font-family: PingFangSC-regular;">
						部门查询</text>
					<u-icon name="account-fill" size="50" style="margin-left: 1vw;"></u-icon>
				</view>
				<text
					style="left: 41px;color: rgba(16, 16, 16, 100);font-size: 14px;font-weight: 600; text-align: left;font-family: PingFangSC-regular;">search
					department</text>
			</view>
		</view>
		<view v-if="searchE===true">
			<u-form :model="form" ref="uForm">
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
			<u-button style="margin-left:6.5vw;margin-right: 6.5vw; margin-top: 1vw;" @click="searchUser">查询</u-button>
			<u-gap height="25" bg-color="#ffffff"></u-gap>
			<view v-if="this.userList.length != 0">
				<u-table align="center">
					<u-tr>
						<u-th width="15%">姓名</u-th>
						<u-th width="15%">性别</u-th>
						<u-th width="20%">职位</u-th>
						<u-th width="20%">部门</u-th>
						<u-th width="30%">手机号码</u-th>
					</u-tr>

					<view :index="index" v-for="(item, index) in userList" :key="item.name">
						<u-tr v-if="item.sex==1||item.sex==2" style="height: 8vw;">
							<u-td width="15%">{{item.name}}</u-td>
							<u-td width="15%">{{item.sex==1?'男':'女'}}</u-td>
							<u-td width="20%">{{item.job_name}}</u-td>
							<u-td width="20%">{{item.dept_name}}</u-td>
							<u-td width="30%">{{item.phone}}</u-td>
						</u-tr>

					</view>
				</u-table>
			</view>
		</view>
		<view v-if="searchD===true">
			<view style="margin-left: 6.5vw;margin-right: 6.5vw;">
				<u-gap height="25" bg-color="#ffffff"></u-gap>
				<u-search bg-color="#FFFFFF" border-color="#8a8a8a" placeholder="请输入查询部门名称" v-model="deptSearch"
					shape="square" action-text="查询" @custom="searchDept"></u-search>
				<u-gap height="25" bg-color="#ffffff"></u-gap>
				<view :index="index" v-for="(item, index) in deptList" :key="item.login_name">
					<view style="margin-bottom: 2vw ;font-family: Arial;border: 1px solid rgba(187, 187, 187, 100);">
						<view
							style="margin-left: 3vw;margin-top: 3vw; color: rgba(16, 16, 16, 100);font-size: 24px;text-align: left;font-family: PingFangSC-regular;">
							{{item.name}}
						</view>
						<view
							style="margin-left: 3vw;margin-top: 2vw;color: rgba(16, 16, 16, 100);font-size: 16px;text-align: left;font-family: PingFangSC-regular;">
							部长：{{item.director}}</view>
						<view
							style="margin-left: 3vw;margin-top: 2vw;margin-bottom: 3vw; color: rgba(16, 16, 16, 100);font-size: 16px;text-align: left;font-family: PingFangSC-regular;">
							{{item.remark}}
						</view>
					</view>
				</view>
			</view>
			<view v-if="this.deptUser.length != 0">
				<u-table align="center">
					<u-tr>
						<u-th width="15%">姓名</u-th>
						<u-th width="15%">性别</u-th>
						<u-th width="20%">职位</u-th>
						<u-th width="20%">部门</u-th>
						<u-th width="30%">手机号码</u-th>
					</u-tr>

					<view :index="index" v-for="(item, index) in deptUser" :key="item.name">
						<u-tr v-if="item.sex==1||item.sex==2" style="height: 8vw;">
							<u-td width="15%">{{item.name}}</u-td>
							<u-td width="15%">{{item.sex==1?'男':'女'}}</u-td>
							<u-td width="20%">{{item.job_name}}</u-td>
							<u-td width="20%">{{item.dept_name}}</u-td>
							<u-td width="30%">{{item.phone}}</u-td>
						</u-tr>
					</view>
				</u-table>
			</view>
		</view>
		<tabbar :list="tabbar"></tabbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				searchForm: {
					job_name: '',
					name: '',
					sex: '',
					dept_name: '',
					phone: '',
					card_id: ''
				},
				deptSearch: '',
				searchE: true,
				searchD: false,
				pictureList: [{
					image: '/static/picture/1.jpg',
					},
					{
						image: '/static/picture/2.jpg',
					},
					{
						image: '/static/picture/3.jpg',
					},
					{
						image: '/static/picture/4.jpg',
					},
					{
						image: '/static/picture/5.jpg',
					}],
				userList: [],
				deptList: [],
				deptUser: [],
			}
		},
		methods: {
			searchChangeE() {
				this.searchE = true;
				this.searchD = false;
			},
			searchChangeD() {
				this.searchE = false;
				this.searchD = true;
			},
			searchUser() {
				uni.request({
					method: 'POST',
					url: 'http://42u47210c7.wicp.vip/api/Empsearch_A',
					header: {
						"content-type": 'application/json',
					},
					data: {
						dept_name: this.searchForm.dept_name,
						job_name: this.searchForm.job_name,
						name: this.searchForm.name,
						sex: this.searchForm.sex,
						phone: this.searchForm.phone,
						card_id: this.searchForm.card_id
					},
					success: (res) => {
						this.userList = res.data.data;
						if(this.userList.data.length>1){
							this.userList = res.data.data.data;
						}
						this.searchForm.name = ''
						this.searchForm.dept_name = ''
						this.searchForm.job_name = ''
						this.searchForm.sex = ''
						this.searchForm.phone = ''
						this.searchForm.card_id = ''
					}
				})
			},
			searchDept() {
				uni.request({
					method: 'POST',
					url: 'http://42u47210c7.wicp.vip/api/deptsearch_U',
					header: {
						"content-type": 'application/json',
					},
					data: {
						name: this.deptSearch,
					},
					success: (res) => {
						this.deptList = [];
						if (res.data.data.length > 1) {
							this.deptList = res.data.data;
						} else {
							this.deptList.push(res.data.data.data)
						}
						this.deptUser = res.data.data.data_emp;
						console.log(this.deptList)
						console.log(this.deptUser)
					}
				})
			}
		},
		onShow() {
			this.userList = []
			this.deptList = []
			this.deptUser = []
		},
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
	.search {
		margin-left: 6.5vw;
		top: 232px;
		width: 40vw;
		height: 96px;
		border-radius: 6px 6px 6px 6px;
		text-align: center;
		border: 1px solid rgba(187, 187, 187, 100);
	}

	.searchSelected {
		margin-left: 6.5vw;
		top: 232px;
		width: 40vw;
		height: 96px;
		border-radius: 6px 6px 6px 6px;
		text-align: center;
		border: 4px solid rgba(39, 177, 72, 100);
	}
</style>
