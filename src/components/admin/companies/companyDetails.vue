<template>
  <section class="max-w-4xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
    <h2 class="text-2xl font-bold text-[#2A5CAA] mb-6 text-center">Información de la Empresa</h2>

    <div v-if="isLoading" class="text-center text-gray-500">
      Cargando...
    </div>

    <div v-else-if="err" class="text-center text-red-500">
      Error: {{ err }}
    </div>

    <div v-else-if="data" class="flex flex-col space-y-4 text-gray-700">
      <div class="flex justify-between items-center">
        <p class="font-semibold w-1/3">Razón Social:</p>
        <p class="w-2/3">{{ data.name }}</p>
      </div>
      <div class="flex justify-between items-center">
        <p class="font-semibold w-1/3">NIT:</p>
        <p class="w-2/3">{{ data.nit }}</p>
      </div>
      <div class="flex justify-between items-center">
        <p class="font-semibold w-1/3">Dirección:</p>
        <p class="w-2/3">{{ data.address }}</p>
      </div>
      <div class="flex justify-between items-center">
        <p class="font-semibold w-1/3">Sector Económico:</p>
        <p class="w-2/3">{{ data.sector }}</p>
      </div>
      <div class="flex justify-between items-center">
        <p class="font-semibold w-1/3">Fecha de Registro:</p>
        <!-- <p class="w-2/3">{{ formatDate(data.createdAt) }}</p> -->
      </div>
      <div class="flex flex-col gap-4 md:w-1/5 w-full md:items-end mt-10">
        <button class="w-full transition duration-300 ease-in-out hover:drop-shadow-lg hover:scale-105 bg-[#2A5CAA] text-white px-4 py-2 rounded-md hover:bg-blue-700">Editar</button>
        <button class="w-full transition duration-300 ease-in-out hover:drop-shadow-lg hover:scale-105 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"> Eliminar </button>
      </div>
    </div>
    <div class="flex justify-between items-center">
      <ConByCompany/>
      <ClientsByCompany/>
    </div>
  </section>
</template>

<script setup>
  import CompaniesService from '@/services/companiesService';
  import { onMounted, ref } from 'vue';
  import { useRoute } from 'vue-router';
import ConByCompany from './ConByCompany.vue';
import ClientsByCompany from './ClientsByCompany.vue';


  const getCompany = new CompaniesService();
  const companyId = useRoute().params.id;
  const isLoading = ref(false);
  const data = ref(null);
  const err = ref(null);
  const VUE_APP_URL = process.env.VUE_APP_URL;
  const uri = `/companies/${companyId}/`;
  const urlApi = `${VUE_APP_URL}${uri}`;

  onMounted(async () => {
    isLoading.value = true;
    try {
      await getCompany.getCompanyById(urlApi);
      data.value = getCompany.getData().value;
      console.log(getCompany.getData().value)
    }
    catch(error){
      err.value = getCompany.getError().value;
      console.error(err)
    }
    finally{
      isLoading.value = false;
    }
  })

</script>
