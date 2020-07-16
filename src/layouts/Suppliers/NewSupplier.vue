<template>
<div>
    <h1>Agregar Proveedor</h1>
    <supplier-form :supplier="supplier" :action="'save'" />
</div>
</template>

<script>
import SupplierForm from './SupplierForm';

export default {
    data(){
        return {
            supplier: {}
        }
    },

    components: {SupplierForm}
}
</script>