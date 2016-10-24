<template>
    <div>
        <div v-for="addon in lists" v-bind:key="addon.pubDate" track-by="$index" class="addon panel panel-info">
            <div class="panel-heading">
                <a v-bind:href="addon.link" target="_blank">{{addon.title}}</a>
            </div>
            <div v-if="addon.imageurls[0]" class="panel-body">
                <p v-if="addon.imageurls[0]">
                    <img v-lazy="addon.imageurls[0].url" alt="image" class="addonimg img-thumbnail">
                </p>
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
	},
	data: ()=> ({
        lists: []
    }),
	methods: {
		init(){
			api.yule(res => {
				this.lists = res;
			});
		}
	}
}
</script>