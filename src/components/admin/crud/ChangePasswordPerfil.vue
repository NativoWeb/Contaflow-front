<template>
    <button @click="toggleShowPasswordModal" 
      class="w-full md:w-[90%] bg-[#08245B] hover:bg-[#2a4b8d] text-white font-bold py-3 px-4 rounded-full shadow-md shadow-gray-500/50 focus:outline-none focus:shadow-outline">
      Cambiar contraseña
    </button>
  
    <!-- Modal de cambiar contraseña -->
    <div v-if="showPasswordModal" 
      class="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50 p-4">
      <div class="relative w-full max-w-2xl bg-white rounded-lg shadow-lg p-6">
        
        <h2 class="text-xl font-bold bg-gradient-to-r from-[#F8F8F8] to-[#E5EAFF] text-[#2A5CAA] p-3 rounded-t-lg">
          Cambiar contraseña
        </h2>
  
        <form @submit.prevent="btnChangePassword" class="w-full max-w-lg mx-auto p-6">
          <div class="grid grid-cols-1 gap-5 mb-5">
            <div>
              <label class="block uppercase tracking-wide text-[#193368] text-xs font-bold mb-2">
                Anterior Contraseña:
              </label>
              <div class="flex w-full">
                <input class="flex-1 bg-[#F5F5F5] text-gray-700 border border-gray-300 py-3 px-4 focus:outline-none focus:bg-white focus:border-gray-500 rounded-l-full"
                  v-model="password.old_password" :type="showOldPassword ? 'text' : 'password'" id="ancientPassword" autocomplete="on" placeholder="Ingrese su anterior contraseña">
                <button class="w-12 flex items-center justify-center bg-[#08245B] text-white rounded-r-full" type="button"
                  @click="toggleShowOldPassword">
                  <img v-if="showOldPassword" src="@/assets/eyes-open.svg" alt="Ocultar contraseña" />
                  <img v-else src="@/assets/eyes-close.svg" alt="Mostrar contraseña" />
                </button>
              </div>
            </div>
            <div>
              <label class="block uppercase tracking-wide text-[#193368] text-xs font-bold mb-2">
                Nueva Contraseña:
              </label>
              <div class="flex w-full">
                <input class="flex-1 bg-[#F5F5F5] text-gray-700 border border-gray-300 py-3 px-4 focus:outline-none focus:bg-white focus:border-gray-500 rounded-l-full"
                  v-model="password.new_password" :type="showNewPassword ? 'text' : 'password'" id="newPassword" autocomplete="on" placeholder="Ingrese su nueva contraseña">
                <button class="w-12 flex items-center justify-center bg-[#08245B] text-white rounded-r-full" type="button"
                  @click="toggleShowNewPassword">
                  <img v-if="showNewPassword" src="@/assets/eyes-open.svg" alt="Ocultar contraseña" />
                  <img v-else src="@/assets/eyes-close.svg" alt="Mostrar contraseña" />
                </button>
              </div>
            </div>
            <div>
              <label class="block uppercase tracking-wide text-[#193368] text-xs font-bold mb-2">
                Confirmar Contraseña:
              </label>
              <div class="flex w-full">
                <input class="flex-1 bg-[#F5F5F5] text-gray-700 border border-gray-300 py-3 px-4 focus:outline-none focus:bg-white focus:border-gray-500 rounded-l-full"
                  v-model="password.confirm_password" :type="showRepeatPassword ? 'text' : 'password'" id="confirmPassword" autocomplete="on" placeholder="Confirme su nueva contraseña">
                <button class="w-12 flex items-center justify-center bg-[#08245B] text-white rounded-r-full" type="button"
                  @click="toggleShowRepeatPassword">
                  <img v-if="showRepeatPassword" src="@/assets/eyes-open.svg" alt="Ocultar contraseña" />
                  <img v-else src="@/assets/eyes-close.svg" alt="Mostrar contraseña" />
                </button>
              </div>
            </div>
          </div>
  
          <div class="flex justify-center items-center w-full space-x-6">
            <button @click="toggleShowPasswordModal" type="button" class="w-48 bg-[#F0F0F0] hover:bg-[#DCF2F1] text-[#08245B] font-bold py-3 px-6 rounded-full shadow-lg shadow-gray-500/50 transition-transform duration-300 hover:scale-105 focus:outline-none">
              Cancelar
            </button>
            <button type="submit" 
            :disabled="hasNoChange"
            class="w-48 bg-[#08245B] hover:bg-[#2a4b8d] text-white font-bold py-3 px-6 rounded-full shadow-lg shadow-gray-500/50 transition-transform duration-300 hover:scale-105 focus:outline-none"
            :class="{
            'hover:bg-[#2a4b8d]': !hasNoChange,
            'text-gray-500 cursor-not-allowed': hasNoChange
            }">
              Confirmar
            </button>
          </div>
        </form>
      </div>
    </div>

    <div v-if="err" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div class="bg-white rounded-xl shadow-xl transform transition-all max-w-md w-full">
        <div class="p-6">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-2xl font-bold text-red-600">Error</h3>
            <button @click="closeModal" class="text-gray-500 hover:text-gray-700">
              &times;
            </button>
          </div>
          <div class="mb-6">
            <p class="text-gray-700">{{ err }}</p>
          </div>

        </div>
      </div>
    </div>

    <div v-if="success" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div class="bg-white rounded-xl shadow-xl transform transition-all max-w-md w-full">
        <div class="p-6">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-2xl font-bold text-green-600">Éxito</h3>
            <button  class="text-gray-500 hover:text-gray-700">
              &times;
            </button>
          </div>
          <div class="mb-6">
            <p class="text-gray-700">{{ success }}</p>
          </div>
        </div>
      </div>
    </div>

    <div v-if="isLoading" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white p-8 rounded-lg shadow-xl">
        <img src="@/assets/loader.svg" alt="Cargando...">
        <p class="mt-4 text-center">Cambiando contraseña...</p>
      </div>
    </div>

  </template>
  
  <script setup>
  import { reactive, ref } from 'vue';
  import AuthServices from '@/services/authService';


  
  // Instanciamos el servicio para manejar el cambio de contraseña
  const ChangePassword = new AuthServices();
  
  // Estado para el modal de contraseña
  const showPasswordModal = ref(false);
  const showOldPassword = ref(false);
  const showNewPassword = ref(false);
  const showRepeatPassword = ref(false);

  defineProps({
  user: {
    type: Object,
    required: true
  }
});


  const err = ref(false);
const success = ref(false);
const isLoading = ref(false);
  
  // Objeto reactivo para las contraseñas
  const password = reactive({
    old_password: "",
    new_password: "",
    confirm_password: ""
  });
  
  // Funciones para alternar la visibilidad de las contraseñas
  function toggleShowOldPassword() {
    showOldPassword.value = !showOldPassword.value;
  }
  
  function toggleShowNewPassword() {
    showNewPassword.value = !showNewPassword.value;
  }
  
  function toggleShowRepeatPassword() {
    showRepeatPassword.value = !showRepeatPassword.value;
  }
  
  // Función para abrir/cerrar el modal
  function toggleShowPasswordModal() {
    showPasswordModal.value = !showPasswordModal.value;
  }
  
  // Función para manejar el cambio de contraseña
    async function btnChangePassword() {
        if (password.new_password !== password.confirm_password) {
            err.value = "Las contraseñas no coinciden.";
            return;
        }

        // Limpiamos los estados de error y éxito antes de realizar la solicitud
        err.value = false;
        success.value = false;
        isLoading.value = true;

        try {
            // Hacemos la solicitud para cambiar la contraseña
            const successResult = await ChangePassword.ChangePasswordUser(password);

            if (successResult) {
                success.value = "Contraseña cambiada exitosamente."; // Actualizamos el mensaje de éxito
            } else {
                err.value = ChangePassword.errorMsg.value || "Error al cambiar la contraseña"; // Actualizamos el mensaje de error
            }
        } catch (error) {
            err.value = error.message || "Ocurrió un error inesperado";
        } finally {
            isLoading.value = false; // Desactivamos el loading
        }
    }


  function closeModal() {
  err.value = false;
}
  </script>
  