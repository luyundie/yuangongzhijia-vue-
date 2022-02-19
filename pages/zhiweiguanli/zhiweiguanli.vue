<template>
	<view>
		<view style="text-align: center;">
			<view style="background-color: #ffffff; margin-top: 3vw;float: left;">
				<u-icon style="margin-left: 3vw;" name="star-fill" color="#505050" size="50" top="5"></u-icon>
				<text
					style="margin-left: 2vw; width: 50px;height: 20px;color: rgba(0, 0, 0, 100);font-size: 20px;text-align: left;font-family: PingFangSC-regular;">职位查询</text>
			</view>
			<u-icon name="plus" @click="addpop" color="#8a8a8a"
				style="border: 1px solid #6d6d6d ;border-radius: 50%; float: right; margin-top: 4vw; margin-right: 2vw;"
				size="45" top="1"></u-icon>
		</view>
		<u-gap height="150" bg-color="#ffffff"></u-gap>
		<view style="margin-left: 5vw;margin-right: 5vw;">
			<u-search @custom="search" bg-color="#FFFFFF" border-color="#8a8a8a" placeholder="请输入查询职位名称"
				v-model="searchJ" shape="square" action-text="查询"></u-search>
		</view>
		<u-gap height="100" bg-color="#ffffff"></u-gap>

		<view :index="index" v-for="(item, index) in jobList" :key="item.name">
			<view
				style="margin-left: 5vw;margin-right:5vw;margin-bottom: 2vw; font-family: Arial;border: 1px solid rgba(187, 187, 187, 100);">
				<view
					style="margin-left: 3vw;margin-top: 3vw; color: rgba(16, 16, 16, 100);font-size: 24px;text-align: left;font-family: PingFangSC-regular;">
					{{item.name}}
				</view>
				<view
					style="margin-left: 3vw;margin-top: 2vw;margin-bottom: 3vw; color: rgba(16, 16, 16, 100);font-size: 16px;text-align: left;font-family: PingFangSC-regular;">
					{{item.remark}}
				</view>
				<button @click="deleteJob(item.name)"
					style=" float:right ;border-radius: 4px;margin-right: 2vw; background-color: #ffffff;font-size: 14px;text-align: center;font-family: Microsoft Yahei;border-color: #4b4b4b;border-style: solid;border-width:1px">删除</button>
				<button size="default" @click="setpop(index,item.name)"
					style=" float:right ;border-radius: 4px;margin-right: 2vw; background-color: #ffffff;font-size: 14px;text-align: center;font-family: Microsoft Yahei;border-color: #4b4b4b;border-style: solid;border-width:1px">编辑</button>
				<u-gap height="90" bg-color="#ffffff"></u-gap>
			</view>
		</view>
		<u-popup v-model="popSetShow" mode="center" height="27%" width="80%" border-radius="14" v-if="this.setForm!=null">
			<view style="margin-left: 5vw;margin-top: 4vw;margin-right: 5vw;" >
				<u-form-item label="职位名称:" label-width="130">
					<u-input v-model="setForm.name"  :placeholder="this.jobList[this.indexPop].name" />
				</u-form-item>
				<u-form-item label="职位详情:" label-width="130">
					<u-input v-model="setForm.remark"  :placeholder="this.jobList[this.indexPop].remark" />
				</u-form-item>
				<u-gap height="40" bg-color="#ffffff"></u-gap>
				<u-button @click="setJob">确认</u-button>
			</view>
		</u-popup>
		<u-popup v-model="popAddShow" mode="center" height="27%" width="80%" border-radius="14">
			<view style="margin-left: 5vw;margin-top: 4vw;margin-right: 5vw;">
				<u-form-item label="职位名称:" label-width="130">
					<u-input v-model="form.name"/>
				</u-form-item>
				<u-form-item label="职位详情:" label-width="130">
					<u-input v-model="form.remark" />
				</u-form-item>
				<u-gap height="40" bg-color="#ffffff"></u-gap>
				<u-button @click="addJob">确认添加</u-button>
			</view>
		</u-popup>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				popAddShow: false,
				form: {
					name: '',
					remark: ''
				},
				popSetShow: false,
				jobList: [],
				searchJ: '',
				indexPop: 0,
				bename: '',
				setForm:{
					name:'',
					remark:'',
				}
			}
		},
		methods: {
			search() {
				uni.request({
					method: 'POST',
					url: 'http://42u47210c7.wicp.vip/api/jobsearch',
					header: {
						"content-type": 'application/json',
					},
					data: {
						name: this.searchJ,
					},
					success: (res) => {
						// this.jobList = [];
						// if (res.data.data.length > 1) {
							this.jobList = res.data.data.data;
						// } else {
						// 	this.jobList.push(res.data.data.data)
						// }
						console.log(this.jobList)
					}
				})

			},
			setpop(index, bename) {
				console.log(index)
				this.indexPop = index;
				this.bename = bename;
				// this.setForm.name = this.jobList[this.indexPop].name;
				// this.setForm.remark = this.jobList[this.indexPop].remark;
				this.popSetShow = true;
			},
			setJob() {
				uni.request({
					url: 'http://42u47210c7.wicp.vip/api/jobupdate',
					method: 'POST',
					data: {
						bename: this.bename,
						name: this.setForm.name==''?this.jobList[this.indexPop].name:this.setForm.name,
						remark: this.setForm.remark==''?this.jobList[this.indexPop].remark:this.setForm.remark
					},
					success: (res) => {
						// console.log(res.data);
						// this.jobList[this.indexPop].name = this.setForm.name;
						// this.jobList[this.indexPop].remark = this.setForm.remark;
						// this.$forceUpdate();
						uni.navigateTo({
							url:'../empty/empty'
						})
					}
				})
				this.popSetShow = false;
			},
			addpop() {
				this.popAddShow = true;
			},
			addJob() {
				uni.request({
					url: 'http://42u47210c7.wicp.vip/api/jobadd',
					method: 'POST',
					data: {
						name: this.form.name,
						remark: this.form.remark
					},
					success: (res) => {
						console.log(res.data);
						uni.navigateTo({
							url:'../empty/empty'
						})
					}
				})
				this.popAddShow = false;
			},
			deleteJob(name) {
				uni.request({
					url: 'http://42u47210c7.wicp.vip/api/jobdelete',
					method: 'POST',
					data: {
						name: name
					},
					success: (res) => {
						uni.showLoading({
							title: '删除成功',
							icon: 'success'
						});
						
						setTimeout(function() {
							uni.hideLoading();
						}, 3000);
						// console.log(res.data);
						uni.navigateTo({
							url:'../empty/empty'
						})
					}
				})
			},
			getJobList() {
				return new Promise((resolve, reject) => {
					uni.request({
						method: 'POST',
						url: 'http://42u47210c7.wicp.vip/api/jobsearch',
						header: {
							"content-type": 'application/json',
						},
						data:{
							bename:'',
							name:'',
							remark:''
						},
						success: (res) => {
							resolve(res.data.data);
						}
					})
				})
			},
		},
		async onShow() {
			var rs = await this.getJobList()
			this.jobList = rs.data
		},
	}
</script>
<style>
	.x {
		width: 20vw;
		height: 5vw;
		border-radius: 4px;
		color: #000000;
		background-color: #7e7e7e;
		font-size: 15px;
		text-align: center;
		font-family: Microsoft Yahei;
		border: 1px solid rgba(187, 187, 187, 100);
	}

	.x .btnValue {
		color: white;
	}

	.f {
		margin-top: 50px;
	}
</style>
