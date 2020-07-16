<template>
<div>
    <h1>Modificar Proveedor</h1>
    <delete-popup :id="supplier_id" :item="'Proveedor'" :itemAction="'supplier'"/>
    <supplier-form :supplier="supplier" :action="'update'" />
</div>
</template>

<script>
import {mapGetters} from 'vuex';
import SupplierForm from './SupplierForm';
import DeletePopup from '@/layouts/popups/DeletePopup';

export default {
    data(){
        return {

        }
    },

    beforeMount(){
        this.$store.dispatch('get_supplier', this.$route.params.id)
        .then((res) => {
            if(!res){
                this.$router.push({name: 'suppliers', query:{invalid_id: true}});
                return null;
            }
            this.supplier.id = this.supplier_id;
        })
    },

    computed: {
        ...mapGetters(['supplier', 'supplier_id'])
    },

    components: {SupplierForm, DeletePopup},

    
}
</script>