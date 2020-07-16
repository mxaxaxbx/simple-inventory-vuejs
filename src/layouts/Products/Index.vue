<template>
<div>
    <a href="/products/add">Agregar Producto</a>
    <ul>
        <li v-for="product in products" :key="product.id">
            <a :href="'products/edit/'+product.id">{{product.data.name}}</a>
        </li>
    </ul>
</div>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
    beforeMount(){
        this.$store.dispatch('get_products');
    },

    computed: {
        ...mapGetters(['products']),
    }
}
</script>