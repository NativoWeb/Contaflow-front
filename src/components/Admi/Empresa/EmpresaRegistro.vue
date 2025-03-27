<template>
  <div class="p-6 flex flex-col w-full h-full">
    <!-- Título -->
    <h2 class="text-xl font-bold bg-gradient-to-r from-[#F8F8F8] to-[#E5EAFF] text-[#193368] p-4 rounded-lg shadow-md text-center md:text-left">
      Registro de Empresas
    </h2>
    <form class="w-full p-6" @submit.prevent="validateForm">
      <!-- Primera fila -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label class="block uppercase tracking-wide text-[#193368] text-xs font-bold mb-2">
            NIT:
          </label>
          <input 
            v-model="companyForm.nit" 
            class="w-full bg-[#F5F5F5] text-gray-700 border border-gray-300 rounded-full py-3 px-4 focus:outline-none focus:bg-white focus:border-gray-500" 
            type="text" 
            placeholder="Ingrese su NIT"
            @input="validateField('nit')"
          >
          <p v-if="errors.nit" class="text-red-500 text-xs mt-1">{{ errors.nit }}</p>
        </div>
        <div>
          <label class="block uppercase tracking-wide text-[#193368] text-xs font-bold mb-2">
            Razón Social:
          </label>
          <input 
            v-model="companyForm.name" 
            class="w-full bg-[#F5F5F5] text-gray-700 border border-gray-300 rounded-full py-3 px-4 focus:outline-none focus:bg-white focus:border-gray-500" 
            type="text" 
            placeholder="Ingrese la Razón Social"
            @input="validateField('name')"
          >
          <p v-if="errors.name" class="text-red-500 text-xs mt-1">{{ errors.name }}</p>
        </div>
        <div>
          <label class="block uppercase tracking-wide text-[#193368] text-xs font-bold mb-2">
            Dirección:
          </label>
          <input 
            v-model="companyForm.address" 
            class="w-full bg-[#F5F5F5] text-gray-700 border border-gray-300 rounded-full py-3 px-4 focus:outline-none focus:bg-white focus:border-gray-500" 
            type="text" 
            placeholder="Ingrese la Dirección"
            @input="validateField('address')"
          >
          <p v-if="errors.address" class="text-red-500 text-xs mt-1">{{ errors.address }}</p>
        </div>
      </div>

      <!-- Segunda fila -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <label class="block uppercase tracking-wide text-[#193368] text-xs font-bold mb-2">
            Sector económico:
          </label>
          <div class="relative">
            <select 
              v-model="companyForm.sector" 
              class="w-full bg-[#F5F5F5] border border-gray-300 text-[#08245B] py-3 px-4 rounded-full focus:outline-none focus:bg-white focus:border-gray-500"
              @change="validateField('sector')"
            >
              <option value="">Seleccione un sector</option>
              <option value="Comercio y Ventas">Comercio y Ventas</option>
              <option value="Restaurantes y Gastronomía">Restaurantes y Gastronomía</option>
              <option value="Construcción e Infraestructura">Construcción e Infraestructura</option>
              <option value="Servicios Profesionales">Servicios Profesionales</option>
              <option value="Finanzas y Seguros">Finanzas y Seguros</option>
              <option value="Industria y Manufactura">Industria y Manufactura</option>
              <option value="Transporte y Logística">Transporte y Logística</option>
              <option value="Salud y Medicina">Salud y Medicina</option>
              <option value="Educación y Formación">Educación y Formación</option>
              <option value="Tecnología e Informática">Tecnología e Informática</option>
            </select>
            <p v-if="errors.sector" class="text-red-500 text-xs mt-1">{{ errors.sector }}</p>
          </div>
        </div>
        <div class="flex items-end">
          <button 
            type="submit" 
            class="w-full bg-[#08245B] hover:bg-[#2a4b8d] text-white font-bold py-3 px-4 rounded-full shadow-md shadow-gray-500/50 focus:outline-none focus:shadow-outline"
          >
            Añadir Empresa
          </button>
        </div>
      </div>
    </form>

    <!-- Modal -->
    <div v-if="modalVisible" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[100]">
      <div class="bg-white p-6 shadow-lg w-96 relative rounded-tl-3xl">
        <button @click="modalVisible = false" 
          class="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-3xl w-10 h-10 flex items-center justify-center">
          &times;
        </button>
        <p class="text-[#2A5CAA] font-bold mb-4 text-center">
          ¡Empresa agregada con éxito!
        </p>
        <p class="text-gray-800 font-medium mb-4 text-center">
          La empresa <span class="font-bold">{{ companyForm.name }}</span> ha sido agregada exitosamente a ContaFlow.
        </p>
      </div>
    </div>

    <!-- Contenedor de búsqueda y tabla -->
    <div class="p-4 flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
      <h2 class="text-lg font-semibold text-[#193368] dark:text-white">Lista de Contador</h2>
      <div class="w-full md:w-1/2">
        <label for="table-search" class="sr-only">Buscar</label>
        <div class="flex items-center bg-gray-50 border border-[#B4C3DF] rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-600">
          <svg class="w-5 h-5 text-gray-400 dark:text-gray-300 mx-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
          </svg>
          <input  type="text" 
          v-model="searchQuery"  
          id="table-search-users" 
          placeholder="Buscar..."
          class="w-full p-2 text-sm text-[#193368] bg-transparent focus:ring-blue-500 focus:border-blue-500 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        </div>
      </div>
    </div>
  
    <!-- Tabla -->
    <div class="overflow-x-auto p-3 bg-white shadow-md rounded-lg">
      <table class="w-full text-sm text-left text-gray-800 dark:text-gray-400">
        <thead class="text-xs uppercase bg-gradient-to-r from-[#F8F8F8] to-[#E5EAFF] text-[#193368]">
          <tr>
            <th scope="col" class="px-6 py-3">Nit</th>
            <th scope="col" class="px-6 py-3  md:table-cell">Razón Social</th>
            <th scope="col" class="px-6 py-3  md:table-cell">Sector económico</th>
            <th scope="col" class="px-6 py-3  md:table-cell">Dirección</th>
          </tr>
        </thead>
        <tbody>
          <tr  @click="seleccionarUsusario(empresa)"
            class="cursor-pointer bg-white border-b hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-600">
            <td class="px-6 py-4"></td>
            <td class="px-6 py-4"></td>
            <td class="px-6 py-4"></td>
            <td class="px-6 py-4"></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import Cookies from "js-cookie";
import { reactive, ref } from "vue";

const VUE_APP_URL = process.env.VUE_APP_URL;

// Estado del formulario y errores
const companyForm = reactive({
  nit: "",
  name: "",
  address: "",
  sector: ""
});

const errors = reactive({
  nit: "",
  name: "",
  address: "",
  sector: ""
});

const modalVisible = ref(false);

// Función de validación individual
function validateField(field) {
  if (field === "nit") {
    if (!/^[0-9]+(-[0-9]+)?$/.test(companyForm.nit)) {
      errors.nit = "El NIT solo debe contener números.";
    } else {
      errors.nit = "";
    }
  }

  if (field === "name") {
    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s-]+$/.test(companyForm.name)) {
      errors.name = "El nombre de la empresa solo debe contener letras.";
    } else {
      errors.name = "";
    }
  }

  if (field === "address") {
    if (!/^[A-Za-z0-9\s#.,-]+$/.test(companyForm.address)) {
      errors.address = "Ingrese una dirección válida.";
    } else {
      errors.address = "";
    }
  }

  if (field === "sector") {
    if (!companyForm.sector) {
      errors.sector = "Debe seleccionar un sector económico.";
    } else {
      errors.sector = "";
    }
  }
}

// Validar todo el formulario antes de enviarlo
function validateForm() {
  validateField("nit");
  validateField("name");
  validateField("address");
  validateField("sector");

  if (!errors.nit && !errors.name && !errors.address && !errors.sector) {
    addCompany();
  }
}

// Enviar datos si la validación es correcta
function addCompany() {
  fetch(`${VUE_APP_URL}/companies/`, {
    method: 'POST',
    body: JSON.stringify(companyForm),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${Cookies.get('jwt')}`
    }
  })
  .then(res => {
    if (!res.ok) {
      if (res.status === 401) alert("Acceso denegado");
      if (res.status === 400) alert("Los datos no pueden estar vacíos");
      if (res.status === 403) alert("Tu rol no permite registrar empresas");
      throw new Error(`Hubo un error de estado ${res.status}`);
    }
    return res.json();
  })
  .then(() => {
    modalVisible.value = true; // Muestra el modal
  })
  .catch(err => {
    console.error(err);
  });
}
</script>
