<template>
  <button @click="toggleShowDeleteModal"   class="btn-action">Eliminar</button>
  <div v-if="showDeleteModal" 
   tabindex="-1" 
   class="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
    <div class="relative p-5 w-full max-w-md max-h-full">
      <div class="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
        <!-- Contenido del Modal -->
        <div class="p-6 md:p-5 text-center">
          <img src="@/assets/Error.svg" alt="Icono de SVG convertido" class="mx-auto mb-4 w-20 h-20 dark:text-gray-200">
          <h3 class="mb-2 text-xl font-bold text-[#2A5CAA]">¿Estás seguro que quieres eliminar este registro?</h3>
          <h3 class="mb-5 text-lg font-normal text-[#000000]">Este registro se elimina definitivamente.</h3>
      
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
  <div v-if="isDeleteModal" 
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

</template>

<script setup>
  import { ref, defineProps } from 'vue';
  import Cookies from 'js-cookie';
import router from '@/router';

  const props = defineProps({
    id: String
  })

  const showDeleteModal = ref(false);
  const isDeleteModal = ref(false);

  const VUE_APP_URL = process.env.VUE_APP_URL;

  function toggleShowDeleteModal(){
    showDeleteModal.value = !showDeleteModal.value;
  }

  const confirmDelete = () => {
    fetch(`${VUE_APP_URL}/users/delete/${props.id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${Cookies.get('jwt')}`
      }
    })
    .then(res => res.json())
    .then(() => {
      isDeleteToggle()
    })
    .catch(err => {
      console.error(err)
    })

    showDeleteModal.value = false;
  }

  const isDeleteToggle = () => {
    isDeleteModal.value = !isDeleteModal.value;
    if (isDeleteModal.value == false){
      router.back();
    }
  }

</script>