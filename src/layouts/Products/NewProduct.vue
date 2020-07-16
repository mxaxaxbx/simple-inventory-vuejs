<template>
<div>
    <h1>Agregar Producto</h1>
    <product-form :product="product" :action="'save'" />
</div>
</template>

<script>
import ProductForm from './ProductForm';


export default {
    data(){
        return {
            product: {categorie_id: 0, supplier_id: 0, netPriceUnit: ''}
        }
    },

    components: {ProductForm},

    
}
</script>