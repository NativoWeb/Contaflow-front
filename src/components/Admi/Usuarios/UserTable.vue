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
<<<<<<< HEAD
            <tbody>
              <tr v-for="user in filteredUsers" :key="user.id" class="border-b hover:bg-gray-100">
                <td class="p-4">
                  <input type="checkbox" class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500">
=======

            <tbody class="rounded-full">
              <tr @click="showModal(user.id)" v-for="user in filteredUsers" :key="user.id" class="cursor-pointer bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td class="w-4 p-4">
                  <div class="flex items-center">
                    <input type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                  </div>
>>>>>>> e498c2c79b95c241cc489afb340726a53cd4d44b
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
<<<<<<< HEAD
      
      <!-- Botones -->
      <aside class="flex flex-col gap-4 w-full md:w-auto p-4">
        <button @click="router.push('/EditarUsuario')" class="btn-action">
          <img src="@/assets/edit.svg" alt="Editar" class="mr-2"> Editar
=======

          <!-- Modal -->
    <div v-if="modalVisible" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[100]">
      <div class="bg-white p-10 shadow-lg w-[70%] max-w-[1250px] h-auto relative rounded-tl-3xl">
        <!-- Botón de cerrar (X) -->
        <button @click="modalVisible = false" 
          class="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-3xl w-10 h-10 flex items-center justify-center">
          &times;
        </button>
          <!-- Título -->
        <h2 class="text-xl text-[#193368] font-semibold mb-4 text-center">Detalles del Usuario</h2>

        <!-- Contenido del Modal -->
        <div v-if="user" class="flex flex-col space-y-4">
          <div class="flex w-[100%] gap-6 justify-center">
            <div class="flex flex-col w-[80%] gap-3">
              <div>
                <h4 class="text-xs uppercase font-medium text-[#193368]">Nombre</h4>
                <p class="text-left p-2 pl-4 mt-1 border rounded-lg text-[#193368] bg-gradient-to-r from-gray-100 to-[#E5EAFF]">{{ user.first_name }}</p>
              </div>

              <div>
                <h4 class="text-xs uppercase font-medium text-[#193368]">Apellidos</h4>
                <p class="text-left p-2 pl-4 mt-1 border rounded-lg text-[#193368] bg-gradient-to-r from-gray-100 to-[#E5EAFF]">{{ user.first_name }}</p>
              </div>

              <div>
                <h4 class="text-xs uppercase font-medium text-[#193368]">Correo</h4>
                <p class="text-left p-2 pl-4 mt-1 border rounded-lg text-[#193368] bg-gradient-to-r from-gray-100 to-[#E5EAFF]">{{ user.username }}</p>
              </div>

              <div>
                <h4 class="text-xs uppercase font-medium text-[#193368]">Role</h4>
                  <p class="text-left p-2 pl-4 mt-1 border rounded-lg text-[#193368] bg-gradient-to-r from-gray-100 to-[#E5EAFF]">{{ user.role }}</p>
              </div>

              <div>
                <h4 class="text-xs uppercase font-medium text-[#193368]">Numero de telefono</h4>
                <p class="text-left p-2 pl-4 mt-1 border rounded-lg text-[#193368] bg-gradient-to-r from-gray-100 to-[#E5EAFF]">{{ user.phone_number }}</p>
              </div>
            </div>

            <div class="w-full">
              <label class="text-[#193368]  text-sm font-medium text-[#193368]">Empresas</label>

              <!-- Tabla -->
              <div class="overflow-x-auto bg-white">
                <table class="w-full text-sm text-left rtl:text-right text-[#193368] dark:text-gray-400 bg-gradient-to-r from-gray-100 to-[#E5EAFF]">
                  <thead class="text-xs uppercase">
                    <tr>
                      <th scope="col" class="px-6 py-3">NIT</th>
                      <th scope="col" class="px-6 py-3 hidden md:table-cell">Razón Social</th>
                      <th scope="col" class="px-6 py-3 hidden md:table-cell">Dirección</th>
                      <th scope="col" class="px-6 py-3 hidden md:table-cell">Sector económico</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="companies in user.companies_data" :key="companies.nit"
                        class="cursor-pointer bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <td class="px-6 py-4">{{ companies.nit }}</td>
                      <td class="px-6 py-4 hidden md:table-cell">{{ companies.name }}</td>
                      <td class="px-6 py-4 hidden md:table-cell">{{ companies.address }}</td>
                      <td class="px-6 py-4 hidden md:table-cell">{{ companies.sector }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <img src="../../../assets/loader.svg" alt="">
        </div>
      </div>
    </div>

      <!-- Botones en columna -->
      <aside class="flex flex-row md:flex-col space-y-0 md:space-y-4 space-x-4 md:space-x-0 bg-white p-6 mt-14">
        <button @click="router.push('/EditarUsuario')" type="button" class="shadow-lg text-[#08245B] bg-[#FFFFFF] hover:bg-[#E5EAFF] font-medium rounded-full text-sm px-5 py-2.5 text-center inline-flex items-center">        
          <img src="@/assets/edit.svg" alt="">
          <span class="hidden md:inline">Editar</span>
>>>>>>> e498c2c79b95c241cc489afb340726a53cd4d44b
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
const user = ref();
const searchQuery = ref("");

// Cargar usuarios desde la API
fetch('http://127.0.0.1:8000/users/')
  .then(res => res.json())
  .then(json => {
    users.value = json;
  })
  .catch(err => console.log(err));

const modalVisible = ref(false);
function showModal(id){
  modalVisible.value = true;

  fetch(`http://127.0.0.1:8000/users/${id}/`)
  .then(res => res.json())
  .then(json => {
    console.log(json)
    user.value = json;
  })
  .catch(err => console.log(err));
}


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
