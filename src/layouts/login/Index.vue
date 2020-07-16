<template>
<div>
    <form @submit.prevent="login">
        <div>
            <label>Email:</label>
            <input type="email" v-model="user.email" required/>
        </div>

        <div>
            <label>Password:</label>
            <input type="password" v-model="user.password" required/>
        </div>

        <div>
            <button type="submit">Ingresar</button>
        </div>

    </form>
</div>
</template>

<script>
export default {
    data(){
        return {
            user : {email:'', password: '', role:'editor'}
        }
    },

    methods: {
        login(){
            this.$store.dispatch('loginAttemp', this.user);
        }
    }

}
</script>