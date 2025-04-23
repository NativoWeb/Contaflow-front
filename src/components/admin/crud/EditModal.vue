<template>
  <button @click="toggleShowEditModal" class="btn-action">Editar</button>
    <!-- Modal para Editar -->
  <div v-if="showEditModal" 
    class="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50 p-4">
  <div class="p-10 relative w-full max-w-3xl bg-white rounded-lg shadow-lg dark:bg-gray-800">
    <!-- Encabezado -->
    <div>
      <h3 class="text-xl font-semibold text-[#2A5CAA]">{{ title }}</h3>
    </div>

    <!-- Contenido -->
    <div class="space-y-1 p-2">
      <form @submit.prevent="submitEdit">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-semibold text-[#193368]">Nombres:</label>
            <input v-model="editUser.first_name" @input="validateFirstName" type="text" class="text-left text-[#193368] w-full bg-gray-100 border border-gray-300 rounded-full py-2 px-3">
            <p v-if="errors.first_name" class="text-red-500 text-xs mt-1">{{ errors.first_name }}</p>
          </div>

          <div>
            <label class="block text-sm font-semibold text-[#193368]">Apellidos:</label>
            <input v-model="editUser.last_name" @input="validateLastName" type="text" class="text-left text-[#193368] w-full bg-gray-100 border border-gray-300 rounded-full py-2 px-3">
            <p v-if="errors.last_name" class="text-red-500 text-xs mt-1">{{ errors.last_name }}</p>
          </div>
          <div>
            <label class="block text-sm font-semibold text-[#193368]">Tipo de Identificación:</label>
            <p v-if="user.id_type == 'Cedula_Ciudadania'" class="text-left w-full bg-gray-100 border border-gray-300 rounded-full py-2 px-3">Cedula de Ciudadania</p>
            <p v-if="user.id_type == 'Cedula_Extranjeria'" class="text-left w-full bg-gray-100 border border-gray-300 rounded-full py-2 px-3">Cedula de Extranjeria</p>
            <p v-if="user.id_type == 'Pasaporte'" class="text-left w-full bg-gray-100 border border-gray-300 rounded-full py-2 px-3">Pasaporte></p>
          </div>
          <div>
            <label class="block text-sm font-semibold text-[#193368]">Número de Identificación:</label>
            <p class="text-left w-full bg-gray-100 border border-gray-300 rounded-full py-2 px-3">{{ user.id_number }}</p>
          </div>
          <div>
            <label class="block text-sm font-semibold text-[#193368]">Número de Celular:</label>
            <input v-model="editUser.phone_number" @input="validatePhoneNumber" type="text" class="text-left text-[#193368] w-full bg-gray-100 border border-gray-300 rounded-full py-2 px-3">
            <p v-if="errors.phone_number" class="text-red-500 text-xs mt-1">{{ errors.phone_number }}</p>
          </div>
          <div>
            <label class="block text-sm font-semibold text-[#193368]">Correo Electrónico:</label>
            <input v-model="editUser.username" @input="validateEmail" type="email" class="text-left w-full text-[#193368] bg-gray-100 border border-gray-300 rounded-full py-2 px-3">
            <p v-if="errors.username" class="text-red-500 text-xs mt-1">{{ errors.username }}</p>
          </div>
        </div>

            <!-- Botones -->
        <div class="flex justify-center space-x-3 p-5 dark:border-gray-700">
          <button @click="toggleShowEditModal"
            class="px-5 py-2.5 text-[#193368] bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 
              focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 
              dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
            Cancelar
          </button>
          <button type="submit"
          :disabled="hasNoChange"
          class="py-3 px-5 ms-3 text-sm font-medium focus:outline-none bg-[#08245B] hover:bg-[#2a4b8d] text-white rounded-lg border"
          :class="{
            'hover:bg-[#2a4b8d]': !hasNoChange,
            'text-gray-500 cursor-not-allowed': hasNoChange
          }">
          
          <span class="text-white">
            Confirmar
          </span>
        </button>
        </div>
      </form>
      
    </div>
  </div>
</div>

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

  <!-- Edit Successfull! -->
  <div v-if="alertEditedModal" 
   tabindex="-1" 
   class="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
    <div class="relative p-5 w-full max-w-md max-h-full">
      <div class="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
        <!-- Contenido del Modal -->
        <div class="p-6 md:p-5 text-center">
          <img src="@/assets/update.svg" alt="Icono de SVG convertido" class="mx-auto mb-4 w-20 h-20 dark:text-gray-200">
          <h3 class="mb-2 text-xl font-bold text-[#2A5CAA]">La informacion del usuario se actualizó correctamente</h3>

          <button @click="isEditedToggle"
              type="button" 
              class="py-3 px-5 ms-3 text-sm font-medium focus:outline-none bg-[#08245B] hover:bg-[#2a4b8d] text-white rounded-lg border">
              Aceptar
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal de Error -->
  <div v-if="err" 
    class="fixed top-0 left-0 right-0 z-50 w-full h-full flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto md:inset-0 transition-all duration-500 ease-in-out transform scale-0"
    :class="{'scale-100': err}">
    <div class="relative w-full max-w-lg bg-white p-6 transform transition-all duration-600 ease-in-out">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg dark:bg-gray-800">
            <!-- Modal header -->
            <div class="flex items-center justify-between p-4">
                <h3 class="text-2xl font-semibold text-red-600 dark:text-red-400">¡Error!</h3>
                <button @click="toggleError" 
                        class="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-3xl w-10 h-10 flex items-center justify-center rounded-full transition-colors duration-300">
                    &times;
                </button>
            </div>
            <!-- Modal body -->
            <div class="p-8 text-center space-y-4">
                <p class="text-lg text-gray-700 dark:text-gray-300">
                    <strong>{{ err }}</strong>
                </p>
            </div>
        </div>
    </div>
  </div>
</template>

<script setup>
  import { reactive, computed, ref } from 'vue';
  import UserService from '@/services/userService';

  const props = defineProps({
    user: Object,
    title: String
  })

  const userService = new UserService();
  const err = userService.getError();
  const isLoading = userService.getLoader();
  const showEditModal = userService.getModal();
  const alertEditedModal = ref("");
  const VUE_APP_URL = process.env.VUE_APP_URL;
  const uri = `/users/update/${props.user.id}`
  const url = VUE_APP_URL + uri;
  const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;  
  const phoneRegex = /^[0-9]{10,10}$/;  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 

  const editUser = reactive({
    first_name: props.user.first_name,
    last_name: props.user.last_name,
    phone_number: props.user.phone_number,
    username: props.user.username
  });

  const isEditedToggle = () => {
    isLoading.value = false;
    alertEditedModal.value = !alertEditedModal.value;
    if (alertEditedModal.value == false){
      location.reload()
    }
  }

  function toggleShowEditModal(){
     // Si el modal se va a cerrar, reseteamos los datos
  if (showEditModal.value) {
    editUser.first_name = props.user.first_name;
    editUser.last_name = props.user.last_name;
    editUser.phone_number = props.user.phone_number;
    editUser.username = props.user.username;
  }
    showEditModal.value = !showEditModal.value;
  }

  // Estado de errores
  const errors = reactive({
  first_name: "",
  last_name: "",
  phone_number: "",
  username: "",
  });  

  // Validaciones
const validateFirstName = () => {
  errors.first_name = nameRegex.test(editUser.first_name) ? "" : "Solo se permiten letras y espacios.";
};

const validateLastName = () => {
  errors.last_name = nameRegex.test(editUser.last_name) ? "" : "Solo se permiten letras y espacios.";
};

const validatePhoneNumber = () => {
  errors.phone_number = phoneRegex.test(editUser.phone_number) ? "" : "Solo se permiten números (máximo 10 dígitos).";
};

const validateEmail = () => {
  errors.username = emailRegex.test(editUser.username) ? "" : "Ingrese un correo válido.";
};

  const hasNoChange = computed(() => {
    return  editUser.first_name === props.user.first_name &&
         editUser.last_name === props.user.last_name &&
         editUser.phone_number === props.user.phone_number &&
         editUser.username === props.user.username &&
         Object.values(errors).every(error => error === "");
  })

  const toggleError = () => {
    err.value = false;
  }

  const submitEdit = () => {
    // Validar campos antes de enviar
    if (errors.first_name || errors.last_name || errors.phone_number || errors.username) {
      err.value = "Por favor, corrija los errores antes de enviar el formulario.";
      return ;
    }
    // Mostrar el loader
    isLoading.value = true;
    // Enviar datos al servidor
    userService.editUser(url, editUser, isEditedToggle)
  }
</script>
