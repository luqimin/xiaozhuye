<template>
    <div id="app" class="">
        <nav class="navbar navbar-inverse">
            <div class="container container-fluid">
                <div class="navbar-header">
                    <a class="navbar-brand" href="#">TINY
                        <!--<%= brand%>-->
                        <!--<img alt="Brand" src="...">-->
                    </a>
                </div>
                <div class="collapse navbar-collapse">
                    <ul class="nav navbar-nav">
                        <pm></pm>
                    </ul>
                    <template v-if="isLogin">
                        <ul class="login nav navbar-nav navbar-right">
                            <li class="dropdown" :class="{open:isShowDropdown}">
                                <a @click="showDropdown" type="button" class="btn btn-link dropdown-toggle">您好！
                                    {{username}} <span class="caret"></span></a>
                                <ul v-show="isShowDropdown" class="dropdown-menu" role="menu">
                                    <li><a href="#">配置网址</a></li>
                                    <li><a href="#">配置模块</a></li>
                                    <li><a href="#">配置壁纸 (即将上线)</a></li>
                                    <li class="divider"></li>
                                    <li><a href="#">我要吐槽 (即将上线)</a></li>
                                    <li class="divider"></li>
                                    <li><a @click="logout" class="pointer">退出</a></li>
                                </ul>
                            </li>
                        </ul>
                    </template>
                    <template v-else>
                        <LoginPop></LoginPop>
                    </template>
                </div>
            </div>
        </nav>
        <div class="container">
            <h1>
                <!--<%= title%>-->
            </h1>
            <component v-bind:is="noteComp"></component>
            <div class="row">
                <div class="col-md-3">
                    <component v-bind:is="a0Comp"></component>
                    <Sites></Sites>
                    <about></about>
                </div>
                <div class="col-md-6">
                    <component v-bind:is="b0Comp"></component>
                    <component v-bind:is="b1Comp"></component>
                    <component v-bind:is="b2Comp"></component>
                    <component v-bind:is="b3Comp"></component>
                </div>
                <div class="col-md-3">
                    <modconfig></modconfig>
                    <component v-bind:is="c0Comp"></component>
                    <component v-bind:is="c1Comp"></component>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import Sites from './sites';
    import LoginPop from './loginpop';
    import modconfig from './modconfig';
    import defmod from './default';
    import about from './about';
    import pm from './pm25';
    import {ORDER} from '../const';

    import {mapGetters, mapActions} from 'vuex';

    export default {
        components: {
            LoginPop,
            Sites,
            modconfig,
            defmod,
            about,
            pm,
            baidu: (resolve) => {
                require(['./baidu'], (component) => {
                    resolve(component);
                });
            },
            toutiao: (resolve) => {
                require(['./toutiao'], (component) => {
                    resolve(component);
                });
            },
            gnnews: (resolve) => {
                require(['./gnnews'], (component) => {
                    resolve(component);
                });
            },
            gwnews: (resolve) => {
                require(['./gwnews'], (component) => {
                    resolve(component);
                });
            },
            duanzi: (resolve) => {
                require(['./duanzi'], (component) => {
                    resolve(component);
                });
            },
            yule: (resolve) => {
                require(['./yule'], (component) => {
                    resolve(component);
                });
            },
            notepad: (resolve) => {
                require(['./notepad'], (component) => {
                    resolve(component);
                });
            },
            deadline: (resolve) => {
                require(['./deadline'], (component) => {
                    resolve(component);
                });
            },
        },
        computed: {
            ...mapGetters([
                'username',
                'isLogin',
                'mokuai',
            ]),
            a0Comp(){
                return this.mokuai.indexOf(ORDER.a[0].name) != -1 ? ORDER.a[0].name : 'defmod';
            },
            b0Comp(){
                return this.mokuai.indexOf(ORDER.b[0].name) != -1 ? ORDER.b[0].name : 'defmod';
            },
            b1Comp(){
                return this.mokuai.indexOf(ORDER.b[1].name) != -1 ? ORDER.b[1].name : 'defmod';
            },
            b2Comp(){
                return this.mokuai.indexOf(ORDER.b[2].name) != -1 ? ORDER.b[2].name : 'defmod';
            },
            b3Comp(){
                return this.mokuai.indexOf(ORDER.b[3].name) != -1 ? ORDER.b[3].name : 'defmod';
            },
            c0Comp(){
                return this.mokuai.indexOf(ORDER.c[0].name) != -1 ? ORDER.c[0].name : 'defmod';
            },
            c1Comp(){
                return this.mokuai.indexOf(ORDER.c[1].name) != -1 ? ORDER.c[1].name : 'defmod';
            },
            noteComp(){
                return this.mokuai.indexOf('notepad') != -1 ? 'notepad' : 'defmod';
            },
        },
        data: () => ({
            isShowDropdown: 0,
        }),
        methods: {
            ...mapActions([
                'userLogout'
            ]),
            showDropdown(){
                this.isShowDropdown = !this.isShowDropdown
            },
            logout(){
                this.showDropdown();
                this.userLogout();
            }
        }
    }
</script>