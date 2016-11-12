<template>
	<div class="panel panel-primary">
		<div class="panel-heading refresh-header clearfix">
			<span class="pill-left">国际焦点</span>
			<img @click="refresh" class="pull-right btn-refresh" :class="{ing:ing}" src="/static/img/refresh.png" alt="刷新">
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
		setTimeout(()=>{
			this.refresh();
		},1000);
	},
	data: ()=> ({
        lists: [],
		ing: 0
    }),
	methods: {
		init(){
			api.addon(res => {
				if(res){
					this.lists = res;
				}
			}, 'gwfocus');
		},
		refresh(){
			if(this.ing){
				return;
			}
			this.ing = 1;
			api.addon(res => {
				if(res){
					this.lists = res;
				}
				this.ing = 0;
			}, 'gwfocus', 1);
		}
	}
}
</script>