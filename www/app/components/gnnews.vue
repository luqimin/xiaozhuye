<template>
	<div class="panel panel-primary">
		<div class="panel-heading">
			<h3 class="panel-title">国内焦点</h3>
		</div>
		<div class="list-group">
			<a v-for="news in lists" v-bind:href="news.link" class="list-group-item" target="_blank">{{news.title}}</a>
		</div>
	</div>
</template>

<script>
import store from '../store';
import api from '../api';

export default {
	created(){
		this.init();
	},
	data: ()=> ({
        lists: []
    }),
	methods: {
		init(){
			api.guonei(res => {
				this.lists = res;
			});
		}
	}
}
</script>