<template>
	<div class="about panel panel-info">
		<div class="panel-heading">
            <div class="clearfix">
                <span class="panel-title pull-left">{{page[num].title}}</span>
                <ul class="about-page pager pull-right">
                    <li class="previous" :class="{disabled: prevClass}">
                        <button @click="prev" class="btn btn-default btn-xs" :class="{disabled: prevClass}">&lt;</button>
                    </li>
                    <li class="next" :class="{disabled: nextClass}">
                        <button @click="next" class="btn btn-default btn-xs" :class="{disabled: nextClass}">&gt;</button>
                    </li>
                </ul>
            </div>
		</div>
		<div v-html="page[num].content" class="panel-body">
        </div>
	</div>
</template>

<script>
import store from '../store';
import api from '../api';

export default {
	data: ()=> ({
        num: 0,
        page: [
            {
                title :'小主页简介',
                content: '<p>小主页是一个<span class="text-primary">轻量级的</span>、<span class="text-primary">可定制的</span>个人主页，您完全可以把小主页设置成您的首页</p>'
            },
            {
                title :'云同步',
                content: '<p>小主页提供简单的用户系统, 在您注册帐号后, 您可以保存您在本站的所有配置</p><p>我保证您在所有电脑上打开的小主页都<span class="text-warning">一个德行</span></p>'
            },
            {
                title :'模块定制',
                content: '小主页有许多模块: 搜索、新闻、段子... 您可以任意配置</p><p>如果您不满足目前小主页已有模块, 请联系我! '
            },
            {
                title :'网址定制',
                content: '<p>网址是导航网站的最重要功能, 小主页允许您完全定义自己的网址库</p><p>在<span class="text-danger">经过您同意</span>的前提下, 小主页还可以分享您添加的网址给所有用户</p>'
            },
            {
                title :'源码说明',
                content: '<p>小主页基于 <code>ThinkJS</code> <code>Vue2.0</code> 制作</p><p>您可以在此查看源码: <a href="https://github.com/luqimin/xiaozhuye" target="_blank">GitHub</a></p>'
            }
        ]
    }),
    computed: {
        prevClass(){
            return this.num == 0 ? true : false;
        },
        nextClass(){
            return this.num == this.page.length ? true : false;
        }
    },
	methods: {
		prev(){
            if (this.num > 0) {
                this.num--;
            }
		},
        next(){
            if (this.num < 4) {
                this.num++;
            }
        }
	}
}
</script>