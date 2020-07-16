<template>
<div>
    <form @submit.prevent="loadSupplier">
        <div>
            <label for="name">Nombre:</label>
            <input type="text" v-model="supplier.name" id="name" required />
        </div>

        <div>
            <label for="nit">NIT:</label>
            <input type="text" v-model="supplier.nit" id="nit" required />
        </div>

        <div>
            <label for="city">ciudad:</label>
            <input type="text" v-model="supplier.city" id="city" required />
        </div>

        <div>
            <label for="address">dirección:</label>
            <input type="text" v-model="supplier.address" id="address" required />
        </div>

        <div>
            <label for="phone">Teléfono:</label>
            <input type="text" v-model="supplier.phone" id="phone" required />
        </div>

        <div>
            <button type="submit">Guardar</button>
        </div>

    </form>
</div>
</template>

<script>
export default {
    name: 'product-form',
    props: ['supplier', 'action'],

    methods: {
        loadSupplier(){
            if(this.action == 'save'){
                this.$store.dispatch('add_supplier', this.supplier)
                .then((res) =>{
                    if(!res){return null;}

                    if(this.$route.query.from){
                        this.$router.push({name: this.$route.query.from})
                    }else{
                        this.$router.push({name: 'suppliers'})
                    }
                })
            }else if(this.action == 'update'){
                this.$store.dispatch('modify_supplier', this.supplier)
                .then((res) => {
                    if(!res){return null;}

                    if(this.$route.query.from){
                        this.$router.push({name: this.$route.query.from})
                    }else{
                        this.$router.push({name: 'suppliers'})
                    }
                });
            }
        }
    },
}
</script>