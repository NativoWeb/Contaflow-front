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
  <div class="p-4  bg-gradient-to-r from-[#F8F8F8] to-[#E5EAFF] flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
    <h2 class="text-xl font-bold text-[#193368] p-2 text-center md:text-left">
      Lista de mis Clientes
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
          <th scope="col" class="px-6 py-3">Nombre</th>
          <th scope="col" class="px-6 py-3  md:table-cell">Número de Identificación</th>
          <th scope="col" class="px-6 py-3  md:table-cell">Correo</th>
          <th scope="col" class="px-6 py-3  md:table-cell">Celular</th>
          <th scope="col" class="px-6 py-3  md:table-cell">Estado</th>
        </tr>
      </thead>
      <tbody v-if="data.clients.length > 0">
        <tr v-for="client in data.clients_data" :key="client.id"
          class="cursor-pointer bg-white border-b hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-600">
          <td class="px-6 py-4">{{ client.first_name }} {{ client.last_name }}</td>
          <td class="px-6 py-4">{{ client.id_number }}</td>
          <td class="px-6 py-4">{{ client.username }}</td>
          <td class="px-6 py-4">{{ client.phone_number }}</td>
          <td v-if="client.status == 'Pendiente'" class="px-6 py-4">
            <span class="text-sm text-orange-500">
              {{ client.status }}
            </span>
          </td>
          <td v-if="client.status == 'Activo'" class="px-6 py-4">
            <span class="text-sm text-green-500">
              {{ client.status }}
            </span>
          </td>
          <td v-if="client.status == 'Inactivo'" c class="px-6 py-4">
            <span class="text-sm text-red-500">
              {{ client.status }}
            </span>
          </td>
      </tr>
    </tbody>
    <tr v-else colspan="5" class="flex flex-col justify-center">
        <td class="ml-2 my-6">No se encontraron clientes registrados.</td>
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
const auditorsId = localStorage.getItem('id')
const uri = `/auditors/${auditorsId}/`
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