<template>
    <MenuContador />
    <section class="contenido z-10">
      <div class="relative overflow-x-auto shadow-md">
        <section class="w-full shadow-md">
          <h2 class="text-left text-[#2A5CAA] font-bold text-3xl mb-6 bg-gradient-to-r from-gray-100 to-[#E5EAFF] p-3">
            Empresas asignadas
          </h2>
  
          <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <div class="p-4 flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-start pb-4"> <!-- Aquí cambiamos justify-between por justify-start -->
              <div>
              </div>
              <label for="table-search" class="sr-only">Search</label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
                  <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                </div>
                <input type="text" id="table-search" class="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Buscar">
              </div>
            </div>
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-[#08245B] uppercase bg-gradient-to-r from-gray-100 to-[#E5EAFF] dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  
                  <th scope="col" class="px-6 py-3">
                    NIT
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Razón Social
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Sector económico
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Correo
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Dirección
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr class="bg-white border-b text-[#08245B] dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                  
                  <th scope="row" class="px-6 py-4 font-medium text-[#08245B] whitespace-nowrap dark:text-white">
                    224521-9
                  </th>
                  <td class="px-6 py-4">
                    SPA Laura
                  </td>
                  <td class="px-6 py-4">
                    Comercio y Ventas
                  </td>
                  <td class="px-6 py-4">
                    $SPA.Laura@gmail.com
                  </td>
                  <td class="px-6 py-4">
                    Cra 4 #22-65 
                  </td>
                </tr>
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                </tr>
              </tbody>
            </table>
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
    background-color: #F5F5F5;
    margin-left: 80px; /* Esto se aplica por defecto en pantallas de escritorio */
    height: 100vh;
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
  