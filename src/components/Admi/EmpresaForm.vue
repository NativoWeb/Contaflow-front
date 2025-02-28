<template>
    <form class="w-full">
      <!-- Primera fila -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <label class="block uppercase tracking-wide text-[#193368] text-xs font-bold mb-2">
            NIT:
          </label>
          <input class="w-full bg-[#F5F5F5] text-gray-700 border border-gray-300 rounded-full py-3 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
            type="text" placeholder="Ingrese sus nombre">
        </div>
        <div>
          <label class="block uppercase tracking-wide text-[#193368] text-xs font-bold mb-2">
            Razón Social *:
          </label>
          <input class="w-full bg-[#F5F5F5] text-gray-700 border border-gray-300 rounded-full py-3 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
            type="text" placeholder="Ingrese sus apellidos">
        </div>
        <div>
          <label class="block uppercase tracking-wide text-[#193368] text-xs font-bold mb-2">
            Dirección:
          </label>
          <input class="w-full bg-[#F5F5F5] text-gray-700 border border-gray-300 rounded-full py-3 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
            type="text" placeholder="Ingrese su celular">
        </div>
      </div>
  
      <!-- Segunda fila -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <label class="block uppercase tracking-wide text-[#193368] text-xs font-bold mb-2">
            Sector Económico *:
          </label>
          <div class="relative">
            <select class="w-full bg-[#F5F5F5] border border-gray-300 text-[#08245B] py-3 px-4 rounded-full focus:outline-none focus:bg-white focus:border-gray-500">
              <option>Comercio y Ventas</option>
              <option>Restaurantes y Gastronomía</option>
              <option>Construcción e Infraestructura</option>
              <option>Servicios Profesionales</option>
              <option>Finanzas y Seguros</option>
              <option>Industria y Manufactura</option>
              <option>Transporte y Logística</option>
              <option> Salud y Medicina</option>
              <option>Educación y Formación</option>
              <option>Tecnología e Informática</option>
            </select>
          </div>
        </div>
        <div class="flex items-end">
          <button class="w-full bg-[#08245B] hover:bg-[#2a4b8d] text-white font-bold py-3 px-4 rounded-full shadow-md shadow-gray-500/50 focus:outline-none focus:shadow-outline">
            Añadir Empresa
          </button>
        </div>
      </div>
    </form>
  </template>
  
  <script setup>
  // Lógica del formulario si es necesaria
  </script>
  
  <style scoped>
  /* Estilos específicos del formulario si es necesario */
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