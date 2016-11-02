<template>
	<div class="popover bottom" :style="position">
		<div class="arrow" style="left: 80%;"></div>
		<h3 class="popover-title">{{title}}</h3>
		<div class="popover-content form-horizontal">
			<div class="form-group">
				<label for="username" class="col-sm-2 control-label">用户名</label>
				<div class="col-sm-10">
					<input @input="updateUsername" :value="username" type="text" class="form-control" id="username" placeholder="* 字母/数字">
				</div>
			</div>
			<div v-if="type=='register'" class="form-group">
				<label for="email" class="col-sm-2 control-label">邮箱</label>
				<div class="col-sm-10">
					<input v-model="email" type="email" class="form-control" id="email" placeholder="* 邮箱">
				</div>
			</div>
			<div v-if="type=='register'" class="form-group">
				<label for="vericode" class="col-sm-2 control-label">验证码</label>
				<div class="col-sm-6">
					<input v-model="code" type="number" class="form-control" id="vericode" maxlength="6" placeholder="* 6位验证码">
				</div>
				<div class="col-sm-3">
					<button @click="sendCode" class="btn btn-primary" :class="{disabled:codeSended}">{{sendText}}</button>
				</div>
			</div>
			<div class="form-group">
				<label for="password" class="col-sm-2 control-label">密码</label>
				<div class="col-sm-10">
					<input @input="updatePassword" @keyup.enter="submitAction" :value="password" type="password" class="form-control" id="password"
						placeholder="* 密码6-16位">
				</div>
			</div>
			<div v-if="type=='register'" class="form-group">
				<label for="inviteCode" class="col-sm-2 control-label">邀请码</label>
				<div class="col-sm-10">
					<input v-model="inviteCode" @keyup.enter="submitAction" type="text" class="form-control" id="inviteCode" placeholder="选填">
				</div>
			</div>
			<div class="form-group">
				<div class="col-sm-offset-2 col-sm-10">
					<button v-if="!successMsg" @click="submitAction" type="submit" class="btn btn-default">{{title}}</button>
					<button v-else class="btn btn-success disabled">{{title}}成功!</button>
					<span v-show="failMsg" class="loginMsg text-danger">{{failMsg}}</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

import Vue from 'vue';

import api from '../api';

export default {
	props: ['type','position'],
    data: () => ({
		inviteCode: '',
		email: '',
		code: '',
		codeSended: false,
		count: '5',
		loginSuccess: 0,
		loginFail: 0,
		registerSuccess: 0,
		registerFail: 0
    }),
	computed: {
		...mapGetters([
			'username',
			'password',
			'isLogin'
		]),
		title(){
			return this.type == 'login' ? '登录' : '注册';
		},
		failMsg(){
			return this.type == 'login' ? this.loginFail : this.registerFail;
		},
		successMsg(){
			return this.type == 'login' ? this.loginSuccess : this.registerSuccess;
		},
		sendText(){
			return this.codeSended ? '重新获取 ' + this.count : '立即获取';
		}
	},
    methods: {
		updateUsername(e){
			this.$store.commit('updateUsername', e.target.value)
		},
		updatePassword(e){
			this.$store.commit('updatePassword', e.target.value)
		},
		login(){
			let that = this;
			api.login(res => {
				if (!res.body.errno) {
					that.loginSuccess = 1;
					that.loginFail = 0;
					that.$store.commit('updateParam', {
						key:['isLogin', 'mokuai', 'isvip'],
						value: [1, res.body.data.mokuai.split(','), res.body.data.isvip]
					});
					api.mySites((res) => {
						that.$store.commit('updateParam', {
							key:['USERSITES'],
							value: [res]
						});
					});
				} else {
					that.loginFail = res.body.errmsg;
				}
			}, {
				username: that.username,
				password: that.password
			});
		},
		register(){
			let that = this;
			api.register(res => {
				if (!res.body.errno) {
					that.registerSuccess = 1;
					that.registerFail = 0;
					that.$store.commit('updateParam', {
						key:['isLogin', 'isvip'],
						value: [1, res.body.data.isvip]
					});
				} else {
					that.registerFail = res.body.errmsg;
				}
			}, {
				username: that.username,
				password: that.password,
				email: that.email,
				code: that.code,
				inviteCode: that.inviteCode
			});
		},
		sendCode(){
			if(this.codeSended){
				return;
			}
			if(!this.email){
				return this.registerFail = '请输入邮箱';
			}
			if(!/^[\w\.-]+@[\w-]+(\.[\w-]+){1,3}$/i.test(this.email)){
				return this.registerFail = '邮箱格式不正确';
			}

			this.codeSended = true;
			Vue.http.post('/webapi/useraccount/sendemailcode', {
				email: this.email
			}).then(res => {
				// 响应成功回调
				if(res.body.errno){
					return this.registerFail = res.body.errmsg;
				}else{
					return this.registerFail = '';
				}
			}, res => {
				// 失败回调
				console.log(res);
			});
		},
		submitAction(e){
			let failName = this.type + 'Fail';
			if(!this.username){
				return this[failName] = '请输入用户名';
			}
			if(!this.password){
				return this[failName] = '请输入密码';
			}
			return this.type == 'login' ? this.login() : this.register();
		}
	},
	watch: {
		codeSended(){
			if(this._time){
				clearInterval(this._time);
			}
			this.count = 5;
			this._time = setInterval(()=>{
				if(this.count<=1){
					this.codeSended = false;
				}else{
					this.count--;
				}
			}, 1000);
		}
	}
}

</script>