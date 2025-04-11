<template>
  <div class="p-6 flex flex-col w-full h-full">
    <!-- Título -->
    <h2 class="text-xl font-bold bg-gradient-to-r from-[#F8F8F8] to-[#E5EAFF] text-[#193368] p-4 rounded-lg shadow-md text-center md:text-left">
      Conciliación Contable y Bancaria 2
    </h2>

    <!-- Contenedor de búsqueda y selección de empresa -->
    <div class="p-4 flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
      
      <!-- Botón primero en móviles -->
       <button @click="router.push('/ExtractoCon')" class="bg-[#08245B] text-white px-4 py-2 rounded-lg shadow-md border border-gray-300 hover:bg-[#FFFFFF] hover:text-[#08245B] hover:border-[#08245B] w-full sm:w-60">
        Iniciar Conciliación
      </button>

      <div class="w-full md:w-1/2">
        <label for="table-search" class="sr-only">Buscar</label>
        <div class="flex items-center bg-gray-50 border border-[#B4C3DF] rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-600">
          <svg class="w-5 h-5 text-gray-400 dark:text-gray-300 mx-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
          </svg>
          <input  type="text" 
          v-model="searchQuery" 
           id="table-search-conciliation" placeholder="Buscar..."
            class="w-full p-2 text-sm text-[#193368] bg-transparent focus:ring-blue-500 focus:border-blue-500 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        </div>
      </div>
    </div>
   <!-- Tabla -->
   <div class="overflow-x-auto p-4 bg-white shadow-md rounded-lg">
      <table class="w-full text-sm text-left text-gray-800 dark:text-gray-400">
        <thead class="text-xs uppercase bg-gradient-to-r from-[#F8F8F8] to-[#E5EAFF] text-[#193368]">
          <tr>
            <th scope="col" class="px-6 py-3">Empresa</th>
            <th scope="col" class="px-6 py-3  md:table-cell">Banco</th>
            <th scope="col" class="px-6 py-3  md:table-cell">Numero de Cuenta</th>
            <th scope="col" class="px-6 py-3  md:table-cell">Fecha de Colciliacion</th>
            <th scope="col" class="px-6 py-3  md:table-cell">Numero de reporte</th>
            <th scope="col" class="px-6 py-3  md:table-cell">Estado</th>
            <th scope="col" class="px-6 py-3  md:table-cell">Acción</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="empresa in filteredEmpresas" :key="empresa.nreporte" class="bg-white border-b hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-600">
            <td class="px-6 py-4">{{ empresa.empresa }}</td>
            <td class="px-6 py-4 md:table-cell">{{ empresa.banco }}</td>
            <td class="px-6 py-4 md:table-cell">{{ empresa.nCuenta }}</td>
            <td class="px-6 py-4 md:table-cell">{{ empresa.fecha }}</td>
            <td class="px-6 py-4 md:table-cell">{{ empresa.nreporte }}</td>
            <td class="px-6 py-4 md:table-cell">{{ empresa.estado }}</td>
            <td class="px-6 py-4 md:table-cell"><button @click="router.push('/ResultadoCon')">Ver</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
  
<script setup>
import { useRouter } from "vue-router";
import { ref, computed } from 'vue';

const router = useRouter();
const searchQuery = ref("");

const empresas = ref([
  { empresa: "Empresa A", banco: "Bancolombia", nCuenta: "1234567890", fecha: "21/03/2025", nreporte: "EMP001-202503-002", estado: "Finalizado" },
  { empresa: "Empresa B", banco: "Davivienda", nCuenta: "9876543210", fecha: "15/02/2025", nreporte: "EMP002-202502-001", estado: "Pendiente" }
]);

const filteredEmpresas = computed(() => {
  return empresas.value.filter(empresa =>
    empresa.empresa.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    empresa.banco.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    empresa.nCuenta.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    empresa.fecha.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    empresa.nreporte.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    empresa.estado.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});
</script>