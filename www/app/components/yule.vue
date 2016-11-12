<template>
	<div class="addon panel panel-info">
		<div class="panel-heading refresh-header clearfix">
			<span class="pill-left">娱乐新闻</span>
			<img @click="refresh" class="pull-right btn-refresh" :class="{ing:ing}" src="/static/img/refresh.png" alt="刷新">
		</div>
        <div class="list-group">
            <div v-for="addon in lists" v-bind:key="addon.pubDate" track-by="$index" class="list-group-item">
                <a :href="addon.link" class="text-info" target="_blank">{{addon.title}}</a>
                <div v-if="addon.imageurls[0]" class="panel-body">
                    <p v-if="addon.imageurls[0]">
                        <img v-lazy="addon.imageurls[0].url" alt="image" class="addonimg img-thumbnail">
                    </p>
                </div>
            </div>
        </div>
	</div>
</template>
<script>
import store from '../store';
import api from '../api';

export default {
	created(){
		this.init();
		if(window.localStorage && localStorage.getItem('yule')){
			setTimeout(()=>{
				this.refresh();
			},1000);
		}
	},
	data: ()=> ({
        lists: [],
		ing: 0
    }),
	methods: {
		init(){
			api.addon(res => {
				this.lists = res;
			}, 'yule');
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
			}, 'yule', 1);
		}
	}
}
</script>