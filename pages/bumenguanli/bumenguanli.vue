<template>
	<view>
		<view style="text-align: center;">
			<view style="background-color: #ffffff; margin-top: 3vw;float: left;">
				<u-icon style="margin-left: 3vw;" name="star-fill" color="#505050" size="50" top="5"></u-icon>
				<text
					style="margin-left: 2vw; width: 50px;height: 20px;color: rgba(0, 0, 0, 100);font-size: 20px;text-align: left;font-family: PingFangSC-regular;">部门查询</text>
			</view>
			<u-icon name="plus" @click="addpop" color="#8a8a8a"
				style="border: 1px solid #6d6d6d ;border-radius: 50%; float: right; margin-top: 4vw; margin-right: 2vw;"
				size="45" top="1"></u-icon>
		</view>
		<u-gap height="150" bg-color="#ffffff"></u-gap>
		<view style="margin-left: 5vw;margin-right: 5vw;">
			<u-search @custom="searchD" bg-color="#FFFFFF" border-color="#8a8a8a" placeholder="请输入查询部门名称" v-model="searchDept"
				shape="square" action-text="查询"></u-search>
		</view>
		<u-gap height="100" bg-color="#ffffff"></u-gap>
		<view :index="index" v-for="(item, index) in deptList" :key="item.name">
			<view
				style="margin-left: 5vw;margin-right: 5vw;margin-bottom: 2vw ;font-family: Arial;border: 1px solid rgba(187, 187, 187, 100);">

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
				<button @click="deleteDept(item.name)"
					style=" float:right ;border-radius: 4px;margin-right: 2vw; background-color: #ffffff;font-size: 14px;text-align: center;font-family: Microsoft Yahei;border-color: #4b4b4b;border-style: solid;border-width:1px">删除</button>
				<button size="default" @click="setpop(index,item.name)"
					style=" float:right ;border-radius: 4px;margin-right: 2vw; background-color: #ffffff;font-size: 14px;text-align: center;font-family: Microsoft Yahei;border-color: #4b4b4b;border-style: solid;border-width:1px">编辑</button>
				<u-gap height="90" bg-color="#ffffff"></u-gap>
			</view>
		</view>
		<u-popup v-model="popSetShow" mode="center" height="34%" width="80%" border-radius="14">
			<view style="margin-left: 5vw;margin-top: 4vw;margin-right: 5vw;">
				<u-form-item label="部门名称:"  label-width="130">
					<u-input v-model="setForm.name" />
				</u-form-item>
				<u-form-item label="部门经理:"  label-width="130">
					<u-input v-model="setForm.director" />
				</u-form-item>
				<u-form-item label="部门详情:" label-width="130">
					<u-input v-model="setForm.remark" />
				</u-form-item>
				<u-gap height="40" bg-color="#ffffff"></u-gap>
				<u-button @click="setDept">确认</u-button>
			</view>
		</u-popup>
		<u-popup v-model="popAddShow" mode="center" height="auto" width="80%" border-radius="14">
			<view style="margin-left: 5vw;margin-top: 5vw;margin-right: 5vw;">
				<u-form-item label="部门名称:" label-width="130">
					<u-input v-model="form.name" />
				</u-form-item>
				<u-form-item label="部门经理:" label-width="130">
					<u-input v-model="form.director" />
				</u-form-item>
				<u-form-item label="部门详情:" label-width="130">
					<u-input v-model="form.remark" />
				</u-form-item>
				<u-gap height="40" bg-color="#ffffff"></u-gap>
				<u-button @click="addDept">确认添加</u-button>
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
					director: '',
					remark: ''
				},
				popSetShow: false,
				deptList: [
				],
				data: '',
				indexPop: 0,
				bename: '',
				setForm:{
					name:'',
					director:'',
					remark:''
				},
				searchDept: ''
			}
		},
		async onShow() {
			var rs = await this.getDeptList()
			this.deptList = rs.data
		},
		methods: {
			getDeptList() {
				return new Promise((resolve, reject) => {
					uni.request({
						method: 'POST',
						url: 'http://42u47210c7.wicp.vip/api/deptrefresh',
						header: {
							"content-type": 'application/json',
						},
						success: (res) => {
							resolve(res.data.data);
						}
					})
				})
			},
			searchD() {
				uni.request({
					method: 'POST',
					url: 'http://42u47210c7.wicp.vip/api/deptsearch_U',
					header: {
						"content-type": 'application/json',
					},
					data: {
						name: this.searchDept,
					},
					success: (res) => {
						this.deptList = [];
						if (res.data.data.length > 1) {
							this.deptList = res.data.data;
						} else {
							this.deptList.push(res.data.data.data)
						}
						console.log(this.deptList)
					}
				})

			},
			addDept() {
				uni.request({
					method: 'POST',
					url: 'http://42u47210c7.wicp.vip/api/deptadd',
					header: {
						"content-type": 'application/json',
					},
					data: {
						name: this.form.name,
						director: this.form.director,
						remark: this.form.remark
					},
					success: (res) => {
						this.data = res.data;
						uni.navigateTo({
							url:'../empty/empty'
						})
					}
				})
				this.popAddShow = false;
			},
			setpop(index, bename) {
				this.indexPop = index;
				this.bename = bename;
				this.setForm.name = this.deptList[index].name;
				this.setForm.director = this.deptList[index].director;
				this.setForm.remark = this.deptList[index].remark;
				this.popSetShow = true;
			},
			setDept() {
				uni.request({
					url: 'http://42u47210c7.wicp.vip/api/deptupdate',
					method: 'POST',
					data: {
						bename: this.bename,
						name: this.setForm.name,
						director: this.setForm.director,
						remark: this.setForm.remark
					},
					success: (res) => {
						// console.log(res.data);
						// this.data = res.data
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
			deleteDept(name) {
				uni.request({
					url: 'http://42u47210c7.wicp.vip/api/deptdelete',
					method: 'POST',
					data: {
						name: name,
					},
					success: (res) => {
						uni.showLoading({
							title: '删除成功',
							icon: 'success'
						});
						setTimeout(function() {
							uni.hideLoading();
						}, 3000);
						// this.data = res.data
						uni.navigateTo({
							url:'../empty/empty'
						})
					}
				})
			}
		}
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
