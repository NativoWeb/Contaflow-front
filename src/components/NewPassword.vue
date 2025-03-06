<template>
    <h2>Ingrese una nueva contraseña</h2>
    <div>
        <form @submit.prevent="changePassword">
            <label for="newPassword">Nueva Contraseña</label>
            <input v-model="password.password" id="newPassword" type="text">

            <label for="confirmPassword">Confirmar Contraseña</label>
            <input v-model="password.repeatPassword" id="confirmPassword" type="text">
            
            <button type="submit">Enviar</button>
        </form>
    </div>
</template>

<script setup>
import Cookies from 'js-cookie';
import { reactive } from 'vue';

const password = reactive({
    password: "",
    repeatPassword: ""
})

function changePassword(){
    fetch('http://127.0.0.1:8000/api/password/', {
        method: 'POST',
        body: JSON.stringify(changePassword),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Cookies.get('jwt')}`
        },
        credentials: 'include' // Para manejar cookies
    })
    .then(res => {
        res.json()
    })
    .then(json => console.log(json))
}
</script>