<template>
    <section class="contenido z-10">
      <div class="relative overflow-x-auto shadow-md">
        <section class="w-full bg-white shadow-md p-6">
          <h2 class="text-left text-[#2A5CAA] font-bold text-2xl mb-6 bg-gradient-to-r from-gray-100 to-[#E5EAFF] p-3">
            Registro de Empresa
          </h2>
          <EmpresaForm/>
        </section>
      </div>
  
      <EmpresaTable/>
    </section>

  </template>

  
  <script setup>
  import EmpresaForm from '../Admi/EmpresaForm.vue';
  import EmpresaTable from '../Admi/EmpresaTable.vue';
  </script>
  
  <style scoped>
  
  .contenido {
    padding: 20px;
    transition: margin-left 0.3s ease;
    padding-top: 250px;
    background-color: #F5F5F5;
    margin-left: 80px; /* Esto se aplica por defecto en pantallas de escritorio */
  }
  
  .menu-lateral.open ~ .contenido {
    margin-left: 309px;
    width: calc(100% - 309px);

  }
  
  /* Media query para pantallas móviles */
  @media (max-width: 768px) {
    .contenido {
      margin-left: 0; /* Esto se aplica en pantallas móviles */
      padding-top: 110px;
    }
  
    .menu-lateral.open ~ .contenido {
      margin-left: 0; /* Asegúrate de que el margen izquierdo sea 0 en móviles incluso cuando el menú esté abierto */
      width: 100%; /* Asegúrate de que el contenido ocupe el 100% del ancho en móviles */
      padding-top: 110px;
      height: 100%
    }
  }
  
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
  }
  </style>