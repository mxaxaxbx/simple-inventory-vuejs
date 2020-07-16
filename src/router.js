import Vue from 'vue';
import Router from 'vue-router';
import auth from '@/auth/authService';
import store from '@/store/store';

import firebase from 'firebase/app';
import 'firebase/auth';

Vue.use(Router);

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,

    scrollBehavior(){
        return{x: 0, y:0}
    },

    routes: [{
        path: '',
        component: () => import('./layouts/main/Main.vue'),
        children: [
            {
                path: '/',
                name: 'index',
                component: () => import('./layouts/login/Index.vue'),
                meta: {
                    rule: 'guest',
                }
            },
            {
                path: '/dashboard',
                name: 'dashboard',
                component: () => import('./layouts/Dashboard/Index.vue'),
                meta: {
                    rule: 'editor',
                    authRequired: true,
                }
            },
            {
                path: '/products',
                name: 'products',
                component: () => import('./layouts/Products/Index.vue'),
                meta: {
                    rule: 'editor',
                    authRequired: true,
                },
            },
            {
                path: '/products/add',
                name: 'addProduct',
                component: () => import('./layouts/Products/NewProduct.vue'),
                meta: {
                    rule: 'editor',
                    authRequired: true,
                },
            },
            {
                path: '/products/edit/:id',
                name: 'editProduct',
                component: () => import('./layouts/Products/EditProduct.vue'),
                meta: {
                    rule: 'editor',
                    authRequired: true,
                },
            },
            {
                path: '/categories',
                name: 'categories',
                component: () => import('./layouts/Categories/Index.vue'),
                meta: {
                    rule: 'editor',
                    authRequired: true,
                },
            },
            {
                path: '/categories/add',
                name: 'addCategorie',
                component: () => import('./layouts/Categories/NewCategorie.vue'),
                meta: {
                    rule: 'editor',
                    authRequired: true,
                },
            },
            {
                path: '/categories/edit/:id',
                name: 'editCategorie',
                component: () => import('./layouts/Categories/EditCategorie.vue'),
                meta: {
                    rule: 'editor',
                    authRequired: true,
                },
            },
            {
                path: '/suppliers',
                name: 'suppliers',
                component: () => import('./layouts/Suppliers/Index.vue'),
                meta: {
                    rule: 'editor',
                    authRequired: true,
                },
            },
            {
                path: '/suppliers/add',
                name: 'addSupplier',
                component: () => import('./layouts/Suppliers/NewSupplier.vue'),
                meta: {
                    rule: 'editor',
                    authRequired: true,
                },
            },
            {
                path: '/suppliers/edit/:id',
                name: 'editSupplier',
                component: () => import('./layouts/Suppliers/EditSupplier.vue'),
                meta: {
                    rule: 'editor',
                    authRequired: true,
                },
            },
        ]
    }]
});

router.beforeEach((to, from, next) => {
    firebase.auth().onAuthStateChanged(() => {
        const firebaseCurrentUser = firebase.auth().currentUser
        
        if(to.path == '/' && (auth.isAuthenticated() || firebaseCurrentUser.email)){
            router.push({path:'/dashboard'});
        }

        if(to.meta.authRequired){
            if(!(auth.isAuthenticated() || firebaseCurrentUser)){
                router.push({path:'/', query: {to: to.path}})
                store.commit('UPDATE_ROLE', 'guest');
            }
        }


        return next()
    });
});

export default router