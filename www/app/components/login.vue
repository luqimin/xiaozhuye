<template>
	<div class="popover bottom" :style="position">
		<div class="arrow" style="left: 80%;"></div>
		<h3 class="popover-title">{{title}}</h3>
		<div class="popover-content form-horizontal">
			<div class="form-group">
				<label for="username" class="col-sm-2 control-label">账户</label>
				<div class="col-sm-10">
					<input @input="updateUsername" :value="username" type="username" class="form-control" id="username" placeholder="用户名/邮箱">
				</div>
			</div>
			<div class="form-group">
				<label for="password" class="col-sm-2 control-label">密码</label>
				<div class="col-sm-10">
					<input @input="updatePassword" @keyup.enter="submitAction" :value="password" type="password" class="form-control" id="password"
						placeholder="密码">
				</div>
			</div>
			<div v-if="type=='register'" class="form-group">
				<label for="inviteCode" class="col-sm-2 control-label">邀请码</label>
				<div class="col-sm-10">
					<input v-model="inviteCode" @keyup.enter="submitAction" type="text" class="form-control" id="inviteCode" placeholder="邀请码">
				</div>
			</div>
			<div class="form-group">
				<div class="col-sm-offset-2 col-sm-10">
					<button v-if="!successMsg" @click="submitAction" type="submit" class="btn btn-default">{{title}}</button>
					<button v-else class="btn btn-success disabled">{{title}}成功!</button>
					<span v-show="failMsg" class="loginMsg text-danger">{{title}}失败, {{failMsg}}</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
	props: ['type','position'],
    data: () => ({
		inviteCode: ''
    }),
	computed: {
		...mapGetters([
			'username',
			'password',
			'isLogin',
			'loginSuccess',
			'registerSuccess',
			'loginFail',
			'registerFail',
		]),
		title(){
			return this.type == 'login' ? '登录' : '注册';
		},
		failMsg(){
			return this.type == 'login' ? this.loginFail : this.registerFail;
		},
		successMsg(){
			return this.type == 'login' ? this.loginSuccess : this.registerSuccess;
		}
	},
    methods: {
		...mapActions([
            'userLogin',
			'userRegister',
        ]),
		updateUsername(e){
			this.$store.commit('updateUsername', e.target.value)
		},
		updatePassword(e){
			this.$store.commit('updatePassword', e.target.value)
		},
		submitAction(e){
			let failName = this.type + 'Fail';
			if(!this.username){
				return this.$store.commit('updateParam',{
					key:[failName],
					value:['请输入用户名']
				});
			} else if(!this.password){
				return this.$store.commit('updateParam',{
					key:[failName],
					value:['请输入密码']
				});
			} else if(this.type == 'register' && !this.inviteCode) {
				return this.$store.commit('updateParam',{
					key:['registerFail'],
					value:['请输入邀请码']
				});
			} else {
				this.$store.commit('updateParam',{
					key:['registerFail'],
					value:[0]
				});
			}
			return this.type == 'login' ? this.userLogin() : this.userRegister(this.inviteCode);
		}
	}
}

</script>