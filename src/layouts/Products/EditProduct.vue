<template>
<div>
    <h1>Modificar Producto</h1>
    <delete-popup :id="product_id" :item="'Producto'" :itemAction="'product'"/>
    <product-form :product="product" :action="'update'" />
    <product-image :product_id="product_id" />
</div>
</template>

<script>
import ProductForm from './ProductForm';
import ProductImage from './ProductImage';
import DeletePopup from '@/layouts/popups/DeletePopup';

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

    components: {ProductForm, ProductImage, DeletePopup},

    computed: {
        product_id: function(){
            return this.$route.params.id;
        }
    }
}
</script>