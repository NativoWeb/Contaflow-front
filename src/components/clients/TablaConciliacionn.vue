<template>
  <div v-if="isLoading" class="text-center text-gray-500">
    Cargando...
  </div>

  <!-- Error -->
  <div v-else-if="err" class="text-center text-red-500">
    Error: {{ err }}
  </div>

  <div v-if="data" class="p-6 flex flex-col w-full h-full">
    <!-- Contenedor de búsqueda y selección de empresa -->
    <div class="p-4 bg-gradient-to-r from-[#F8F8F8] to-[#E5EAFF] flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
      <h2 class="text-xl font-bold text-[#193368] p-2 text-center md:text-left">
        Lista de mis conciliaciones
      </h2>

      <div class="w-full md:w-1/2">
        <label for="table-search" class="sr-only">Buscar</label>
        <div class="flex items-center bg-gray-50 border border-[#B4C3DF] rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-600">
          <svg class="w-5 h-5 text-gray-400 dark:text-gray-300 mx-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
          </svg>
          <input 
            type="text"  
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
            <th scope="col" class="px-6 py-3">Fecha</th>
            <th scope="col" class="px-6 py-3 md:table-cell">Número de conciliación</th>
            <th scope="col" class="px-6 py-3 md:table-cell">Empresa</th>
            <th scope="col" class="px-6 py-3 md:table-cell">Banco</th>
            <th scope="col" class="px-6 py-3 md:table-cell">Número de cuenta</th>
            <th scope="col" class="px-6 py-3 md:table-cell">Contador</th>
            <th scope="col" class="px-6 py-3 md:table-cell">Auditor</th>
          </tr>
        </thead>
        <tbody v-if="data.conciliations.length > 0">
          <tr 
            v-for="conciliation in data.conciliations_data" 
            :key="conciliation.id" 
            class="cursor-pointer bg-white border-b hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-600"
          >
            <td class="px-6 py-4">Fecha</td>
            <td class="px-6 py-4">{{ conciliation.account_number }}</td>
            <td class="px-6 py-4">{{ conciliation.company }}</td>
            <td class="px-6 py-4">Banco</td>
            <td class="px-6 py-4">N.º cuenta</td>
            <td class="px-6 py-4">{{ conciliation.accountant }}</td>
            <td class="px-6 py-4">{{ conciliation.auditor }}</td>
          </tr>
        </tbody>
        <tr v-else colspan="7" class="flex flex-col justify-center">
          <td class="ml-2 my-6">No se encontraron conciliaciones registradas.</td>
        </tr>
      </table>
    </div>
  </div>
</template>


<script setup>

import UserService from '@/services/userService'
import { ref, onMounted } from 'vue'

const getUserService = new UserService()
const isLoading = ref(false)
const data = ref(null)
const err = ref(null)
const VUE_APP_URL = process.env.VUE_APP_URL
const clientId = localStorage.getItem('id')
const uri = `/clients/${clientId}/`
const urlApi = VUE_APP_URL + uri


onMounted(async () => {
    isLoading.value = true;
    try{
      await getUserService.getUserById(urlApi)
      data.value = getUserService.getData().value;
      console.log(data.value)
    }
    catch(error){
      err.value = getUserService.getError().value;
    }
    finally{
      isLoading.value = false;
    }
  })
</script>