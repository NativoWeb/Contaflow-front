<template>
  <!-- Título -->
  <div class="m-w-[1577px] mx-auto p-4 md:p-6">
    <!-- Título de la página -->
    <div class="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-xl p-4 shadow-sm">
      <h2 class="text-xl md:text-2xl font-bold text-blue-800 text-center md:text-left">
        Registro de Cliente PYMES
      </h2>
    </div>

  <form @submit.prevent="addClient" class="bg-white rounded-b-xl shadow-sm p-6 md:p-8">

    <div class="p-6 flex flex-col gap-6 mb-6">
      <div class="flex-1">
        <label for="nit" class="block uppercase tracking-wide text-blue-800 text-xs font-bold mb-2">NIT *</label>
        <input 
          v-model="clientForm.nit"
          @input="validateNit"
          type="text" 
          id="nit" 
          class="w-full bg-gray-50 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 focus:outline-none focus:bg-white focus:border-blue-500 transition-colors duration-200" 
          placeholder="Ingrese el NIT"
          required 
        />
      <p v-if="error.nit" class="text-red-500 text-xs mt-1">{{ error.nit }}</p>
    </div>
    
    <div class="flex-1">
      <label for="email" class="block uppercase tracking-wide text-blue-800 text-xs font-bold mb-2">Correo Electrónico *</label>
      <input 
        v-model="clientForm.username"
        @input="validateUseranme"
        type="email" 
        id="email" 
        class="w-full bg-gray-50 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 focus:outline-none focus:bg-white focus:border-blue-500 transition-colors duration-200" 
        placeholder="Ingrese el correo electronico" 
        required 
      />
      <p v-if="error.username" class="text-red-500 text-xs mt-1">{{ error.username }}</p>
    </div>
    
    <div class="flex-1">
      <label for="name" class="block uppercase tracking-wide text-blue-800 text-xs font-bold mb-2">Razón Social *</label>
      <input 
        v-model="clientForm.name"
        @input="validateName"
        type="text" 
        id="name" 
        class="w-full bg-gray-50 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 focus:outline-none focus:bg-white focus:border-blue-500 transition-colors duration-200" 
        placeholder="Ingrese la razón social" 
        required 
      />
      <p v-if="error.name" class="text-red-500 text-xs mt-1">{{ error.name }}</p>
    </div>

  <!-- Fila: Dirección + Sector Económico -->
    <div class="flex-1">
      <label for="address" class="block uppercase tracking-wide text-blue-800 text-xs font-bold mb-2">Dirección *</label>

      <input 
        v-model="clientForm.address"
        @input="validateAddress"
        type="text" 
        id="address" 
        class="w-full bg-gray-50 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 focus:outline-none focus:bg-white focus:border-blue-500 transition-colors duration-200" 
        placeholder="Ingrese la dirección" 
        required 
      />
      <p v-if="error.address" class="text-red-500 text-xs mt-1">{{ error.address }}</p>
    </div>
    
    <div class="flex-1">
      <label for="sector" class="block uppercase tracking-wide text-blue-800 text-xs font-bold mb-2">Sector económico *</label>

      <select
        v-model="clientForm.sector"
        id="sector"
        class="w-full bg-gray-50 border border-gray-200 text-gray-700 py-3 px-4 rounded-lg focus:outline-none focus:bg-white focus:border-blue-500 transition-colors duration-200"
        required
      >
        <option selected disabled>Seleccione un sector económico</option>
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

    <h2 class="text-lg font-bold text-[#2A5CAA] text-left">
      Información del director ejecutivo
    </h2>
    
    <!-- Primera fila -->
    <div class="flex-1">
      <label for="first_name" class="block uppercase tracking-wide text-blue-800 text-xs font-bold mb-2">Nombres * </label>
      <input 
      v-model="clientForm.first_name"
      @input="validateFirstName"
      type="text" 
      id="first_name"
      class="w-full bg-gray-50 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 focus:outline-none focus:bg-white focus:border-blue-500 transition-colors duration-200"
      placeholder="Ingrese el nombre del director" 
      required 
      />

      <p v-if="error.first_name" class="text-red-500 text-xs mt-1">{{ error.first_name }}</p>
    </div>
    
    <div class="flex-1">
      <label for="last_name" class="block uppercase tracking-wide text-blue-800 text-xs font-bold mb-2">Apellidos *</label>
      <input 
      v-model="clientForm.last_name"
      @input="validateLastName"
        type="text" 
        id="last_name" 
        class="w-full bg-gray-50 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 focus:outline-none focus:bg-white focus:border-blue-500 transition-colors duration-200"
        placeholder="Ingrese el apellido del director" 
        required 
        />
  
        <p v-if="error.last_name" class="text-red-500 text-xs mt-1">{{ error.last_name }}</p>
      </div>
      
      <div class="flex-1">
        <label for="id_type" class="block uppercase tracking-wide text-blue-800 text-xs font-bold mb-2">Tipo de Identificación *</label>

        <select
        v-model="clientForm.id_type"
        id="id_type"
        class="w-full bg-gray-50 border border-gray-200 text-gray-700 py-3 px-4 rounded-lg focus:outline-none focus:bg-white focus:border-blue-500 transition-colors duration-200"
        required
        >
        <option disabled selected>Seleccione un tipo de cedula</option>
        <option value="Cedula_Ciudadania">Cédula de ciudadanía</option>
        <option value="Cedula_Extranjeria">Cédula de extranjería</option>
      </select>

    </div>
  </div>
  
  <!-- Segunda fila -->
    <div class="flex-1">
      <label for="id_number" class="block uppercase tracking-wide text-blue-800 text-xs font-bold mb-2">Número de Identificación *</label>
      <input 
      v-model="clientForm.id_number"
      @input="validateIdentificationNumber"
      type="text" 
      id="id_number"
      class="w-full bg-gray-50 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 focus:outline-none focus:bg-white focus:border-blue-500 transition-colors duration-200"
      placeholder="Numero de Identificación" 
      required 
      />
      <p v-if="error.id_number" class="text-red-500 text-xs mt-1">{{ error.id_number }}</p>
    </div>
    
    <div class="flex-1">
      <label for="phone_number" class="block uppercase tracking-wide text-blue-800 text-xs font-bold mb-2">Número de celular *</label>

      <input 
      v-model="clientForm.phone_number"
      @input="validatePhoneNumber"
      type="text" 
      id="phone_number" 
      class="w-full bg-gray-50 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 focus:outline-none focus:bg-white focus:border-blue-500 transition-colors duration-200" 
      placeholder="Numero de telefono" 
      required 
      />
      <p v-if="error.phone_number" class="text-red-500 text-xs mt-1">{{ error.phone_number }}</p>
    </div>
    
    <div class="flex justify-end mt-8">
      <button
      :disabled="isFormInvalid"
      type="submit"
       class="bg-blue-800 hover:bg-blue-900 text-white font-medium py-3 px-8 rounded-lg shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        :class="{'opacity-50 cursor-not-allowed': isFormInvalid}"
      >
      Añadir Cliente
    </button>
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
  <div v-if="modalVisible" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[100]"
  :class="{'scale-100': modalVisible}">
    <div class="bg-white p-6 shadow-lg w-96 relative rounded-tl-3xl">
      <button @click="closeModal()" class="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-3xl w-10 h-10 flex items-center justify-center">&times;</button>
      <p class="text-[#2A5CAA] font-bold mb-4 text-center">¡Empresa agregada!</p>
      <p class="text-gray-800 font-medium mb-4 text-center">
        La empresa <span class="font-bold">{{ clientForm.name }}</span> fue registrada exitosamente en ContaFlow.
      </p>
    </div>
  </div>
  
  <!-- Modal de error -->
  <div v-if="err" class="fixed top-0 left-0 right-0 z-50 w-full h-full flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto md:inset-0 transition-all duration-500 ease-in-out transform scale-0" :class="{'scale-100': err}">
    <div class="relative w-full max-w-lg bg-white p-6 transform transition-all duration-600 ease-in-out">
      <div class="relative bg-white rounded-lg dark:bg-gray-800">
        <div class="flex items-center justify-between p-4">
          <h3 class="text-2xl font-semibold text-red-600 dark:text-red-400">¡Error!</h3>
          <button @click="closeModal()" class="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-3xl w-10 h-10 flex items-center justify-center rounded-full transition-colors duration-300">&times;</button>
        </div>
        <div class="p-8 text-center space-y-4">
          <p class="text-lg text-gray-700 dark:text-gray-300"><strong>{{ err }}</strong></p>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>


<script setup>
  import UserService from "@/services/userService";
  import { computed, reactive } from "vue";
  
  const sendEmailService = new UserService();
  const modalVisible = sendEmailService.getModal();
  const err = sendEmailService.getError();
  const isLoading = sendEmailService.getLoader();
  const VUE_APP_URL = process.env.VUE_APP_URL;
  const nitRegex = /^\d{7,8}-\d{1}$/;
  const nameRegex =  /^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s]+$/; // Permite letras, espacios y tildes
  const addressRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s.#-]+$/;
  const id_numberRegex = /^[0-9]{7,10}$/; // Solo números, minimo 7 y máximo 10 caracteres
  const phoneRegex = /^[0-9]{10,10}$/; // Solo números, máximo 10 caracteres
  const usernameRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  // Formato de email

  const clientForm = reactive({
    nit: "",
    name: "",
    address: "",
    sector: "Seleccione un sector",
    first_name: "",
    last_name: "",
    id_type: 'Seleccione una opción',
    id_number: "",
    phone_number: "",
    username: "",
    status: 'Pendiente',
    role: 'CLIENTE',
    accountants: [],
    auditors: [],
    conciliations: []
  });

  const error = reactive({
    nit: "",
    name: "",
    address: "",
    username: "",
    id_number: "",
    first_name: "",
    last_name: "",
    phone_number: "",
  });

  const validateNit = () => {
    if (!clientForm.nit.trim()) error.nit = "El NIT es obligatorio";
    else if (!nitRegex.test(clientForm.nit)) error.nit = "El formato del NIT no es válido. Ejemplo: 12345678-9";
    else error.nit = "";
  }

  const validateName = () => {
    if (!clientForm.name.trim()) error.name = "La razón social es obligatoria";
    else if (!nameRegex.test(clientForm.name)) error.name = "La razón social no es válida";
    else error.name = "";
  }

  const validateUseranme = () => {
    if (!clientForm.username.trim()) error.username = "El correo electronico es obligatorio";
    else if (!usernameRegex.test(clientForm.username)) error.username = "El correo electronico no es válido";
    else error.username = "";
  }

  const validateAddress = () => {
    if (!clientForm.address.trim()) error.address = "La dirección es obligatoria";
    else if (!addressRegex.test(clientForm.address)) error.address = "La dirección no es válida";
    else error.address = "";
  }

  const validateFirstName = () => {
    if (!clientForm.first_name.trim()) error.first_name = "El nombre solo puede contener letras.";
    else if (!nameRegex.test(clientForm.first_name)) error.first_name = "La dirección no es válida";
    else error.first_name = "";
  }

  const validateLastName = () => {
    if (!clientForm.last_name.trim()) error.last_name = "El apellido solo puede contener letras";
    else if (!nameRegex.test(clientForm.last_name)) error.last_name = "La dirección no es válida";
    else error.last_name = "";
  }

  const validateIdentificationNumber = () => {
    if (!clientForm.id_number.trim()) error.id_number = "Ingrese un número válido de identificación.";
    else if (!id_numberRegex.test(clientForm.id_number)) error.id_number = "El número no es válido";
    else error.id_number = "";
  }

  const validatePhoneNumber = () => {
    if (!clientForm.phone_number.trim()) error.phone_number = "Ingrese un número de celular válido.";
    else if (!phoneRegex.test(clientForm.phone_number)) error.phone_number = "El número de celular no es válido";
    else error.phone_number = "";
  }

  const isFormInvalid = computed(() => {
    return (
      !clientForm.nit.trim() ||
      !clientForm.name.trim() ||
      !clientForm.address.trim() ||
      !clientForm.username.trim() ||
      !clientForm.first_name.trim() ||
      !clientForm.last_name.trim() ||
      !clientForm.id_number.trim() ||
      !clientForm.phone_number.trim() ||

      Object.values(error).some(error => error !== "")
    )
  })

  const closeModal = () => {
    modalVisible.value = false;
    err.value = false;
    location.reload();
  }

  const toggle = () => {
    modalVisible.value = true;
  }

  async function addClient(){
    if (isFormInvalid.value) return;

    const url = `${VUE_APP_URL}/clients/email/`;
    const data = clientForm;
    
    sendEmailService.sendEmail(url, data, toggle, 'POST');
  }
</script>