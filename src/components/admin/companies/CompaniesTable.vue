<template>
  <!-- Contenedor de búsqueda y tabla -->
  <div class="p-4 flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
      <h2 class="text-lg font-semibold text-[#193368] dark:text-white">Lista de Clientes PYME</h2>
      <div class="w-full md:w-1/2">
        <label for="table-search" class="sr-only">Buscar</label>
        <div class="flex items-center bg-gray-50 border border-[#B4C3DF] rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-600">
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
        <tbody v-if="company.length > 0">
          <tr v-for="companies in company" :key="companies.nit"
            class="cursor-pointer bg-white border-b hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-600">
            <td class="px-6 py-4">{{ companies.nit }}</td>
            <td class="px-6 py-4">{{ companies.name }}</td>
            <td class="px-6 py-4">{{ companies.sector }}</td>
            <td class="px-6 py-4">{{ companies.address }}</td>
          </tr>
        </tbody>
        <tr v-else colspan="5" class="flex flex-col justify-center">
          <td class="ml-2 my-6">No existen {{ roles }} registrados</td>
        </tr>
        <tr v-if="errors" colspan="5" class="flex flex-col justify-center">
          <td class="ml-2 my-6">Ocurrio un error</td>
        </tr>
      </table>
    </div>
</template>

<script setup>
  import { ref } from 'vue'
  import Cookies from 'js-cookie';

  const VUE_APP_URL = process.env.VUE_APP_URL;
  const company = ref([]);

  fetch(`${VUE_APP_URL}/companies/`, {
    headers: {
      'Authorization': `Bearer ${Cookies.get('jwt')}`
    }
  })
  .then(res => res.json())
  .then(json => {
    company.value = json
  })
  .catch(err => company.value = err)

</script>