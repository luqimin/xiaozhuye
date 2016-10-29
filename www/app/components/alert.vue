<template>
    <div v-if="isShowAlert" class="alert top alert-dismissible" :class="{'alert-success': type=='success', 'alert-danger': type=='fail'}">
        <button @click="cancel" type="button" class="close" data-dismiss="alert">&times;</button>
        <h4>{{title}}</h4>
        <p v-html="content"></p>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    props: ['show', 'type', 'title', 'content'],
    computed: {
		...mapGetters([
			'isShowAlert',
		]),
    },
    methods: {
        cancel(){
            this.$store.commit('updateParam', {
                key:['isShowAlert'],
                value: [0]
            });
        }
    },
    watch: {
        isShowAlert () {
            if (this._time) clearTimeout(this._time)
            this._time = setTimeout(() => {
                this.$store.commit('updateParam', {
                    key:['isShowAlert'],
                    value: [0]
                });
            }, 3000)
        }
    }
}
</script>