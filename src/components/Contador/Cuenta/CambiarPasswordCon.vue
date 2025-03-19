<template>
    <MenuContador />
    
    <section class="contenido z-10 ">
      <div class="relative overflow-x-auto">
        <section class="w-full max-w-7xl mx-auto bg-white shadow-md rounded-lg">
  <h2 class="text-left text-[#2A5CAA] font-bold text-2xl mb-6 bg-gradient-to-r from-gray-100 to-[#E5EAFF] p-3">
    Cambiar Contraseña
  </h2>
  <div>
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

      <!-- Botón de guardar -->
      <div class="flex justify-center items-center w-full">
        <button type="submit" class="w-48 bg-[#08245B] hover:bg-[#2a4b8d] text-white font-bold py-3 px-4 rounded-full shadow-md shadow-gray-500/50 focus:outline-none focus:shadow-outline">
          Guardar
        </button>
      </div>
    </form>
  </div>
</section>

      </div>
    </section>
  </template>
  
  
  
  <script setup>
  import MenuContador from '../MenuContador.vue';
  </script>
  
  <style scoped>
  .contenido {
    padding: 20px;
    transition: margin-left 0.3s ease;
    padding-top: 250px;
    background-color:  
    
    #F5F5F5;
    margin-left: 80px; /* Esto se aplica por defecto en pantallas de escritorio */
    height: 100vh;
  }
  
  .menu-lateral.open ~ .contenido {
    margin-left: 309px;
    width: calc(100% - 309px);
    height: 90%;
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
  