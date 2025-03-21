<template>
  <div class="p-6 flex flex-col w-full h-full">
    <!-- Título separado con margen inferior -->
    <h2 class="text-xl font-bold bg-gradient-to-r from-[#F8F8F8] to-[#E5EAFF] text-[#2A5CAA] p-3 rounded-t-lg mb-4">
    Empresas asignadas
    </h2>
    
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div class="p-4 flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-start pb-4"> <!-- Aquí cambiamos justify-between por justify-start -->
        <label for="table-search" class="sr-only">Search</label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
            <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
          </div>
          <input type="text" id="table-search" class="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Buscar">
        </div>
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

// Lista de empresas simulada
const empresas = ref([
{ nit: '123456789', razonSocial: 'Empresa A', direccion: 'Calle 123', sectorEconomico: 'Tecnología' },
{ nit: '987654321', razonSocial: 'Empresa B', direccion: 'Avenida 456', sectorEconomico: 'Finanzas' },
{ nit: '456789123', razonSocial: 'Empresa C', direccion: 'Carrera 789', sectorEconomico: 'Salud' }
]);

</script>
