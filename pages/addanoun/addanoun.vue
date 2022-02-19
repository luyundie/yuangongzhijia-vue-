<template>
	<view>
		<u-gap height="50"></u-gap>
		<view style="font-weight: bold;margin-left: 5vw;margin-right: 5vw; border-radius: 8px 8px 8px 8px;text-align: center;border: 1px solid rgba(187, 187, 187, 100);">
			<u-field v-model="form.title" style="font-size: 40rpx;border-bottom: 2rpx solid #94979d;" label="标题 :" la placeholder="请填写标题">
			</u-field>
			<u-field v-model="form.content" style="font-size: 34rpx; height: 50vw;border-bottom: 2rpx solid #94979d;" label="内容 :" placeholder="请填写内容" type="textarea">
			</u-field>
			<u-field v-model="form.promulgator" style="font-size: 30rpx;border-bottom: 2rpx solid #94979d;" label="发布者 :" placeholder="请填写发布者">
			</u-field>
			<u-button @click="addNotice" style="margin-top: 5vw; margin-left: 50%; margin-bottom: 5vw;margin-right: 2vw;">发布</u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					title: '',
					content: '',
					promulgator: ''
				}
			}
		},
		methods: {
			addNotice() {
				uni.request({
					method: 'POST',
					url: 'http://42u47210c7.wicp.vip/api/Noticeaddition',
					header: {
						"content-type": 'application/json',
					},
					data: {
						title: this.form.title,
						content: this.form.content,
						promulgator: this.form.promulgator
					},
					success: (res) => {
						uni.showLoading({
							title: '发布成功',
							icon: 'success'
						});
						setTimeout(function() {
							uni.hideLoading();
						}, 3000);
						uni.navigateBack({
							
						})
						// this.noticeList = res.data
					}
				})
			}
		}
	}
</script>

<style>

</style>
