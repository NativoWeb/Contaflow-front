<template>
  <section class="w-full bg-white p-4">
    <div class="flex flex-col md:flex-row gap-6">
      <!-- Tabla -->
<<<<<<< HEAD
      <div class="overflow-x-auto flex-1 bg-white shadow-lg rounded-lg p-4">
        <div class="flex items-center justify-between mb-4">
          <label for="table-search" class="sr-only">Buscar</label>
          <div class="flex items-center bg-gray-50 border border-gray-300 rounded-lg shadow-md p-2 w-full md:w-auto">
            <svg class="w-5 h-5 text-gray-400 mx-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
            <input 
              type="text" 
              id="table-search-users" 
              v-model="searchQuery"
              class="w-full p-2 text-sm text-gray-900 bg-transparent focus:outline-none"
              placeholder="Buscar..."
            >
          </div>
        </div>
        
        <div class="overflow-x-auto">
          <table class="w-full text-sm text-left text-gray-700 bg-white rounded-lg">
            <thead class="text-xs bg-gradient-to-r from-gray-100 to-[#E5EAFF] uppercase">
=======
      <div class=" overflow-x-auto flex-1">
        <div class="p-6 flex flex-col md:flex-row items-center justify-between dark:bg-gray-900 shadow-lg space-y-4 md:space-y-0">
    <label for="table-search" class="sr-only">Buscar</label>
    <div class="flex items-center bg-gray-50 border border-gray-300 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-600">
      <svg class="w-5 h-5 text-gray-400 dark:text-gray-300 mx-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
      </svg>
      <input type="text" id="table-search-users" class="block w-full py-2 pr-4 text-sm text-gray-900 bg-transparent focus:ring-blue-500 focus:border-blue-500 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Buscar...">
    </div>
  </div>

        <div class="overflow-x-auto ">
          <table class=" w-full text-sm text-left rtl:text-right text-[#193368] dark:text-gray-400 bg-gradient-to-r from-gray-100 to-[#E5EAFF]">
            <thead class="text-xs uppercase">
>>>>>>> e498c2c79b95c241cc489afb340726a53cd4d44b
              <tr>
                <th scope="col" class="p-4">
                  <input type="checkbox" class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500">
                </th>
                <th scope="col" class="px-6 py-3">NIT</th>
                <th scope="col" class="px-6 py-3 hidden md:table-cell">Razón Social</th>
                <th scope="col" class="px-6 py-3 hidden md:table-cell">Dirección</th>
                <th scope="col" class="px-6 py-3 hidden md:table-cell">Sector económico</th>
              </tr>
            </thead>
            <tbody>
              <!-- <tr v-for="company in  companies" :key="company" class="border-b hover:bg-gray-100"> -->
              <tr v-for="company in  filteredCompanies" :key="company.id" class="border-b hover:bg-gray-100">
                <td class="p-4">
                  <input type="checkbox" class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500">
                </td>
                <td class="px-6 py-4 hidden md:table-cell">{{ company.nit }}</td>
                <td class="px-6 py-4 hidden md:table-cell">{{ company.name }}</td>
                <td class="px-6 py-4 hidden md:table-cell">{{ company.address }}</td>
                <td class="px-6 py-4 hidden md:table-cell">{{ company.sector }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <!-- Botones -->
      <aside class="flex flex-col gap-4 w-full md:w-auto p-4">
        <button @click="router.push('/EditarEmpresa')" class="btn-action">
          <img src="@/assets/edit.svg" alt="Editar" class="mr-2"> Editar
        </button>
        <button class="btn-action">
          <img src="@/assets/slash.svg" alt="Inactivar" class="mr-2"> Inactivar
        </button>
        <button class="btn-action">
          <img src="@/assets/x.svg" alt="Eliminar" class="mr-2"> Eliminar
        </button>
      </aside>
    </div>
  </section>
</template>

  <script setup>

  
import { useRouter } from "vue-router"; // Importar useRouter


import { ref, computed } from 'vue';

const router = useRouter(); // Instancia de router
  const companies = ref([])
  const searchQuery = ref("");

  fetch('http://127.0.0.1:8000/companies/')
  .then(res => res.json())
  .then(json => {
    companies.value = json;
  })
  .catch(err => console.error(err))

  // Computed para filtrar usuarios en tiempo real
const filteredCompanies = computed(() => {
  return companies.value.filter(company => 
  company.nit.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
  company.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
  company.address.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
  company.sector.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});
  </script>
  
