<template>
	<div class="addon panel panel-danger">
		<div class="panel-heading refresh-header clearfix">
			<span class="pill-left">搞笑段子</span>
			<img @click="refresh" class="pull-right btn-refresh" :class="{ing:ing}" src="/static/img/refresh.png" alt="刷新">
		</div>
        <div class="list-group">
            <div v-for="addon in lists" track-by="id" class="list-group-item">
                <a :href="addon.weixin_url" class="text-danger" target="_blank">{{addon.text}}</a>
                <div v-if="addon.image0 || addon.video_uri" class="panel-body">
                    <p v-if="addon.image0">
                        <img v-on:click="zoomImg" v-lazy="addon.image0" alt="image" class="addonimg img-thumbnail">
                    </p>
                    <p v-if="addon.video_uri" class="addon-video-wrap">
                        <video v-on:click="zoomVideo" class="addon-video img-thumbnail" controls>
                            <source v-bind:src="addon.video_uri" type="video/mp4"> 浏览器不支持
                        </video>
                    </p>
                </div>
            </div>
        </div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
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
        init () {
            api.addon(res => {
				if(res){
					this.lists = res;
				}
			}, 'duanzi');
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
			}, 'duanzi', 1);
		},
        zoomImg (event) {
            if (event.target.className.indexOf('imgauto') == -1) {
                event.target.className += ' imgauto';
            } else {
                event.target.className = event.target._prevClass;
            }
        },
        zoomVideo (event) {
            if (event.target.className.indexOf('embed-responsive-item') == -1) {
                event.target.className = 'embed-responsive-item';
                event.target.parentNode.className = 'embed-responsive embed-responsive-16by9';
            } else {
                event.target.className = event.target._prevClass;
                event.target.parentNode.className = event.target.parentNode._prevClass;
            }
        },
    },
}
</script>