<template>
    <div class="containerlogin">
      <div class="login-container">
        <div class="logo-section">
          <img src="@/assets/logo.svg" alt="Logo" class="c-logo" />
        </div>
        <div class="login-form">
          <h2>Iniciar Sesión</h2>
  
          <form @submit.prevent="login">
            <label for="usuario">Correo Electrónico</label>
            <div :class="['input-group', { 'error': errors.email }]">
              <input v-model="registerCompany.username" type="text" id="usuario" @input="validateEmail" />
            </div>
            <p v-if="errors.email" class="error-message">{{ errors.email }}</p>
  
            <label for="password">Contraseña</label>
          <div :class="['input-group', { 'error': errors.password }]">
            <input :type="showPassword ? 'text' : 'password'" v-model="registerCompany.password" id="password" @input="validatePassword" />
            <button type="button" @click="togglePasswordVisibility" class="toggle-password">
              <img :src="showPassword ? eyeOpenIcon : eyeClosedIcon" alt="Toggle Password" class="password-icon" />
            </button>
          </div>

            <p v-if="errors.password" class="error-message">{{ errors.password }}</p>
  
            <p><a href="#">¿Olvidó su contraseña?</a></p>
            <button class="btn-login" type="submit">Ingresar</button>
            <p v-if="errors.general" class="error-message">{{ errors.general }}</p>
          </form>
        </div>
      </div>
    </div>
  </template>
  <script setup>
  import { reactive, ref } from 'vue';
  import router from '@/router';
  import Cookies from 'js-cookie';

  const VUE_APP_URL = process.env.VUE_APP_URL;
  
  const registerCompany = reactive({
    username: "",
    password: "",
  });

  const errors = reactive({
    email: "",
    password: "",
    general: "",
  });
  const showPassword = ref(false);
  const eyeOpenIcon = ref(require('@/assets/VerPassword.svg')); // Ruta del icono de ojo abierto
  const eyeClosedIcon = ref(require('@/assets/OcultarPassword.svg')); // Ruta del icono de ojo cerrado

  function togglePasswordVisibility() {
    showPassword.value = !showPassword.value;
  }


  function validateEmail() {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!registerCompany.username) {
      errors.email = "El correo es obligatorio.";
    } else if (!emailPattern.test(registerCompany.username)) {
      errors.email = "Formato de correo incorrecto.";
    } else {
      errors.email = "";
    }
  }

  function validatePassword() {
    if (!registerCompany.password) {
      errors.password = "La contraseña es obligatoria.";
    } else if (registerCompany.password.length < 4 || registerCompany.password.length > 12) {
      errors.password = "La contraseña debe tener entre 4 y 12 caracteres.";
    } else {
      errors.password = "";
    }
  }

  function login() {
    validateEmail();
    validatePassword();

    if (errors.email || errors.password) {
      errors.general = "Todos los campos son obligatorios y deben ser correctos.";
      return;
    }

    fetch(`${VUE_APP_URL}/users/login/`, {
      method: 'POST',
      body: JSON.stringify(registerCompany),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Cookies.get('jwt')}`,
      },
      credentials: 'include',
    })
      .then(async (res) => {
        if (!res.ok) {
          const errorMsg = await res.json();
          if (res.status === 403) {
            errors.general = 'Acceso denegado';
          } else if (res.status === 401) {
            errors.general = "Contraseña o correo incorrecto";
          }
          throw new Error(`Error HTTP: ${res.status} - ${errorMsg.detail}`);
        }
        return res.json();
      })
      .then((json) => {
        if (!json) return;
        Cookies.set('jwt', json.access);
        router.push(json.is_temp_password ? '/password' : '/');
      })
      .catch((err) => {
        console.error(err);
        router.push('/login');
      });
  }
</script>

<style>
.toggle-password {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 3px;
}

.password-icon {
  width: 20px; /* Ajusta el tamaño según lo necesites */
  height: 20px;
}


  .error {
  border: 2px solid red;
}
.error-message {
  color: red;
  font-size: 14px;
  margin-top: 5px;
}

  .containerlogin {
    width: 100vw;
    height: 100vh;
    background: linear-gradient(#EAEAEB, #6A8CCF, #192741);
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
  }
  
  .login-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    background: white;
    border-radius: 70px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    max-width: 900px;
    width: 90%;
    height: 550px;
  }
  
  .logo-section {
    background: #001f3f;
    color: white;
    padding: 50px;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    border-radius: 70px;
    border-top-right-radius: 200px;
    border-bottom-right-radius: 200px;
  }
  
  .login-form {
    flex: 1;
    padding: 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  
  .login-form h2 {
    text-align: center;
    margin-bottom: 10px;
    color: #193368;
    font-weight: bold;
    font-size: 30px;
  }
  
  form {
    width: 100%;
  }
  
  label {
    display: block;
    text-align: left;
    margin: 10px 0 5px;
    color: #192741;
    font-size: 20px;
  }
  
  .input-group {
    display: flex;
    align-items: center;
    background: #f1f1f1;
    padding: 10px;
    border-radius: 20px;
    margin-bottom: 15px;
  }
  
  .input-group input {
    border: none;
    background: transparent;
    outline: none;
    flex: 1;
    font-size: 16px;
    padding-left: 10px;
    color: #001f3f;
    width: 100%;
  }
  
  .btn-login {
    background: #001f3f;
    color: white;
    border: none;
    padding: 12px;
    border-radius: 25px;
    cursor: pointer;
    width: 100%;
    font-size: 16px;
    margin-top: 10px;
  }
  
  p {
    text-align: center;
    margin-top: 10px;
    color: #193368;
  }
  
  p a {
    text-decoration: none;
    color: #193368;
    font-size: 16px;
  }
  
  /* Responsividad */
  @media (max-width: 768px) {
    .login-container {
      flex-direction: column;
      height: auto;
    }
  
    .logo-section {
      padding: 20px;
      border-radius: 30px 30px 0 0;
    }
  
    .login-form {
      padding: 30px;
    }
  }
  </style>
  
