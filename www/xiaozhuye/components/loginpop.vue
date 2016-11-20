<template>
    <ul class="login nav navbar-nav navbar-right">
        <li>
            <a @click="showLogin" type="button" class="btn btn-link">登录</a>
        </li>
        <li>
            <a @click="showRegister" type="button" class="btn btn-link">注册</a>
        </li>
        <transition name="login-fade">
            <login v-on:login="showLogin" v-on:closeLog="close" v-on:toggleLog="showRegister" v-if="isShowLoginPop && !isLogin" :type="popType.login"></login>
            <login v-on:register="showRegister" v-on:closeLog="close" v-on:toggleLog="showLogin" v-if="isShowRegisterPop" :type="popType.register"></login>
        </transition>
    </ul>
</template>

<script>
    import login from './login';
    import {mapGetters} from 'vuex';

    export default {
        components: {
            login
        },
        data: () => ({
            isShowLoginPop: 0,
            isShowRegisterPop: 0,
            popType: {
                login: 'login',
                register: 'register',
            }
        }),
        methods: {
            showLogin () {
                this.isShowRegisterPop = 0;
                this.isShowLoginPop = !this.isShowLoginPop;
            },
            showRegister () {
                this.isShowLoginPop = 0;
                this.isShowRegisterPop = !this.isShowRegisterPop;
            },
            close(){
                this.isShowLoginPop = 0;
                this.isShowRegisterPop = 0;
            }
        },
        computed: {
            ...mapGetters([
                'isLogin',
            ])
        },
    }

</script>