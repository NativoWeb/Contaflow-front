<template>
  <div class="p-6 flex flex-col w-full h-full">
    <!-- Título separado con margen inferior -->
    <h2 class="text-xl font-bold bg-gradient-to-r from-[#F8F8F8] to-[#E5EAFF] text-[#2A5CAA] p-3 rounded-t-lg mb-4">
      Reporte de Conciliación Bancaria y Contable
    </h2>

    <!-- Contenedor de búsqueda y selección de empresa -->
    <div class="p-6 flex flex-col md:flex-row items-center justify-between  ">
      <!-- Título "Seleccionar Empresa" alineado a la izquierda -->
      <h2 class="text-lg font-semibold text-[#193368] dark:text-white md:mr-4">Seleccionar Empresa</h2>

      <label for="table-search" class="sr-only">Buscar</label>
      <div class="flex items-center bg-gray-50 border border-gray-300 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-600">
        <svg class="w-5 h-5 text-gray-400 dark:text-gray-300 mx-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
        </svg>
        <input type="text" id="table-search-users" class="block w-full py-2 pr-4 text-sm text-gray-900 bg-transparent focus:ring-blue-500 focus:border-blue-500 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Buscar...">
      </div>
    </div>

    <!-- Tabla -->
    <div class="overflow-x-auto p-3 bg-white">
      <table class="w-full text-sm text-left rtl:text-right text-[#193368] dark:text-gray-400 bg-gradient-to-r from-gray-100 to-[#E5EAFF]">
        <thead class="text-xs uppercase">
          <tr>
            <th scope="col" class="px-6 py-3">NIT</th>
            <th scope="col" class="px-6 py-3 hidden md:table-cell">Razón Social</th>
            <th scope="col" class="px-6 py-3 hidden md:table-cell">Dirección</th>
            <th scope="col" class="px-6 py-3 hidden md:table-cell">Sector económico</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="empresa in empresas" :key="empresa.nit" 
              @click="seleccionarEmpresa(empresa)" 
              class="cursor-pointer bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td class="px-6 py-4">{{ empresa.nit }}</td>
            <td class="px-6 py-4 hidden md:table-cell">{{ empresa.razonSocial }}</td>
            <td class="px-6 py-4 hidden md:table-cell">{{ empresa.direccion }}</td>
            <td class="px-6 py-4 hidden md:table-cell">{{ empresa.sectorEconomico }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// Lista de empresas simulada
const empresas = ref([
{ nit: '123456789', razonSocial: 'Empresa A', direccion: 'Calle 123', sectorEconomico: 'Tecnología' },
{ nit: '987654321', razonSocial: 'Empresa B', direccion: 'Avenida 456', sectorEconomico: 'Finanzas' },
{ nit: '456789123', razonSocial: 'Empresa C', direccion: 'Carrera 789', sectorEconomico: 'Salud' }
]);

// Función para redirigir a la vista ListaCon.vue con los datos de la empresa seleccionada
const seleccionarEmpresa = (empresa) => {
router.push({ name: 'ListaReporteContador', query: { nit: empresa.nit, razonSocial: empresa.razonSocial, direccion: empresa.direccion, sectorEconomico: empresa.sectorEconomico } });
};
</script>
