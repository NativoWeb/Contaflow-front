<template>
  <section class="w-full bg-white shadow-md">
    <h2 class="text-left text-[#2A5CAA] font-bold text-2xl mb-6 bg-gradient-to-r from-gray-100 to-[#E5EAFF] p-3">
      Registros de empresas
    </h2>
    <EmpresaForm/>
  </section>
  
  <EmpresaTable/>
  
  </template>
  
  <script setup>
  import EmpresaForm from '../Admi/EmpresaForm.vue';
  import EmpresaTable from '../Admi/EmpresaTable.vue';
  </script>