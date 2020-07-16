import Vue from 'vue';
import Vuex from 'vuex';

import getters from './getters';
import mutations from  './mutations';
import state from './state';
import actions from './actions';

Vue.use(Vuex)

import moduleAuth from './auth/moduleAuth';
import moduleCategorie from './categorie/moduleCategorie';
import moduleSupplier from './supplier/moduleSupplier';
import moduleProduct from './product/moduleProduct';

export default new Vuex.Store({
    getters,
    mutations,
    state,
    actions,

    modules: {
        auth: moduleAuth,
        categorie: moduleCategorie,
        supplier: moduleSupplier,
        product: moduleProduct,
    },
    
    strict: process.env.NODE_ENV !== 'production'
})