<template>
  <section v-if="data" class="w-full bg-white shadow-md">
    <!-- Contenedor del título con imagen -->
    <div class="flex items-center gap-4 h-[99px] mb-6 bg-gradient-to-r from-gray-100 to-[#E5EAFF] p-6 rounded-md">
      <img src="@/assets/img_usuario.svg" alt="Empresa Logo" class="w-16 h-16 object-cover rounded-full">
      <h2 class="text-[#2A5CAA] font-bold text-2xl">{{ data.first_name }} {{ data.last_name }}</h2>
    </div>

    <div class="w-full p-6">
      <!-- Diseño adaptable con Grid -->
      <div class="grid grid-cols-1 gap-4 md:grid-cols-3 md:grid-rows-3">
        
        <!-- Primera fila -->
        <div>
          <label class="block uppercase tracking-wide text-[#193368] text-xs font-bold mb-2">Nombre:</label>
          <p class="w-full bg-[#F5F5F5] text-gray-700 border border-gray-300 rounded-full py-3 px-6 text-left">{{ data.first_name }}</p>
        </div>

        <div>
          <label class="block uppercase tracking-wide text-[#193368] text-xs font-bold mb-2">Apellido:</label>
          <p class="w-full bg-[#F5F5F5] text-gray-700 border border-gray-300 rounded-full py-3 px-6 text-left">{{ data.last_name }}</p>
        </div>

        <!-- Botón Editar Perfil (solo en escritorio) -->
        <div class="hidden md:flex items-end">
          <EditPerfilModal :user="data" />
        </div>

        <!-- Segunda fila -->
        <div>
          <label class="block uppercase tracking-wide text-[#193368] text-xs font-bold mb-2">Número de Identificación:</label>
          <p class="w-full bg-[#F5F5F5] text-gray-700 border border-gray-300 rounded-full py-3 px-6 text-left">{{ data.id_number }}</p>
        </div>

        <div>
          <label class="block uppercase tracking-wide text-[#193368] text-xs font-bold mb-2">Correo:</label>
          <p class="w-full bg-[#F5F5F5] text-gray-700 border border-gray-300 rounded-full py-3 px-6 text-left">{{ data.username }}</p>
        </div>

        <!-- Botón Cambiar Contraseña (solo en escritorio) -->
        <div class="hidden md:flex items-end">
          <ChangePasswordPerfil :user="data" />
        </div>

        <!-- Tercera fila -->
        <div>
          <label class="block uppercase tracking-wide text-[#193368] text-xs font-bold mb-2">Celular:</label>
          <p class="w-full bg-[#F5F5F5] text-gray-700 border border-gray-300 rounded-full py-3 px-6 text-left">{{ data.phone_number }}</p>
        </div>

        <div>
          <label class="block uppercase tracking-wide text-[#193368] text-xs font-bold mb-2">Rol:</label>
          <p class="w-full bg-[#F5F5F5] text-gray-700 border border-gray-300 rounded-full py-3 px-6 text-left">{{ data.role }}</p>
        </div>
      </div>

      <!-- Botones en móvil (se muestran debajo de todo) -->
      <div class="mt-4 flex flex-col gap-4 md:hidden">
        <EditPerfilModal :user="data" />
        <ChangePasswordPerfil :user="data" />
      </div>
    </div>

    <!-- Manejo de errores -->
    <div v-if="err" class="flex justify-center items-start">
      <span>{{ err }}</span>
    </div>

    <!-- Cargador -->
    <div v-if="isLoading" class="flex justify-center items-start">
      <img src="@/assets/loader.svg" alt="carga" class="mt-20 h-32 w-32" />
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import Cookies from 'js-cookie';
import getIdByToken from '@/hooks/getId';
import EditPerfilModal from './crud/EditPerfilModal.vue';
import GetServices from '@/services/APIService';
import ChangePasswordPerfil from './crud/ChangePasswordPerfil.vue';

// Definición de variables
const token = Cookies.get('jwt');
const userId = getIdByToken(token);
const isLoading = ref(false);
const api = new GetServices();
const data = api.getData();
const err = api.getError();
const VUE_APP_URL = process.env.VUE_APP_URL;
const uri = `/users/${userId}/`;
const urlApi = VUE_APP_URL + uri;

// Obtener los datos de la API
api.getDataApi(urlApi, isLoading);
</script>
