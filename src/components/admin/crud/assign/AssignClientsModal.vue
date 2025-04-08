<template>
  <button
    @click="toggleShowClients" 
    class="btn-action">Asignar Clientes</button>

  <div 
    v-if="showClientsModal" 
    class="w-[100%] fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
    <div class="p-10 relative w-[100%] max-w-[1600px] max-h-[80%] bg-white rounded-lg shadow-lg dark:bg-gray-800">
    <button @click="toggleShowClients" 
      class="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-3xl w-10 h-10 flex items-center justify-center rounded-full transition-colors duration-300">&times;
    </button>
    <div>
      <h3 class="text-xl font-semibold text-[#2A5CAA] mb-6">Clientes PYMES</h3>

      <div class="overflow-x-auto max-h-[500px] h-auto p-3 bg-white shadow-md rounded-lg">
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
          <tbody v-if="data">
            <tr v-for="user in data" :key="user.id" 
            @click="goToClientDetails(user.id)" 
            class="cursor-pointer bg-white border-b hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-600"
            :class="{
              'hidden': alreadyAssigned(user.id),
              '': !alreadyAssigned(user.id)
            }"
            >
            <td class="px-6 py-4">{{ user.first_name }} {{ user.last_name }}</td>
            <td class="px-6 py-4">{{ user.id_number }}</td>
            <td class="px-6 py-4">{{ user.username }}</td>
            <td class="px-6 py-4">{{ user.phone_number }}</td>
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
            <td class="ml-2 my-6">No existen {{ roles }} registrados</td>
          </tr>
          <tr v-if="err" colspan="5" class="flex flex-col justify-center">
            <td class="ml-2 my-6">Ocurrio un error: {{ err }}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
  </div>
  
</template>

<script setup>
  import { onMounted, ref } from 'vue';
  import UserService from '@/services/userService';
  import router from '@/router';
  import { useRoute } from 'vue-router';
  import Cookies from 'js-cookie';

  const showClientsModal = ref(false);
  const userId = useRoute().params.id;
  const userRole = useRoute().params.role;
  const getUser = new UserService();
  const isLoading = ref(false);
  const data = ref(null);
  const err = ref(null);
  const userData = ref(null);
  const VUE_APP_URL = process.env.VUE_APP_URL;
  const uri = `/clients/`
  const urlApi = VUE_APP_URL + uri;

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${Cookies.get('jwt')}`
  }

  onMounted(async () => {
    fetch(`${VUE_APP_URL}/${userRole}/${userId}/`, {headers})
    .then(res => res.json())
    .then(json => {
      userData.value = json;
      console.log(userData.value)
    })
    .catch(err => console.error(err))
  })

  onMounted(async () => {
    isLoading.value = true;
    try{
      await getUser.getUsers(urlApi)
      data.value = getUser.getData().value;
      console.log(data.value)
    }
    catch(er){
      err.value = getUser.getError().value;
    }
    finally{
      isLoading.value = false;
    }
  })

  const alreadyAssigned = (clientId) => {
    return userData.value.clients.includes(clientId);
  }

  const toggleShowClients = () => {
    showClientsModal.value = !showClientsModal.value;
  }

  const goToClientDetails = id => {
    router.push(`${userRole}=${userId}/detalles_cliente=${id}`)
  }
  
</script>