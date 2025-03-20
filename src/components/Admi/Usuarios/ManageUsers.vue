<template>
  <section class="w-full bg-white shadow-md">
    <h2 class="flex items-center mb-3 bg-gradient-to-r from-gray-100 to-[#E5EAFF] p-3 rounded-md text-[#2A5CAA] font-bold text-2xl">Gestión de Usuarios y Roles</h2>

    <UserForm/>
    <UserTable/>
    
  </section>
</template>

<script setup>
import UserForm from './UserForm.vue';
import UserTable from './UserTable.vue';
</script>