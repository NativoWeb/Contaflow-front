<template>
  <!-- Estado de carga
  <div v-if="isLoading" class="flex flex-col items-center justify-center p-8">
    <div class="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
    <p class="text-gray-600">Cargando datos...</p>
  </div>

   Estado de error 
  <div v-else-if="err" class="flex flex-col items-center justify-center p-6 bg-red-50 rounded-lg">
    <svg class="w-10 h-10 text-red-500 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
    </svg>
    <p class="text-red-600 font-medium text-center">Error al cargar los datos: {{ err }}</p>
  </div>-

  Contenido principal 
  <div v-if="data" class="w-[1529px] m-auto bg-white rounded-xl shadow-sm overflow-hidden">
     Encabezado con título y búsqueda 
    <div class="flex flex-col md:flex-row md:items-center justify-between p-6 bg-white border-b border-gray-100">
      <div>
        <h2 class="text-xl font-semibold text-gray-800">Selecciona un cliente</h2>
      </div>
      
      <div class="mt-4 md:mt-0 w-full md:w-64">
        <div class="relative">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg class="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
          </div>
          <input 
            type="text" 
            v-model="searchQuery"  
            id="table-search-users" 
            placeholder="Buscar..."
            class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-gray-900 transition-all"
          >
        </div>
      </div>
    </div>

     Tabla de datos 
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <div class="flex items-center">
                Nombre
                <button @click="sortBy('first_name')" class="ml-1 focus:outline-none">
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"></path>
                  </svg>
                </button>
              </div>
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
              Identificación
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
              Correo
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
              Celular
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Estado
            </th>
          </tr>
        </thead>
        
        <tbody class="bg-white divide-y divide-gray-200">
          <template v-if="filteredData.length > 0">
            <tr 
              v-for="user in filteredData" 
              :key="user.id" 
              @click="goToSelectAuditor(user.id)"
              class="hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <span class="text-blue-600 font-medium">{{ user.first_name.charAt(0) }}{{ user.last_name.charAt(0) }}</span>
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">{{ user.first_name }} {{ user.last_name }}</div>
                    <div class="text-sm text-gray-500 md:hidden">{{ user.id_number }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">
                {{ user.id_number }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">
                {{ user.username }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">
                {{ user.phone_number || 'N/A' }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span 
                  :class="{
                    'bg-green-100 text-green-800': user.status === 'Activo',
                    'bg-red-100 text-red-800': user.status === 'Inactivo',
                    'bg-yellow-100 text-yellow-800': user.status === 'Pendiente'
                  }"
                  class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                >
                  {{ user.status }}
                </span>
              </td>
            </tr>
          </template>
          <tr v-else>
            <td colspan="5" class="px-6 py-8 text-center">
              <div class="flex flex-col items-center justify-center text-gray-500">
                <svg class="w-16 h-16 mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <p class="text-lg font-medium">No se encontraron resultados</p>
                <p class="text-sm mt-1">Intenta con otros términos de búsqueda</p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div> -->

    <!-- <div v-if="filteredData.length > 0" class="px-6 py-4 bg-white border-t border-gray-200 flex items-center justify-between">
      <div class="text-sm text-gray-500">
        Mostrando <span class="font-medium">{{ currentPageStart }}</span> a <span class="font-medium">{{ currentPageEnd }}</span> de <span class="font-medium">{{ filteredData.length }}</span> resultados
      </div>
      <div class="flex space-x-2">
        <button 
          @click="prevPage"
          :disabled="currentPage === 1"
          :class="{'opacity-50 cursor-not-allowed': currentPage === 1}"
          class="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Anterior
        </button>
        <button 
          @click="nextPage"
          :disabled="currentPage * perPage >= filteredData.length"
          :class="{'opacity-50 cursor-not-allowed': currentPage * perPage >= filteredData.length}"
          class="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Siguiente
        </button>
      </div>
    </div> -->
  <!-- </div> -->
  <div class="py-[20px]"></div>
</template>

<script setup>
  // import router from '@/router';
  import Cookies from 'js-cookie';
  // import UserService from '@/services/userService';
  // import { computed, onMounted, ref } from 'vue';
  import { onMounted, ref } from 'vue';

  const isLoading = ref(false);
  // const data = ref("");
  // const err = ref("");
  // const getUser = new UserService();
  const id = localStorage.getItem('id')
  const VUE_APP_URL = process.env.VUE_APP_URL;
  const url = `${VUE_APP_URL}/accountants/${id}/`;
  // const searchQuery = ref('');

  onMounted(async () => {
    isLoading.value = false;
    try{
      const res = await fetch(url, {
        headers:{
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${Cookies.get('jwt')}` 
        }
      })
      const json = await res.json()
      console.log(json.conciliations_data)
    }
    catch(error){
      console.log(error)
    }
    finally{
      isLoading.value = false;
    }
  })

  // const goToSelectAuditor = (id) => {
  //   router.push(`cliente=${id}/seleccionar_auditor/`)
  // }

  // const filteredData = computed(() => {
  //   if (!data.value) return [];

  //   const query = searchQuery.value.toLowerCase();

  //   return data.value.clients_data.filter(user => 
  //     `${user.first_name} ${user.last_name}`.toLowerCase().includes(query) || 
  //     user.id_number?.toString().toLowerCase().includes(query) ||
  //     user.username?.toLowerCase().includes(query) ||
  //     user.phone_number?.toString().toLowerCase().includes(query) ||
  //     user.status?.toLowerCase().includes(query)
  //   )
  // })
</script>