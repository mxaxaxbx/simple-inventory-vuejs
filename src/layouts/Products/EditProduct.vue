<template>
<div>
    <h1>Modificar Producto</h1>
    <delete-product :barcode="product.barcode" />
    <product-form :product="product" :action="'update'" />
    <product-image :barcode="product.barcode" />
</div>
</template>

<script>
import ProductForm from './ProductForm';
import ProductImage from './ProductImage';
import DeleteProduct from './DeleteProduct';

export default {
    data(){
        return {
            product: {
                barcode: 0,
                categorie_id: 0,
                supplier_id: 0
            }
        }
    },

    beforeMount(){
        this.$store.dispatch('get_product', this.$route.params.id)
        .then((res) => {
            if(!res){
                this.$router.push({name: 'products', query:{invalid_id: true}});
                return null;
            }

            this.product = res;
        })
    },

    components: {ProductForm, ProductImage, DeleteProduct},

    
}
</script>