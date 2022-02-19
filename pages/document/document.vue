<template>
	<view>
		<view style="text-align: center;">
			<view style="background-color: #ffffff; margin-top: 3vw;float: left;">
				<u-icon style="margin-left: 3vw;" name="file-text" color="#000000" size="50" top="5"></u-icon>
				<text
					style="margin-left: 2vw; width: 50px;height: 20px;color: rgba(0, 0, 0, 100);font-size: 20px;text-align: left;font-family: PingFangSC-regular;">文档查询</text>
			</view>
			<u-icon name="plus" @click="toUpload"
				style="border: 1px solid #000000 ;border-radius: 50%; float: right; margin-top: 4vw; margin-right: 2vw;"
				size="50"></u-icon>
		</view>
		<u-gap height="40" bg-color="#ffffff"></u-gap>
		<view style="margin-left: 5vw;margin-top: 8vw;margin-right: 5vw;">
			<u-form-item label="文件名:" label-width="110">
				<u-input v-model="form.title" />
			</u-form-item>
			<u-form-item label="发布人: "  label-width="130">
				<u-input v-model="form.promulgator" />
			</u-form-item>
			<u-gap height="40" bg-color="#ffffff"></u-gap>
			<u-button @click="searchFile">查询</u-button>
		</view>
		<u-gap height="40" bg-color="#ffffff"></u-gap>
		<view :index="index" v-for="(item, index) in filesList" :key="item.id">
			<view
				style="margin-left: 2vw;margin-right: 2vw;margin-bottom: 2vw;border: 1px solid rgba(187, 187, 187, 100);line-height: 20px;border-radius: 10px 10px 10px 10px;color: rgba(16, 16, 16, 100);">
				<view style="margin-left: 2vw;margin-right: 2vw;">
					<u-gap height="20" bg-color="#ffffff"></u-gap>
					<text class="title u-line-2" style="font-size:large; font-weight: 600;">{{ item.title }}</text>
					<u-gap height="20" bg-color="#ffffff"></u-gap>
					<view style="display: inline-flex;">
						<text class="title u-line-2" style="font-size:small;width: 30vw;">{{ item.filename }}</text>
						<text class="title u-line-2" style="font-size:small; margin-left: 5vw;width: 30vw;">{{ item.create_date }}</text>
						<u-icon name="trash" size="medium" style="margin-left: 22vw;"
							@click="deleteFile(item.title)">
						</u-icon>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					title: '',
					filename: ''
				},
				filesList: [],
			}
		},
		async onShow() {
			var rs = await this.getFileList()
			this.filesList = rs
		},
		methods: {
			getFileList() {
				return new Promise((resolve, reject) => {
					uni.request({
						method: 'POST',
						url: 'http://42u47210c7.wicp.vip/api/refreshFileAll',
						header: {
							"content-type": 'application/json',
						},
						success: (res) => {
							resolve(res.data.data.data);
						}
					})
				})
			},
			searchFile() {
				uni.request({
					method: 'POST',
					url: 'http://42u47210c7.wicp.vip/api/Filesearch_U',
					header: {
						"content-type": 'application/json',
					},
					data:{
						title:this.form.title,
						promulgator:this.form.filename
					},
					success: (res) => {
						this.filesList = res.data.data;
						if(this.filesList.data.length>1){
							this.filesList = res.data.data.data;
						}
						console.log(this.filesList)
					}
				})
			},
			deleteFile(title) {
				uni.request({
					method: 'POST',
					url: 'http://42u47210c7.wicp.vip/api/Filedelete',
					header: {
						"content-type": 'application/json',
					},
					data: {
						title: title,
					},
					success: (res) => {
						// this.filesList = res.data;
						uni.showLoading({
							title: '删除成功',
							icon: 'success'
						});
						setTimeout(function() {
							uni.hideLoading();
						}, 3000);
						uni.navigateTo({
							url:'../empty/empty'
						})
					}
				})
			},
			toUpload() {
				uni.navigateTo({
					url: '../adddocm/adddocm'
				})
			}

		}
	}
</script>

<style>

</style>
