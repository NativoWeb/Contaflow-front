<template>
  <!-- Título -->
  <form @submit.prevent="addCompany" :style="{ borderRadius: '0 0 8px 8px' }">
    <h2 class="text-xl font-bold bg-gradient-to-r from-[#F8F8F8] to-[#E5EAFF] text-[#2A5CAA] p-4 text-center md:text-left rounded-t-lg">
      Registro de Empresas
    </h2>
    <div class="w-full p-6 bg-white">
      <!-- Primera fila -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div>
          <label for="nit" class="block uppercase tracking-wide text-[#193368] text-xs font-bold mb-2">NIT:</label>
          <input
            v-model="companyForm.nit"
            @input="validateNit"
            id="nit"
            type="text"
            class="w-full bg-[#F5F5F5] text-gray-700 border border-gray-300 rounded-full py-3 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
            placeholder="Ingrese su NIT"
            aria-describedby="nitHelp"
          >
          <p v-if="error.nit" class="text-red-500 text-xs mt-1">{{ error.nit }}</p>
        </div>

        <div>
          <label for="name" class="block uppercase tracking-wide text-[#193368] text-xs font-bold mb-2">Razón Social:</label>
          <input
            v-model="companyForm.name"
            @input="validateName"
            id="name"
            type="text"
            class="w-full bg-[#F5F5F5] text-gray-700 border border-gray-300 rounded-full py-3 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
            placeholder="Ingrese la Razón Social"
            aria-describedby="nameHelp"
          >
          <p v-if="error.name" class="text-red-500 text-xs mt-1">{{ error.name }}</p>
        </div>

        <div>
          <label for="address" class="block uppercase tracking-wide text-[#193368] text-xs font-bold mb-2">Dirección:</label>
          <input
            v-model="companyForm.address"
            @input="validateAddress"
            id="address"
            type="text"
            class="w-full bg-[#F5F5F5] text-gray-700 border border-gray-300 rounded-full py-3 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
            placeholder="Ingrese la Dirección"
            aria-describedby="addressHelp"
          >
          <p v-if="error.address" class="text-red-500 text-xs mt-1">{{ error.address }}</p>
        </div>
      </div>

      <!-- Segunda fila -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
        <div>
          <label for="sector" class="block uppercase tracking-wide text-[#193368] text-xs font-bold mb-2">Sector económico:</label>
          <select
            v-model="companyForm.sector"
            id="sector"
            class="w-full bg-[#F5F5F5] border border-gray-300 text-[#08245B] py-3 px-4 rounded-full focus:outline-none focus:bg-white focus:border-gray-500"
            aria-describedby="sectorHelp"
          >
            <option value="">Seleccione un sector111</option>
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

        <div>
          <label for="email" class="block uppercase tracking-wide text-[#193368] text-xs font-bold mb-2">Correo Empresarial:</label>
          <input
            v-model="companyForm.email"
            @input="validateEmail"
            id="email"
            type="email"
            class="w-full bg-[#F5F5F5] text-gray-700 border border-gray-300 rounded-full py-3 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
            placeholder="Ingrese su correo"
            aria-describedby="emailHelp"
          >
          <p v-if="error.email" class="text-red-500 text-xs mt-1">{{ error.email }}</p>
        </div>
      </div>
    </div>

    <h2 class="text-lg font-bold text-[#2A5CAA] bg-white p-3 text-center md:text-left">
      Información del director ejecutivo
    </h2>

    <div class="w-full p-6 bg-white">
      <!-- Primera fila -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div>
          <label for="first_name" class="block uppercase tracking-wide text-[#193368] text-xs font-bold mb-2">Nombres:</label>
          <input
            v-model="companyForm.first_name"
            @input="validateFirstName"
            id="first_name"
            type="text"
            class="w-full bg-[#F5F5F5] text-gray-700 border border-gray-300 rounded-full py-3 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
            placeholder="Ingrese sus nombres"
            aria-describedby="firstNameHelp"
          >
          <p v-if="error.first_name" class="text-red-500 text-xs mt-1">{{ error.first_name }}</p>
        </div>

        <div>
          <label for="last_name" class="block uppercase tracking-wide text-[#193368] text-xs font-bold mb-2">Apellidos:</label>
          <input
            v-model="companyForm.last_name"
            @input="validateLastName"
            id="last_name"
            type="text"
            class="w-full bg-[#F5F5F5] text-gray-700 border border-gray-300 rounded-full py-3 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
            placeholder="Ingrese sus apellidos"
            aria-describedby="lastNameHelp"
          >
          <p v-if="error.last_name" class="text-red-500 text-xs mt-1">{{ error.last_name }}</p>
        </div>

        <div>
          <label for="sector" class="block uppercase tracking-wide text-[#193368] text-xs font-bold mb-2">Tipo de Identificación:</label>
          <select
            v-model="companyForm.id_type"
            id="sector"
            class="w-full bg-[#F5F5F5] border border-gray-300 text-[#08245B] py-3 px-4 rounded-full focus:outline-none focus:bg-white focus:border-gray-500"
            aria-describedby="sectorHelp"
          >
            <option value="">Seleccione</option>
            <option value="Cedula_Ciudadania">Cédula de ciudadanía</option>
            <option value="Cedula_Extranjeria">Cédula de extranjería</option>
          </select>
        </div>
      </div>

      <!-- Segunda fila -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
        <div>
          <label for="id_number" class="block uppercase tracking-wide text-[#193368] text-xs font-bold mb-2">Número de Identificación:</label>
          <input
            v-model="companyForm.id_number"
            @input="validateIdentificationNumber"
            id="id_number"
            type="text"
            class="w-full bg-[#F5F5F5] text-gray-700 border border-gray-300 rounded-full py-3 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
            placeholder="Ingrese el número de identificación"
            aria-describedby="idNumberHelp"
          >
          <p v-if="error.id_number" class="text-red-500 text-xs mt-1">{{ error.id_number }}</p>
        </div>

        <div>
          <label for="phone_number" class="block uppercase tracking-wide text-[#193368] text-xs font-bold mb-2">Número de celular:</label>
          <input
            v-model="companyForm.phone_number"
            @input="validatePhoneNumber"
            id="phone_number"
            type="text"
            class="w-full bg-[#F5F5F5] text-gray-700 border border-gray-300 rounded-full py-3 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
            placeholder="Ingrese el número de celular"
            aria-describedby="phoneHelp"
          >
          <p v-if="error.phone_number" class="text-red-500 text-xs mt-1">{{ error.phone_number }}</p>
        </div>

        <div class="flex items-end">
          <button
            :disabled="isFormInvalid"
            type="submit"
            class="w-full bg-[#08245B] text-white font-bold py-3 px-4 rounded-full shadow-md shadow-gray-500/50 focus:outline-none focus:shadow-outline"
            :class="{
              'hover:bg-[#2a4b8d]': !isFormInvalid,
              'text-gray-500 cursor-not-allowed': isFormInvalid
            }"
          >
            Añadir Empresa
          </button>

        </div>
      </div>
    </div>
  </form>
  
  <!-- Modal de carga -->
  <div v-if="isLoading" class="fixed top-0 left-0 right-0 z-50 w-full h-full flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto md:inset-0 transition-all duration-500 ease-in-out transform scale-0" :class="{'scale-100': isLoading}">
    <div class="relative w-full max-w-lg p-6 transform transition-all duration-600 ease-in-out">
      <div class="relative dark:bg-gray-800">
        <div class="p-8 text-center space-y-4">
          <img src="@/assets/loader.svg" alt="Cargando...">
        </div>
      </div>
    </div>
  </div>

  <!-- Modal de éxito -->
  <div v-if="isResponse" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[100]">
    <div class="bg-white p-6 shadow-lg w-96 relative rounded-tl-3xl">
      <button @click="closeResponseModal()" class="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-3xl w-10 h-10 flex items-center justify-center">&times;</button>
      <p class="text-[#2A5CAA] font-bold mb-4 text-center">¡Empresa agregada!</p>
      <p class="text-gray-800 font-medium mb-4 text-center">
        La empresa <span class="font-bold">{{ companyForm.name }}</span> fue registrada exitosamente en ContaFlow.
      </p>
    </div>
  </div>

  <!-- Modal de error -->
  <div v-if="isError" class="fixed top-0 left-0 right-0 z-50 w-full h-full flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto md:inset-0 transition-all duration-500 ease-in-out transform scale-0" :class="{'scale-100': isError}">
    <div class="relative w-full max-w-lg bg-white p-6 transform transition-all duration-600 ease-in-out">
      <div class="relative bg-white rounded-lg dark:bg-gray-800">
        <div class="flex items-center justify-between p-4">
          <h3 class="text-2xl font-semibold text-red-600 dark:text-red-400">¡Error!</h3>
          <button @click="closeErrorModal()" class="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-3xl w-10 h-10 flex items-center justify-center rounded-full transition-colors duration-300">&times;</button>
        </div>
        <div class="p-8 text-center space-y-4">
          <p class="text-lg text-gray-700 dark:text-gray-300"><strong>{{ errorMessage }}</strong></p>
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
  const nameRegex =  /^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s]+$/;  // Permite letras, espacios y tildes
  const addressRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s.#-]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  // Formato de email
  const id_numberRegex = /^[0-9]{7,10}$/;  // Solo números, minimo 7 y máximo 10 caracteres
  const phoneRegex = /^[0-9]{10,10}$/;  // Solo números, máximo 10 caracteres


  const companyForm = reactive({
    nit: "",
    name: "",
    address: "",
    sector: "",
    email: "",
    first_name: "",
    last_name: "",
    id_type: 'Seleccione una opción',
    id_number: "",
    phone_number: "",

    clients: [],
    conciliations: []
  });

  const error = reactive({
    nit: "",
    name: "",
    address: "",
    email: "",
    first_name: "",
    last_name: "",
    id_number: "",
    phone_number: ""
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

  const validateEmail = () => {
    if (!companyForm.email.trim()) error.email = "Ingrese una dirección de correo electrónico válida.";
    else if (!emailRegex.test(companyForm.email)) error.email = "La dirección no es válida";
    else error.email = "";
  }

  const validateFirstName = () => {
    if (!companyForm.first_name.trim()) error.first_name = "El nombre solo puede contener letras.";
    else if (!nameRegex.test(companyForm.first_name)) error.first_name = "La dirección no es válida";
    else error.email = "";
  }

  const validateLastName = () => {
    if (!companyForm.last_name.trim()) error.last_name = "El apellido solo puede contener letras";
    else if (!nameRegex.test(companyForm.last_name)) error.last_name = "La dirección no es válida";
    else error.last_name = "";
  }

  const validateIdentificationNumber = () => {
    if (!companyForm.id_number.trim()) error.id_number = "Ingrese un número válido de identificación.";
    else if (!id_numberRegex.test(companyForm.id_number)) error.id_number = "El número no es válido";
    else error.id_number = "";
  }

  const validatePhoneNumber = () => {
    if (!companyForm.phone_number.trim()) error.phone_number = "Ingrese un número de celular válido.";
    else if (!phoneRegex.test(companyForm.phone_number)) error.phone_number = "El número de celular no es válido";
    else error.phone_number = "";
  }



  const isFormInvalid = computed(() => {
    return (
      !companyForm.nit.trim() ||
      !companyForm.name.trim() ||
      !companyForm.address.trim() ||
      !companyForm.sector.trim() ||
      !companyForm.email.trim() ||
      !companyForm.first_name.trim() ||
      !companyForm.last_name.trim() ||
      !companyForm.id_type.trim() ||
      !companyForm.id_number.trim() ||
      !companyForm.phone_number.trim() ||
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