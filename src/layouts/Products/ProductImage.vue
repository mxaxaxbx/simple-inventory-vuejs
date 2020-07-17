<template>
<div>
    <div v-if="picture">
        <img class=" preview" :src="picture" width="200px">
        <button type="button" @click="delImage">Eliminar Imagen</button>
    </div>

    <div v-else>
        <p>Sube una imagen para tu producto</p>
        <input type="file" @change="previewImage" accept="image/*" />
    </div>

    <div v-if="imageData && !picture">
        <img src="" id="previewImage" width="200px" /> 
        <p v-if="uploadValue > 0 && uploadValue < 100">
            Cargando: {{parseInt(uploadValue)+"%"}}
            <progress id="progress" :value="uploadValue" max="100"></progress>
        </p>
        <button @click="onUpload">Guardar</button>
    </div>


</div>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
    name: 'product-image',
    props: ['product_id'],
    data(){
        return{
            imageData: null,
        }
    },

    async beforeMount(){
        const id = await this.product_id;
        this.$store.dispatch('get_product_image', id);
    },
    
    methods: {
        previewImage(event){
            this.$store.commit('SET_UPLOAD_VALUE', 0);
            this.$store.commit('SET_PICTURE', null);

            const fr = new FileReader;
            fr.readAsDataURL(event.target.files[0])
            fr.onload = function(data){
                document.getElementById('previewImage').src = data.target.result;
            }   

            this.imageData = event.target.files[0];
        },

        onUpload(){
            this.$store.commit('SET_PICTURE', null);

            const data = {
                imageData: this.imageData,
                product_id: this.product_id,
            }

            this.$store.dispatch('upload_product_image', data);

        },

        delImage(){
            if(confirm('¿Desea eliminar la imagen?')){
                this.$store.dispatch('delete_product_image', this.product_id);
            }
        }
    },

    computed: {
        ...mapGetters(['picture', 'uploadValue']),
    },

    watch: {
        product_id: function(){
            this.$store.dispatch('get_product_image', this.product_id);
        }
    }
}
</script>