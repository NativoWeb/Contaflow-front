<template>


<section class=" px-6 py-10 bg-gray-50 rounded-2xl shadow-xl max-w-6xl mx-auto">

<!-- Loader -->
<div v-if="isLoading" class="flex justify-center items-center h-48">
  <img src="@/assets/loader.svg" alt="Cargando..." class="h-24 w-24" />
</div>

<!-- Error -->
<div v-else-if="err" class="text-center text-red-600 font-semibold">
  Error: {{ err }}
</div>

<!-- Contenido -->
<div v-else-if="data" class="space-y-12">
  
  <!-- Título con nombre de empresa -->
  <div class="text-center">
    <h2 class="text-3xl font-extrabold text-[#1F3A8A]">Información de {{ data.name }}</h2>
    <p class="text-gray-500 text-sm mt-1">Detalles generales de la empresa registrada</p>
  </div>

  <!-- Contenedor de info tipo card -->
  <div class="grid md:grid-cols-2 gap-10">

    <!-- Información de la Empresa -->
    <div class="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
      <h3 class="text-xl font-semibold text-[#1F3A8A] mb-4 border-b pb-2">Datos de la Empresa</h3>

      <div class="flex justify-between text-sm">
        <span class="font-semibold text-gray-700">NIT:</span>
        <span>{{ data.nit }}</span>
      </div>

      <div class="flex justify-between text-sm">
        <span class="font-semibold text-gray-700">Dirección:</span>
        <span>{{ data.address }}</span>
      </div>

      <div class="flex justify-between text-sm">
        <span class="font-semibold text-gray-700">Sector Económico:</span>
        <span>{{ data.sector }}</span>
      </div>

      <div class="flex justify-between text-sm">
        <span class="font-semibold text-gray-700">Correo Empresarial:</span>
        <span>{{ data.email }}</span>
      </div>
    </div>

    <!-- Información del Usuario -->
    <div class="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
      <h3 class="text-xl font-semibold text-[#1F3A8A] mb-4 border-b pb-2">Datos del Usuario</h3>

      <div class="flex justify-between text-sm">
        <span class="font-semibold text-gray-700">Nombres:</span>
        <span>{{ data.nombre }}</span>
      </div>

      <div class="flex justify-between text-sm">
        <span class="font-semibold text-gray-700">Apellidos:</span>
        <span>{{ data.apellido }}</span>
      </div>

      <div class="flex justify-between text-sm">
        <span class="font-semibold text-gray-700">Tipo de Identificación:</span>
        <span>{{ data.id_typo }}</span>
      </div>

      <div class="flex justify-between text-sm">
        <span class="font-semibold text-gray-700">Número de Identificación:</span>
        <span>{{ data.id_number }}</span>
      </div>

      <div class="flex justify-between text-sm">
        <span class="font-semibold text-gray-700">Número de Celular:</span>
        <span>{{ data.phone_number }}</span>
      </div>
    </div>
  </div>

  <!-- Botones alineados a la derecha -->
  <div class="flex justify-end gap-4">
    <EditCompanyModal :infor="data" />
    <DeleteCompanyModal :id="String(data.id)" />
  </div>
</div>
</section>


 <!-- Tablas de conciliaciones y clientes -->
 <section v-if="data" class="mt-6 px-4 sm:px-6 lg:px-8 py-6 bg-white rounded-lg shadow-md max-w-7xl mx-auto">
    <div class="flex flex-col md:flex-row gap-6">
      <ConByCompany :conciliations="data.conciliations_data" />
      <ClientsByCompany :employees="data.clients_data" />
    </div>
  </section>
 
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
