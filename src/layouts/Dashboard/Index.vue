<template>
<div>
    <h1>Sistema SImple de Inventarios</h1>

    <div @click="$router.push({name: 'products'})">
        <h3>Productos</h3>
        <span>{{quantity_products}}</span>
    </div>

    <div @click="$router.push({name: 'categories'})">
        <h3>Categorias</h3>
        <span>{{quantity_cats}}</span>
    </div>

    <div @click="$router.push({name: 'suppliers'})">
        <h3>Proveedores</h3>
        <span>{{quantity_suppliers}}</span>
    </div>
</div>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
    data(){
        return {
            
        }
    },
    
    beforeMount(){
        this.$store.dispatch('getProductsQuantity');
        this.$store.dispatch('getCategoriesQuantity');
        this.$store.dispatch('getSuppliersQuantity');
    },

    computed: {
        ...mapGetters(['quantity_products', 'quantity_cats', 'quantity_suppliers']),
    }

}
</script>