<template>
  <!-- Título de la página -->
  <h2 class="text-xl font-bold bg-gradient-to-r from-[#F8F8F8] to-[#E5EAFF] text-[#2A5CAA] p-4 rounded-lg shadow-md text-center md:text-left">
      {{ title }}
  </h2>
    <!-- Formulario -->
     <form @submit.prevent="addUser" class="w-full p-6 bg-white">
    <!-- Primera fila -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div>
        <label class="block uppercase tracking-wide text-[#193368] text-xs font-bold mb-2">
          Nombres:
        </label>
        <input v-model="userForm.first_name" @input="validateFirstName"
          class="w-full bg-[#F5F5F5] text-gray-700 border border-gray-300 rounded-full py-3 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
          type="text" placeholder="Ingrese sus nombres">
        <p v-if="errors.first_name" class="text-red-500 text-xs mt-1">{{ errors.first_name }}</p>
      </div>
      <div>
        <label class="block uppercase tracking-wide text-[#193368] text-xs font-bold mb-2">
          Apellidos:
        </label>
        <input v-model="userForm.last_name" @input="validateLastName"
          class="w-full bg-[#F5F5F5] text-gray-700 border border-gray-300 rounded-full py-3 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
          type="text" placeholder="Ingrese sus apellidos">
        <p v-if="errors.last_name" class="text-red-500 text-xs mt-1">{{ errors.last_name }}</p>
      </div>
      <div>
        <label class="block uppercase tracking-wide text-[#193368] text-xs font-bold mb-2">
          Tipo de Identificación:
        </label>
        <div>
          <select  v-model="userForm.id_type" class="w-full bg-[#F5F5F5] border border-gray-300 text-[#08245B] py-3 px-4 rounded-full focus:outline-none focus:bg-white focus:border-gray-500">
            <option selected disabled>Seleccione</option>
            <option value="Cedula_Ciudadania">Cédula de ciudadanía</option>
            <option value="Cedula_Extranjeria">Cédula de extranjería</option>
            <option value="Pasaporte">Pasaporte </option>
        </select>
        </div>
      </div>
    </div>

    <!-- Segunda fila -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
      <div>
        <label class="block uppercase tracking-wide text-[#193368] text-xs font-bold mb-2">
          Número de Identificación:
        </label>
        <input v-model="userForm.id_number" @input="validateIdentificationNumber"
          class="w-full bg-[#F5F5F5] text-gray-700 border border-gray-300 rounded-full py-3 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
          type="text" placeholder="Ingrese su celular">
        <p v-if="errors.identification_number" class="text-red-500 text-xs mt-1">{{ errors.identification_number }}</p>
      </div>
      <div>
        <label class="block uppercase tracking-wide text-[#193368] text-xs font-bold mb-2">
          Numero de Celular:
        </label>
        <input v-model="userForm.phone_number" @input="validatePhoneNumber"
          class="w-full bg-[#F5F5F5] text-gray-700 border border-gray-300 rounded-full py-3 px-4 focus:outline-none focus:bg-white focus:border-gray-500"

          type="text" inputmode="numeric" placeholder="Ingrese su correo">
        <p v-if="errors.phone_number" class="text-red-500 text-xs mt-1">{{ errors.phone_number }}</p>
      </div>
      <div>
        <label class="block uppercase tracking-wide text-[#193368] text-xs font-bold mb-2">
          Correo Electrónico:
        </label>
        <input v-model="userForm.username" @input="validateEmail"
          class="w-full bg-[#F5F5F5] text-gray-700 border border-gray-300 rounded-full py-3 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
          type="email" placeholder="Ingrese su correo">
        <p v-if="errors.username" class="text-red-500 text-xs mt-1">{{ errors.username }}</p>
      </div>
    </div>

    <!-- Botón de Añadir Usuario -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
      <div class="md:col-span-2"></div> <!-- Espacio vacío para empujar el botón a la derecha -->
      <div class="flex items-end">
        <button type="submit"
          :disabled="isFormInvalid"
          class="w-full bg-[#08245B] text-white font-bold py-3 px-4 rounded-full shadow-md shadow-gray-500/50 focus:outline-none focus:shadow-outline"
          :class="{
            'hover:bg-[#2a4b8d]': !isFormInvalid,
            'text-gray-500 cursor-not-allowed': isFormInvalid
          }">
          
          <span class="text-white">
            Añadir usuario
          </span>
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
  <div v-if="modalVisible" 
    class="fixed top-0 left-0 right-0 z-50 w-full h-full flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto md:inset-0 transition-all duration-500 ease-in-out transform scale-0"
    :class="{'scale-100': modalVisible}">
    <div class="relative w-full max-w-lg bg-white  p-6 transform transition-all duration-600 ease-in-out">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg dark:bg-gray-800">
            <!-- Modal header -->
            <div class="flex items-center justify-between p-4 ">
                <button @click="closeModal" 
                        class="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-3xl w-10 h-10 flex items-center justify-center rounded-full transition-colors duration-300">
                    &times;
                </button>
            </div>
            <!-- Modal body -->
            <div class="p-8 text-center space-y-4">
                <h3 class="mb-2 text-2xl font-semibold text-[#2A5CAA] dark:text-white">¡Invitación enviada con éxito!</h3>
                <p class="text-lg text-gray-700 dark:text-gray-300">
                    El usuario <strong>{{ userForm.first_name }}</strong> ha sido invitado a unirse a ContaFlow con el rol de Usere PYME.
                </p>
                <p class="text-lg text-gray-700 dark:text-gray-300">
                    <img src="@/assets/correo.svg" alt="Correo" class="inline-block h-6 w-6 mr-3" />
                    Se ha enviado un correo a <strong>{{ userForm.username }}</strong> con un enlace de activación.
                </p>
            </div>
        </div>
    </div>
  </div>

<!-- Modal de Error -->
<div v-if="errorModal" 
  class="fixed top-0 left-0 right-0 z-50 w-full h-full flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto md:inset-0 transition-all duration-500 ease-in-out transform scale-0"
  :class="{'scale-100': errorModal}">
  <div class="relative w-full max-w-lg bg-white p-6 transform transition-all duration-600 ease-in-out">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg dark:bg-gray-800">
          <!-- Modal header -->
          <div class="flex items-center justify-between p-4">
              <h3 class="text-2xl font-semibold text-red-600 dark:text-red-400">¡Error!</h3>
              <button @click="closeModal" 
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

<style>
  
  .fixed {
    background-color: rgba(0, 0, 0, 0.5);
  }
  .modal-enter-active, .modal-leave-active {
    transition: opacity 0.5s ease, transform 0.5s ease;
  }
  .modal-enter, .modal-leave-to {
    opacity: 0;
    transform: scale(0.5);
  }
  .modal-background {
    background-color: rgba(0, 0, 0, 0.5);
  }

</style>

<script setup>
import { reactive, ref, defineProps, computed } from "vue";
import Cookies from 'js-cookie';

const props = defineProps({
  apiUrl: String,
  usersForm: Object,
  title: String,
})


const modalVisible = ref(false);
const errorModal = ref(false);
const errorMessage = ref("");
const isLoading = ref(false);

const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;  // Permite letras, espacios y tildes
const identificationRegex = /^[0-9]{7,10}$/;  // Solo números, máximo 10 caracteres
const phoneRegex = /^[0-9]{10,10}$/;  // Solo números, máximo 10 caracteres
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  // Formato de email


// Estado del formulario
const userForm = reactive(props.usersForm);

// Estado de errores
const errors = reactive({
first_name: "",
last_name: "",
identification_number: "",
phone_number: "",
username: "",
});  


const closeModal = () => {
  modalVisible.value = false;
  errorModal.value = false;
  location.reload(); 
};

// Validaciones
const validateFirstName = () => {
errors.first_name = nameRegex.test(userForm.first_name) ? "" : "Solo se permiten letras y espacios.";
};

const validateLastName = () => {
errors.last_name = nameRegex.test(userForm.last_name) ? "" : "Solo se permiten letras y espacios.";
};

const validateIdentificationNumber = () => {
  errors.identification_number = identificationRegex.test(userForm.id_number) ? "" : "Solo se permiten números (minimo 7 y máximo 10 dígitos). ";
};

const validatePhoneNumber = () => {
errors.phone_number = phoneRegex.test(userForm.phone_number) ? "" : "Solo se permiten números (máximo 10 dígitos).";
};

const validateEmail = () => {
errors.username = emailRegex.test(userForm.username) ? "" : "Ingrese un correo válido.";
};

const isFormInvalid = computed(() => {
  return (
    !userForm.first_name.trim() ||
    !userForm.last_name.trim() ||
    !userForm.id_type ||
    !userForm.id_number.trim() ||
    !userForm.phone_number.trim() ||
    !userForm.username.trim()
  );
});



function addUser() {
  isLoading.value = true;
  
  fetch(props.apiUrl, {
    method: 'POST',
    body: JSON.stringify(userForm),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${Cookies.get('jwt')}`
    }
  })
  .then(res => {
    isLoading.value = false;
    if (!res.ok) {
      if (res.status === 400 ) throw new Error(`El usuario que tratas de registrar ya este registrado`);
      if (res.status === 401) throw new Error(`Acceso denegado`);
      // if (res.status === 400) alert("Este usuario ya esta registrado");
      if (res.status === 403) throw new Error(`Tu rol no te permite registrar un usuario`);
      
      throw new Error(`Ocurrio un error. intentalo de nuevo en otro momento`);
    }
    return res.json();
  })
  .then(() => {
    modalVisible.value = true;
  })
  .catch(err => {
    errorMessage.value = err;
    errorModal.value = true;
    isLoading.value = false;
    console.error(err)
  });
}
</script>

