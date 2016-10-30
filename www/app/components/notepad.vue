<style>
    .notepad {
        position: fixed;
        top: 0;
        z-index: 166;
        width: 50%;
        transition: top .5s;
    }
    .notepad .panel-body {
        position: relative;
    }
    .notepad .note-switch {
        width: 32px;
        height: 50px;
        border-radius: 0 0 3px 3px;
        background: #fff url("/static/img/notepad.png") no-repeat 50% 90%;
        background-size: 90%;
        cursor: pointer;
        opacity: .5;
        transition: all .5s;
    }
    .notepad:hover .note-switch {
        opacity: 1;
    }
    .notepad.show-notepad {
        left: 0;
        right: 0;
        margin: 0 auto;
    }
    .notepad.hide-notepad {
        top: -2px;
        right: 20px;
        width: auto;
    }
    .notepad.show-notepad .panel {
        display: block;
    }
    .notepad.show-notepad .note-switch {
        display: none;
    }
    .notepad.hide-notepad .panel {
        display: none;
    }
    .notepad.hide-notepad .note-switch {
        display: block;
    }
    .notepad.hide-notepad .note-switch:hover {
        height: 60px;
    }
    .editwrap {
        max-height: 500px;
        overflow-y: auto;
        transition: all .5s;
    }
    .editwrap:focus {
        padding: 1px 6px;
        outline: 0;
        border: 1px solid #eee;
        border-radius: 3px;
        box-shadow: 0px 0px 6px #eee inset;
    }
    .msg {
        position: absolute;
        top: 0;
        right: 15px;
    }
</style>
<template>
    <div class="notepad" :class="{'hide-notepad': isHide, 'show-notepad': !isHide}">
        <div @click="show" class="note-switch" title="点击打开记事本"></div>
        <div class="panel panel-primary">
            <div class="panel-heading">
                <div class="clearfix">
                    <span class="panel-title pull-left">记事本</span>
                    <div class="pull-right">
                        <span @click="hide" class="funicon">&times;</span>
                    </div>
                </div>
            </div>
            <div class="panel-body">
                <div @blur="update" @focus="init" contenteditable="true" v-html="text" class="editwrap"></div>
                <transition name="fade">
                    <span v-if="msg" class="msg text-success">{{msg}}</span>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Vue from 'vue';
import VueResource from 'vue-resource';

Vue.use(VueResource);

export default {
    created(){
        this.getNote();
    },
	data: ()=> ({
        isHide: true,
        msg: '',
        num: 0,
        notes: []
    }),
    computed: {
		...mapGetters([
			'isLogin',
		]),
        text(){
            return this.notes.length > 0 && this.notes[this.num].content || '点此开始编辑';
        }
    },
	methods: {
        getNote(){
            Vue.http.get('/webapi/notepad/get', '').then(res => {
                if(!res.body.errno){
                    if(res.body.data.length){
                        this.notes = res.body.data;
                    }
                }
            });
        },
        hide(){
            this.isHide = true;
        },
        show(e){
            this.isHide = false;
        },
        init(e){
            if(e.target.innerText == '点此开始编辑'){
                e.target.innerHTML = '';
            }
        },
        update(e){
            if (!this.isLogin) {
                return this.msg = '请登录';
            }
            if(e.target.innerText == ''){
                e.target.innerHTML = '点此开始编辑';
            }
            let that = this;
            let value = e.target.innerHTML;

            if(this.notes.length > 0 && value == this.notes[this.num].content){
                return;
            }

            this.msg = '正在更新...';

            let noteId = this.notes.length > 0 && this.notes[this.num].id || '';
            
            Vue.http.post('/webapi/notepad/update', {
                noteId: noteId,
                noteContent: value
            }).then(res => {
                if (!res.body.errno) {
                    that.msg = '更新成功';
                    if (!noteId) {
                        that.getNote();
                    } else {
                        that.notes[that.num].content = value;
                    }
                }
            });
        }
	},
    watch: {
        msg(){
            if (this._timeOut) clearTimeout(this._timeOut);
            this._timeOut = setTimeout(()=>{
                this.msg = '';
            },2000);
        }
    }
}
</script>