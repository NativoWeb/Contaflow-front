<template>
<section class="w-full bg-white shadow-md">
  <h2 class="text-left text-[#2A5CAA] font-bold text-2xl mb-6 bg-gradient-to-r from-gray-100 to-[#E5EAFF] p-3">
    Gestión de Usuarios y Roles
  </h2>
        <UserForm/>
      </section>
  
    <UserTable/>

</template>

<script setup>
import UserForm from './UserForm.vue';
import UserTable from './UserTable.vue';
</script>