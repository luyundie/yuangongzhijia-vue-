<template>
	<view style="margin-left: 2vw;margin-right: 2vw;line-height: 20px;color: rgba(16, 16, 16, 100);">
		<view style="margin-left: 2vw;margin-right: 2vw;margin-bottom: 2vw;">
			<u-gap height="20" bg-color="#ffffff"></u-gap>
			<text class="title u-line-2" style="font-size:medium;">姓名： {{ item.name }}</text>
			<u-gap height="20" bg-color="#ffffff"></u-gap>
			<text class="title u-line-2" style="font-size:medium;">登录名： {{ item.login_name }}</text>
			<u-gap height="20" bg-color="#ffffff"></u-gap>
			<text class="title u-line-2" style="font-size:medium;">部门： {{ item.dept_name }}</text>
			<u-gap height="20" bg-color="#ffffff"></u-gap>
			<text class="title u-line-2" style="font-size:medium;">职位： {{ item.job_name }}</text>
			<u-gap height="20" bg-color="#ffffff"></u-gap>
			<text class="title u-line-2" style="font-size:medium;">性别： {{ item.sex }}</text>
			<u-gap height="20" bg-color="#ffffff"></u-gap>
			<text class="title u-line-2" style="font-size:medium;">邮编： {{ item.post_code }}</text>
			<u-gap height="30" bg-color="#ffffff"></u-gap>
			<text class="title u-line-2" style="font-size:medium;">身份证号： {{ item.card_id }}</text>
			<u-gap height="30" bg-color="#ffffff"></u-gap>
			<text class="title u-line-2" style="font-size:medium;">手机号： {{ item.phone}}</text>
			<u-gap height="30" bg-color="#ffffff"></u-gap>
			<text class="title u-line-2" style="font-size:medium;">QQ： {{ item.qq_num }}</text>
			<u-gap height="30" bg-color="#ffffff"></u-gap>
			<text class="title u-line-2" style="font-size:medium;">邮编： {{ item.post_code }}</text>
			<u-gap height="30" bg-color="#ffffff"></u-gap>
			<text class="title u-line-2" style="font-size:medium;">学历： {{ item.education }}</text>
			<u-gap height="30" bg-color="#ffffff"></u-gap>
			<text class="title u-line-2" style="font-size:medium;">地址： {{ item.address }}</text>
			<u-gap height="30" bg-color="#ffffff"></u-gap>
			<text class="title u-line-2" style="font-size:medium;">邮箱： {{ item.email }}</text>
			<u-gap height="30" bg-color="#ffffff"></u-gap>
			<text class="title u-line-2" style="font-size:medium;">性别： {{ item.sex }}</text>
			<u-gap height="30" bg-color="#ffffff"></u-gap>
			<text class="title u-line-2" style="font-size:medium;">政治面貌： {{ item.party }}</text>
			<u-gap height="30" bg-color="#ffffff"></u-gap>
			<text class="title u-line-2" style="font-size:medium;">生日： {{ item.birthday}}</text>
			<u-gap height="30" bg-color="#ffffff"></u-gap>
			<text class="title u-line-2" style="font-size:medium;">民族： {{ item.race}}</text>
			<u-gap height="30" bg-color="#ffffff"></u-gap>
			<text class="title u-line-2" style="font-size:medium;">专业： {{ item.speciality}}</text>
			<u-gap height="30" bg-color="#ffffff"></u-gap>
			<text class="title u-line-2" style="font-size:medium;">爱好： {{ item.hobby }}</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				item: {
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
				}

			}
		},
		onLoad: function(options) { //option为object类型，会序列化上个页面传递的参数
			// console.log(option.login_name); //打印出上个页面传递的参数。
			console.log(options)
			var data = JSON.parse(options.data);
			console.log(data)
			this.item = data
		}
	}
</script>

<style>

</style>
