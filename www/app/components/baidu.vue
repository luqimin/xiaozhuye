<template>
    <div class="baidu">
        <div class="input-group" :class="{'has-error':isError}">
            <input @input="input" @keyup.enter="search" type="text" v-model="word" class="form-control" placeholder="输入关键字搜索">
            <span class="input-group-btn">
                <button @click="search" class="btn btn-primary" type="button">百度一下</button>
            </span>
        </div>
    </div>
</template>

<script>

export default {
    data: ()=>({
        word: '',
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
            console.log(e.target.value);
            this.isError = e.target.value ? false : true;
        }
    },
}

</script>