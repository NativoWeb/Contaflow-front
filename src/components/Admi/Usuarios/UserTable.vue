<template>
  <section class="w-full bg-white">
    <div class="p-2 flex flex-col md:flex-row bg-[white] pt-[40px]">
      <!-- Tabla -->
      <div class="overflow-x-auto flex-1">
        <div class="p-6 flex flex-col md:flex-row items-center justify-between dark:bg-gray-900 shadow-lg space-y-4 md:space-y-0">
          <label for="table-search" class="sr-only">Buscar</label>
          <div class="flex items-center bg-gray-50 border border-gray-300 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-600">
            <svg class="w-5 h-5 text-gray-400 dark:text-gray-300 mx-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
            <!-- Búsqueda en tiempo real -->
            <input 
              type="text" 
              id="table-search-users" 
              v-model="searchQuery"
              class="block w-full py-2 pr-4 text-sm text-gray-900 bg-transparent focus:ring-blue-500 focus:border-blue-500 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
              placeholder="Buscar..."
            >
          </div>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-sm text-left rtl:text-right text-[2A5CAA] dark:text-gray-400 bg-gradient-to-r from-gray-100 to-[#E5EAFF]">
            <thead class="text-xs uppercase">
              <tr>
                <th scope="col" class="p-4">
                  <div class="flex items-center">
                    <input id="checkbox-all-search" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                    <label for="checkbox-all-search" class="sr-only">checkbox</label>
                  </div>
                </th>
                <th scope="col" class="px-6 py-3">Nombres</th>
                <th scope="col" class="px-6 py-3 hidden md:table-cell">Correo</th>
                <th scope="col" class="px-6 py-3 hidden md:table-cell">Celular</th>
                <th scope="col" class="px-6 py-3 hidden md:table-cell">Rol</th>
                <th scope="col" class="px-6 py-3">Estado</th>
              </tr>
            </thead>

            <tbody class="rounded-full">
              <tr v-for="user in filteredUsers" :key="user.id" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td class="w-4 p-4">
                  <div class="flex items-center">
                    <input type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                  </div>
                </td>
                <th scope="row" class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                  <img class="w-10 h-10 rounded-full" src="@/assets/img_usuario.svg" alt="User image">
                  <div class="ps-3">
                    <div class="text-base font-semibold">{{ user.first_name }}</div>
                  </div>  
                </th>
                <td class="px-6 py-4 hidden md:table-cell">{{ user.username }}</td>
                <td class="px-6 py-4 hidden md:table-cell">{{ user.phone_number }}</td>
                <td class="px-6 py-4 hidden md:table-cell">{{ user.role }}</td>
                <td class="px-6 py-4">
                  <div class="flex items-center">
                    <div class="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div> Online
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Botones en columna -->
      <aside class="flex flex-row md:flex-col space-y-0 md:space-y-4 space-x-4 md:space-x-0 bg-white p-6 mt-14">
        <button @click="router.push('/EditarUsuario')" type="button" class="shadow-lg text-[#08245B] bg-[#FFFFFF] hover:bg-[#E5EAFF] font-medium rounded-full text-sm px-5 py-2.5 text-center inline-flex items-center">        
          <img src="@/assets/edit.svg" alt="">
          <span class="hidden md:inline">Editar</span>
        </button>
        <button type="button" class="shadow-lg text-[#08245B] bg-[#FFFFFF] hover:bg-[#E5EAFF] font-medium rounded-full text-sm px-5 py-2.5 text-center inline-flex items-center">        
          <img src="@/assets/slash.svg" alt="">
          <span class="hidden md:inline">Inactivar</span>
        </button>
        <button type="button" class="shadow-lg text-[#08245B] bg-[#FFFFFF] hover:bg-[#E5EAFF] font-medium rounded-full text-sm px-5 py-2.5 text-center inline-flex items-center">        
          <img src="@/assets/x.svg" alt="">
          <span class="hidden md:inline">Eliminar</span>
        </button>
        <button type="button" class="shadow-lg text-[#08245B] bg-[#FFFFFF] hover:bg-[#E5EAFF] font-medium rounded-full text-sm px-5 py-2.5 text-center inline-flex items-center">
          <img src="@/assets/repeat.svg" alt="">
          <span class="hidden md:inline">Reenviar invitación</span>
        </button>
        <button type="button" class="shadow-lg text-[#08245B] bg-[#FFFFFF] hover:bg-[#E5EAFF] font-medium rounded-full text-sm px-5 py-2.5 text-center inline-flex items-center">
          <img src="@/assets/AE.svg" alt="">
          <span class="hidden md:inline">Asignar Empresa</span>
        </button>
      </aside>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from "vue-router"; 

const router = useRouter(); 
const users = ref([]);
const searchQuery = ref("");

// Cargar usuarios desde la API
fetch('http://127.0.0.1:8000/users/')
  .then(res => res.json())
  .then(json => {
    users.value = json;
  })
  .catch(err => console.log(err));

// Computed para filtrar usuarios en tiempo real
const filteredUsers = computed(() => {
  return users.value.filter(user => 
    user.first_name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    user.username.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    user.phone_number.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    user.role.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});
</script>
