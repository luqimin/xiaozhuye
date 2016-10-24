<template>
	<div class="panel panel-primary">
		<div class="panel-heading">
			<h3 @click="init" class="panel-title">新闻头条</h3>
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
    },
    data: ()=> ({
        lists: []
    }),
	methods: {
		init(){
            api.toutiao( (res) => {
                this.lists = res;
            });
        }
	}
};
export default TOUTIAO;
</script>