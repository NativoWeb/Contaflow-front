<template>
  <!-- Botón de eliminar -->
  <button @click="toggleDeleteModal"
    class="w-full transition duration-300 ease-in-out hover:drop-shadow-lg hover:scale-105 bg-red-500 text-white px-5 py-2.5 rounded-xl hover:bg-red-600">
    Eliminar
  </button>

  <!-- Modal de confirmación -->
  <div v-if="showDeleteModal" class="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
    <div class="relative p-5 w-full max-w-md max-h-full">
      <div class="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
        <div class="p-6 md:p-5 text-center">
          <img src="@/assets/Error.svg" alt="Error" class="mx-auto mb-4 w-20 h-20">
          <h3 class="mb-2 text-xl font-bold text-[#2A5CAA]">¿Estás seguro que quieres eliminar este registro?</h3>
          <p class="mb-5 text-lg font-normal text-[#000000]">Este registro se elimina definitivamente.</p>

          <button @click="toggleDeleteModal"
            class="px-5 py-2.5 text-[#193368] bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700">
            Cancelar
          </button>
          <button @click="confirmDelete"
            class="py-3 px-5 ms-3 text-sm font-medium bg-[#08245B] hover:bg-[#2a4b8d] text-white rounded-lg border">
            Confirmar
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal de éxito -->
  <div v-if="showSuccessModal" class="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
    <div class="relative p-5 w-full max-w-md max-h-full">
      <div class="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
        <div class="p-6 md:p-5 text-center">
          <img src="@/assets/Error.svg" alt="Éxito" class="mx-auto mb-4 w-20 h-20">
          <h3 class="mb-2 text-xl font-bold text-[#2A5CAA]">Empresa eliminada de manera correcta</h3>
          <button @click="handleSuccessModalClose"
            class="py-3 px-5 ms-3 text-sm font-medium bg-[#08245B] hover:bg-[#2a4b8d] text-white rounded-lg border">
            Aceptar
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal de carga -->
  <div v-if="isLoading" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
    <div class="p-6 bg-white dark:bg-gray-800 rounded-lg">
      <img src="@/assets/loader.svg" alt="Cargando..." />
    </div>
  </div>

  <!-- Modal de error -->
  <div v-if="showErrorModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
    <div class="relative w-full max-w-lg bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-2xl font-semibold text-red-600">¡Error!</h3>
        <button @click="toggleErrorModal" class="text-3xl text-gray-600 hover:text-red-500">&times;</button>
      </div>
      <p class="text-lg text-gray-700 dark:text-gray-300 text-center">
        <strong>{{ errorMessage }}</strong>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import router from '@/router';
import CompaniesService from '@/services/companiesService';

const props = defineProps({
  id: String
});

const showDeleteModal = ref(false);
const showSuccessModal = ref(false);
const showErrorModal = ref(false);
const errorMessage = ref('');
const isLoading = ref(false);

const VUE_APP_URL = process.env.VUE_APP_URL;
const url = `${VUE_APP_URL}/companies/delete/${props.id}/`;

const service = new CompaniesService();

const toggleDeleteModal = () => {
  showDeleteModal.value = !showDeleteModal.value;
};

const toggleErrorModal = () => {
  showErrorModal.value = false;
};

const confirmDelete = async () => {
  isLoading.value = true;
  try {
    await service.deleteCompany(url);
    showDeleteModal.value = false;
    showSuccessModal.value = true;
  } catch (error) {
    errorMessage.value = error.message || "Error al eliminar la empresa";
    showErrorModal.value = true;
  } finally {
    isLoading.value = false;
  }
};

const handleSuccessModalClose = () => {
  showSuccessModal.value = false;
  router.back();
};
</script>
