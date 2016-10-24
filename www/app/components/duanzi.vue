<template>
	<div>
		<div v-for="addon in lists" v-bind:key="addon.id" track-by="id" class="addon panel panel-danger">
			<div class="panel-heading">
				<a v-bind:href="addon.weixin_url" target="_blank">{{addon.text}}</a>
			</div>

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
</template>

<script>
import { mapGetters } from 'vuex';
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
        init () {
            api.duanzi(res => {
				this.lists = res;
			});
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