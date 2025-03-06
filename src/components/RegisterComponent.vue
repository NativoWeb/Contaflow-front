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
.input-container {
    position: relative;
    display: flex;
    align-items: center;
}

.input-container input {
    width: 296px;
    height: 35px;
    border-radius: 30px;
    border: none;
    padding: 10px 40px 10px 20px; /* Añadimos padding a la derecha para el icono */
    background-color: #F5F5F5;
}

.icon {
    position: absolute;
    width: 20px;
    right: 15px; /* Posicionamos el icono al final del input */
    font-size: 18px;
    color: #19336899;
}

.form-container .logo {
    width: 80%; /* Ajusta el tamaño del logo */
    max-width: 300px; /* Limita el tamaño máximo */
}

.contaflow-container {
    background-color: #08245B;
    width: 60%; /* Ocupa la mitad del contenedor */
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 100px 0 0 100px; /* Bordes redondeados solo a la izquierda */
    border-radius: 90px 31% 31% 90px;
}

.form-container h2 {
    font-family: "Akshar", serif;
    font-size: 40px;
    font-weight: 400;
    color: #193368;
}

label {
    font-family: "Roboto", serif;
    font-weight: 400;
    font-size: 25px;
    margin-left: 20px;
    color: #193368;
}

.register-component {
    background: linear-gradient(rgba(234, 234, 235, 1) 0%, rgba(106, 140, 207, 1) 36%, rgba(25, 39, 65, 1) 100%);
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

.container {
    width: 80%;
    max-width: 1000px;
    min-width: 815px;
    height: 70vh;
    max-height: 850px;
    background-color: white;
    border-radius: 100px;
    display: flex;
    justify-content: space-between; /* Separa las dos mitades */
}

.form-container {
    width: 50%; /* Ocupa la otra mitad del contenedor */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 50px;
}

.form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 30px;
} 
.form-group {
    display: flex;
    flex-direction: column;
    gap: 5px;
}

p {
    text-align: center;
    margin-top: 7px;
    margin-bottom: 25px;
    font-family: "Roboto", serif;
    font-size: 18px;
    color: #19336899;
}

button[type="submit"] {
    background-color: #08245B;
    font-weight: 400;
    font-size: 21px;
    color: white;
    padding: 10px 20px;
    border-radius: 30px;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
}

button[type="submit"]:hover {
    background-color: #0a357a;
    box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.3);
    transform: scale(1.05);
}
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
                router.push('/usuario');
            }
            console.log(json)
        }
    })
    .catch(err => {
        console.error(err)
    })
}
</script>