<template>
  <button @click="toggleShowDeleteModal"   class="btn-action">Eliminar</button>
  <div v-if="showDeleteModal" 
   tabindex="-1" 
   class="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
    <div class="relative p-5 w-full max-w-md max-h-full">
      <div class="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
        <!-- Contenido del Modal -->
        <div class="p-6 md:p-5 text-center">
          <img src="@/assets/Error.svg" alt="Error" class="mx-auto mb-4 w-20 h-20 dark:text-gray-200">
          <h3 class="mb-2 text-xl font-bold text-[#2A5CAA]">¿Estás seguro que quieres eliminar este registro?</h3>
          <p class="mb-5 text-lg font-normal text-[#000000]">Este registro se elimina definitivamente.</p>
      
          <!-- Botones -->
          <button @click="toggleShowDeleteModal"
              class="px-5 py-2.5 text-[#193368] bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 
                     focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 
                     dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                Cancelar
          </button>
          <button @click="confirmDelete"
              type="button" 
              class="py-3 px-5 ms-3 text-sm font-medium focus:outline-none bg-[#08245B] hover:bg-[#2a4b8d] text-white rounded-lg border">
              Confirmar
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Borrado de manera exitosa -->
  <div v-if="alertDeleteModal" 
   tabindex="-1" 
   class="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
    <div class="relative p-5 w-full max-w-md max-h-full">
      <div class="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
        <!-- Contenido del Modal -->
        <div class="p-6 md:p-5 text-center">
          <img src="@/assets/Error.svg" alt="Icono de SVG convertido" class="mx-auto mb-4 w-20 h-20 dark:text-gray-200">
          <h3 class="mb-2 text-xl font-bold text-[#2A5CAA]">Usuario eliminado de manera correcta</h3>

          <button @click="isDeleteToggle"
              type="button" 
              class="py-3 px-5 ms-3 text-sm font-medium focus:outline-none bg-[#08245B] hover:bg-[#2a4b8d] text-white rounded-lg border">
              Aceptar
          </button>
        </div>
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

  <!-- Modal de Error -->
  <div v-if="errorModal" 
    class="fixed top-0 left-0 right-0 z-50 w-full h-full flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto md:inset-0 transition-all duration-500 ease-in-out transform scale-0"
    :class="{'scale-100': errorModal}">
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
                    <strong>{{ errorMessage }}</strong>
                </p>
            </div>
        </div>
    </div>
  </div>

</template>

<script setup>
  import { ref } from 'vue';
  import router from '@/router';
  import UserService from '@/services/userService';

  const props = defineProps({
    id: String
  })

  const deleteService = new UserService();
  const errorModal = deleteService.getError();
  const isLoading = deleteService.getLoader();
  const showDeleteModal = deleteService.getModal();
  const alertDeleteModal = ref("");
  const VUE_APP_URL = process.env.VUE_APP_URL;
  const uri = `/users/delete/${props.id}`
  const url = VUE_APP_URL + uri;

  const confirmDelete = () => {
    deleteService.deleteUser(url, isDeleteToggle)
  }


  const isDeleteToggle = () => {
    isLoading.value = false;
    alertDeleteModal.value = !alertDeleteModal.value;
    if (alertDeleteModal.value == false){
      router.back();
    }
  }

  const toggleError = () => {
    errorModal.value = false;
  }

  function toggleShowDeleteModal(){
    showDeleteModal.value = !showDeleteModal.value;
  }

</script>