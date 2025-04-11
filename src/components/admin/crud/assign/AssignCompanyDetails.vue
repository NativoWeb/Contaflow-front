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
      <div class="flex flex-col justify-center items-center">
        <!-- Información centrada -->
        <div class="flex flex-col justify-start gap-6">
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
        <button @click="addCompany" class=" mt-4 btn-action">Asignar Empresa</button>
      </div>
    </div>

    <!-- Edit Successfull! -->
    <div v-if="alertEditedModal" 
      tabindex="-1" 
      class="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
      <div class="relative p-5 w-full max-w-md max-h-full">
        <div class="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
          <!-- Contenido del Modal -->
          <div class="p-6 md:p-5 text-center">
            <img src="@/assets/work_added.svg" alt="Icono de SVG convertido" class="mx-auto mb-4 w-20 h-20 dark:text-gray-200">
            <h3 class="mb-2 text-xl font-bold text-[#2A5CAA]">Se asigno la empresa de manera correcta</h3>

            <button @click="isEditedToggle"
                type="button" 
                class="py-3 px-5 ms-3 text-sm font-medium focus:outline-none bg-[#08245B] hover:bg-[#2a4b8d] text-white rounded-lg border">
                Aceptar
            </button>
          </div>
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
</template>


<script setup>
  import { ref, onMounted } from 'vue'
  import { useRoute } from 'vue-router';
  import ClientsByCompany from '../../companies/ClientsByCompany.vue';
  import ConByCompany from '../../companies/ConByCompany.vue';
  import CompaniesService from '@/services/companiesService';
  import UserService from '@/services/userService';
  import router from '@/router';

  const getCompany = new CompaniesService();
  const getUser = new UserService();
  const companyId = useRoute().params.companyId;
  const userId = useRoute().params.id;
  const alertEditedModal = ref("");
  const isLoading = ref(false);
  const data = ref(null);
  const err = ref(null);
  const VUE_APP_URL = process.env.VUE_APP_URL;
  const uri = `/companies/${companyId}/`;
  const urlApi = `${VUE_APP_URL}${uri}`;
  let companiesList = [];
  let companies = ``;

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

  onMounted(async () => {
    try{
      await getUser.getUserById(`${VUE_APP_URL}/clients/${userId}/`);
      data.value = getUser.getData().value;
      companiesList += [data.value.companies];
      companies = companiesList ? companiesList.split(",") : [];
    }
    catch(err){
      err.value = getUser.getError().value;
    }
    finally{
      isLoading.value = false;
    }
  })

  const isEditedToggle = () => {
    isLoading.value = false;
    alertEditedModal.value = !alertEditedModal.value;
    if (alertEditedModal.value == false){
      router.back()
    }
  }

  const addCompany = () => {
    isLoading.value = true;
    companies.push(companyId)
    const uniqueCompanies = [...new Set(companies)];
    getUser.editUser(`${VUE_APP_URL}/clients/update/${userId}/`, { companies: uniqueCompanies }, isEditedToggle)
    isLoading.value = false
  }

</script>
