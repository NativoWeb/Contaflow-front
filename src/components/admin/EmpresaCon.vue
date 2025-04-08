<template>
  <div class="p-6 flex flex-col w-full h-full">
    <div class="p-4  bg-gradient-to-r from-[#F8F8F8] to-[#E5EAFF] flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
      <h2 class="text-xl font-bold text-[#193368] p-2 text-center md:text-left">
        Lista de Conciliaciones
      </h2>

      <div class="w-full md:w-1/2">
        <label for="table-search" class="sr-only">Buscar</label>
      <div class="flex items-center bg-gray-50 border border-[#B4C3DF] rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-600">
        <svg class="w-5 h-5 text-gray-400 dark:text-gray-300 mx-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
        </svg>
        <input 
          type="text" 
          v-model="searchQuery"  
          id="table-search-users" 
          placeholder="Buscar..."
          class="w-full p-2 text-sm text-[#193368] bg-transparent focus:ring-blue-500 focus:border-blue-500 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
      </div>
      </div>
    </div>

    <!-- Tabla -->
    <div class="overflow-x-auto p-4 bg-white shadow-md rounded-lg">
      <table class="w-full text-sm text-left text-gray-800 dark:text-gray-400">
        <thead class="text-xs uppercase bg-gradient-to-r from-[#F8F8F8] to-[#E5EAFF] text-[#193368]">
          <tr>
            <th scope="col" class="px-6 py-3">NIT</th>
            <th scope="col" class="px-6 py-3  md:table-cell">Razón Social</th>
            <th scope="col" class="px-6 py-3  md:table-cell">Dirección</th>
            <th scope="col" class="px-6 py-3  md:table-cell">Sector Económico</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="empresa in filteredEmpresas" :key="empresa.nit" @click="seleccionarEmpresa(empresa)"
            class="cursor-pointer bg-white border-b hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-600">
            <td class="px-6 py-4">{{ empresa.nit }}</td>
            <td class="px-6 py-4  md:table-cell">{{ empresa.razonSocial }}</td>
            <td class="px-6 py-4  md:table-cell">{{ empresa.direccion }}</td>
            <td class="px-6 py-4  md:table-cell">{{ empresa.sectorEconomico }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

const searchQuery = ref(""); // Agregado para la búsqueda
const router = useRouter();
const empresas = ref([
  { nit: '123456789', razonSocial: 'Empresa A', direccion: 'Calle 123', sectorEconomico: 'Tecnología' },
  { nit: '987654321', razonSocial: 'Empresa B', direccion: 'Avenida 456', sectorEconomico: 'Finanzas' },
  { nit: '456789123', razonSocial: 'Empresa C', direccion: 'Carrera 789', sectorEconomico: 'Salud' }
]);

const seleccionarEmpresa = (empresa) => {
  router.push({
    name: 'ListaCon',
    query: {
      nit: empresa.nit,
      razonSocial: empresa.razonSocial,
      direccion: empresa.direccion,
      sectorEconomico: empresa.sectorEconomico
    }
  });
  
};

// Filtrar empresas
const filteredEmpresas = computed(() => {
  return empresas.value.filter(empresa =>
    empresa.nit.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    empresa.razonSocial.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    empresa.direccion.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    empresa.sectorEconomico.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

</script>
