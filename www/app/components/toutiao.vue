<template>
	<div class="panel panel-primary">
		<div class="panel-heading refresh-header clearfix">
			<span class="pill-left">新闻头条</span>
			<img @click="refresh" class="pull-right btn-refresh" :class="{ing:ing}" src="/static/img/refresh.png" alt="刷新">
		</div>
		<div class="list-group">
			<a v-for="item in lists" :href="item.url" class="list-group-item" target="_blank">
                {{item.title}}
                <span class="badge">{{item.realtype}}</span>
            </a>
		</div>
	</div>
</template>

<script>
import api from '../api';

let TOUTIAO = {
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
            api.addon( (res) => {
				if(res){
					this.lists = res;
				}
            }, 'toutiao');
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
			}, 'toutiao', 1);
		}
	}
};
export default TOUTIAO;
</script>