<template>
  
  <div v-if="data">
    <div class="p-4 flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
      
      <AssignCompaniesModal/>

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
      
    <div class="flex flex-col gap-20">
      <div class="overflow-x-auto p-3 bg-white shadow-md rounded-lg">
        <table class="w-full text-sm text-left text-gray-800 dark:text-gray-400">
          <thead class="text-xs uppercase bg-gradient-to-r from-[#F8F8F8] to-[#E5EAFF] text-[#193368]">
            <tr>
              <th scope="col" class="px-6 py-3">Nombre</th>
              <th scope="col" class="px-6 py-3  md:table-cell">Razón Social</th>
              <th scope="col" class="px-6 py-3  md:table-cell">Sector Económico</th>
              <th scope="col" class="px-6 py-3  md:table-cell">Dirección</th>
            </tr>
          </thead>
          <tbody v-if="data && data.companies.length > 0">
            <tr v-for="company in data.companies_data" :key="company.id" @click="goToCompanyDetails(company.id)"
              class="cursor-pointer bg-white border-b hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-600">
              <td class="px-6 py-4">{{ company.name }}</td>
              <td class="px-6 py-4">{{ company.name}}</td>
              <td class="px-6 py-4">{{ company.sector}}</td>
              <td class="px-6 py-4">{{ company.address }}</td>
              <!-- <td @click="redirectToRemove(user.id)" class="px-6 py-4 hover:underline text-[#08245B] text-sm text-xs uppercase">detalles</td> -->
            </tr>
          </tbody>
          <tr v-else colspan="5" class="flex flex-col justify-center">
            <td class="ml-2 my-6">No existen registrados</td>
          </tr>
          <div v-if="isLoading" class="flex justify-center items-start">
            <img src="@/assets/loader.svg" alt="carga" class="mt-20 h-32 w-32">
          </div>
          <tr v-if="err" colspan="5" class="flex flex-col justify-center">
            <td class="ml-2 my-6">Ocurrio un error {{ err }}</td>
          </tr>
        </table>
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
              <th scope="col" class="px-6 py-3  md:table-cell">Acción</th>
            </tr>
          </thead>
          <tbody v-if="data && data.conciliations.length > 0">
            <tr v-for="conciliation in data.conciliations_data" :key="conciliation.id" @click="goToConciliationDetails(conciliation.id)"
              class="cursor-pointer bg-white border-b hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-600">
              <td class="px-6 py-4">{{ conciliation.account_number }}</td>
              <td class="px-6 py-4">{{ conciliation.company }}</td>
              <td class="px-6 py-4">{{ conciliation.client }}</td>
              <td class="px-6 py-4">{{ conciliation.accountant }}</td>
              <!-- <td @click="redirectToRemove(user.id)" class="px-6 py-4 hover:underline text-[#08245B] text-sm text-xs uppercase">detalles</td> -->
            </tr>
          </tbody>
          <tr v-else colspan="5" class="flex flex-col justify-center">
            <td class="ml-2 my-6">No existen registrados</td>
          </tr>
          <div v-if="isLoading" class="flex justify-center items-start">
            <img src="@/assets/loader.svg" alt="carga" class="mt-20 h-32 w-32">
          </div>
          <tr v-if="err" colspan="5" class="flex flex-col justify-center">
            <td class="ml-2 my-6">Ocurrio un error {{ err }}</td>
          </tr>
        </table>
      </div> 
    </div>
  </div>
</template>

<script setup>
  import { onMounted, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import UserService from '@/services/userService';
  import router from '@/router';
  import AssignCompaniesModal from '../crud/assign/AssignCompaniesModal.vue';

  const userId = useRoute().params.id;
  const VUE_APP_URL = process.env.VUE_APP_URL;
  const urlApi = `${VUE_APP_URL}/clients/${userId}/`
  const getUser = new UserService();
  const isLoading = ref(false);
  const data = ref(null);
  const err = ref(null);

  const goToCompanyDetails = (id) => {
    router.push(`cliente=${userId}/remover_empresa=${id}`)
  }

  const goToConciliationDetails = (id) => {
    router.push(`/conciliation=${id}`)
  }

  onMounted(async () => {
    isLoading.value = true;
    try{
      await getUser.getUserById(urlApi)
      data.value = getUser.getData().value;
    }
    catch(error){
      err.value = getUser.getError().value;
    }
    finally{
      isLoading.value = false;
    }
  })
</script>