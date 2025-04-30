<template>  
  <section v-if="data" class="w-full max-w-6xl mx-auto bg-white border border-gray-200 rounded-xl p-6 md:p-10 shadow-sm">
    
    <!-- Header con imagen y nombre -->
    <div class="flex items-center gap-6 mb-10 bg-gradient-to-r from-white to-gray-100 p-6 rounded-lg">
      <img
        src="@/assets/img_usuario.svg"
        alt="Foto del usuario"
        class="w-20 h-20 rounded-full object-cover border border-gray-300 shadow-sm"
      />
      <div>
        <h1 class="text-3xl font-semibold text-gray-800">
          {{ data.first_name }} {{ data.last_name }}
        </h1>
        <p class="text-sm text-gray-500 mt-1">Información de usuario</p>
      </div>
    </div>

    <!-- Contenido en grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">

      <!-- Campos del usuario -->
      <div v-for="(label, key) in {
          'Nombre': data.first_name,
          'Apellido': data.last_name,
          'Número de Identificación': data.id_number,
          'Correo': data.username,
          'Celular': data.phone_number,
          'Rol': data.role
        }" :key="key" class="space-y-1">
        
        <label class="block text-xs font-medium text-gray-500 uppercase tracking-wider">
          {{ key }}
        </label>
        <p class="bg-gray-50 text-gray-800 border border-gray-200 rounded-md px-4 py-2 text-sm">
          {{ label }}
        </p>
      </div>

      <!-- Botones en escritorio -->
      <div class="hidden md:flex flex-col justify-end gap-4">
        <EditPerfilModal :user="data" />
        <ChangePasswordPerfil />
      </div>
    </div>

    <!-- Botones en móvil -->
    <div class="mt-8 flex flex-col gap-4 md:hidden">
      <EditPerfilModal :user="data" />
      <ChangePasswordPerfil />
    </div>

    <!-- Error -->
    <div v-if="err" class="mt-6 text-red-500 text-center font-medium">
      {{ err }}
    </div>

    <!-- Loader -->
    <div v-if="isLoading" class="flex justify-center mt-12">
      <img src="@/assets/loader.svg" alt="Cargando" class="h-16 w-16 animate-spin opacity-70" />
    </div>
  </section>
</template>



<script setup>
import Cookies from 'js-cookie';
import getIdByToken from '@/hooks/getId';
import EditPerfilModal from '../admin/crud/EditPerfilModal.vue';
import UserService from '@/services/userService';
import ChangePasswordPerfil from '../admin/crud/ChangePasswordPerfil.vue';

// Definición de variables
const token = Cookies.get('jwt');
const userId = getIdByToken(token);
const getUserService = new UserService();
const isLoading = getUserService.getLoader();
const data = getUserService.getData();
const err = getUserService.getError();
const VUE_APP_URL = process.env.VUE_APP_URL;
const uri = `/users/${userId}/`;
const urlApi = VUE_APP_URL + uri;


// Obtener los datos de la API
getUserService.getUserById(urlApi);
</script>
