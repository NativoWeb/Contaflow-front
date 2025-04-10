<template>
  <!-- Contenedor de la información de la empresa -->
  <section class="max-w-5xl mx-auto mt-5 p-6 bg-white rounded-lg shadow-lg">
    <h2 class="text-3xl font-bold text-[#2A5CAA] mb-5 text-center">Información de la Empresa</h2>

    <!-- Cargando -->
    <div v-if="isLoading" class="text-center text-gray-500">
      Cargando...
    </div>

    <!-- Error -->
    <div v-else-if="err" class="text-center text-red-500">
      Error: {{ err }}
    </div>

    <!-- Información de la empresa -->
    <div v-else-if="data">
      <div class="flex flex-col md:flex-row md:justify-center md:items-start gap-8 p-8">
  <!-- Información centrada -->
  <div class="flex-1 max-w-xl space-y-4 text-gray-700 ml-auto">
    <div class="flex">
      <p class="font-semibold w-60">NIT:</p>
      <p>{{ data.nit }}</p>
    </div>
    <div class="flex">
      <p class="font-semibold w-60">Razón Social:</p>
      <p>{{ data.name }}</p>
    </div>
    <div class="flex">
      <p class="font-semibold w-60">Dirección:</p>
      <p>{{ data.address }}</p>
    </div>
    <div class="flex">
      <p class="font-semibold w-60">Sector Económico:</p>
      <p>{{ data.sector }}</p>
    </div>
    <div class="flex">
      <p class="font-semibold w-60">Fecha de Registro:</p>
      <!-- <p>{{ formatDate(data.createdAt) }}</p> -->
    </div>
  </div>

  <!-- Botones a la derecha -->
  <div class="flex flex-col gap-6 md:w-1/4 w-full md:items-end">
    <EditCompanyModal :infor="data" />
    <DeleteCompanyModal :id="data.id"/>
  </div>
</div>

    </div>
  </section>

  <!-- Segundo contenedor: Tablas de conciliaciones y clientes -->
  <section v-if="data" class="max-w-5xl mx-auto mt-6 p-6 bg-white rounded-lg shadow-md">
    <div class="grid gap-6">
      <ConByCompany :conciliations="data.conciliations_data" />
      <ClientsByCompany :employees="data.clients_data" />
    </div>
  </section>

  <!-- Manejo de errores duplicado (puedes eliminar si ya está arriba) -->
  <div v-if="err" class="flex justify-center items-start">
    <span>{{ err }}</span>
  </div>

  <!-- Cargador duplicado (puedes eliminar si ya está arriba) -->
  <div v-if="isLoading" class="flex justify-center items-start">
    <img src="@/assets/loader.svg" alt="carga" class="mt-20 h-32 w-32" />
  </div>
</template>


<script setup>
  import { ref, onMounted } from 'vue'
  import { useRoute } from 'vue-router';
  import CompaniesService from '@/services/companiesService'
  import ConByCompany from './ConByCompany.vue';
  import ClientsByCompany from './ClientsByCompany.vue';
  import EditCompanyModal from './EditCompanyModal.vue';
  import DeleteCompanyModal from './DeleteCompanyModal.vue';

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
    }
    catch(error){
      err.value = getCompany.getError().value;
    }
    finally{
      isLoading.value = false;
    }
  })

</script>
