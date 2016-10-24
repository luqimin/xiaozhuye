<template>
	<div class="panel panel-primary">
		<div class="panel-heading">
			<h3 class="panel-title">国际焦点</h3>
		</div>
		<div class="list-group">
			<a v-for="item in lists" :href="item.link" class="list-group-item" target="_blank">{{item.title}}</a>
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
			api.guowai(res => {
				this.lists = res;
			});
		}
	}
}
</script>