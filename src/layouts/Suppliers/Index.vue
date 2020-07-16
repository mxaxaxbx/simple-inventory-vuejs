<template>
<div>
    <a href="/suppliers/add">Agregar Proveedor</a>
    <ul>
        <li v-for="supplier in suppliers" :key="supplier.id">
            <a :href="'suppliers/edit/'+supplier.id">{{supplier.data.name}}</a>
        </li>
    </ul>
</div>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
    beforeMount(){
        this.$store.dispatch('get_suppliers');
    },

    computed: {
        ...mapGetters(['suppliers']),
    }
}
</script>