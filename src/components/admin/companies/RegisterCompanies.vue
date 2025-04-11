<template>
  <!-- Título -->
  <h2 class="text-xl font-bold bg-gradient-to-r from-[#F8F8F8] to-[#E5EAFF] text-[#2A5CAA] p-4 text-center md:text-left" style="border-radius: 8px 8px 0 0;" >
    Registro de Empresas
  </h2>

  <form class="w-full p-6 bg-white" style="border-radius: 0 0 8px 8px;" @submit.prevent="addCompany">
    <!-- Primera fila -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div>
        <label class="block uppercase tracking-wide text-[#193368] text-xs font-bold mb-2">
          NIT:
        </label>
        <input 
          @input="validateNit"
          v-model="companyForm.nit" 
          class="w-full bg-[#F5F5F5] text-gray-700 border border-gray-300 rounded-full py-3 px-4 focus:outline-none focus:bg-white focus:border-gray-500" 
          type="text" 
          placeholder="Ingrese su NIT"
        >
        <p v-if="error.nit" class="text-red-500 text-xs mt-1">{{ error.nit }}</p>
      </div>
      <div>
        <label class="block uppercase tracking-wide text-[#193368] text-xs font-bold mb-2">
          Razón Social:
        </label>
        <input 
          @input="validateName"
          v-model="companyForm.name" 
          class="w-full bg-[#F5F5F5] text-gray-700 border border-gray-300 rounded-full py-3 px-4 focus:outline-none focus:bg-white focus:border-gray-500" 
          type="text" 
          placeholder="Ingrese la Razón Social"
        >
        <p v-if="error.name" class="text-red-500 text-xs mt-1">{{ error.name }}</p>
      </div>
      <div>
        <label class="block uppercase tracking-wide text-[#193368] text-xs font-bold mb-2">
          Dirección:
        </label>
        <input 
          @input="validateAddress"
          v-model="companyForm.address" 
          class="w-full bg-[#F5F5F5] text-gray-700 border border-gray-300 rounded-full py-3 px-4 focus:outline-none focus:bg-white focus:border-gray-500" 
          type="text" 
          placeholder="Ingrese la Dirección"
        >
        <p v-if="error.address" class="text-red-500 text-xs mt-1">{{ error.address }}</p>
      </div>
    </div>

    <!-- Segunda fila -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
      <div>
        <label class="block uppercase tracking-wide text-[#193368] text-xs font-bold mb-2">
          Sector económico:
        </label>
        <div class="">
          <select 
            v-model="companyForm.sector" 
            class="w-full bg-[#F5F5F5] border border-gray-300 text-[#08245B] py-3 px-4 rounded-full focus:outline-none focus:bg-white focus:border-gray-500"
          >
            <option value="">Seleccione un sector</option>
            <option value="Comercio y Ventas">Comercio y Ventas</option>
            <option value="Restaurantes y Gastronomia">Restaurantes y Gastronomía</option>
            <option value="Construccion e Infraestructura">Construcción e Infraestructura</option>
            <option value="Servicios Profesionales">Servicios Profesionales</option>
            <option value="Finanzas y Seguros">Finanzas y Seguros</option>
            <option value="Industria y Manufactura">Industria y Manufactura</option>
            <option value="Transporte y Logistica">Transporte y Logística</option>
            <option value="Salud y Medicina">Salud y Medicina</option>
            <option value="Educacion y Formacion">Educación y Formación</option>
            <option value="Tecnologia e Informatica">Tecnología e Informática</option>
          </select>
        </div>
      </div>
      <div class="flex items-end">
        <button 
          :disabled="isFormInvalid"
          type="submit" 
          class="w-full bg-[#08245B] text-white font-bold py-3 px-4 rounded-full shadow-md shadow-gray-500/50 focus:outline-none focus:shadow-outline"
          :class="{
            'hover:bg-[#2a4b8d]': !isFormInvalid,
            'text-gray-500 cursor-not-allowed': isFormInvalid
          }">
          Añadir Empresa
        </button>
      </div>
    </div>
  </form>

  <!-- Modal -->
  <div v-if="isLoading" 
    class="fixed top-0 left-0 right-0 z-50 w-full h-full flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto md:inset-0 transition-all duration-500 ease-in-out transform scale-0"
    :class="{'scale-100': isLoading}">
    <div class="relative w-full max-w-lg  p-6 transform transition-all duration-600 ease-in-out">
      <!-- Modal content -->
      <div class="relative dark:bg-gray-800">
        <!-- Modal body -->
        <div class="p-8 text-center space-y-4">
          <img src="@/assets/loader.svg" alt="">
        </div>
      </div>
    </div>
  </div>


  <!-- Modal -->
  <div v-if="isResponse" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[100]">
    <div class="bg-white p-6 shadow-lg w-96 relative rounded-tl-3xl">
      <button @click="closeResponseModal()" 
        class="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-3xl w-10 h-10 flex items-center justify-center">
        &times;
      </button>
      <p class="text-[#2A5CAA] font-bold mb-4 text-center">
        ¡Empresa agregada!
      </p>
      <p class="text-gray-800 font-medium mb-4 text-center">
        La empresa <span class="font-bold">{{ companyForm.name }}</span> fue registrada exitosamente en ContaFlow.
      </p>
    </div>
  </div>

  <!-- Modal de Error -->
  <div v-if="isError" 
    class="fixed top-0 left-0 right-0 z-50 w-full h-full flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto md:inset-0 transition-all duration-500 ease-in-out transform scale-0"
    :class="{'scale-100': isError}">
    <div class="relative w-full max-w-lg bg-white p-6 transform transition-all duration-600 ease-in-out">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg dark:bg-gray-800">
            <!-- Modal header -->
            <div class="flex items-center justify-between p-4">
                <h3 class="text-2xl font-semibold text-red-600 dark:text-red-400">¡Error!</h3>
                <button @click="closeErrorModal()" 
                    class="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-3xl w-10 h-10 flex items-center justify-center rounded-full transition-colors duration-300">
                    &times;
                </button>
            </div>
            <!-- Modal body -->
            <div class="p-8 text-center space-y-4">
                <p class="text-lg text-gray-700 dark:text-gray-300">
                    <strong>{{ errorMessage }}</strong>
                </p>
            </div>
        </div>
    </div>
  </div>
</template>


<script setup>
  import CompaniesService from "@/services/companiesService";
  import { computed, reactive, ref } from "vue";

  const companyService = new CompaniesService();
  const isLoading = ref(false);
  const isResponse = ref(false);
  const isError = ref(false);
  const errorResponse = ref(null);
  const VUE_APP_URL = process.env.VUE_APP_URL;
  const nitRegex = /^\d{7,8}-\d{1}$/;
  const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;  // Permite letras, espacios y tildes
  const addressRegex = /^[a-zA-Z0-9\s,.-]+$/;

  const companyForm = reactive({
    nit: "",
    name: "",
    address: "",
    sector: "",
    clients: [],
    conciliations: []
  });

  const error = reactive({
    nit: "",
    name: "",
    address: ""
  });

  // validacione
  const validateNit = () => {
    if (!companyForm.nit.trim()) 
    error.nit = "El NIT es obligatorio";
    else if (!nitRegex.test(companyForm.nit)) 
    error.nit = "El formato del NIT no es válido. Ejemplo: 12345678-9";
    else 
    error.nit = "";
  }

  const validateName = () => {
    if (!companyForm.name.trim()) error.name = "La razón social es obligatoria";
    else if (!nameRegex.test(companyForm.name)) error.name = "La razón social no es válida";
    else error.name = "";
  }

  const validateAddress = () => {
    if (!companyForm.address.trim()) error.address = "La dirección es obligatoria";
    else if (!addressRegex.test(companyForm.address)) error.address = "La dirección no es válida";
    else error.address = "";
  }


  const isFormInvalid = computed(() => {
    return (
      !companyForm.nit.trim() ||
      !companyForm.name.trim() ||
      !companyForm.address.trim() ||
      !companyForm.sector.trim() ||
      Object.values(error).some(error => error !== "")
    )
  })

  const closeErrorModal = () => {
    isError.value = !isError.value;
    location.reload();
  }

  const closeResponseModal = () => {
    isResponse.value = !isResponse.value;
    location.reload()
  }

  async function addCompany(){
    isLoading.value = true;
    const url = `${VUE_APP_URL}/companies/register/`;
    const data = companyForm;

    try {
      await companyService.addCompany(url, data);
      isResponse.value = true;
    }
    catch(err){
      isResponse.value = false;
      isError.value = true;
      errorResponse.value = companyService.getError().value;
    }
    finally{
      isLoading.value = false;
    }
  }
</script>