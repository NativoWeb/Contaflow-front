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
  import Cookies from 'js-cookie';
  import {  reactive, ref, defineProps, computed } from 'vue';

  const showStatusModal = ref(false);
  const alertStatusModal =  ref(false);
  const VUE_APP_URL = process.env.VUE_APP_URL;

  const props = defineProps({
    id: String,
    status: String
  })

  const editStatus = reactive({
    status: "Activo"
  })

  const changeStatus = () => {
    fetch(`${VUE_APP_URL}/users/update/${props.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Cookies.get('jwt')}` 
      },
      body: JSON.stringify(editStatus)
    })
    .then(res => res.json())
    .then(res => {
      console.log(res)
      isStatusChangedToggle()
    })
    .catch(err => {
      console.error(err)
    })
    .finally(() => {
      showStatusModal.value = false;
    })
  }

  const toggleShowStatusModal = () => {
    showStatusModal.value = !showStatusModal.value;
  }

  const isStatusChangedToggle = () => {
    alertStatusModal.value = !alertStatusModal.value;
    if (alertStatusModal.value == false){
      location.reload()
    }
  }

  const hasNoChange = computed(() => {
    return editStatus.status === props.status
  })

</script>