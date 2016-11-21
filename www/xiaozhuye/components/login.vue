<style>
    .modal {
        display: block;
    }

    .navbar-inverse .btn-link {
        color: #444;
    }

    .navbar-inverse .btn-link:hover, .navbar-inverse .btn-link:focus {
        color: #444;
    }
</style>

<template>
    <div class="modal">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button @click="closeLog" type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-header">{{title}}</h4>
                </div>
                <div class="modal-body form-horizontal">
                    <div class="form-group">
                        <label for="username" class="col-sm-2 control-label">用户</label>
                        <div class="col-sm-10">
                            <input @input="updateUsername" :value="username" type="text" class="form-control" id="username" placeholder="* 字母/数字">
                        </div>
                    </div>
                    <div v-if="type=='register'" class="form-group">
                        <label for="email" class="col-sm-2 control-label">邮箱</label>
                        <div class="col-sm-10">
                            <input v-model="email" type="email" class="form-control" id="email" placeholder="* 邮箱">
                        </div>
                    </div>
                    <div v-if="type=='register'" class="form-group">
                        <label for="vericode" class="col-sm-2 col-xs-12 control-label">验证码</label>
                        <div class="col-sm-6 col-xs-7">
                            <input v-model="code" type="number" class="form-control" id="vericode" maxlength="6" placeholder="* 6位验证码">
                        </div>
                        <div class="col-sm-3 col-xs-4">
                            <button @click="sendCode" class="btn btn-primary" :class="{disabled:codeSended}">
                                {{sendText}}
                            </button>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="password" class="col-sm-2 control-label">密码</label>
                        <div class="col-sm-10">
                            <input @input="updatePassword" @keyup.enter="submitAction" :value="password" type="password" class="form-control" id="password" placeholder="* 密码6-16位">
                        </div>
                    </div>
                    <div v-if="type=='register'" class="form-group">
                        <label for="inviteCode" class="col-sm-2 control-label">邀请码</label>
                        <div class="col-sm-10">
                            <input v-model="inviteCode" @keyup.enter="submitAction" type="text" class="form-control" id="inviteCode" placeholder="选填">
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-sm-offset-2 col-sm-10">
                            <span v-show="failMsg" class="loginMsg text-danger">{{failMsg}}</span>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button @click="closeLog" type="button" class="btn btn-link">关闭</button>
                    <button @click="toggleLoginPop" type="button" class="btn btn-default">{{opTitle}}</button>
                    <button v-if="!succMsg" @click="submit" type="button" class="btn btn-primary">立即{{title}}</button>
                    <button v-else class="btn btn-success disabled">{{title}}成功!</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';

    import axios from 'axios';

    import api from '../api';

    export default {
        props: ['type'],
        data: () => ({
            inviteCode: '',
            email: '',
            code: '',
            codeSended: false,
            count: '5',
            loginSuccess: 0,
            loginFail: 0,
            registerSuccess: 0,
            registerFail: 0
        }),
        computed: {
            ...mapGetters([
                'username',
                'password',
                'isLogin'
            ]),
            title(){
                return this.type == 'login' ? '登录' : '注册';
            },
            opTitle(){
                return this.type == 'login' ? '注册' : '登录';
            },
            failMsg(){
                return this.type == 'login' ? this.loginFail : this.registerFail;
            },
            succMsg(){
                return this.type == 'login' ? this.loginSuccess : this.registerSuccess;
            },
            sendText(){
                return this.codeSended ? '重新获取 ' + this.count : '立即获取';
            }
        },
        methods: {
            updateUsername(e){
                this.$store.commit('updateUsername', e.target.value)
            },
            updatePassword(e){
                this.$store.commit('updatePassword', e.target.value)
            },
            closeLog(){
                this.$emit('closeLog');
            },
            toggleLoginPop(){
                this.$emit('toggleLog');
            },
            login(){
                let that = this;
                api.login(res => {
                    if (!res.data.errno) {
                        that.loginSuccess = 1;
                        that.loginFail = 0;
                        setTimeout(() => {
                            that.$store.commit('updateParam', {
                                key: ['isLogin', 'mokuai', 'isvip'],
                                value: [1, res.data.data.mokuai.split(','), res.data.data.isvip]
                            });
                        }, 666);
                        api.mySites((res) => {
                            that.$store.commit('updateParam', {
                                key: ['USERSITES'],
                                value: [res]
                            });
                        });
                    } else {
                        that.loginFail = res.data.errmsg;
                    }
                }, {
                    username: that.username,
                    password: that.password
                });
            },
            register(){
                let that = this;
                api.register(res => {
                    if (!res.data.errno) {
                        that.registerSuccess = 1;
                        that.registerFail = 0;
                        setTimeout(() => {
                            that.$store.commit('updateParam', {
                                key: ['isLogin', 'isvip'],
                                value: [1, res.data.data.isvip]
                            });
                        }, 666);
                    } else {
                        that.registerFail = res.data.errmsg;
                    }
                }, {
                    username: that.username,
                    password: that.password,
                    email: that.email,
                    code: that.code,
                    inviteCode: that.inviteCode
                });
            },
            sendCode(){
                if (this.codeSended) {
                    return;
                }
                if (!this.email) {
                    return this.registerFail = '请输入邮箱';
                }
                if (!/^[\w\.-]+@[\w-]+(\.[\w-]+){1,3}$/i.test(this.email)) {
                    return this.registerFail = '邮箱格式不正确';
                }

                this.codeSended = true;
                axios.post('/webapi/useraccount/sendemailcode', {
                    email: this.email
                }).then(res => {
                    // 响应成功回调
                    if (res.data.errno) {
                        return this.registerFail = res.data.errmsg;
                    } else {
                        return this.registerFail = '';
                    }
                }, res => {
                    // 失败回调
                    console.log(res);
                });
            },
            submit(e){
                let failName = this.type + 'Fail';
                if (!this.username) {
                    return this[failName] = '请输入用户名';
                }
                if (!this.password) {
                    return this[failName] = '请输入密码';
                }
                return this.type == 'login' ? this.login() : this.register();
            }
        },
        watch: {
            codeSended(){
                if (this._time) {
                    clearInterval(this._time);
                }
                this.count = 5;
                this._time = setInterval(() => {
                    if (this.count <= 1) {
                        this.codeSended = false;
                    } else {
                        this.count--;
                    }
                }, 1000);
            }
        }
    }

</script>