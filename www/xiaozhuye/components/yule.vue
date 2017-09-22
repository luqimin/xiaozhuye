<template>
	<div class="addon panel panel-info">
		<div class="panel-heading refresh-header clearfix">
			<span class="pill-left">娱乐新闻</span>
			<img @click="refresh" class="pull-right btn-refresh" :class="{ing:ing}" src="/static/img/refresh.png" alt="刷新">
		</div>
        <div class="list-group">
            <div v-for="addon in lists" v-bind:key="addon.uniquekey" track-by="addon.uniquekey" class="list-group-item">
                <a :href="addon.url" class="text-info" target="_blank">{{addon.title}}</a>
                <div v-if="addon.thumbnail_pic_s" class="yuleimg panel-body row">
                    <div v-if="addon.thumbnail_pic_s" class="col-xs-4 col-md-4">
                        <img v-lazy="addon.thumbnail_pic_s" v-on:click="zoomImg" alt="image" class="addonimg img-thumbnail">
                    </div>
                    <div v-if="addon.thumbnail_pic_s02" class="col-xs-4 col-md-4">
                        <img v-lazy="addon.thumbnail_pic_s02" v-on:click="zoomImg" alt="image" class="addonimg img-thumbnail">
                    </div>
                    <div v-if="addon.thumbnail_pic_s03" class="col-xs-4 col-md-4">
                        <img v-lazy="addon.thumbnail_pic_s03" v-on:click="zoomImg" alt="image" class="addonimg img-thumbnail">
                    </div>
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
        },
        zoomImg(event) {
            let imgs = event.target.parentNode.parentNode.querySelectorAll('img');
            if (event.target.parentNode.className.indexOf('12') == -1) {
                imgs.forEach(img => {
                    img.style.display = 'none';
                });
                event.target.parentNode.querySelector('img').style.display = 'block';
                event.target.parentNode.className = 'col-xs-12 col-md-12';
            } else {
                event.target.parentNode.className = 'col-xs-4 col-md-4';
                setTimeout(() => {
                    imgs.forEach(img => {
                        img.style.display = 'block';
                    });
                }, 252);
            }
        }
    }
}
</script>