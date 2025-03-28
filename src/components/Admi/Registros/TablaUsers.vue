<template>
    <!-- Contenedor de búsqueda y tabla -->
    <div class="p-4 flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
      <h2 class="text-lg font-semibold text-[#193368] dark:text-white">{{ clientList }}</h2>
      <div class="w-full md:w-1/2">
        <label for="table-search" class="sr-only">Buscar</label>
        <div class="flex items-center bg-gray-50 border border-[#B4C3DF] rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-600">
          <svg class="w-5 h-5 text-gray-400 dark:text-gray-300 mx-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
          </svg>
          <input  type="text" 
          v-model="searchQuery"  
          id="table-search-users" 
          placeholder="Buscar..."
          class="w-full p-2 text-sm text-[#193368] bg-transparent focus:ring-blue-500 focus:border-blue-500 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        </div>
      </div>
    </div>
  
    
    <div class="overflow-x-auto p-3 bg-white shadow-md rounded-lg">
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
        <tbody v-if="accountants.length > 0">
          <tr v-for="accountant in accountants" :key="accountant" 
            class="cursor-pointer bg-white border-b hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-600">
            <td class="px-6 py-4">{{ accountant.first_name }} {{ accountant.last_name }}</td>
            <td class="px-6 py-4">{{ accountant.id_number }}</td>
            <td class="px-6 py-4">{{ accountant.username }}</td>
            <td class="px-6 py-4">{{ accountant.phone_number }}</td>
            <td v-if="accountant.status == 'Pendiente'" class="px-6 py-4">
              <span class="text-sm text-orange-500">
                {{ accountant.status }}
              </span>
            </td>
            <td v-if="accountant.status == 'Activo'" class="px-6 py-4">
              <span class="text-sm text-green-500">
                {{ accountant.status }}
              </span>
            </td>
            <td v-if="accountant.status == 'Inactivo'" c class="px-6 py-4">
              <span class="text-sm text-red-500">
                {{ accountant.status }}
              </span>
            </td>
        </tr>
      </tbody>
      <tr v-else colspan="5" class="flex flex-col justify-center">
        <span class="ml-2 my-6">No existen contadores registrados</span>
      </tr>
      </table>
    </div>
</template>

<script setup>
  import { ref, defineProps } from 'vue'
  import Cookies from 'js-cookie';
  
  const accountants = ref([]);
  const props = defineProps({
    apiUrl: String,
    clientList: String
  })

  fetch(props.apiUrl, {
    headers: {
      'Authorization': `Bearer ${Cookies.get('jwt')}`
    }
  })
  .then(response => response.json())
  .then(json => {
    accountants.value = json;
  })
  .catch(err => console.log(err))
  
  // Filtrado de usuarios por búsqueda
//   const searchQuery = ref("");
  
//   const filteredUsers = computed(() => {
//     return accountants.value.filter((user) =>
//       user.first_name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
//       user.last_name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
//       user.username.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
//       user.estado.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
//       user.identification_number.includes(searchQuery.value)
//     );
//   });
  
</script>
  
  