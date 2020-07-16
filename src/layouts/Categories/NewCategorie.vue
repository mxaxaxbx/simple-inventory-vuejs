<template>
<div>
    <h1>Agregar Categoría</h1>
    <categorie-form :categorie="categorie" :action="'save'" />
</div>
</template>

<script>
import CategorieForm from './CategorieForm';

export default {
    data(){
        return {
            categorie: {description: ' '}
        }
    },

    components: {CategorieForm}
}
</script>