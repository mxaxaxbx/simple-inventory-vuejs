<template>
<div>
    <form @submit.prevent="loadProduct">
        <div>
            <label for="name">Nombre:</label>
            <input type="text" v-model="product.name" id="name" required />
        </div>

        <div>
            <label for="supplier">Proveedor:</label>
            <select v-model="product.supplier_id" id="supplier">
                <option disabled value="0">Seleccione un Proveedor</option>
                <option v-for="sup in suppliers" :key="sup.id" :value="sup.id">{{sup.data.name}}</option>
            </select>
            <a href="/suppliers/add?from=addProduct">+</a>
        </div>

        <div>
            <label for="categorie">Categoría:</label>
            <select v-model="product.categorie_id" id="categorie">
                <option disabled value="0">Seleccione una Categoria</option>
                <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{cat.data.name}}</option>
            </select>
            <a href="/categories/add?from=addProduct">+</a>
        </div>

        <div>
            <label for="quantity">Cantidad:</label>
            <input type="number" v-model="product.quantity" id="quantity" required />
        </div>

        <div>
            <label for="netPrice">Precio Neto:</label>
            <input type="number" v-model="product.netPrice" id="netPrice" :required="action == 'save' ? true : false" />
        </div>

        <div>
            <label>Precio Total x Unidad:</label>
            {{product.netPrice / product.quantity || product.netPriceUnit}}
        </div>

        <div>
            <label for="salePrice">Precio Venta x Unidad:</label>
            <input type="number" v-model="product.salePriceUnit" id="salePrice" required />
        </div>

        <div>
            <label for="barcode">Código de Barras:</label>
            <input type="number" v-model="product.barcode" id="barcode" required :disabled="action == 'update' ? true : false" />
        </div>

        <div>
            <button type="submit">Guardar</button>
        </div>
    </form>

</div>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
    name: 'product-form',
    props: ['product', 'action'],
    beforeMount(){
        this.$store.dispatch('get_suppliers');
        this.$store.dispatch('get_categories');
    },

    computed: {
        ...mapGetters(['categories', 'suppliers']),
    },

    methods: {
        loadProduct(){
            const product = this.validData();
            if(product==false){return null;}
            
            if(this.action == 'save'){
                this.$store.dispatch('add_product', product)
                .then((res) =>{
                    if(!res){return null;}

                    if(this.$route.query.from){
                        this.$router.push({name: this.$route.query.from})
                    }else{
                        this.$router.push({name: 'products'})
                    }
                });
            }else if(this.action == 'update'){
                this.$store.dispatch('modify_product', product).then((res) => {
                    if(!res){return null;}

                    if(this.$route.query.from){
                        this.$router.push({name: this.$route.query.from})
                    }else{
                        this.$router.push({name: 'products'})
                    }
                });
            }
        },

        validData(){
            const quantity = parseInt(this.product.quantity);

            const netPrice = parseFloat(this.product.netPrice) || quantity * parseFloat(this.product.netPriceUnit);
            const salePriceUnit = parseFloat(this.product.salePriceUnit);

            if(this.product.supplier_id == 0){alert('Seleccione un Proveedor'); return false;}
            if(this.product.categorie_id == 0){alert('Seleccione una Categoria'); return false;}
            if(quantity<1){alert('Ingrese una cantidad mayor a 0'); return false;}
            if(netPrice<1){alert('Ingrese un precio neto mayor a 0'); return false;}
            if(salePriceUnit<1){alert('Ingrese un precio de venta por unidad mayor a 0'); return false;}

            const netPriceUnit = (netPrice / quantity)

            if(salePriceUnit < netPriceUnit){alert('Ingrese un precio de venta por unidad mayor al precio neto por unidad'); return false;}

            const product = {
                name: this.product.name,
                supplier_id: this.product.supplier_id,
                categorie_id: this.product.categorie_id,
                quantity: quantity,
                salePriceUnit: salePriceUnit,
                netPriceUnit: netPriceUnit,
                barcode: this.product.barcode,
            }

            return product;
        },
        
    },
}
</script>