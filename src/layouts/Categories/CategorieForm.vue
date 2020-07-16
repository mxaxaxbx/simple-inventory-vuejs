<template>
<div>
    <form @submit.prevent="loadCategorie">
        <div>
            <label>Nombre:</label>
            <input type="text" v-model="categorie.name" required />
        </div>

        <div>
            <label>Descripción:</label>
            <textarea v-model="categorie.description" cols="30" rows="10"></textarea>
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
    props: ['categorie', 'action'],

    methods: {
        loadCategorie(){
            if(this.action == 'save'){
                this.$store.dispatch('add_categorie', this.categorie)
                .then((res) =>{
                    if(!res){return null;}

                    if(this.$route.query.from){
                        this.$router.push({name: this.$route.query.from})
                    }else{
                        this.$router.push({name: 'categories'})
                    }
                })
            }else if(this.action == 'update'){
                this.$store.dispatch('modify_categorie', this.categorie)
                .then((res) => {
                    if(!res){return null;}

                    if(this.$route.query.from){
                        this.$router.push({name: this.$route.query.from})
                    }else{
                        this.$router.push({name: 'categories'})
                    }
                });
            }
        }
    },
}
</script>