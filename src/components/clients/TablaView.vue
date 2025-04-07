<template>

  <div class="p-6 flex flex-col w-full h-full">
    <!-- Contenedor de búsqueda y selección de empresa -->
    <div class="p-4  bg-gradient-to-r from-[#F8F8F8] to-[#E5EAFF] flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
      <h2 class="text-xl font-bold text-[#193368] p-2 text-center md:text-left">
        {{ clientList}}
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
            <th scope="col" v-for="(col, index) in columns" :key="index" class="px-6 py-3">{{ col }}</th>
          </tr>
        </thead>


      <tbody v-if="filteredData.length > 0">
        <tr 
          v-for="user in filteredData" 
          :key="user.id" 
          @click="goToUserDetails(user.id)"
          class="cursor-pointer bg-white border-b hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-600"
        >
          <td v-for="(col, colIndex) in columns" :key="colIndex" class="px-6 py-4">{{ user[col] }}</td>
        </tr>
      </tbody>



      <tr v-else colspan="5" class="flex flex-col justify-center">
        <td class="ml-2 my-6">No existen datos</td>
      </tr>
      <!-- <tr v-if="err" colspan="5" class="flex flex-col justify-center">
        <td class="ml-2 my-6">Ocurrio un error</td>
        <span>{{ err }}</span>
      </tr> -->

      </table>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted, computed } from 'vue';
import UserService from '@/services/userService'; // Asegúrate de tener este servicio
import router from '@/router';

const getUser = new UserService();
const isLoading = ref(false);
const data = ref([]); // Inicializar como array vacío
const err = ref(null);

const props = defineProps({
  apiUrl: {
    type: String,
    required: true
  },
  clientList: {
    type: String,
    required: true
  },
  roles: {
    type: String,
    required: true
  },
  routes: {
    type: String,
    required: true
  },
  columns: {
    type: Array,
    required: true
  }
});

const searchQuery = ref('');

// Computed para filtrar los datos según la búsqueda
const filteredData = computed(() => {
  if (!data.value || !Array.isArray(data.value)) return []; // Asegúrate de que 'data' no sea null o undefined
  if (!searchQuery.value) return data.value;
  return data.value.filter(user => {
    return Object.values(user).some(val => 
      String(val).toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  });
});

// Método para redirigir a la página de detalles de un usuario
const goToUserDetails = (id) => {
  router.push(`${props.routes}/${id}`);
};

// Cargar los usuarios desde la API
onMounted(async () => {
  isLoading.value = true;
  try {
    await getUser.getUsers(props.apiUrl);
    data.value = getUser.getData().value || []; // Asegúrate de que 'data' nunca sea null
  } catch (error) {
    err.value = getUser.getError().value;
  } finally {
    isLoading.value = false;
  }
});
</script>
