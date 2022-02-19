<template>
	<view>
		<u-gap height="80"></u-gap>
		<view
			style="font-weight: bold;margin-left: 5vw;margin-right: 5vw; border-radius: 8px 8px 8px 8px;text-align: center;border: 1px solid rgba(187, 187, 187, 100);">
			<u-field v-model="title" style="font-size: 40rpx;border-bottom: 2rpx solid #94979d;" label="标题 :"
				placeholder="请填写标题">
			</u-field>
			<u-field v-model="promulgator" style="font-size: 30rpx;border-bottom: 2rpx solid #94979d;" label="发布者 :"
				placeholder="请填写发布者">
			</u-field>
			<u-field v-model="remark" type="textarea" style="font-size: 30rpx;border-bottom: 2rpx solid #94979d;" label="发布者 :"
				placeholder="请填写备注">
			</u-field>
			<u-gap height="50"></u-gap>
			<view ref="input" class="input"></view>
			<view @tap="uploadBtn">
				<text>选择文件并上传</text>
				<uni-icon type="forward" size=18></uni-icon>
			</view>
			<u-gap height="50"></u-gap>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '',
				promulgator: '',
				remark:''
			}
		},
		mounted() {
			var input = document.createElement('input')
			input.style.display = 'none'
			input.type = 'file'
			input.id = 'file';
			var _this = this;
			this.$refs.input.$el.appendChild(input);
			input.onchange = (event) => {
				var file = event.target.files[0];
				//上传方法
				_this.uploadAPI(file)
			}
		},
		methods: {
			uploadBtn() {
				return document.getElementById("file").click();
			},
			uploadAPI(path) {
				var fData = new FormData();
				fData.append("file", path);
				var xhr = new XMLHttpRequest();
				xhr.open("POST", "http://42u47210c7.wicp.vip/api/Fileupload?" + 'title='+this.title +'&remark='+this.remark+ '&promulgator='+this.promulgator, true);
				xhr.onload = function(e) {
					console.log(e); //上传成功
				};
				xhr.send(fData)
			}
		}

	}
</script>

<style>

</style>
