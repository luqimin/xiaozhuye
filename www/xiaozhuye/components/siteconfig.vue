<style>
    .sitesBox .siteWrap .badge {
        font-size: 15px;
        border-radius: 50%;
        margin: 0 0 0 6px;
        padding: 0;
        height: 16px;
        width: 16px;
        line-height: 13px;
    }
</style>

<template>
    <div class="modal">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button @click="hideModal" type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title">网址配置{{title}}</h4>
                </div>
                <div class="modal-body sitesBox">
                    <div class="form-group">
                        <input @input="search" type="text" class="form-control" placeholder="点此搜索网址库，点击添加">
                    </div>
                    <div class="siteWrap">
                        <template v-for="site in siteList">
                            <span @click="addSite" :id="site.id" class="btn btn-default btn-sm">{{site.name}}</span>
                        </template>
                    </div>
                    <div class="siteWrap">
                        <template v-for="site in USERSITES" track-by="id">
                            <span @click="deleteSite" :id="site.id" class="btn btn-success btn-sm">{{site.name}}<span class="badge">×</span></span>
                        </template>
                    </div>
                    <div v-if="isvip" class="well well-sm submitSiteWrap">
                        <div><span>上面没有想要的网站? 那就帮我添加网址入库吧!</span></div>
                        <div><span class="error" :class="errorClass">{{error}}</span></div>
                        <div class="form-inline row">
                            <div class="form-group col-md-4">
                                <input @change="search" v-model="siteName" type="text" class="form-control" placeholder="网站名" required="required">
                            </div>
                            <div class="form-group col-md-4">
                                <input @change="search" v-model="siteUrl" type="text" class="form-control" placeholder="网址" required="required">
                            </div>
                            <div class="form-group col-md-4">
                                <input v-model="siteIcon" type="text" class="form-control" placeholder="图标">
                            </div>
                        </div>
                        <div class="form-inline row addSiteLineTwo">
                            <div class="checkbox col-md-4">
                                <label>
                                    <input @change="changIsfocus" v-model="siteIssecret" type="checkbox" id="isSecret">
                                    是否公开网址
                                </label>
                            </div>
                            <div class="checkbox col-md-4">
                                <label>
                                    <input @change="changIsfocus" v-model="siteIsfocus" type="checkbox" id="isDefFocus">
                                    是否默认高亮
                                </label>
                            </div>
                            <div class="checkbox col-md-4">
                                <select v-model="siteCategory" class="col-md-4">
                                    <option value="">请选择合适的分类</option>
                                    <option value="sj">社交</option>
                                    <option value="gw">购物</option>
                                    <option value="xw">新闻</option>
                                    <option value="sp">视频</option>
                                    <option value="yy">音乐</option>
                                    <option value="zp">招聘</option>
                                    <option value="yx">邮箱</option>
                                    <option value="js">技术</option>
                                    <option value="ty">体育</option>
                                    <option value="rj">软件</option>
                                    <option value="sh">生活</option>
                                    <option value="game">游戏</option>
                                    <option value="qt">其他</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-inline row addSiteLineTwo">
                            <div class="submitSiteBtn col-md-4">
                                <button @click="addUserSite" type="submit" class="btn btn-default btn-block">提交入库
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
                <div class="modal-footer">
                    <button @click="hideModal" type="button" class="btn btn-primary">保存更改</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    import Cookie from 'js-cookie';
    import api from '../api';

    export default {
        created(){
            this.init();
        },
        props: [
            'type',
            'title'
        ],
        data: () => ({
            userSitesId: [],
            siteList: [],
            siteName: '',
            siteUrl: '',
            siteIcon: '',
            siteCategory: '',
            siteIssecret: false,
            siteIsfocus: false,
            error: ''
        }),
        computed: {
            ...mapGetters([
                'isvip',
                'USERSITES'
            ]),
            errorClass(){
                return {
                    'text-danger': this.error && this.error != '提交成功',
                    'text-success': this.error == '提交成功',
                }
            }
        },
        methods: {
            init(){
                let _length = this.USERSITES.length;
                for (let i = 0; i < _length; i++) {
                    this.userSitesId.push(this.USERSITES[i].id);
                }
            },
            search(e){
                let val = e.target.value;
                api.searchSites((res) => {
                    if (res) {
                        this.siteList = res;
                    }
                }, {
                    value: val
                });
            },
            hideModal(){
                this.$emit('closeSiteConfig');
            },
            addSite(e){
                let siteId = parseInt(e.target.id);
                let _userSites = this.USERSITES;
                //设置用户网址配置
                if (this.userSitesId.indexOf(siteId) != -1) {
                    return;
                }
                this.userSitesId.push(siteId);
                //设置页面当前页面用户已添加网址
                for (let i = 0; i < this.siteList.length; i++) {
                    if (this.siteList[i].id == siteId) {

                        _userSites.push(this.siteList[i]);
                        this.siteList.splice(i, 1);
                    }
                }
                //上传用户配置
                this.$store.commit('updateParam', {
                    key: ['USERSITES'],
                    value: [_userSites]
                });

                if (Cookie.get('usr_id')) {
                    api.editSites((res) => {

                    }, {
                        sites: this.userSitesId.join(',')
                    });
                }
                Cookie.set('usr_sites', this.userSitesId.join(','), {expires: 366, path: '/'});
            },
            deleteSite(e){
                let siteId = parseInt(e.target.id || e.target.parentNode.id);
                let _userSites = this.USERSITES;
                let index = this.userSitesId.indexOf(siteId);
                //设置用户网址配置
                if (index != -1) {
                    this.userSitesId.splice(index, 1);
                }
                //设置页面当前页面用户已添加网址
                for (let i = 0; i < _userSites.length; i++) {
                    if (_userSites[i].id == siteId) {
                        this.siteList.push(_userSites[i]);
                        _userSites.splice(i, 1);
                    }
                }
                //上传用户配置
                this.$store.commit('updateParam', {
                    key: ['USERSITES'],
                    value: [_userSites]
                });

                if (Cookie.get('usr_id')) {
                    api.editSites((res) => {

                    }, {
                        sites: this.userSitesId.join(',')
                    });
                }
                Cookie.set('usr_sites', this.userSitesId.join(','), {expires: 366, path: '/'});
            },
            changIsfocus(){
                if (this.siteIsfocus && this.siteIssecret == false) {
                    this.siteIssecret = true;
                    this.error = '只有非公开网址可以设置默认高亮';
                } else if (this.error == '只有非公开网址可以设置默认高亮') {
                    this.error = '';
                }
            },
            addUserSite(){
                let urlReg = /.+\.[a-zA-Z]{2,10}/;
                let iconReg = /.+\.[a-zA-Z]+\/[a-zA-Z]+(.png|.jpg|.gif|.ico)$/;
                if (!this.siteName) {
                    return this.error = '请输入网站名';
                }
                if (!this.siteUrl || !urlReg.test(this.siteUrl)) {
                    return this.error = '请输入合法的网址, 格式: http://www.xxx.com 或 www.xxx.com';
                }
                if (this.siteIcon && !iconReg.test(this.siteIcon)) {
                    return this.error = '图标地址格式错误, 请以.png/.jpg/.gif/.ico结尾, 也可留空';
                }
                if (!this.siteCategory) {
                    return this.error = '请选择合适的网址分类';
                }

                this.error = '';

                api.addUserSite((res) => {
                    console.log(res);
                    if (res.errno == 0) {
                        return this.error = '提交成功';
                    } else if (res.errno == 1104) {
                        return this.error = '该网址已存在, 您可以直接添加';
                    } else {
                        return this.error = res.errmsg;
                    }
                }, {
                    name: this.siteName,
                    url: this.siteUrl,
                    icon: this.siteIcon,
                    category: this.siteCategory,
                    secret: this.siteIssecret,
                    isfocus: this.siteIsfocus,
                });
            }
        }
    }
</script>