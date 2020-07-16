<template>
<div>
    <header>
        <general-navbar :email='email' />
    </header>

    <div v-if="uid != 0">
        <editor-navbar v-if="role == 'editor'"/>
    </div>
    
    <div v-anime="anime">
        <router-view @changeRouteTitle="changeRouteTitle" :key="$route.path"></router-view>
    </div>
</div>
</template>

<script>
import themeConfig from '@/../themeConfig';
import EditorNavbar from '@/layouts/navs/EditorNavbar';
import GeneralNavbar from '@/layouts/navs/GeneralNavbar';

import {mapGetters} from 'vuex';

export default {
    data(){
        return {
            anime: themeConfig.anime || {},
            routeTitle: this.$route.meta.pageTitle,
        }
    },

    methods: {
        updateRouterTransition(val){
            this.routerTransition = val
        },

        changeRouteTitle(title){
            this.routeTitle = title
        }
    },

    watch: {
        '$route'() {
            this.routeTitle = this.$route.meta.pageTitle
        },
    },

    computed: {
        ...mapGetters(['role', 'uid', 'email']),
    },

    components: {EditorNavbar, GeneralNavbar}
}
</script>