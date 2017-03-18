<style>
.navbar-collapse.in {
    overflow-y: visible;
}
</style>
<template>
    <div id="app"
         class="">
        <nav class="navbar navbar-inverse">
            <div class="container container-fluid">
                <div class="navbar-header">
                    <button @click="expandHead"
                            type="button"
                            class="navbar-toggle collapsed">
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand"
                       href="/">TINY</a>
                </div>
                <div class="collapse navbar-collapse"
                     :class="{in:isExpand}">
                    <weather></weather>
                    <template v-if="isLogin">
                        <ul class="login nav navbar-nav navbar-right">
                            <li class="dropdown"
                                :class="{open:isShowDropdown}">
                                <a @click="showDropdown"
                                   type="button"
                                   class="btn btn-link dropdown-toggle">您好！
                                        {{username}} <span class="caret"></span></a>
                                <ul v-show="isShowDropdown"
                                    class="dropdown-menu"
                                    role="menu">
                                    <li><a>配置网址</a></li>
                                    <li><a>配置模块</a></li>
                                    <li><a>配置壁纸 (即将上线)</a></li>
                                    <li class="divider"></li>
                                    <li><a>我要吐槽 (即将上线)</a></li>
                                    <li class="divider"></li>
                                    <li><a @click="logout"
                                           class="pointer">退出</a></li>
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
            <component v-bind:is="noteComp"></component>
            <div class="row">
                <div class="col-md-6">
                    <component v-bind:is="a0Comp"></component>
                    <Sites></Sites>
                </div>
                <div v-if="c0Comp != 'defmod'"
                     class="col-md-3">
                    <component v-bind:is="c0Comp"></component>
                </div>
                <div :class="c0Comp == 'defmod' ? 'col-md-6' : 'col-md-3'">
                    <modconfig></modconfig>
                    <about></about>
                </div>
            </div>
            <div v-if="bCount"
                 class="row">
                <div v-if="b0Comp != 'defmod'"
                     :class="bCount == 1 ? 'col-md-12' : 'col-md-6'">
                    <component v-bind:is="b0Comp"></component>
                </div>
                <div v-if="b1Comp != 'defmod'"
                     :class="bCount == 1 ? 'col-md-12' : 'col-md-6'">
                    <component v-bind:is="b1Comp"></component>
                </div>
                <div v-if="b2Comp != 'defmod'"
                     :class="bCount == 1 ? 'col-md-12' : 'col-md-6'">
                    <component v-bind:is="b2Comp"></component>
                </div>
                <div v-if="b3Comp != 'defmod'"
                     :class="bCount == 1 ? 'col-md-12' : 'col-md-6'">
                    <component v-bind:is="b3Comp"></component>
                </div>
                <div v-if="b4Comp != 'defmod'"
                     :class="bCount == 1 ? 'col-md-12' : 'col-md-6'">
                    <component v-bind:is="b4Comp"></component>
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
import weather from './weather';
import { ORDER } from '../const';

import { mapGetters, mapActions } from 'vuex';

export default {
    components: {
        LoginPop,
        Sites,
        modconfig,
        defmod,
        about,
        weather,
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
        mokArr() {
            return Object.keys(this.mokuai);
        },
        a0Comp() {
            return this.mokArr.indexOf(ORDER.a[0].name) != -1 ? ORDER.a[0].name : 'defmod';
        },
        b0Comp() {
            return this.mokArr.indexOf(ORDER.b[0].name) != -1 ? ORDER.b[0].name : 'defmod';
        },
        b1Comp() {
            return this.mokArr.indexOf(ORDER.b[1].name) != -1 ? ORDER.b[1].name : 'defmod';
        },
        b2Comp() {
            return this.mokArr.indexOf(ORDER.b[2].name) != -1 ? ORDER.b[2].name : 'defmod';
        },
        b3Comp() {
            return this.mokArr.indexOf(ORDER.b[3].name) != -1 ? ORDER.b[3].name : 'defmod';
        },
        b4Comp() {
            return this.mokArr.indexOf(ORDER.b[4].name) != -1 ? ORDER.b[4].name : 'defmod';
        },
        c0Comp() {
            return this.mokArr.indexOf(ORDER.c[0].name) != -1 ? ORDER.c[0].name : 'defmod';
        },
        noteComp() {
            return this.mokArr.indexOf('notepad') != -1 ? 'notepad' : 'defmod';
        },
        bCount() {
            let num = 0;
            for (let p of ORDER.b) {
                if (this.mokArr.indexOf(p.name) != -1) {
                    num++;
                }
            }
            return num;
        },
    },
    data: () => ({
        isShowDropdown: 0,
        isExpand: false
    }),
    methods: {
        ...mapActions([
            'userLogout'
        ]),
        expandHead() {
            this.isExpand = !this.isExpand;
        },
        showDropdown() {
            this.isShowDropdown = !this.isShowDropdown
        },
        logout() {
            this.showDropdown();
            this.userLogout();
        }
    }
}
</script>