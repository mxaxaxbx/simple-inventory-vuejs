<template>
<div>
    <button @click="deleteProduct">Eliminar Producto</button>
</div>
</template>

<script>
export default {
    name: 'delete-popup',
    props: ['barcode'],
    data(){
        return{
            
        }
    },

    methods: {
        deleteProduct(){
            if(confirm('¿Desea eliminar este producto?')){
                this.$store.dispatch('delete_product', this.barcode)
                .then((res) =>{
                    if(!res){return null;}

                    if(this.$route.query.from){
                        this.$router.push({name: this.$route.query.from})
                    }else{
                        this.$router.push({name: 'products'})
                    }
                });
            }
        }
    }
}
</script>