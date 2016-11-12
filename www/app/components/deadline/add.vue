<style>
    .deadline .addNote {
        margin: 15px 15px 15px 0;
    }

    .deadline .addNote .btn-note {
        margin-right: 10px;
    }

    .deadline .cov-vue-date {
        display: block!important;
    }
</style>
<template>
    <div v-show="isShow" class="addNote">
        <div class="form-group">
            <input v-model="noteTitle" class="form-control" type="text" id="noteTitle" placeholder="倒计时标题">
        </div>
        <div class="form-group">
            <input v-model="noteContent" class="form-control" type="text" id="noteContent" placeholder="倒计时内容">
        </div>
        <div class="form-group">
            <date-picker :date="noteDay" :option="option" :limit="limit"></date-picker>
        </div>
        <div class="form-group clearfix">
            <button @click="addNote" type="submit" class="btn btn-primary btn-sm">提&nbsp;&nbsp;&nbsp;交</button>
            <span :class="{'text-danger': error != '提交成功', 'text-success': error == '提交成功'}">{{error}}</span>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import myDatepicker from 'vue-datepicker';

export default {
    props: [
        'show'
    ],
	data: ()=> ({
        //日期选择器
        noteDay: {
            time: ''
        },
        option: {
            type: 'min',
            week: ['一', '二', '三', '四', '五', '六', '日'],
            month: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
            format: 'YYYY-MM-DD HH:mm',
            placeholder: '点击选择倒计时日期',
            inputStyle: {
                'display': 'block',
                'width': '100%',
                'line-height': '1.846',
                'border-bottom': '1px solid #ddd',
                'transition': 'border-color ease-in-out .15s,box-shadow ease-in-out .15s',
                'color': '#666666'
            },
            color: {
                header: '#2b98f0',
                headerText: '#fff'
            },
            buttons: {
                ok: '确定',
                cancel: '取消'
            },
            overlayOpacity: 0.5, // 0.5 as default
            dismissible: true // as true as default
        },
        limit: [
            {
                type:'fromto',
                from:new Date(),
            }
        ],
        noteTitle: '',
        noteContent: '',
        error: ''
    }),
    computed: {
        isShow(res){
            return this.show;
        }
    },
	methods: {
        addNote(){
            if (!this.noteTitle) {
                return this.error = '请输入倒计时标题';
            }
            if (!this.noteContent) {
                return this.error = '请输入倒计时内容';
            }
            if (!this.noteDay.time) {
                return this.error = '请选择一个日期';
            }
            
            Vue.http.post('/webapi/deadline/add', {
                noteTitle: this.noteTitle,
                noteContent: this.noteContent,
                noteDay: this.noteDay.time
            }).then(res => {
                if(res.ok){
                    this.noteTitle = '';
                    this.noteContent = '';
                    this.noteDay.time = '';
                    this.error = '提交成功';
                }
            });

        }
	},
    components: {
        'date-picker': myDatepicker
    }
}
</script>