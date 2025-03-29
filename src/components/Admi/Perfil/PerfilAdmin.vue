<template>
  <section v-if="user" class="w-full bg-white shadow-md">
    <!-- Contenedor del título con imagen -->
    <div class="flex items-center gap-4 h-[99px] mb-6 bg-gradient-to-r from-gray-100 to-[#E5EAFF] p-6 rounded-md">
      <img src="@/assets/img_usuario.svg" alt="Empresa Logo" class="w-16 h-16 object-cover rounded-full">
      <h2 class="text-[#2A5CAA] font-bold text-2xl">{{ user.first_name }} {{ user.last_name }}</h2>
    </div>

    <div class="w-full p-6">
      <!-- Diseño adaptable con Grid -->
      <div class="grid grid-cols-1 gap-4 md:grid-cols-3 md:grid-rows-3">
        
        <!-- Primera fila -->
        <div>
          <label class="block uppercase tracking-wide text-[#193368] text-xs font-bold mb-2">Nombre:</label>
          <p class="w-full bg-[#F5F5F5] text-gray-700 border border-gray-300 rounded-full py-3 px-6 text-left">{{ user.first_name }}</p>
        </div>

        <div>
          <label class="block uppercase tracking-wide text-[#193368] text-xs font-bold mb-2">Apellido:</label>
          <p class="w-full bg-[#F5F5F5] text-gray-700 border border-gray-300 rounded-full py-3 px-6 text-left">{{ user.last_name }}</p>
        </div>

        <!-- Botón Editar Perfil (solo en escritorio) -->
        <div class="hidden md:flex items-end">
          <button @click="toggleEditModal" class="w-full md:w-[80%] bg-[#08245B] hover:bg-[#2a4b8d] text-white font-bold py-3 px-4 rounded-full shadow-md shadow-gray-500/50 focus:outline-none focus:shadow-outline">
            Editar perfil
          </button>
        </div>

        <!-- Segunda fila -->
        <div>
          <label class="block uppercase tracking-wide text-[#193368] text-xs font-bold mb-2">Número de Identificación:</label>
          <p class="w-full bg-[#F5F5F5] text-gray-700 border border-gray-300 rounded-full py-3 px-6 text-left">{{ user.id_number }}</p>
        </div>

        <div>
          <label class="block uppercase tracking-wide text-[#193368] text-xs font-bold mb-2">Correo:</label>
          <p class="w-full bg-[#F5F5F5] text-gray-700 border border-gray-300 rounded-full py-3 px-6 text-left">{{ user.username }}</p>
        </div>

        <!-- Botón Cambiar Contraseña (solo en escritorio) -->
        <div class="hidden md:flex items-end">
          <button  @click="togglePasswordModal" class="w-full md:w-[80%] bg-[#08245B] hover:bg-[#2a4b8d] text-white font-bold py-3 px-4 rounded-full shadow-md shadow-gray-500/50 focus:outline-none focus:shadow-outline">
            Cambiar contraseña
          </button>
        </div>

        <!-- Tercera fila -->
        <div>
          <label class="block uppercase tracking-wide text-[#193368] text-xs font-bold mb-2">Celular:</label>
          <p class="w-full bg-[#F5F5F5] text-gray-700 border border-gray-300 rounded-full py-3 px-6 text-left">{{ user.phone_number }}</p>
        </div>

        <div>
          <label class="block uppercase tracking-wide text-[#193368] text-xs font-bold mb-2">Rol:</label>
          <p class="w-full bg-[#F5F5F5] text-gray-700 border border-gray-300 rounded-full py-3 px-6 text-left">{{ user.role }}</p>
        </div>

      </div>

      <!-- Botones en móvil (se muestran debajo de todo) -->
      <div class="mt-4 flex flex-col gap-4 md:hidden">
        <button @click="toggleEditModal" class="w-full bg-[#08245B] hover:bg-[#2a4b8d] text-white font-bold py-3 px-4 rounded-full shadow-md shadow-gray-500/50 focus:outline-none focus:shadow-outline">
          Editar perfil
        </button>
        <button @click="togglePasswordModal" class="w-full bg-[#08245B] hover:bg-[#2a4b8d] text-white font-bold py-3 px-4 rounded-full shadow-md shadow-gray-500/50 focus:outline-none focus:shadow-outline">
          Cambiar contraseña
        </button>
      </div>

    </div>

<!-- Modal para Editar -->
<div v-if="isEditModalOpen" 
     class="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50 p-4">
  <div class="p-5 sm:p-6 md:p-8 relative w-full max-w-3xl bg-white rounded-lg shadow-lg dark:bg-gray-800">
    <!-- Encabezado -->
    <div>
      <h3 class="text-xl font-semibold text-[#2A5CAA]">Editar registro</h3>
    </div>

    <!-- Contenido -->
    <div class="space-y-4 p-2">
      <form @submit.prevent="submitEdit">
        <div class="flex flex-col items-center">
          <!-- Imagen -->
          <img class="rounded-full w-[160px] h-[160px] mb-4 sm:w-[120px] sm:h-[120px]" 
               src="@/assets/img_usuario.svg" alt="Imagen de usuario">
          <input type="file" id="photo" name="photo" accept="image/*" class="mt-2">
        </div>
        
        <!-- Formulario de usuario -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-semibold text-[#193368]">Nombres:</label>
            <p class="text-left w-full bg-gray-100 border border-gray-300 rounded-full py-2 px-3">{{user.first_name}}</p>
          </div>
          <div>
            <label class="block text-sm font-semibold text-[#193368]">Apellidos:</label>
            <p class="text-left w-full bg-gray-100 border border-gray-300 rounded-full py-2 px-3">{{ user.last_name}}</p>
          </div>
          <div>
            <label class="block text-sm font-semibold text-[#193368]">Tipo de Identificación:</label>
            <p class="text-left w-full bg-gray-100 border border-gray-300 rounded-full py-2 px-3">{{ user.id_type }}</p>
          </div>
          <div>
            <label class="block text-sm font-semibold text-[#193368]">Número de Identificación:</label>
            <p class="text-left w-full bg-gray-100 border border-gray-300 rounded-full py-2 px-3">{{ user.id_number }}</p>
          </div>
          <div>
            <label class="block text-sm font-semibold text-[#193368]">Número de Celular:</label>
            <p class="text-left w-full bg-gray-100 border border-gray-300 rounded-full py-2 px-3">{{ user.phone_number }}</p>
          </div>
          <div>
            <label class="block text-sm font-semibold text-[#193368]">Correo Electrónico:</label>
            <p class="text-left w-full bg-gray-100 border border-gray-300 rounded-full py-2 px-3">{{ user.username }}</p>
          </div>
        </div>
      </form>
    </div>

    <!-- Botones -->
    <div class="flex justify-center space-x-3 p-5 dark:border-gray-700">
      <button @click="closeEditModal"
              class="px-5 py-2.5 text-[#193368] bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 
                     focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 
                     dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
        Cancelar
      </button>
      <button @click="submitEdit"
              type="button" 
              class="py-3 px-5 ms-3 text-sm font-medium focus:outline-none bg-[#08245B] hover:bg-[#2a4b8d] text-white rounded-lg border">
        Confirmar
      </button>
    </div>
  </div>
</div>

<!-- Modal de cambiar contraseña -->
<div v-if="isPasswordModalOpen"  
class="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50 p-4">
    <div class="relative w-full max-w-2xl bg-white rounded-lg shadow-lg p-6">
        <!-- Modal header -->
        <h2 class="text-xl font-bold bg-gradient-to-r from-[#F8F8F8] to-[#E5EAFF] text-[#2A5CAA] p-3 rounded-t-lg">
          Cambiar contraseña
        </h2>

        <!-- Formulario -->
        <form class="w-full max-w-lg mx-auto p-6">
            <div class="grid grid-cols-1 gap-5 mb-5">
                <div>
                    <label class="block uppercase tracking-wide text-[#193368] text-xs font-bold mb-2">
                        Anterior Contraseña:
                    </label>
                    <input class="w-full bg-[#F5F5F5] text-gray-700 border border-gray-300 rounded-full py-3 px-4 focus:outline-none focus:bg-white focus:border-gray-500" type="password" placeholder="Ingrese su anterior contraseña">
                </div>
                <div>
                    <label class="block uppercase tracking-wide text-[#193368] text-xs font-bold mb-2">
                        Nueva Contraseña:
                    </label>
                    <input class="w-full bg-[#F5F5F5] text-gray-700 border border-gray-300 rounded-full py-3 px-4 focus:outline-none focus:bg-white focus:border-gray-500" type="password" placeholder="Ingrese su nueva contraseña">
                </div>
                <div>
                    <label class="block uppercase tracking-wide text-[#193368] text-xs font-bold mb-2">
                        Confirmar Contraseña:
                    </label>
                    <input class="w-full bg-[#F5F5F5] text-gray-700 border border-gray-300 rounded-full py-3 px-4 focus:outline-none focus:bg-white focus:border-gray-500" type="password" placeholder="Confirme su nueva contraseña">
                </div>
            </div>

            <!-- Botones -->
            <div class="flex justify-center items-center w-full space-x-6">
                <button @click="closePasswordModal" type="button" class="w-48 bg-[#F0F0F0] hover:bg-[#DCF2F1] text-[#08245B] font-bold py-3 px-6 rounded-full shadow-lg shadow-gray-500/50 transition-transform duration-300 hover:scale-105 focus:outline-none">
                    Cancelar
                </button>
                <button @click="confirmPassword" type="submit" class="w-48 bg-[#08245B] hover:bg-[#2a4b8d] text-white font-bold py-3 px-6 rounded-full shadow-lg shadow-gray-500/50 transition-transform duration-300 hover:scale-105 focus:outline-none">
                    Guardar
                </button>
            </div>
        </form>
    </div>
</div>


  </section>

  <!-- cargador -->
<div v-else class="flex justify-center items-start">
  <img src="@/assets/loader.svg" alt="carga" class="mt-20 h-32 w-32">
</div>
</template>

<script>
export default {
  data() {
    return {
      isEditModalOpen: false,
      isPasswordModalOpen: false,
    };
  },
  methods: {
    toggleEditModal() {
      this.isEditModalOpen = !this.isEditModalOpen;
    },
    closeEditModal() {
      this.isEditModalOpen = false;
    },
    submitEdit() {
      console.log("Registro editado:", this.editForm);
      this.closeEditModal();
    },
    togglePasswordModal() {
      this.isPasswordModalOpen = !this.isPasswordModalOpen;
    },
    closePasswordModal() {
      this.isPasswordModalOpen = false;
    },
    confirmPassword() {
      console.log("Contraseña cambiada", !this.passwordForm);
      this.closePasswordModal();
    }
  }
};
</script>

<script setup>
import { ref } from 'vue'
import Cookies from 'js-cookie';
import getIdByToken from '@/hooks/getId';


const token = Cookies.get('jwt');
const userId = getIdByToken(token);
const VUE_APP_URL = process.env.VUE_APP_URL;
const user = ref();
const error = ref();

console.log(userId)

fetch(`${VUE_APP_URL}/users/${userId}/`)
.then(res => res.json())
  .then(json => {
    user.value = json
  })
   .catch(err => {

    error.value = err;
  })

</script>