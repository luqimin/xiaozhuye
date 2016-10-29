<template>
	<div id="app" class="">

		<!--<button v-on:click="addDuanzi">ssssss</button>-->
		<nav class="navbar navbar-inverse">
			<div class="container container-fluid">
				<div class="navbar-header">
					<a class="navbar-brand" href="#">TINY
					<!--<%= brand%>-->
						<!--<img alt="Brand" src="...">-->
				</a>
				</div>
				<div class="collapse navbar-collapse">
					<template v-if="isLogin">
						<ul class="login nav navbar-nav navbar-right">
							<li class="dropdown" :class="{open:isShowDropdown}">
								<a @click="showDropdown" type="button" class="btn btn-link dropdown-toggle">您好！ {{username}} <span class="caret"></span></a>
								<ul v-show="isShowDropdown" class="dropdown-menu" role="menu">
									<li><a href="#">配置网址</a></li>
									<li><a href="#">配置模块</a></li>
									<li><a href="#">配置壁纸 (即将上线)</a></li>
									<li class="divider"></li>
									<li><a href="#">我要吐槽 (即将上线)</a></li>
									<li class="divider"></li>
									<li><a @click="logout" class="pointer">退出</a></li>
								</ul>
							</li>
						</ul>
					</template>
					<template v-else>
						<LoginPop></LoginPop>
					</template>
				</div>
			</div>
		</nav>
		<div class="container">
			<h1>
				<!--<%= title%>-->
			</h1>

			<div class="row">
				<div class="col-md-3">
					<Sites></Sites>
					<about></ahout>
				</div>
				<div class="col-md-6">
					<component v-bind:is="ttComp"></component>
					<component v-bind:is="gnComp"></component>
					<component v-bind:is="gwComp"></component>
					<component v-bind:is="dzComp"></component>			
				</div>
				<div class="col-md-3">
					<modconfig></modconfig>
					<component v-bind:is="jsComp"></component>
					<component v-bind:is="bdComp"></component>
					<component v-bind:is="ylComp"></component>
				</div>
			</div>
		</div>

	</div>
</template>

<script>
import Sites from './sites';
import LoginPop from './loginpop';
import modconfig from './modconfig';
import defmod from './default';
import about from './about';

import { mapGetters, mapActions } from 'vuex';

export default {
	components: {
		LoginPop,
		Sites,
		modconfig,
		defmod,
		about,
		baidu :(resolve) => {
			require(['./baidu'], (component) => {
				resolve(component);
			});
		},
		toutiao :(resolve) => {
			require(['./toutiao'], (component) => {
				resolve(component);
			});
		},
		gnnews :(resolve) => {
			require(['./gnnews'], (component) => {
				resolve(component);
			});
		},
		gwnews :(resolve) => {
			require(['./gwnews'], (component) => {
				resolve(component);
			});
		},
		duanzi :(resolve) => {
			require(['./duanzi'], (component) => {
				resolve(component);
			});
		},
		yule :(resolve) => {
			require(['./yule'], (component) => {
				resolve(component);
			});
		},
		deadline :(resolve) => {
			require(['./deadline'], (component) => {
				resolve(component);
			});
		},
	},
	computed: {
		...mapGetters([
			'username',
			'isLogin',
			'mokuai',
		]),
		bdComp(){
			return this.mokuai.indexOf('baidu')!=-1 ? 'baidu' : 'defmod';
		},
		ttComp(){
			return this.mokuai.indexOf('toutiao')!=-1 ? 'toutiao' : 'defmod';
		},
		gnComp(){
			return this.mokuai.indexOf('gnnews')!=-1 ? 'gnnews' : 'defmod';
		},
		gwComp(){
			return this.mokuai.indexOf('gwnews')!=-1 ? 'gwnews' : 'defmod';
		},
		dzComp(){
			return this.mokuai.indexOf('duanzi')!=-1 ? 'duanzi' : 'defmod';
		},
		ylComp(){
			return this.mokuai.indexOf('yule')!=-1 ? 'yule' : 'defmod';
		},
		jsComp(){
			return this.mokuai.indexOf('deadline')!=-1 ? 'deadline' : 'defmod';
		},
	},
	data: () => ({
		isShowDropdown: 0,
    }),
	methods: {
		...mapActions([
			'userLogout'
		]),
		showDropdown(){
			this.isShowDropdown = !this.isShowDropdown
		},
		logout(){
			this.showDropdown();
			this.userLogout();
		}
	}
}
</script>