<template>
	<view>
		<u-swiper :list="pictureList" height="400" title="false"></u-swiper>
		<u-gap height="30" bg-color="#ffffff"></u-gap>
		<view
			style="border-radius: 6px 6px 6px 6px;text-align: center;border: 1px solid rgba(187, 187, 187, 100);margin-left: 2vw;margin-right: 2vw; border-radius: 10px 10px 10px 10px;">
			<u-icon name="volume-up" color="#545454" size="80" top="5"></u-icon>
			<text
				style="margin-left: 2vw; width: 94px;height: 50px;color:#303133;font-weight:100;font-size: 34px;text-align: left;font-family: PingFangSC-regular;">公告</text>
			<u-icon style="margin-left: 48vw;" name="search" color="#545454" size="80" top="5" @click="popSearch">
			</u-icon>
		</view>
		<u-gap height="50" bg-color="#ffffff"></u-gap>
		<view :index="index" v-for="(item, index) in noticeList" :key="item.id">
			<view
				style="margin-left: 2vw;margin-right: 2vw;margin-bottom: 2vw;border: 1px solid rgba(187, 187, 187, 100);line-height: 20px;border-radius: 10px 10px 10px 10px;color: rgba(16, 16, 16, 100);">
				<view style="margin-left: 2vw;margin-right: 2vw;">
					<view @click="popDetail(item.title,item.content,item.promulgator,item.date)">
						<view v-if="newList.indexOf(item.id)==-1">
							<u-gap height="10" bg-color="#ffffff"></u-gap>
						</view>
						<view v-else>
							<text class="title u-line-2"
								style="left: 327px;color: rgba(244, 3, 3, 100);font-size: 14px;text-align: right;font-family: PingFangSC-regular;">new!</text>
						</view>

						<text class="title u-line-2" style="font-size:large; font-weight: 600;">{{ item.title }}</text>
						<u-gap height="20" bg-color="#ffffff"></u-gap>
						<view style="display: inline-flex;">
							<text class="title u-line-2" style="font-size:small">{{ item.promulgator }}</text>
							<text class="title u-line-2"
								style="font-size:small; margin-left: 5vw;">{{ item.date }}</text>
						</view>
					</view>
				</view>

			</view>
		</view>
		<u-popup v-model="popSearchShow" mode="center" height="auto" width="80%" border-radius="14">
			<view style="margin-left: 5vw;margin-top: 8vw;margin-right: 5vw;">
				<u-form-item label="标题:" style="width: 46vw;" label-width="110">
					<u-input v-model="form.title" />
				</u-form-item>
				<u-form-item label="发布人: " style="width: 46vw;" label-width="130">
					<u-input v-model="form.promulgator" />
				</u-form-item>
				<u-gap height="40" bg-color="#ffffff"></u-gap>
				<u-button @click="searchNotice" style="margin-bottom: 8vw;">查询</u-button>
			</view>
		</u-popup>
		<u-popup v-model="popDetailShow" mode="center" height="auto" width="80%" border-radius="14">
			<view style="margin-left: 5vw;margin-top: 8vw;margin-right: 5vw;margin-bottom: 8vw;">
				<text
					style="color: rgba(16, 16, 16, 100);font-size: 22px;font-weight: 500;text-align: left;font-family: PingFangSC-regular;">{{this.popDetailInfo.title}}</text>
				<u-gap height="40" bg-color="#ffffff"></u-gap>
				<view>
					<text
						style="color: rgba(16, 16, 16, 100);font-size: 20px;text-align: left;font-family: PingFangSC-regular;">{{this.popDetailInfo.content}}</text>
				</view>
				<u-gap height="40" bg-color="#ffffff"></u-gap>
				<view>
					<text
						style="color: rgba(16, 16, 16, 100);font-size: 14px;font-weight: 500; text-align: left;font-family: PingFangSC-regular;">{{this.popDetailInfo.promulgator}}</text>
				</view>
				<view>
					<text
						style="color: rgba(16, 16, 16, 100);font-size: 14px;font-weight: 500;text-align: left;font-family: PingFangSC-regular;">{{this.popDetailInfo.date}}</text>
				</view>
			</view>
		</u-popup>
		<tabbar :list="tabbar"></tabbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				popDetailShow: false,
				form: {
					title: '',
					promulgator: ''
				},
				popDetailInfo: {
					title: '',
					content: '',
					promulgator: '',
					date: ''
				},
				popSearchShow: false,
				noticeList: [],
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
					}
				],
				newList: [],

			}
		},
		methods: {
			popSearch() {
				this.popSearchShow = true;
			},
			popDetail(title, content, promulgator, date) {
				this.popDetailInfo.title = title;
				this.popDetailInfo.content = content;
				this.popDetailInfo.promulgator = promulgator;
				this.popDetailInfo.date = date;
				this.popDetailShow = true;
			},
			searchNotice() {
				uni.request({
					method: 'POST',
					url: 'http://42u47210c7.wicp.vip/api/Noticesearch_U',
					header: {
						"content-type": 'application/json',
					},
					data: {
						title: this.form.title,
						promulgator: this.form.promulgator,
					},
					success: (res) => {
						this.noticeList = res.data.data;
						if(this.noticeList.data.length>1){
							this.noticeList = res.data.data.data;
						}
						console.log(this.noticeList)
					}
				})
				this.popSearchShow = false;
			},
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
		},
		async onShow() {
			var rs = await this.getNoticeList()
			this.noticeList = rs.reverse()
			this.newList = this.$store.state.newNoticeList
			console.log(this.newList)
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
			// uni.request({
			// 	method: 'POST',
			// 	url: 'http://42u47210c7.wicp.vip/api/updaten_new_notice',
			// 	header: {
			// 		"content-type": 'application/json',
			// 	},
			// 	data: {
			// 		login_name:'zhangsan'
			// 	},
			// 	success: (res) => {
			// 		this.newList = res.data.data;
			// 	}
			// })
		}
	}
</script>

<style>
	.sticky {
		width: 750rpx;
		height: 2rpx;
		background-color: #2979ff;
		color: #fff;
		padding: 24rpx;
	}
</style>
