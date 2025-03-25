<template>
  <div class="p-6 flex flex-col w-full h-full">
    <!-- Título -->
    <h2 class="text-xl font-bold bg-gradient-to-r from-[#F8F8F8] to-[#E5EAFF] text-[#193368] p-4 rounded-lg shadow-md text-center md:text-left">
      Gestión de Usuarios y Roles
    </h2>

    <UserForm/>

    
  </div>
</template>

<script setup>
import UserForm from './UserForm.vue';
</script>