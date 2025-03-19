<template> 
  <section class="contenido z-10">
    <div class="p-6 flex flex-col gap-6 w-full">
      <!-- División 1 -->
      <div class="w-full bg-white shadow-lg rounded-lg">
        <h2 class="text-xl font-bold bg-gradient-to-r from-[#F8F8F8] to-[#E5EAFF] text-[#2A5CAA] p-3 rounded-t-lg">
          Cambiar contraseña
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
      </div>
    </div>
  
    </section>
  </template>
  
  
  
  <script setup>

  </script>
  
  <style scoped>

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
  