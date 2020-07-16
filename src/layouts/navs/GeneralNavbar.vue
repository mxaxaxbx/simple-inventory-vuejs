<template>
<div>
    <nav>
        <h1>Inventario</h1>
        <span v-if="email">{{email}}</span>
        <a href="#" v-if="email" @click="logout">Salir</a>
    </nav>
</div>
</template>

<script>
import auth from '@/auth/authService';

export default {
    name: 'general-navbar',
    props: ['email'],
    methods: {
        logout(){
            auth.logOut();
        }
    }
}
</script>