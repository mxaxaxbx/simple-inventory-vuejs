<template>
<div>
    <h1>Modificar Categoria</h1>
    <delete-popup :id="categorie.id" :item="'Categoria'" :itemAction="'categorie'"/>
    <categorie-form :categorie="categorie" :action="'update'" />
</div>
</template>

<script>
import CategorieForm from './CategorieForm';
import DeletePopup from '@/layouts/popups/DeletePopup';

export default {
    data(){
        return {
            categorie: {

            }
        }
    },

    beforeMount(){
        this.$store.dispatch('get_categorie', this.$route.params.id)
        .then((res) => {
            if(!res){
                this.$router.push({name: 'categories', query:{invalid_id: true}});
                return null;
            }

            this.categorie = res;
        })
    },

    components: {CategorieForm, DeletePopup},

    
}
</script>