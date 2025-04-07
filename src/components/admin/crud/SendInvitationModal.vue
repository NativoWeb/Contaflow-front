<template>
<button @click="toggleShowInvitationModal" class="btn-action">Reenviar Invitación</button>
    <!-- Modal para Editar -->
  <div v-if="showInvitationModal" 
    class="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50 p-4">
  <div class="p-6 relative w-full max-w-3xl bg-white rounded-lg shadow-lg dark:bg-gray-800">
    <!-- Encabezado -->
    <div class="p-6 md:p-5 text-center">
      <img src="@/assets/person.svg" alt="Icono de SVG convertido" class="mx-auto mb-4 w-20 h-20 dark:text-gray-200">
      <h3 class="text-xl font-semibold text-[#2A5CAA] m-4">Reenviar Invitación</h3>
      <p class=" text-lg font-normal text-[#000000]">¿Desea reenviar la invitación al usuario: <span class="font-semibold text-[#2A5CAA]"> {{ user.first_name }}?</span> </p>
    </div>
  
    <!-- Botones -->
    <div class="flex justify-center space-x-3 p-5 dark:border-gray-700">
      <button @click="toggleShowInvitationModal"
              class="px-5 py-2.5 text-[#193368] bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 
                    focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 
                    dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
        Cancelar
      </button>
      <button @click="sendInvitation"
              type="button" 
              class="py-3 px-5 ms-3 text-sm font-medium focus:outline-none bg-[#08245B] hover:bg-[#2a4b8d] text-white rounded-lg border">
        Confirmar
      </button>
    </div>
  </div>
  </div>

  <!-- Modal -->
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

  <!-- Edit Successfull! -->
  <div v-if="alertInvitationModal" 
   tabindex="-1" 
   class="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
    <div class="relative p-5 w-full max-w-md max-h-full">
      <div class="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
        <!-- Contenido del Modal -->
        <div class="p-6 md:p-5 text-center">
          <img src="@/assets/update.svg" alt="Icono de SVG convertido" class="mx-auto mb-4 w-20 h-20 dark:text-gray-200">
          <h3 class="mb-2 text-xl font-bold text-[#2A5CAA]">Se le reenvio la información al usuario</h3>

          <button @click="toggleAlertInvitation"
              type="button" 
              class="py-3 px-5 ms-3 text-sm font-medium focus:outline-none bg-[#08245B] hover:bg-[#2a4b8d] text-white rounded-lg border">
              Aceptar
          </button>
        </div>
      </div>
    </div>
  </div>

<!-- Modal de Error -->
<div v-if="err" 
  class="fixed top-0 left-0 right-0 z-50 w-full h-full flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto md:inset-0 transition-all duration-500 ease-in-out transform scale-0"
  :class="{'scale-100': err}">
  <div class="relative w-full max-w-lg bg-white p-6 transform transition-all duration-600 ease-in-out">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg dark:bg-gray-800">
          <!-- Modal header -->
          <div class="flex items-center justify-between p-4">
              <h3 class="text-2xl font-semibold text-red-600 dark:text-red-400">¡Error!</h3>
              <button @click="toggleError" 
                      class="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-3xl w-10 h-10 flex items-center justify-center rounded-full transition-colors duration-300">
                  &times;
              </button>
          </div>
          <!-- Modal body -->
          <div class="p-8 text-center space-y-4">
              <p class="text-lg text-gray-700 dark:text-gray-300">
                  <strong>{{ err }}</strong>
              </p>
          </div>
      </div>
  </div>
</div>
</template>

<script setup>
  import { ref } from 'vue'
  import UserService from '@/services/userService';

  const sendM = new UserService();
  const err = sendM.getError();
  const isLoading = sendM.getLoader();
  const showInvitationModal = sendM.getModal();
  const alertInvitationModal = ref("");

  const props = defineProps({
    user: Object,
    apiUrl: String
  })

  const toggleAlertInvitation = () => {
    isLoading.value = false;
    alertInvitationModal.value = !alertInvitationModal.value;
    if (alertInvitationModal.value == false){
      location.reload()
    }
  }

  const toggleShowInvitationModal = () => {
    showInvitationModal.value = !showInvitationModal.value;
  }

  const toggleError = () => {
    err.value = !err.value;
  }

  const sendInvitation = () => {
    sendM.sendEmail(props.apiUrl, props.user, toggleAlertInvitation, 'PATCH') 
  }

</script>