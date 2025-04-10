<template>
  <!-- Botón de abrir modal -->
  <button 
    @click="toggleShowEditModal"  
    class="w-full transition duration-300 ease-in-out hover:drop-shadow-lg hover:scale-105 bg-[#2A5CAA] text-white px-5 py-2.5 rounded-xl hover:bg-blue-700 font-medium"
  >
    Editar
  </button>

  <!-- Contenedor del modal -->
  <div v-if="showEditModal" class="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50 p-4">
    <div class="p-10 relative w-full max-w-3xl bg-white rounded-lg shadow-lg dark:bg-gray-800">
      <!-- Encabezado -->
      <div>
        <h3 class="text-2xl font-semibold text-center text-[#2A5CAA] block font-semibold ">Editar informacion de empresa</h3>
      </div>

      <!-- Formulario -->
      <div class="p-6">
        <form @submit.prevent="updateCompany" class="space-y-5">
          <!-- Campo: Razón Social -->
          <div>
            <label class="text-[#193368] mb-1 text-lg font-semibold">Razón Social</label>
            <input v-model="editCompany.name" @input="validateName" type="text" 
              class="w-full px-4 py-2 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <p v-if="errors.name" class="text-red-500 text-xs mt-1">{{ errors.name }}</p>
          </div>

          <!-- Campo: NIT -->
          <div>
            <label class="text-[#193368] mb-1 text-lg font-semibold">NIT</label>
            <input v-model="editCompany.nit" type="text" @input="validateNit"
              class="w-full px-4 py-2 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <p v-if="errors.nit" class="text-red-500 text-xs mt-1">{{ errors.nit }}</p>
          </div>

          <!-- Campo: Dirección -->
          <div>
            <label class="text-[#193368] mb-1 text-lg font-semibold">Dirección</label>
            <input v-model="editCompany.address" @input="validateAddress" type="text"
              class="w-full px-4 py-2 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <p v-if="errors.address" class="text-red-500 text-xs mt-1">{{ errors.address }}</p>
          </div>

          <!-- Campo: Sector Económico (select) -->
          <div>
            <label class="text-[#193368] mb-1 text-lg font-semibold">Sector Económico</label>
            <select v-model="editCompany.sector"
              class="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Seleccione un sector</option>
              <option value="Comercio y Ventas">Comercio y Ventas</option>
              <option value="Restaurantes y Gastronomia">Restaurantes y Gastronomía</option>
              <option value="Construccion e Infraestructura">Construcción e Infraestructura</option>
              <option value="Servicios Profesionales">Servicios Profesionales</option>
              <option value="Finanzas y Seguros">Finanzas y Seguros</option>
              <option value="Industria y Manufactura">Industria y Manufactura</option>
              <option value="Transporte y Logistica">Transporte y Logística</option>
              <option value="Salud y Medicina">Salud y Medicina</option>
              <option value="Educacion y Formacion">Educación y Formación</option>
              <option value="Tecnologia e Informatica">Tecnología e Informática</option>
            </select>
          </div>

          <!-- Botones -->
          <div class="flex justify-center space-x-3 dark:border-gray-700">
            <button @click="toggleShowEditModal"
              class="px-5 py-2.5 text-[#193368] bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 
                focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 
                dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
              Cancelar
            </button>
            <button type="submit" :disabled="hasNoChange" 
              class="py-3 px-5 ms-3 text-sm font-medium focus:outline-none bg-[#08245B] hover:bg-[#2a4b8d] text-white rounded-lg border"
              :class="{'hover:bg-[#2a4b8d]': !hasNoChange, 'text-gray-500 cursor-not-allowed': hasNoChange}">
              <span class="text-white">Confirmar</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>

  <!-- Modal de Cargando -->
  <div v-if="isLoading" class="fixed top-0 left-0 right-0 z-50 w-full h-full flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto">
    <div class="relative w-full max-w-lg p-6">
      <div class="relative dark:bg-gray-800">
        <div class="p-8 text-center space-y-4">
          <img src="@/assets/loader.svg" alt="Cargando...">
        </div>
      </div>
    </div>
  </div>

  <!-- Modal de Éxito -->
  <div v-if="alertEditedModal" tabindex="-1" class="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
    <div class="relative p-5 w-full max-w-md max-h-full">
      <div class="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
        <div class="p-6 md:p-5 text-center">
          <img src="@/assets/update.svg" alt="Icono de Éxito" class="mx-auto mb-4 w-20 h-20 dark:text-gray-200">
          <h3 class="mb-2 text-xl font-bold text-[#2A5CAA]">La información del usuario se actualizó correctamente</h3>
          <button @click="isEditedToggle" class="py-3 px-5 ms-3 text-sm font-medium focus:outline-none bg-[#08245B] hover:bg-[#2a4b8d] text-white rounded-lg border">
            Aceptar
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal de Error -->
  <div v-if="err" class="fixed top-0 left-0 right-0 z-50 w-full h-full flex items-center justify-center p-4">
    <div class="relative w-full max-w-lg bg-white p-6">
      <div class="relative bg-white rounded-lg dark:bg-gray-800">
        <div class="flex items-center justify-between p-4">
          <h3 class="text-2xl font-semibold text-red-600 dark:text-red-400">¡Error!</h3>
          <button @click="toggleError" class="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-3xl w-10 h-10 flex items-center justify-center rounded-full">
            &times;
          </button>
        </div>
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
import { computed, reactive, ref } from 'vue';
import CompaniesService from '@/services/companiesService';

const props = defineProps({
  infor: Object
});

const showEditModal = ref(false);
const companyService = new CompaniesService();
const isLoading = ref(false);
const err = ref(false);
const alertEditedModal = ref(false);
const VUE_APP_URL = process.env.VUE_APP_URL;
const uri = `/companies/update/${props.infor.id}/`;
const url = VUE_APP_URL + uri;

const nitRegex = /^\d{7,8}-\d{1}$/;
const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
const addressRegex = /^[a-zA-Z0-9\s,.-]+$/;

const editCompany = reactive({
  name: props.infor.name,
  nit: props.infor.nit,
  address: props.infor.address,
  sector: props.infor.sector
});

const errors = reactive({
  nit: "",
  name: "",
  address: ""
});

const validateNit = () => {
  if (!editCompany.nit.trim()) errors.nit = "El NIT es obligatorio";
  else if (!nitRegex.test(editCompany.nit)) errors.nit = "El NIT no es válido";
  else errors.nit = "";
};

const validateName = () => {
  if (!editCompany.name.trim()) errors.name = "La razón social es obligatoria";
  else if (!nameRegex.test(editCompany.name)) errors.name = "La razón social no es válida";
  else errors.name = "";
};

const validateAddress = () => {
  if (!editCompany.address.trim()) errors.address = "La dirección es obligatoria";
  else if (!addressRegex.test(editCompany.address)) errors.address = "La dirección no es válida";
  else errors.address = "";
};

const isEditedToggle = () => {
  isLoading.value = false;
  alertEditedModal.value = !alertEditedModal.value;
  if (!alertEditedModal.value) {
    location.reload();
  }
};

const toggleShowEditModal = () => {
  showEditModal.value = !showEditModal.value;
};

const hasNoChange = computed(() => {
  return editCompany.name === props.infor.name &&
    editCompany.nit === props.infor.nit &&
    editCompany.address === props.infor.address &&
    editCompany.sector === props.infor.sector &&
    Object.values(errors).every(error => error === "");
});

const toggleError = () => {
  err.value = false;
};

const updateCompany = async () => {
  isLoading.value = true;

  // Validar los campos antes de enviar
  validateName();
  validateNit();
  validateAddress();

  if (Object.values(errors).some(error => error !== "")) {
    isLoading.value = false;
    return;
  }

  try {
    await companyService.editCompany(url, editCompany); // Envía los datos
    alertEditedModal.value = true;
  } catch (error) {
    err.value = error.message || "Hubo un error, intente nuevamente.";
  } finally {
    isLoading.value = false;
  }
};
</script>
