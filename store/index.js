import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex); //vue的插件机制

//Vuex.Store 构造器选项
const store = new Vuex.Store({
	state: { //存放状态
		userMessage: {
			name: '张三',
			login_name: 'zhangsan111',
			password: 'ssdsdd',
			dept_name: '财务部',
			job_name: '财务总监',
			sex: '男',
			email: '153818144@qq.com',
			card_id: '45223120012222',
			phone: '19178081946',
			qq_num: '153818144',
			education: '本科',
			address: '重庆市',
			post_code: '456123',
			party: '党员',
			birthday: '5-32',
			race: '汉',
			speciality: '无',
			hobby: '跑步',
			remark: '无',
			create_date: '2021-02-21',
			isAdmin:false,
		},
		newNoticeList:[],
		newFileList:[0]
	},
	mutations: {
		SetUserMessage(state, userMes) {
			state.userMessage.isAdmin = userMes.isAdmin==''?state.userMessage.isAdmin:userMes.isAdmin;
			state.userMessage.login_name = userMes.login_name==''?state.userMessage.login_name:userMes.login_name;
			state.userMessage.password = userMes.password==''?state.userMessage.password:userMes.password;
			state.userMessage.name = userMes.name==''?state.userMessage.name:userMes.name;
			state.userMessage.dept_name = userMes.dept_name==''?state.userMessage.dept_name:userMes.dept_name;
			state.userMessage.job_name = userMes.job_name==''?state.userMessage.job_name:userMes.job_name;
			state.userMessage.card_id = userMes.card_id==''?state.userMessage.card_id:userMes.card_id;
			state.userMessage.address = userMes.address==''?state.userMessage.address:userMes.address;
			state.userMessage.post_code = userMes.post_code==''?state.userMessage.post_code:userMes.post_code;
			state.userMessage.phone = userMes.phone==''?state.userMessage.phone:userMes.phone;
			state.userMessage.qq_num = userMes.qq_num==''?state.userMessage.qq_num:userMes.qq_num;
			state.userMessage.email = userMes.email==''?state.userMessage.isAdmin:userMes.isAdmin;
			state.userMessage.sex = userMes.sex==''?state.userMessage.sex:userMes.sex;
			state.userMessage.party = userMes.party==''?state.userMessage.party:userMes.party;
			state.userMessage.birthday = userMes.birthday==''?state.userMessage.birthday:userMes.birthday;
			state.userMessage.race = userMes.race==''?state.userMessage.race:userMes.race;
			state.userMessage.education = userMes.education==''?state.userMessage.education:userMes.education;
			state.userMessage.speciality = userMes.speciality==''?state.userMessage.speciality:userMes.speciality
			state.userMessage.hobby = userMes.hobby==''?state.userMessage.hobby:userMes.hobby;
			state.userMessage.remark = userMes.remark==''?state.userMessage.remark:userMes.remark;
		},
		Clear(state) {
			state.userMessage.isAdmin = false;
			state.userMessage.login_name = '';
			state.userMessage.password = '';
			state.userMessage.status = '';
			state.userMessage.name = '';
			state.userMessage.dept_name = '';
			state.userMessage.job_name = '';
			state.userMessage.card_id = '';
			state.userMessage.address = '';
			state.userMessage.post_code = '';
			state.userMessage.phone = '';
			state.userMessage.qq_num = '';
			state.userMessage.email = '';
			state.userMessage.sex = '';
			state.userMessage.party = '';
			state.userMessage.birthday = '';
			state.userMessage.race = '';
			state.userMessage.education = '';
			state.userMessage.speciality = '';
			state.userMessage.hobby = '';
			state.userMessage.remark = '';
			state.newNoticeList = [];
			state.newFileList = [];
		},
		// SetNewFileList(state,a){
		// },
		// SetNewNoticeList(state,b){
		// 	state.newFileList = b.filter()
		// }
	},
	actions: {
		setUserMessage(context, userMes) {
			context.commit("SetUserMessage", userMes)
		},
		clear(context) {
			context.commit("Clear")
		},
		setNewFileList(context,a){
			context.commit("SetNewFileList",a)
		},
		setNewNoticeList(context,b){
			context.commit("SetNewFileList",b)
		},
	}
})
export default store
