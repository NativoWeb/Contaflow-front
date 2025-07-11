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
        v-model="searchQuery"
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
            <th scope="col" class="px-6 py-3  md:table-cell">Numero de conciliacion</th>
            <th scope="col" class="px-6 py-3  md:table-cell">Empresa</th>
            <th scope="col" class="px-6 py-3  md:table-cell">Banco</th>
            <th scope="col" class="px-6 py-3  md:table-cell">Auditor</th>
            <th scope="col" class="px-6 py-3  md:table-cell">Estado conciliacion</th>
          </tr>
        </thead>
        <tbody v-if="filteredData.length > 0">
          <tr v-for="conciliation in filteredData" 
          :key="conciliation.id"
          @click="redirectToConciliationDetails(conciliation.id)"
          class="cursor-pointer bg-white border-b hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-600">
            <td class="px-6 py-4">{{ formateDate(conciliation.created_at) }}</td>
            <td class="px-6 py-4"># {{ conciliation.identification_number }}</td>
            <td class="px-6 py-4">{{ conciliation.company}}</td>
            <td class="px-6 py-4">{{ conciliation.response.Banco }}</td>
            <td class="px-6 py-4">{{ conciliation.auditor_name }}</td>
            <td class="px-6 py-4">                
              <span 
                :class="{
                  'bg-green-100 text-green-800': conciliation.status === 'Firmada',
                  'bg-red-100 text-red-800': conciliation.status === 'Rechazada',
                  'bg-yellow-100 text-yellow-800': conciliation.status === 'Pendiente'
                }"
                class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                  {{ conciliation.status }}
              </span>
            </td>
          </tr>
        </tbody>
        <tr v-else colspan="5" class="flex flex-col justify-center">
          <td class="ml-2 my-6">No se encontraron conciliaciones registradas.</td>
        </tr>
      </table>
  </div>
</div>
<div v-else>
  <h4>No hay conciliaciones</h4>
</div>
</template>

<script setup>
import router from '@/router'
import UserService from '@/services/userService'
import { ref, onMounted, computed } from 'vue'

const getUserService = new UserService()
const isLoading = ref(false)
const data = ref(null)
const err = ref(null)
const VUE_APP_URL = process.env.VUE_APP_URL
const accountantId = localStorage.getItem('id')
const uri = `/accountants/${accountantId}/`
const urlApi = VUE_APP_URL + uri
const searchQuery = ref('');


onMounted(async () => {
  isLoading.value = true
  try{
    await getUserService.getUserById(urlApi)
    data.value = getUserService.getData().value.conciliations_data
  }
  catch(error){
    err.value = getUserService.getError().value
  }
  finally{
    isLoading.value = false
  }
})

const redirectToConciliationDetails = (id) => {
  router.push(`/detalles_conciliacion=${id}`)
}

const formateDate = date => {
  const new_date = new Date(date)
  return `${new_date.getDate()}/${new_date.getMonth() + 1}/${new_date.getFullYear()}`
  }


      const filteredData = computed(() => {
    if (!data.value) return [];

    const query = searchQuery.value.toLowerCase();

    return data.value.filter(conciliation =>
      conciliation.identification_number?.toString().toLowerCase().includes(query) || 
      conciliation.company?.toLowerCase().includes(query) ||
      conciliation.response.Banco?.toLowerCase().includes(query) ||
      conciliation.auditor_name?.toLowerCase().includes(query)
    );
  });
</script>