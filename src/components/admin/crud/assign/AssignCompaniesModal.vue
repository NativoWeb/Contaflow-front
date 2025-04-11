<template>
  <button
    @click="toggleShowCompanies" 
    class="btn-action">Asignar Empresas</button>

  <div 
    v-if="showCompaniesModal" 
    class="w-[100%] fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
    <div class="p-10 relative w-[100%] max-w-[1600px] max-h-[80%] bg-white rounded-lg shadow-lg dark:bg-gray-800">
    <button @click="toggleShowCompanies" 
      class="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-3xl w-10 h-10 flex items-center justify-center rounded-full transition-colors duration-300">&times;
    </button>
    <div>
      <h3 class="text-xl font-semibold text-[#2A5CAA] mb-6">Empresas</h3>

      <div class="overflow-x-auto max-h-[500px] h-auto p-3 bg-white shadow-md rounded-lg">
        <table class="w-full text-sm text-left text-gray-800 dark:text-gray-400">
          <thead class="text-xs uppercase bg-gradient-to-r from-[#F8F8F8] to-[#E5EAFF] text-[#193368]">
            <tr>
              <th scope="col" class="px-6 py-3">NIT</th>
              <th scope="col" class="px-6 py-3  md:table-cell">Razón Social</th>
              <th scope="col" class="px-6 py-3  md:table-cell">Sector Económico</th>
              <th scope="col" class="px-6 py-3  md:table-cell">Dirección</th>
            </tr>
          </thead>
          <tbody v-if="data && data.length > 0">
            <tr v-for="company in data" :key="company.id"
            @click="goToClientDetails(company.id)"
            class="cursor-pointer bg-white border-b hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-600"
            :class="{
              'hidden': alreadyAssigned(company.id),
              '': !alreadyAssigned(company.id)
            }"
            >
            <td class="px-6 py-4">{{ company.nit }}</td>
              <td class="px-6 py-4">{{ company.name }}</td>
              <td class="px-6 py-4">{{ company.sector }}</td>
              <td class="px-6 py-4">{{ company.address }}</td>
            </tr>
          </tbody>
          <tr v-else colspan="5" class="flex flex-col justify-center">
            <td class="ml-2 my-6">No existen {{ roles }} registrados</td>
          </tr>
          <div v-if="isLoading" class="flex justify-center items-start">
            <img src="@/assets/loader.svg" alt="carga" class="mt-20 h-32 w-32">
          </div>
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

  const showCompaniesModal = ref(false);
  const userId = useRoute().params.id;
  const getUser = new UserService();
  const isLoading = ref(false);
  const data = ref([]);
  const err = ref(null);
  const userData = ref(null);
  const VUE_APP_URL = process.env.VUE_APP_URL;
  const uri = `/companies/`
  const urlApi = VUE_APP_URL + uri;

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${Cookies.get('jwt')}`
  }

  onMounted(async () => {
    fetch(`${VUE_APP_URL}/clients/${userId}/`, { headers })
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
    }
    catch(er){
      err.value = getUser.getError().value;
    }
    finally{
      isLoading.value = false;
    }
  })

  const alreadyAssigned = (companyId) => {
    return userData.value.companies.includes(companyId);
  }

  const toggleShowCompanies = () => {
    showCompaniesModal.value = !showCompaniesModal.value;
  }

  const goToClientDetails = id => {
    router.push(`cliente=${userId}/detalles_empresa=${id}`)
  }
  
</script>