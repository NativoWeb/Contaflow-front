<template>
  <!-- Estado de carga -->
  <div v-if="isLoading" class="flex flex-col items-center justify-center p-8">
    <div class="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
    <p class="text-gray-600">Cargando datos...</p>
  </div>

  <!-- Estado de error -->
  <div v-else-if="err" class="flex flex-col items-center justify-center p-6 bg-red-50 rounded-lg">
    <svg class="w-10 h-10 text-red-500 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    <p class="text-red-600 font-medium text-center">Error al cargar los datos: {{ err }}</p>
  </div>

  <!-- Contenido principal -->
  <div v-if="data" class="m-w-[1577px] mx-auto bg-white rounded-xl shadow-sm overflow-hidden">
    <!-- Encabezado con título y búsqueda -->
    <div class="flex flex-col md:flex-row md:items-center justify-between p-4 sm:p-6 bg-white border-b border-gray-100">
      <div>
        <h2 class="text-lg sm:text-xl font-semibold text-gray-800">{{ clientList }}</h2>
      </div>

      <div class="mt-4 md:mt-0 w-full md:w-72">
        <div class="relative">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 20 20">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
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

    <!-- Tabla de datos -->
    <div class="overflow-x-auto w-full">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <div class="flex items-center">
                Nombre
              </div>
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
              Nit
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
              Correo
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
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
              @click="goToUserDetails(user.id)"
              class="hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <span class="text-blue-600 font-medium">{{ user.name.charAt(0) }}</span>
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">{{ user.name }} </div>
                    <div class="text-sm text-gray-500 md:hidden">{{ user.nit }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 text-sm text-gray-500 hidden md:table-cell">
                {{ user.nit }}
              </td>
              <td class="px-6 py-4 text-sm text-gray-500 hidden lg:table-cell">
                {{ user.username }}
              </td>
              <td class="px-6 py-4 text-sm text-gray-500 hidden lg:table-cell">
                {{ user.phone_number || 'N/A' }}
              </td>
              <td class="px-6 py-4">
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
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <p class="text-lg font-medium">No se encontraron resultados</p>
                <p class="text-sm mt-1">Intenta con otros términos de búsqueda</p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <div class="py-6"></div>
</template>

<script setup>

  import { ref,  onMounted } from 'vue'
  import UserService from '@/services/userService';
  import router from "@/router";
  import { computed } from 'vue';

  const getUser = new UserService();
  const isLoading = ref(false);
  const data = ref(null);
  const err = ref(null);
  const searchQuery = ref('');

  const props = defineProps({
    apiUrl: String,
    clientList: String,
    roles: String,
    routes: String
  })


  const goToUserDetails = id => {
    router.push(`${props.routes}/${id}`)
  }

  onMounted(async () => {
    isLoading.value = true;
    try{
      await getUser.getUsers(props.apiUrl)
      data.value = getUser.getData().value;
      console.log(data.value)
    }
    catch(error){
      err.value = getUser.getError().value;
    }
    finally{
      isLoading.value = false;
    }
  })
  
  const filteredData = computed(() => {
    if (!data.value) return [];

    const query = searchQuery.value.toLowerCase();

    return data.value.filter(user =>
      `${user.first_name} ${user.last_name}`.toLowerCase().includes(query) ||
      user.id_number?.toString().toLowerCase().includes(query) ||
      user.username?.toLowerCase().includes(query) ||
      user.phone_number?.toString().toLowerCase().includes(query) ||
      user.status?.toLowerCase().includes(query)
    );
  });
</script>