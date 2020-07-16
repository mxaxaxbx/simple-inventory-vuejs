<template>
<div>
    <button @click="deleteItem">Eliminar {{item}}</button>
</div>
</template>

<script>
export default {
    name: 'delete-popup',
    props: ['id', 'item', 'itemAction'],
    data(){
        return{
            
        }
    },

    methods: {
        deleteItem(){
            if(confirm(`¿Borrar ${this.item}?`)){
                this.$store.dispatch(`delete_${this.itemAction}`, this.id)
                .then((res) =>{
                    if(!res){return null;}

                    if(this.$route.query.from){
                        this.$router.push({name: this.$route.query.from})
                    }else{
                        this.$router.push({name: `${this.itemAction}s`})
                    }
                });
            }
        }
    }
}
</script>