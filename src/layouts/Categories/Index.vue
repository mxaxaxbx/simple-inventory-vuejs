<template>
<div>
    <a href="/categories/add">Agregar Categoría</a>
    <ul>
        <li v-for="cat in categories" :key="cat.id">
            <a :href="'categories/edit/'+cat.id">{{cat.data.name}}</a>
        </li>
    </ul>
</div>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
    beforeMount(){
        this.$store.dispatch('get_categories');
    },

    computed: {
        ...mapGetters(['categories']),
    }
}
</script>