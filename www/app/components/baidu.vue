<template>
    <div class="baidu">
        <div class="input-group" :class="{'has-error':isError}">
            <input @input="input" @keyup.enter="search" type="text" v-model="word" class="form-control" placeholder="输入关键字搜索" autofocus tabindex="1">
            <span class="input-group-btn">
                <a :href="url" class="btn btn-primary" type="button" target="_blank">百度一下</button>
            </span>
        </div>
    </div>
</template>

<script>

export default {
    data: ()=>({
        word: '',
        url: 'javascript:void(0)',
        isError: false
    }),
    methods: {
        search(){
            if(!this.word){
                this.isError = true;
                return;
            }
            this.isError = false;
            let baiduUrl = 'https://www.baidu.com/s?ie=utf-8&wd=';
            window.location.href = baiduUrl + this.word;
            return;
        },
        input(e){
            let baiduUrl = 'https://www.baidu.com/s?ie=utf-8&wd=';
            this.url = baiduUrl + this.word;
            this.isError = e.target.value ? false : true;
        }
    },
}

</script>