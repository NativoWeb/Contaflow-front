<template>
  <button @click="toggleModal" class="btn-action">Asignar Clientes</button>

  <div v-if="showModal"
  tabindex="-1" 
   class="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
    <div class="w-[70%] h-[90%] m-auto relative p-4">
      <div class="relative bg-white rounded-lg dark:bg-gray-700 w-[100%] h-[100%] p-8">
        <!-- Contenido del Modal -->
        <h2 class="text-xl font-bold text-[#193368] text-center md:text-left">
          Asignar Clientes
        </h2>
      
        <div class="relative overflow-x-auto p-4">
            <div class="pb-4 bg-white dark:bg-gray-900">
                <label for="table-search" class="sr-only">Search</label>
                <div class="relative mt-1">
                    <div class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </div>
                    <input type="text" id="table-search" class="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Buscar">
                </div>
            </div>
            <table class="w-full text-sm text-left rtl:text-right text-[#193368] dark:text-gray-400">
                <thead class="text-xs text-[#193368] uppercase bg-gradient-to-r from-[#F8F8F8] to-[#E5EAFF] dark:bg-gray-700 dark:text-gray-400 ">
                    <tr>
                        <th scope="col" class="p-4">
                            <div class="flex items-center">
                                <input id="checkbox-all-search" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                <label for="checkbox-all-search" class="sr-only">checkbox</label>
                            </div>
                        </th>
                        <th scope="col" class="px-6 py-3">
                          Nombre
                        </th>
                        <th scope="col" class="px-6 py-3">
                          Número de Identificación
                        </th>
                        <th scope="col" class="px-6 py-3">
                          Estado
                        </th>
                    </tr>
                </thead>
                <tbody v-if="users.length > 0">
                    <tr v-for="user in users" :key="user.id_number" 
                    class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td class="w-4 p-4">
                            <div class="flex items-center">
                                <input id="checkbox-table-search-2" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                <label for="checkbox-table-search-2" class="sr-only">checkbox</label>
                            </div>
                        </td>
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {{ user.first_name }} {{ user.last_name }}
                        </th>
                        <td class="px-6 py-4">
                          {{ user.id_number }}
                        </td>
                        <td v-if="user.status == 'Pendiente'" class="px-6 py-4">
                          <span class="text-sm text-orange-500">
                            {{ user.status }}
                          </span>
                        </td>
                        <td v-if="user.status == 'Activo'" class="px-6 py-4">
                          <span class="text-sm text-green-500">
                            {{ user.status }}
                          </span>
                        </td>
                        <td v-if="user.status == 'Inactivo'" c class="px-6 py-4">
                          <span class="text-sm text-red-500">
                            {{ user.status }}
                          </span>
                        </td>
                    </tr>
                    
                    
                    
                  </tbody>
                  <tr v-else colspan="5" class="flex flex-col justify-center">
                    <td class="ml-2 my-6">No existen {{ users.roles }} registrados</td>
                  </tr>
                </table>
                <!-- Botones -->
                <div class="flex justify-center space-x-3 p-5 dark:border-gray-700">
                  <button @click="toggleModal"
                    class="px-5 py-2.5 text-[#193368] bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 
                    focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 
                    dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                    Cancelar
                  </button>
                  <button @click="toggleModal"
                      type="button" 
                      class="py-3 px-5 ms-3 text-sm font-medium focus:outline-none bg-[#08245B] hover:bg-[#2a4b8d] text-white rounded-lg border">
                      Confirmar
                  </button>
                </div>
              </div>

      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, defineProps } from 'vue';
  import Cookies from 'js-cookie';

  const users = ref([]);
  const showModal = ref(false);
  

  const toggleModal = () => {
    showModal.value = !showModal.value;
  }

  const props = defineProps({
    apiUrl: String,
    roles: String
  })


  fetch(props.apiUrl, {
    headers: {
      'Authorization': `Bearer ${Cookies.get('jwt')}`
    }
  })
  .then(res => res.json())
  .then(json => {
    users.value = json;
  })
  .catch(err => console.error(err))
</script>