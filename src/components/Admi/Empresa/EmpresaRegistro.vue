<template>
  <section class="w-full bg-white shadow-md">
    <!-- Contenedor del título con imagen -->

      <h2 class="flex items-center mb-3 bg-gradient-to-r from-gray-100 to-[#E5EAFF] p-3 rounded-md text-[#2A5CAA] font-bold text-2xl">Registro de Empresas</h2>

    <EmpresaForm/>
    <EmpresaTable/>
  </section>
</template>

<script setup>
import EmpresaForm from './EmpresaForm.vue';
import EmpresaTable from './EmpresaTable.vue';
</script>
