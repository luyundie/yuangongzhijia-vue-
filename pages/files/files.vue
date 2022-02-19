<template>
	<view>
		<u-swiper :list="pictureList" height="400" title="false" mode="none"></u-swiper>
		<u-gap height="30" bg-color="#ffffff"></u-gap>
		<view
			style="border-radius: 6px 6px 6px 6px;text-align: center;border: 1px solid rgba(187, 187, 187, 100);margin-left: 2vw;margin-right: 2vw; border-radius: 10px 10px 10px 10px;">
			<u-icon name="file-text" color="#545454" size="80" top="5"></u-icon>
			<text
				style="margin-left: 2vw; width: 94px;height: 50px;color:#303133;font-weight:100;font-size: 34px;text-align: left;font-family: PingFangSC-regular;">资料</text>
			<u-icon style="margin-left: 48vw;" name="search" color="#545454" size="80" top="5" @click="popSearch">
			</u-icon>
		</view>
		<u-gap height="50" bg-color="#ffffff"></u-gap>
		<view :index="index" v-for="(item, index) in filesList" :key="item.id">
			<view
				style="margin-left: 2vw;margin-right: 2vw;margin-bottom: 2vw;border: 1px solid rgba(187, 187, 187, 100);line-height: 20px;border-radius: 10px 10px 10px 10px;color: rgba(16, 16, 16, 100);">
				<view style="margin-left: 2vw;margin-right: 2vw;">
					<view v-if="newList.indexOf(item.id) == -1">
						<u-gap height="10" bg-color="#ffffff"></u-gap>
					</view>
					<view v-else>
						<text class="title u-line-2"
							style="left: 327px;color: rgba(244, 3, 3, 100);font-size: 14px;text-align: right;font-family: PingFangSC-regular;">new!</text>
					</view>
					<text class="title u-line-2" style="font-size:large; font-weight: 600;">{{ item.title }}</text>
					<u-gap height="20" bg-color="#ffffff"></u-gap>
					<view style="display: inline-flex;">
						<text class="title u-line-2" style="font-size:small; width: 60vw;">{{ item.filename }}</text>
						<text class="title u-line-2" style="font-size:small; width: 20vw;">{{ item.create_date }}</text>
						<u-icon name="download" size="medium" style="margin-left: 5vw;"
							@click="downloadFile(item.filename)"></u-icon>
					</view>
				</view>
			</view>

		</view>
		<u-popup v-model="popSearchShow" mode="center" height="auto" width="80%" border-radius="14">
			<view style="margin-left: 5vw;margin-top: 8vw;margin-right: 5vw;">
				<u-form-item label="标题:" label-width="110">
					<u-input v-model="form.title" />
				</u-form-item>
				<u-form-item label="文件名: " label-width="130">
					<u-input v-model="form.filename" />
				</u-form-item>
				<u-gap height="40" bg-color="#ffffff"></u-gap>
				<u-button @click="searchFile">查询</u-button>
			</view>
		</u-popup>
		<u-toast ref="uToast" />
		<tabbar :list="tabbar"></tabbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				popSearchShow: false,
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
				form: {
					file: '',
					promulgator: ''
				},
				filesList: [],
				newList: [2],
			}
		},
		methods: {
			searchFile() {
				uni.request({
					method: 'POST',
					url: 'http://42u47210c7.wicp.vip/api/Filesearch_U',
					header: {
						"content-type": 'application/json',
					},
					data: {
						title: this.form.title,
						promulgator: this.form.promulgator
					},
					success: (res) => {
						this.filesList = res.data.data;
						if (this.filesList.data.length > 1) {
							this.filesList = res.data.data.data;
						}
						console.log(this.filesList)
					}
				})
				this.popSearchShow = false;
			},
			popSearch() {
				this.popSearchShow = true;
			},
			downloadFile(filename) {
				// uni.downloadFile({
				// 	method : 'POST',
				// 	url: 'http://42u47210c7.wicp.vip/api/Filedouwnload',
				// 	data: {
				// 		"title": title1,
				// 		"promulgator": ""
				// 	},
				// 	success: (res) => {
				// 		// if (res.code === 200) {
				// 		// 	console.log('下载成功');
				// 		console.log(res.tempFilePath)
						
				// 	}
				// });
				window.location.href = ("http://42u47210c7.wicp.vip/tempFile/"+filename)
				// uni.navigateTo({
				// 	url:'http://42u47210c7.wicp.vip/tempFile/年终总结.pptx'
				// })
				uni.showLoading({
					title: '下载成功',
					icon: 'success'
				});

				setTimeout(function() {
					uni.hideLoading();
				}, 3000);
			},
			getFileList() {
				return new Promise((resolve, reject) => {
					uni.request({
						method: 'POST',
						url: 'http://42u47210c7.wicp.vip/api/refreshFileAll',
						success: (res) => {
							resolve(res.data.data);
						}
					})
				})
			},
		},
		async onShow() {
			var rs = await this.getFileList()
			console.log(rs)
			this.filesList = rs.data.reverse()
			this.newList = this.$store.state.newFileList
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

</style>
