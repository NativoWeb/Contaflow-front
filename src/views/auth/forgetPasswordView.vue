<template>
  <div class="m-auto mt-[100px] bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
    <div class="text-center mb-6">
      <h2 class="text-2xl font-bold text-gray-800">¿Olvidaste tu contraseña?</h2>
      <p class="text-sm text-gray-500 mt-2">
        Ingresa tu nombre de usuario y te enviaremos las instrucciones para restablecer tu contraseña.
      </p>
    </div>

    <form @submit.prevent="sendEmail" class="space-y-5">
      <div>
        <label for="username" class="block text-sm font-medium text-gray-700">Nombre de usuario</label>
        <div :class="['input-group', { 'error': errors.email }]">
          <input  
          v-model="authUser.username"
          @input="validateEmail"
          type="text"
          id="username"
          name="username"
          required
          class="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Tu nombre de usuario"
          />
        </div>
        <p v-if="errors.email" class="error-message">{{ errors.email }}</p>
      </div>

      <button
        type="submit"
        class="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition-all"
      >
        Enviar
      </button>
    </form>

    <div class="text-center mt-6">
      <router-link to="/login" class="text-sm text-blue-600 hover:underline"> Volver al inicio de sesión </router-link>
    </div>
  </div>

  <div v-if="isLoading" 
    class="fixed top-0 left-0 right-0 z-50 w-full h-full flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto md:inset-0 transition-all duration-500 ease-in-out transform scale-0"
    :class="{'scale-100': isLoading}">
    <div class="relative w-full max-w-lg  p-6 transform transition-all duration-600 ease-in-out">
        <!-- Modal content -->
        <div class="relative dark:bg-gray-800">
            <!-- Modal body -->
            <div class="p-8 text-center space-y-4">
                <img src="@/assets/loader.svg" alt="">
            </div>
        </div>
    </div>
  </div>

  <div v-if="err" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
    <div class="bg-white rounded-xl shadow-xl transform transition-all max-w-md w-full">
      <div class="p-6">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-2xl font-bold text-red-600">Error</h3>
          <div class="flex items-center justify-between p-4">
            <h3 class="text-2xl font-semibold text-red-600 dark:text-red-400">¡Error!</h3>
            <button @click="closeModal" 
                    class="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-3xl w-10 h-10 flex items-center justify-center rounded-full transition-colors duration-300">
                &times;
            </button>
          </div>
        </div>
        <div class="mb-6">
          <p class="text-gray-700">{{ errInfo }}</p>
        </div>
      </div>
    </div>
  </div>

  <div v-if="success" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
    <div class="bg-white rounded-xl shadow-xl transform transition-all max-w-md w-full">
      <div class="p-6">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-2xl font-bold text-green-600">Éxito</h3>
          <button @click="closeSuccessModal" class="text-gray-500 hover:text-gray-700">
            &times;
          </button>
        </div>
        <div class="mb-6">
          <p class="text-gray-700">{{ successInfo }}</p>
        </div>
        <div class="flex justify-end">
          <button @click="closeSuccessModal" class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            Aceptar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { reactive, ref } from 'vue';
  import router from '@/router';
  import AuthServices from '@/services/authService';

  const changePDService = new AuthServices();
  const err = ref(false);
  const errInfo = ref("");
  const isLoading = ref(false);
  const success = ref("");
  const successInfo = ref("");

  const authUser = reactive({
    username: ""
  })

  const errors = reactive({
    email: ""
  })

  
  function validateEmail() {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!authUser.username) {
      errors.email = "El correo es obligatorio.";
    } else if (!emailPattern.test(authUser.username)) {
      errors.email = "Formato de correo incorrecto.";
    } else {
      errors.email = "";
    }
  }

  async function sendEmail() {
  validateEmail();

  if (errors.email) {
    return;
  }

  isLoading.value = true;
  success.value = "";
  err.value = false;
  errInfo.value = "";

  try {
    const responseOK = await changePDService.recievedPasswordEmail(authUser);
    if (!responseOK) {
      err.value = true;
      errInfo.value = 'Error al enviar el correo de recuperación';
    } else {
      success.value = true;
      successInfo.value = 'Correo de recuperación enviado con éxito';
    }
  } catch (error) {
    err.value = true;
    errInfo.value = error.message || 'Ocurrió un error inesperado';
  } finally {
    isLoading.value = false;
  }
}

  function closeModal() {
    err.value = false;
  }

  function closeSuccessModal() {
    success.value = false;
    router.push('login');
  }
</script>