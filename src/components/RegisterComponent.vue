<template>
    <div class="register-component">
        <div class="container">
            <div class="contaflow-container">
                <img class="logo" src="../../public/logo.svg" alt="">
            </div>
            <div class="form-container">
                <h2>Iniciar Sesión</h2>
                <form @submit.prevent="login" class="form">
                    <div class="form-group">
                        <label for="email">Usuario o Email</label>
                        <div class="input-container">
                            <input v-model="registerCompany.username" type="text" id="email">
                            <img class="icon" src="../assets/user.svg"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="password">Contraseña</label>
                        <div class="input-container">
                            <input v-model="registerCompany.password" type="password" id="password">
                            <img class="icon" src="../assets/lock.svg"/>
                        </div>
                    </div>
                    <p>¿Olvidó su contraseña?</p>
                    <button type="submit">Enviar</button>
                </form>
            </div>
        </div>
        
    </div>
</template>

<style>
</style>

<script setup>
import { reactive } from 'vue';
import router from '@/router';
import Cookies from 'js-cookie';

const registerCompany = reactive({
    username: "",
    password: "",
})

function login() {
    fetch('http://127.0.0.1:8000/api/token/', {
        method: 'POST',
        body: JSON.stringify(registerCompany),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Cookies.get('jwt')}`
        }
    })
    .then(res => {
        if (!res.ok) {
            if (res.status == 403){
                alert('Acceso denegado')
            }
            console.log(`Error HTTP:${res.status}`)
        }
        else {
            return res.json()
        }
    })
    .then((json) => {
        if (!json){
            return null
        }
        else{
            Cookies.set('jwt', json.access)
            if (json.is_temp_password){
                router.push('/password');
            }
            else {
                router.push('/usuarios');
            }
        }
    })
    .catch(err => {
        router.push('/')
        console.error(err)
    })
}
</script>