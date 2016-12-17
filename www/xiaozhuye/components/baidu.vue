<style>
    .baidu {
        position: relative;
        margin-bottom: 23px;
    }
    .baidu .list-group {
        margin-top: -2px;
        position: absolute;
        width: 100%;
        z-index: 10;
    }
    .baidu .list-group-item {
        padding: 6px 15px;
    }
    .baidu .list-group-item.on {
        text-decoration: none;
        background-color: #f5f5f5;
    }
    .baidu .list-group-item:first-child {
        border-radius: 0;
    }
</style>
<template>
    <div class="baidu">
        <div class="input-group" :class="{'has-error':isError}">
            <input @input="input" @blur="blur" @keyup.enter="search" @keyup.down="down" @keyup.up="up" type="text" v-model="word" class="form-control" placeholder="输入关键字搜索" autofocus tabindex="1">
            <span class="input-group-btn">
                <a :href="url" class="btn btn-primary" type="button" target="_blank">{{name}}搜索</button>
            </span>
        </div>
        <div v-show="keywords.length" class="list-group">
            <a v-for="(word, index) in keywords" v-bind:href="word.url" class="list-group-item" :class="{on: keyNum==index}" target="_blank">{{word.name}}</a>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

const searchTool = [
    {
        name: '百度',
        key: ['baidu','百度一下','百度搜','百度'],
        url: 'https://www.baidu.com/s?ie=utf-8&wd='
    },
    {
        name: '淘宝',
        key: ['taobao','tmall','淘宝搜','天猫搜','淘宝','天猫'],
        url: 'https://s.taobao.com/search?q='
    },
];

let getSearchUrl = function (e) {
    let word = e,
        url = searchTool[0].url,
        name = searchTool[0].name;
    for (let i of searchTool) {
        for (let j of i.key) {
            if(e.indexOf(j) == 0){
                if (e!=j) {
                    word = e.substr(j.length);
                    url = i.url;
                    name = i.name;
                }
                break;
            }
        }
    }
    return {word,url,name};
};

export default {
    data: ()=>({
        word: '',
        oriWord: '',
        url: 'javascript:void(0)',
        oriUrl: '',
        name: '',
        keywords: [],
        keyNum: -1,
        isError: false
    }),
    methods: {
        search(){
            if(!this.word){
                this.isError = true;
                return;
            }
            this.isError = false;
            // window.location.href = this.url;
            window.open(this.url);
            return;
        },
        input(e){
            this.keyNum = -1;
            if(!this.word){
                this.keywords = [];
                return;
            }
            let searchTool = getSearchUrl(this.word);
            this.name = searchTool.name;
            this.url = searchTool.url + searchTool.word;
            this.isError = e.target.value ? false : true;

            this.oriWord = this.word;
            this.oriUrl = this.url;

            axios.get('/addons/fetch/sug', {
                params: {
                    word: searchTool.word,
                    name: searchTool.name
                }
            }).then(res => {
                if (res.data.errno == 0) {
                    if (res.data.data.length) {
                        let _res = [];
                        for(let i of res.data.data){
                            _res.push({
                                name: i,
                                url: searchTool.url + i
                            })
                        }
                        this.keywords = _res;
                    }
                }
            }).catch(err => {
                this.keywords = [];
            });
        },
        blur() {
            if(!this.word){
                this.keywords = [];
            }
        },
        down() {
            this.keyNum++;
            if (this.keyNum >= this.keywords.length) {
                this.keyNum = -1;
            }
            this.resetWord();
        },
        up() {
            this.keyNum--;
            if(this.keyNum < -1){
               this.keyNum = this.keywords.length-1;
            }
            this.resetWord();
        },
        resetWord() {
            if(this.keyNum == -1){
                this.word = this.oriWord;
                this.url = this.oriUrl;
            } else {
                this.word = this.keywords[this.keyNum].name;
                this.url = this.keywords[this.keyNum].url;
            }
        }
    },
}

</script>