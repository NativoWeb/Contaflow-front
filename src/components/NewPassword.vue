<template>
    <h2>Ingrese una nueva contraseña</h2>
    <div>
        <form @submit.prevent="changePassword">
            <label for="newPassword">Nueva Contraseña</label>
            <input v-model="password.old_password" id="newPassword" type="text">

            <label for="confirmPassword">Confirmar Contraseña</label>
            <input v-model="password.new_password" id="confirmPassword" type="text">
            
            <button type="submit">Enviar</button>
        </form>
    </div>
</template>

<script setup>
import Cookies from 'js-cookie';
import { reactive } from 'vue';
// import checkTempPassword from '@/hooks/tempPassword';

const password = reactive({
    old_password: "",
    new_password: ""
})


function changePassword(){
    let token = Cookies.get('jwt');

    fetch('http://127.0.0.1:8000/api/password/', {
        method: 'POST',
        body: JSON.stringify(password),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    .then(res => {
        return res.json()
    })
    .then(json => {
        console.log(json)
    })
    .catch(err => {
        console.error(err)
    })
}
</script>