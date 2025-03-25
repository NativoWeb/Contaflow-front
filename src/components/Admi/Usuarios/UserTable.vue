<template>
  <section class="w-full bg-white p-4">
    <div class="flex flex-col md:flex-row gap-6">
      <!-- Tabla -->
      <div class="overflow-x-auto flex-1 bg-white shadow-lg rounded-lg p-4">
        <div class="flex items-center justify-between mb-4">
          <label for="table-search" class="sr-only">Buscar</label>
          <div class="flex items-center bg-gray-50 border border-gray-300 rounded-lg shadow-md p-2 w-full md:w-auto">
            <svg class="w-5 h-5 text-gray-400 mx-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
            <input 
              type="text" 
              id="table-search-users" 
              v-model="searchQuery"
              class="w-full p-2 text-sm text-gray-900 bg-transparent focus:outline-none"
              placeholder="Buscar..."
            >
          </div>
        </div>
        
        <div class="overflow-x-auto">
          <table class="w-full text-sm text-left text-gray-700 bg-white rounded-lg">
            <thead class="text-xs bg-gradient-to-r from-gray-100 to-[#E5EAFF] uppercase">
              <tr>
                <th scope="col" class="p-4">
                  <input type="checkbox" class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500">
                </th>
                <th class="px-6 py-3">Nombres</th>
                <th class="px-6 py-3 hidden md:table-cell">Correo</th>
                <th class="px-6 py-3 hidden md:table-cell">Celular</th>
                <th class="px-6 py-3 hidden md:table-cell">Rol</th>
                <th class="px-6 py-3">Estado</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in filteredUsers" :key="user.id" class="border-b hover:bg-gray-100">
                <td class="p-4">
                  <input type="checkbox" class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500">
                </td>
                <td class="flex items-center px-6 py-4">
                  <img class="w-10 h-10 rounded-full" src="@/assets/img_usuario.svg" alt="User image">
                  <span class="ml-3 font-semibold">{{ user.first_name }}</span>
                </td>
                <td class="px-6 py-4 hidden md:table-cell">{{ user.username }}</td>
                <td class="px-6 py-4 hidden md:table-cell">{{ user.phone_number }}</td>
                <td class="px-6 py-4 hidden md:table-cell">{{ user.role }}</td>
                <td class="px-6 py-4">Pendiente</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <!-- Botones -->
      <aside class="flex flex-col gap-4 w-full md:w-auto p-4">
        <button @click="router.push('/EditarUsuario')" class="btn-action">
          <img src="@/assets/edit.svg" alt="Editar" class="mr-2"> Editar
        </button>
        <button class="btn-action">
          <img src="@/assets/slash.svg" alt="Inactivar" class="mr-2"> Inactivar
        </button>
        <button class="btn-action">
          <img src="@/assets/x.svg" alt="Eliminar" class="mr-2"> Eliminar
        </button>
        <button class="btn-action">
          <img src="@/assets/repeat.svg" alt="Reenviar"> Reenviar invitación
        </button>
        <button class="btn-action">
          <img src="@/assets/AE.svg" alt="Asignar Empresa"> Asignar Empresa
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

<style>

</style>
