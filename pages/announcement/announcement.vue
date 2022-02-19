<template>
	<view>
		<view style="text-align: center;">
			<view style="background-color: #ffffff; margin-top: 3vw;float: left;">
				<u-icon style="margin-left: 3vw;" name="volume-up-fill" color="#000000" size="50" top="5"></u-icon>
				<text
					style="margin-left: 2vw; width: 50px;height: 20px;color: rgba(0, 0, 0, 100);font-size: 20px;text-align: left;font-family: PingFangSC-regular;">公告查询</text>
			</view>
			<u-icon name="plus" @click="toUpload"
				style="border: 1px solid #000000 ;border-radius: 50%; float: right; margin-top: 4vw; margin-right: 2vw;"
				size="50"></u-icon>
		</view>
		<u-gap height="40" bg-color="#ffffff"></u-gap>
		<view style="margin-left: 5vw;margin-top: 8vw;margin-right: 5vw;">
			<u-form-item label="标题:" label-width="110">
				<u-input v-model="searchForm.title" />
			</u-form-item>
			<u-form-item label="发布人: " label-width="130">
				<u-input v-model="searchForm.promulgator" />
			</u-form-item>
			<u-gap height="40" bg-color="#ffffff"></u-gap>
			<u-button @click="searchNotice">查询</u-button>
		</view>
		<u-gap height="80" bg-color="#ffffff"></u-gap>
		<view :index="index" v-for="(item, index) in noticeList" :key="item.id">
			<view
				style="margin-left: 2vw;margin-right: 2vw;margin-bottom: 2vw;border: 1px solid rgba(187, 187, 187, 100);line-height: 20px;border-radius: 10px 10px 10px 10px;color: rgba(16, 16, 16, 100);">
				<view style="margin-top: 3vw; margin-left: 2vw;margin-bottom: 2vw;">
					<text class="title u-line-2" style="font-size:large; font-weight: 600;">{{ item.title }}</text>
					<u-gap height="20" bg-color="#ffffff"></u-gap>
					<view style="display: inline-flex;">
						<text class="title u-line-2" style="font-size:small; width: 20vw;">{{ item.promulgator }}</text>
						<text class="title u-line-2" style="font-size:small; width: 20vw;">{{ item.create_date }}</text>
						<u-icon name="edit-pen-fill" size="medium" style="margin-left: 42vw;" @click="popManage(index)">
						</u-icon>
						<u-icon name="trash" size="medium" style="margin-left: 1vw;" @click="deleteNotice(item.id)">
						</u-icon>
					</view>
				</view>
			</view>
		</view>
		<u-popup v-model="popManageShow" mode="center" height="auto" width="80%" border-radius="14">
			<view style="margin-left: 5vw;margin-top: 8vw;margin-right: 5vw;margin-bottom: 8vw;">
				<u-form-item label="标题:"  label-width="110">
					<u-input v-model="setForm.title" :placeholder="this.noticeList[this.indexPop].title" />
				</u-form-item>
				<u-form-item label="内容: " label-width="130">
					<u-input v-model="setForm.content" type="textarea" :placeholder="this.noticeList[this.indexPop].content" />
				</u-form-item>
				<u-form-item label="发布人: " label-width="130">
					<u-input v-model="setForm.promulgator" :placeholder="this.noticeList[this.indexPop].promulgator" />
				</u-form-item>
				<u-button @click="change">修改</u-button>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				searchForm: {
					title: '',
					promulgator: ''
				},
				setForm: {
					title: '',
					promulgator: '',
					content: ''
				},
				popManageShow: false,
				indexPop: 0,
				noticeList: [],
			}
		},
		async onShow() {
			var rs = await this.getNoticeList()
			this.noticeList = rs
		},
		methods: {
			getNoticeList() {
				return new Promise((resolve, reject) => {
					uni.request({
						method: 'POST',
						url: 'http://42u47210c7.wicp.vip/api/Noticrefresh',
						header: {
							"content-type": 'application/json',
						},
						success: (res) => {
							console.log(res)
							resolve(res.data.data);
						}
					})
				})
			},
			searchNotice() {
				uni.request({
					method: 'POST',
					url: 'http://42u47210c7.wicp.vip/api/Noticesearch_A',
					header: {
						"content-type": 'application/json',
					},
					data: {
						title: this.searchForm.title,
						promulgator: this.searchForm.promulgator
					},
					success: (res) => {
						if (res.data.data.data.length > 1) {
							this.noticeList = res.data.data.data;
						} else {
							this.noticeList = []
							this.noticeList.push(res.data.data.data);
						}
						console.log(this.noticeList)
					}
				})
			},
			deleteNotice(id) {
				uni.request({
					method: 'POST',
					url: 'http://42u47210c7.wicp.vip/api/noticedelete',
					header: {
						"content-type": 'application/json',
					},
					data: {
						id: id
					},
					success: (res) => {
						uni.navigateTo({
							url: '../empty/empty'
						})
						// this.noticeList = res.data
					}
				})
				uni.showLoading({
					title: '删除成功',
					icon: 'success'
				});

				setTimeout(function() {
					uni.hideLoading();
				}, 3000);
			},
			toUpload() {
				uni.navigateTo({
					url: '../addanoun/addanoun'
				})
			},
			popManage(index) {
				this.indexPop = index;
				this.popManageShow = true;
			},
			change() {
				uni.request({
					method: 'POST',
					url: 'http://42u47210c7.wicp.vip/api/noticeupdate',
					header: {
						"content-type": 'application/json',
					},
					data: {
						id: this.noticeList[this.indexPop].id,
						title: this.setForm.title == '' ? this.noticeList[this.indexPop].title : this.setForm
							.title,
						content: this.setForm.content == '' ? this.noticeList[this.indexPop].content : this.setForm
							.content,
						promulgator: this.setForm.promulgator == '' ? this.noticeList[this.indexPop].promulgator :
							this.setForm.promulgator,
					},
					success: (res) => {
						// this.noticeList = res.data
					}
				})
				this.popManageShow = false;
			}

		}
	}
</script>

<style>

</style>
