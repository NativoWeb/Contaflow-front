<template>
  <div class="w-[100%]" v-if="data">
    <h3 class="text-xl font-semibold text-[#2A5CAA] mb-6">Empresas de {{ data.first_name }}</h3>
    
    <div class="overflow-x-auto max-h-[500px] h-[70%] min-h-[300px] p-3 bg-white shadow-md rounded-lg">
      <table class="w-[100%] text-sm text-left text-gray-800 dark:text-gray-400">
        <thead class="text-xs uppercase bg-gradient-to-r from-[#F8F8F8] to-[#E5EAFF] text-[#193368]">
          <tr>
            <th scope="col" class="px-6 py-3">NIT</th>
            <th scope="col" class="px-6 py-3  md:table-cell">Razón Social</th>
            <th scope="col" class="px-6 py-3  md:table-cell">Sector Económico</th>
            <th scope="col" class="px-6 py-3  md:table-cell">Dirección</th>
          </tr>
        </thead>
          <tbody v-if="data && data.companies_data.length > 0">
            <tr v-for="company in data.companies_data" :key="company.id" class="cursor-pointer bg-white border-b hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-600">
              <td class="px-6 py-4">{{ company.nit }}</td>
              <td class="px-6 py-4">{{ company.name }}</td>
              <td class="px-6 py-4">{{ company.sector }}</td>
              <td class="px-6 py-4">{{ company.address }}</td>
            </tr>
          </tbody>
          <tr v-else class="flex flex-col justify-center">
            <td class="ml-2 my-6">No tiene empresas registradas</td>
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
</template>

<script setup>
  import { onMounted, ref } from 'vue';
  import UserService from '@/services/userService';
  import { useRoute } from 'vue-router';


  const clientId = useRoute().params.id;
  const VUE_APP_URL = process.env.VUE_APP_URL;
  const getUserService = new UserService();
  const isLoading = ref(false);
  const data = ref(null);
  const err = ref(null);
  const uri = `/clients/${clientId}/`;
  const urlApi = VUE_APP_URL + uri;

  onMounted( async () => {
    isLoading.value = true;

    try {
      await getUserService.getUserById(urlApi)
       data.value = getUserService.getData().value;
       console.log(getUserService.getData().value)
    }
    catch(error){
      err.value = getUserService.getError().value;
    }
    finally{
      isLoading.value = false;
    }
  })
</script>