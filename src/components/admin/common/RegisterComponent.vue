<template>
  <!-- Contenedor principal -->
  <div class="m-w-[1577px] mx-auto p-4 md:p-6">
    <!-- Título de la página -->
    <div class="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-xl p-4 shadow-sm">
      <h2 class="text-xl md:text-2xl font-bold text-blue-800 text-center md:text-left">
        {{ title }}
      </h2>
    </div>

    <!-- Formulario -->
    <form @submit.prevent="addUser" class="bg-white rounded-b-xl shadow-sm p-6 md:p-8">
      <!-- Primera fila -->
      <div class="flex flex-col  gap-6 mb-6">
        <!-- Nombres -->
        <div class="flex-1">
          <label class="block uppercase tracking-wide text-blue-800 text-xs font-bold mb-2">
            Nombres: *
          </label>
          <input 
            v-model="userForm.first_name" 
            @input="validateFirstName"
            class="w-full bg-gray-50 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 focus:outline-none focus:bg-white focus:border-blue-500 transition-colors duration-200"
            type="text" 
            placeholder="Ingrese sus nombres"
            required
          >
          <p v-if="errors.first_name" class="text-red-500 text-xs mt-1">{{ errors.first_name }}</p>
        </div>

        <!-- Apellidos -->
        <div class="flex-1">
          <label class="block uppercase tracking-wide text-blue-800 text-xs font-bold mb-2">
            Apellidos: *
          </label>
          <input 
            v-model="userForm.last_name" 
            @input="validateLastName"
            class="w-full bg-gray-50 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 focus:outline-none focus:bg-white focus:border-blue-500 transition-colors duration-200"
            type="text" 
            placeholder="Ingrese sus apellidos"
          >
          <p v-if="errors.last_name" class="text-red-500 text-xs mt-1">{{ errors.last_name }}</p>
        </div>

        <!-- Tipo de Identificación -->
        <div class="flex-1">
          <label class="block uppercase tracking-wide text-blue-800 text-xs font-bold mb-2">
            Tipo de Identificación: *
          </label>
          <select 
            v-model="userForm.id_type" 
            class="w-full bg-gray-50 border border-gray-200 text-gray-700 py-3 px-4 rounded-lg focus:outline-none focus:bg-white focus:border-blue-500 transition-colors duration-200"
          >
            <option selected disabled>Seleccione una opción</option>
            <option value="Cedula_Ciudadania">Cédula de ciudadanía</option>
            <option value="Cedula_Extranjeria">Cédula de extranjería</option>
          </select>
        </div>
      </div>

      <!-- Segunda fila -->
      <div class="flex flex-col gap-6 mb-6">
        <!-- Número de Identificación -->
        <div class="flex-1">
          <label class="block uppercase tracking-wide text-blue-800 text-xs font-bold mb-2">
            Número de Identificación: *
          </label>
          <input 
            v-model="userForm.id_number" 
            @input="validateIdentificationNumber"
            class="w-full bg-gray-50 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 focus:outline-none focus:bg-white focus:border-blue-500 transition-colors duration-200"
            type="text" 
            placeholder="Ingrese su número de identificación"
          >
          <p v-if="errors.id_number" class="text-red-500 text-xs mt-1">{{ errors.id_number }}</p>
        </div>

        <!-- Número de celular -->
        <div class="flex-1">
          <label class="block uppercase tracking-wide text-blue-800 text-xs font-bold mb-2">
            Número de celular: *
          </label>
          <input 
            v-model="userForm.phone_number" 
            @input="validatePhoneNumber"
            class="w-full bg-gray-50 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 focus:outline-none focus:bg-white focus:border-blue-500 transition-colors duration-200"
            type="text" 
            inputmode="numeric" 
            placeholder="Ingrese su número de celular"
          >
          <p v-if="errors.phone_number" class="text-red-500 text-xs mt-1">{{ errors.phone_number }}</p>
        </div>

        <!-- Correo Electrónico -->
        <div class="flex-1">
          <label class="block uppercase tracking-wide text-blue-800 text-xs font-bold mb-2">
            Correo Electrónico: *
          </label>
          <input 
            v-model="userForm.email" 
            @input="validateEmail"
            class="w-full bg-gray-50 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 focus:outline-none focus:bg-white focus:border-blue-500 transition-colors duration-200"
            type="email" 
            placeholder="Ingrese su correo"
          >
          <p v-if="errors.email" class="text-red-500 text-xs mt-1">{{ errors.username }}</p>
        </div>
      </div>

      <!-- Botón de enviar -->
      <div class="flex justify-end mt-8">
        <button 
          type="submit"
          :disabled="isFormInvalid"
          class="bg-blue-800 hover:bg-blue-900 text-white font-medium py-3 px-8 rounded-lg shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          :class="{'opacity-50 cursor-not-allowed': isFormInvalid}"
        >
          Añadir usuario
        </button>
      </div>
    </form>
  </div>

  <!-- Modal de carga -->
  <div v-if="isLoading" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300">
    <div class="bg-white p-8 rounded-xl shadow-xl flex flex-col items-center">
      <img src="@/assets/loader.svg" alt="Cargando..." class="w-16 h-16 animate-spin">
      <p class="mt-4 text-gray-700">Procesando solicitud...</p>
    </div>
  </div>

  <!-- Modal de éxito -->
  <div v-if="modalVisible" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300">
    <div class="bg-white rounded-xl shadow-xl p-6 max-w-md w-full mx-4">
      <div class="flex justify-end">
        <button 
          @click="closeModal" 
          class="text-gray-500 hover:text-gray-700 transition-colors duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <div class="text-center p-4">
        <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        <h3 class="text-xl font-bold text-blue-800 mb-2">¡Invitación enviada con éxito!</h3>
        <p class="text-gray-700 mb-4">
          El usuario <strong>{{ userForm.first_name }}</strong> ha sido invitado a unirse a ContaFlow con el rol de usuario PYME.
        </p>
        <div class="flex items-center justify-center text-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          Se ha enviado un correo a <strong class="ml-1">{{ userForm.username }}</strong>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal de Error -->
  <div v-if="err" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300">
    <div class="bg-white rounded-xl shadow-xl p-6 max-w-md w-full mx-4">
      <div class="flex justify-between items-center mb-4">
        <div class="flex items-center">
          <div class="mx-auto flex items-center justify-center h-10 w-10 rounded-full bg-red-100 mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-red-600">¡Error!</h3>
        </div>
        <button 
          @click="closeModal" 
          class="text-gray-500 hover:text-gray-700 transition-colors duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <div class="text-center p-4">
        <p class="text-gray-700">
          <strong>{{ err }}</strong>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>

  import UserService from "@/services/userService";
  import { reactive, computed } from "vue";

  const props = defineProps({
    apiUrl: String,
    usersForm: Object,
    title: String,
  })

  const sendEmailService = new UserService();
  const modalVisible = sendEmailService.getModal();
  const err = sendEmailService.getError();
  const isLoading = sendEmailService.getLoader();
  const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;  // Permite letras, espacios y tildes
  const id_numberRegex = /^[0-9]{7,10}$/;  // Solo números, minimo 7 y máximo 10 caracteres
  const phoneRegex = /^[0-9]{10,10}$/;  // Solo números, máximo 10 caracteres
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  // Formato de email


    // Estado del formulario
  const userForm = reactive(props.usersForm);

  // Estado de errores
  const errors = reactive({
  first_name: "",
  last_name: "",
  id_number: "",
  phone_number: "",
  email: "",
  });  


  const closeModal = () => {
    modalVisible.value = false;
    err.value = false;
    location.reload(); 
  };

  // Validaciones
  const validateFirstName = () => {
    errors.first_name = nameRegex.test(userForm.first_name) ? "" : "El nombre solo puede contener letras y espacios.";
  };

  const validateLastName = () => {
    errors.last_name = nameRegex.test(userForm.last_name) ? "" : "El apellido solo puede contener letras y espacios.";
  };

  const validateIdentificationNumber = () => {
    errors.id_number = id_numberRegex.test(userForm.id_number) ? "" : "Ingrese un número válido de identificación.";
  };

  const validatePhoneNumber = () => {
    errors.phone_number = phoneRegex.test(userForm.phone_number) ? "" : "Ingrese un número de celular válido.";
  };

  const validateEmail = () => {
    errors.email = emailRegex.test(userForm.email) ? "" : "Ingrese una dirección de correo electrónico válida.";
  };

  const isFormInvalid = computed(() => {
    return (
      !userForm.first_name?.trim() ||
      !userForm.last_name?.trim() ||
      !userForm.id_type === 'Seleccione una opción' ||
      !userForm.id_number?.trim() ||
      !userForm.phone_number?.trim() ||
      !userForm.email?.trim()||
      Object.values(errors).some(error => error !== "")
    );
  });

  const toggle = () => {
    modalVisible.value = true;
  }

  function addUser() {
    if (isFormInvalid.value) return; // No hacer nada si el formulario está inválido
    userForm.username = userForm.email; 
    sendEmailService.sendEmail(props.apiUrl, userForm, toggle, 'POST');
  }
</script>