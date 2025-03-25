<template>
  <div class="p-6 flex flex-col w-full h-full">
    <!-- Título -->
    <h2 class="text-xl font-bold bg-gradient-to-r from-[#F8F8F8] to-[#E5EAFF] text-[#193368] p-4 rounded-lg shadow-md text-center md:text-left">
      Registro de Empresas
    </h2>
    <EmpresaForm/>
  </div>
</template>

<script setup>
import EmpresaForm from './EmpresaForm.vue';
</script>
