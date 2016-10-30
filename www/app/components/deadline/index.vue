<style>
    .deadline .panel-heading {
        padding: 2px 15px;
    }

    .deadline .panel-body {
        padding: 0 0 15px 15px;
    }

    .deadline .panel-title {
        margin-top: 5px;
        font-size: 13px;
    }

    .deadline .note {
        padding-right: 15px;
        text-align: justify;
        overflow: hidden;
    }

    .deadline .number {
        padding: 3px 6px;
        font-size: 66px;
        font-weight: 200;
        line-height: 1;
        text-align: right;
        color: #50ae55;
        border-radius: 6px;
        opacity: 1;
        transition: all .25s;
    }

    .deadline .number span {
        margin: 0 0 0 -20px;
    }
    .deadline .number span.date {
        font-size: 13px;
        color: #666;
    }
    .deadline .number span.unit {
        font-size: 13px;
    }

    .deadline .count {
        position: relative;
    }

    .deadline .count .arrow {
        position: absolute;
        top: 5px;
        width: 50px;
        cursor: pointer;
        opacity: 0;
        transition: opacity .3s;
    }

    .deadline .count .arrow.disable {
        display: none;
    }

    .deadline .count:hover .arrow {
        opacity: 1;
    }

    .deadline .count .arrow img {
        width: 100%;
    }

    .deadline .count .left {
        left: -15px;
    }

    .deadline .count .right {
        left: 35px;
    }
</style>
<template>
	<div class="deadline panel panel-success">
		<div class="panel-heading">
            <div class="clearfix">
                <span class="panel-title pull-left">{{addTitle || notes[num].title}}</span>
                <div class="pull-right">
                    <span @click="addNote" class="funicon">{{addBtn}}</span>
                </div>
            </div>
		</div>
		<div class="panel-body">
            <component v-bind:is="addComp" :show.sync="isAdd"></component>
            <div class="count clearfix">
                <div class="number">
                    <span class="date">{{notes[num].day}}</span>
                    <span>{{days}}</span>
                    <span class="unit">天</span></div>
                <div class="note">{{notes[num].content}}</div>
                <span @click="prev" class="arrow left" :class="{disable: prevClass}"><img src="/static/img/back.png" alt="上一个"></span>
                <span @click="next" class="arrow right" :class="{disable: nextClass}"><img src="/static/img/more.png" alt="下一个"></span>
            </div>
        </div>
        <transition name="fade">
            <alert show="isShowAlert" :type="alertType" :title="alertTitle" :content="alertContent"></alert>
        </transition>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

import Vue from 'vue';
import VueResource from 'vue-resource';
import defmod from '../default';
import alert from '../alert';

Vue.use(VueResource);

export default {
    created(){
        Vue.http.get('/webapi/deadline/getnote', '').then(res => {
            if(!res.body.errno){
                if(res.body.data.length){
                    this.notes = res.body.data;
                }
            }
        });
    },
    props: [
        'notetitle'
    ],
	data: ()=> ({
        num: 0,
        notes: [
            {
                title :'新增一条倒计时',
                content: '添加一条倒计时, 不错过每一个重要日期! 猛戳右上角 "+"!',
                data: '166'
            },
        ],
        isAdd: 0,
        addTitle: '',
        addBtn: '+',
        alertType: 'fail',
        alertTitle: '请登录',
        alertContent: '小主页部分功能需要用户登录后方能使用'
    }),
    computed: {
		...mapGetters([
			'isLogin',
			'isShowAlert',
		]),
        days(){
            let curDate = (new Date()).getTime();
            let noteDate = this.notes[this.num].date;
            let _days = 0;
            if((noteDate - curDate)/1000/3600 > 24){
                _days = parseInt((noteDate - curDate)/1000/3600/24);
            }else{
                _days = '<1';
            }
            return _days;
        },
        prevClass(){
            return this.num == 0 ? true : false;
        },
        nextClass(){
            return this.num == this.notes.length - 1 ? true : false;
        },
		addComp(){
			return this.isAdd ? 'add' : 'defmod';
		},
    },
	methods: {
        addNote(){
            if (!this.isLogin) {
                this.$store.commit('updateParam', {
                    key:['isShowAlert'],
                    value: [1]
                });
                return;
            }
            this.addTitle = this.addTitle ? '' : '增加一条倒计时';
            this.addBtn = this.addBtn == '×' ? '+' : '×';
            this.isAdd = !this.isAdd;
        },
		prev(){
            if (this.num > 0) {
                this.num--;
            }
		},
        next(){
            if (this.num < (this.notes.length - 1)) {
                this.num++;
            }
        }
	},
    components: {
        defmod,
        alert,
		add :(resolve) => {
			require(['./add'], (component) => {
				resolve(component);
			});
		},
    }
}
</script>