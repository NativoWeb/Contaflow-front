<template>
    <!-- Contenedor de búsqueda y tabla -->
    <div class="p-4 bg-white flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0 mt-8" style="border-radius: 8px 8px 0 0;">
      <h2 class="text-lg font-semibold text-[#193368] dark:text-white">Lista de Empresas</h2>
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

    <!-- Tabla -->
    <div class="overflow-x-auto p-3 bg-white shadow-md " style="border-radius: 0 0 8px 8px;">
      <table class="w-full text-sm text-left text-gray-800 dark:text-gray-400">
       <thead class="text-xs uppercase bg-gradient-to-r from-[#F8F8F8] to-[#E5EAFF] text-[#193368]">
          <tr>
            <th scope="col" class="px-6 py-3">Nit</th>
            <th scope="col" class="px-6 py-3  md:table-cell">Razón Social</th>
            <th scope="col" class="px-6 py-3  md:table-cell">Sector económico</th>
            <th scope="col" class="px-6 py-3  md:table-cell">Dirección</th>
          </tr>
        </thead>
        <tbody v-if="company.length > 0">
          <tr v-for="companies in FilterCompany" 
            :key="companies.nit"
            @click="goToDetails(companies.id)"
            class="cursor-pointer bg-white border-b hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-600">
            <td class="px-6 py-4">{{ companies.nit }}</td>
            <td class="px-6 py-4">{{ companies.name }}</td>
            <td class="px-6 py-4">{{ companies.sector }}</td>
            <td class="px-6 py-4">{{ companies.address }}</td>
          </tr>
        </tbody>
        <tr v-else colspan="5" class="flex flex-col justify-center">
          <td class="ml-2 my-6">No existen {{ roles }} registrados</td>
        </tr>
        <tr v-if="errors" colspan="5" class="flex flex-col justify-center">
          <td class="ml-2 my-6">Ocurrio un error</td>
        </tr>
      </table>
    </div>
</template>

<script setup>
  import router from '@/router';
  import CompaniesService from '@/services/companiesService';
  import { ref, computed, onMounted } from 'vue'

  const searchQuery = ref(""); // Agregado para la búsqueda
  const VUE_APP_URL = process.env.VUE_APP_URL;
  const companiesService = new CompaniesService()
  const company = ref([]);
  const err = ref(null);
  const isLoading = ref(false);

  const goToDetails = (id) => {
    router.push(`/company=${id}/`)
  }

  onMounted(async () => {
    isLoading.value = true;
    try {
      await companiesService.getCompanies(`${VUE_APP_URL}/companies/`)
      company.value = companiesService.getData().value;
    }
    catch(error){
      err.value = companiesService.getError().value;
    }
    finally{
      isLoading.value = false;
    }
  })

  const FilterCompany = computed(() => {
    return company.value.filter(companies =>
    companies.nit.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    companies.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    companies.sector.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    companies.address.toLowerCase().includes(searchQuery.value.toLowerCase()) 
    )
  })
</script>