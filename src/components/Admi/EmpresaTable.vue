<template>
    <div class="flex flex-col md:flex-row bg-[#F5F5F5] pt-[30px]">
      <!-- Tabla -->
      <div class="relative overflow-x-auto shadow-md flex-1 bg-[#FFFFFF]">
        <div class="p-6 flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-[#F5F5F5] dark:bg-gray-900">
          <label for="table-search" class="sr-only">Buscar</label>
          <div class="relative">
            <div class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
              </svg>
            </div>
            <input type="text" id="table-search-users" class="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-full md:w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Buscar">
          </div>
        </div>
        <div class="overflow-x-auto ">
          <table class="w-full text-sm text-left rtl:text-right text-[2A5CAA] dark:text-gray-400 bg-gradient-to-r from-gray-100 to-[#E5EAFF]">
            <thead class="text-xs uppercase">
              <tr>
                <th scope="col" class="px-6 py-3">NIT</th>
                <th scope="col" class="px-6 py-3 hidden md:table-cell">Razón Social</th>
                <th scope="col" class="px-6 py-3 hidden md:table-cell">Dirección</th>
                <th scope="col" class="px-6 py-3 hidden md:table-cell">Sector económico</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="company in companies" :key="company" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td class="px-6 py-4 hidden md:table-cell">{{ company.nit }}</td>
                <td class="px-6 py-4 hidden md:table-cell">{{ company.name }}</td>
                <td class="px-6 py-4 hidden md:table-cell">{{ company.address }}</td>
                <td class="px-6 py-4 hidden md:table-cell">{{ company.sector }}</td>
              </tr>
              <!-- Repetir filas según sea necesario -->
            </tbody>
          </table>
        </div>
      </div>
  
      <!-- Botones en columna -->
      <aside class="flex flex-row md:flex-col space-y-0 md:space-y-4 space-x-4 md:space-x-0 md:ml-4 mt-4 md:mt-0 bg-[#F5F5F5] p-4 md:p-0">
        <router-link  to="/EditarEmpresa" type="button" class="shadow-lg text-[#08245B] bg-[#FFFFFF] hover:bg-[#E5EAFF]/80 focus:ring-4 focus:outline-none focus:ring-[#08245B]/50 font-medium rounded-full text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#FF9119]/80 dark:focus:ring-[#FF9119]/40 ">
          <img src="@/assets/edit.svg" alt="">
          <span class="hidden md:inline">Editar</span>
        </router-link>
        <button type="button" class="shadow-lg text-[#08245B] bg-[#FFFFFF] hover:bg-[#E5EAFF]/80 focus:ring-4 focus:outline-none focus:ring-[#08245B]/50 font-medium rounded-full text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#FF9119]/80 dark:focus:ring-[#FF9119]/40 md:mb-4">
          <img src="@/assets/slash.svg" alt="">
          <span class="hidden md:inline">Inactivar</span>
        </button>
        <button type="button" class="shadow-lg text-[#08245B] bg-[#FFFFFF] hover:bg-[#E5EAFF]/80 focus:ring-4 focus:outline-none focus:ring-[#08245B]/50 font-medium rounded-full text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#FF9119]/80 dark:focus:ring-[#FF9119]/40 md:mb-4">
          <img src="@/assets/x.svg" alt="">
          <span class="hidden md:inline">Eliminar</span>
        </button>
      </aside>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';

  const companies = ref([])

  fetch('http://127.0.0.1:8000/companies/')
  .then(res => res.json())
  .then(json => {
    companies.value = json;
  })
  .catch(err => console.error(err))

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
    }
  }
  </style>