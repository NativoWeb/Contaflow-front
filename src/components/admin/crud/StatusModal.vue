<template>
  <button @click="toggleShowStatusModal"   class="btn-action">Activar / Inactivar</button>
  <div v-if="showStatusModal" 
   tabindex="-1" 
   class="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
    <div class="relative p-5 w-full max-w-md max-h-full">
      <div class="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
        <!-- Contenido del Modal -->
        <div class="p-6 md:p-5 text-center">
          <h3 class="mb-4 text-xl font-bold text-[#2A5CAA]">Activar / Inactivar el usuario</h3>

          <div class="flex items-center gap-6 justify-center">
            <div class="flex items-center gap-2">
              <input v-model="editStatus.status" checked id="active" type="radio" value="Activo" name="bordered-radio"
                class="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
              <label for="active" class="text-sm font-medium text-gray-900 dark:text-gray-300">
                Activar
              </label>
            </div>

            <div class="flex items-center gap-2">
              <input v-model="editStatus.status" id="inactive" type="radio" value="Inactivo" name="bordered-radio"
                class="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
              <label for="inactive" class="text-sm font-medium text-gray-900 dark:text-gray-300">
                Inactivar
              </label>
            </div>
          </div>

          <!-- Botones -->
          <div class="mt-5">
            <button @click="toggleShowStatusModal"
              class="px-5 py-2.5 text-[#193368] bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 
                    focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 
                    dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
              Cancelar
            </button>
            <button @click="changeStatus"
                :disabled="hasNoChange"
                type="button" 
                class="py-3 px-5 ms-4 text-sm font-medium focus:outline-none bg-[#08245B] text-white rounded-lg border"
                :class="{
                'bg-[#08245B] hover:bg-[#2a4b8d] text-white': !hasNoChange,
                'bg-gray-300 text-gray-500 cursor-not-allowed': hasNoChange
                }">
                Confirmar
            </button>
          </div>
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

  <!-- Status Changed Succesfull! -->
  <div v-if="alertStatusModal" 
   tabindex="-1" 
   class="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
    <div class="relative p-5 w-full max-w-md max-h-full">
      <div class="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
        <!-- Contenido del Modal -->
        <div class="p-6 md:p-5 text-center">
          <img src="@/assets/check.svg" alt="Icono de SVG convertido" class="mx-auto mb-4 w-20 h-20 dark:text-gray-200">
          <h3 class="mb-2 text-xl font-bold text-[#2A5CAA]">El estado del usuario se ha actualizado correctamente</h3>

          <button @click="isStatusChangedToggle"
              type="button" 
              class="py-3 px-5 ms-3 text-sm font-medium focus:outline-none bg-[#08245B] hover:bg-[#2a4b8d] text-white rounded-lg border">
              Confirmar
          </button>
        </div>
      </div>
    </div>
  </div>

</template>

<script setup>
  import {  reactive, computed, ref } from 'vue';
  import UserService from '@/services/userService';

  const props = defineProps({
    id: String,
    status: String
  })
  
  const statusService = new UserService();
  const showStatusModal = statusService.getModal();
  const alertStatusModal = ref("");
  const isLoading = statusService.getLoader();
  const err = statusService.getError();
  const VUE_APP_URL = process.env.VUE_APP_URL;
  const uri = `/users/update/${props.id}` 
  const url = VUE_APP_URL + uri;

  const editStatus = reactive({
    status: "Activo"
  })

  const toggleShowStatusModal = () => {
    showStatusModal.value = !showStatusModal.value;
  }

  const isStatusChangedToggle = () => {
    isLoading.value = false;
    alertStatusModal.value = !alertStatusModal.value;
    if (alertStatusModal.value == false){
      location.reload()
    }
  }

  const hasNoChange = computed(() => {
    return editStatus.status === props.status
  })

  const changeStatus = () => {
    statusService.editUser(url, editStatus, isStatusChangedToggle)
  }

  const toggleError = () => {
    err.value = false;
  }

</script>