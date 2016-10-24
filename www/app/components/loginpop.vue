<template>
	<ul class="login nav navbar-nav navbar-right">
		<li>
			<a @click="showLoginPop" type="button" class="btn btn-link">登录</a>
		</li>
		<li>
			<a @click="showRegisterPop" type="button" class="btn btn-link">注册</a>
		</li>
		<transition name="login-fade">
			<login v-if="isShowLoginPop && !isLogin" :type="popType.login" :position="pos.login"></login>
			<login v-if="isShowRegisterPop" :type="popType.register" :position="pos.register"></login>
		</transition>
	</ul>
</template>

<script>
import login from './login';
import Cookie from 'js-cookie';
import { mapGetters } from 'vuex';

export default {
	components: {
		login
	},
    data: () => ({
        isShowLoginPop: 0,
		isShowRegisterPop: 0,
		popType: {
			login: 'login',
			register: 'register',
		},
		pos: {
			login: {
				'top': '46px',
				'left': '-250px',
				'width': '350px',
				'max-width': '500px',
				'display': 'block'
			},
			register: {
				'top': '46px',
				'left': '-249px',
				'width': '416px',
				'max-width': '500px',
				'display': 'block'
			}
		}
    }),
    methods: {
		showLoginPop () {
			this.isShowRegisterPop = 0;
			this.isShowLoginPop = !this.isShowLoginPop;
		},
		showRegisterPop () {
			this.isShowLoginPop = 0;
			this.isShowRegisterPop = !this.isShowRegisterPop;
		},
	},
	computed: {
		...mapGetters([
			'isLogin',
		])
	},
}

</script>