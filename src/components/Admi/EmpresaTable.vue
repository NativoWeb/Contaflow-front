<template>

  <section class="w-full bg-white shadow-md">
  
    <div class="flex flex-col md:flex-row bg-[white] pt-[40px]">
      <!-- Tabla -->
      <div class=" overflow-x-auto shadow-md flex-1">
        <div class="p-6 flex flex-col md:flex-row items-center justify-between dark:bg-gray-900 shadow-lg space-y-4 md:space-y-0">
    <label for="table-search" class="sr-only">Buscar</label>
    <div class="flex items-center bg-gray-50 border border-gray-300 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-600">
      <svg class="w-5 h-5 text-gray-400 dark:text-gray-300 mx-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
      </svg>
      <input type="text" id="table-search-users" class="block w-full py-2 pr-4 text-sm text-gray-900 bg-transparent focus:ring-blue-500 focus:border-blue-500 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Buscar...">
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
  
       <!-- Botones -->
       <aside class="flex flex-wrap md:flex-col gap-4 bg-white p-6 mt-10 justify-center">
        <router-link to="/EditarEmpresa" class="shadow-lg text-[#08245B] bg-white hover:bg-[#E5EAFF] font-medium rounded-full text-sm px-5 py-2.5 flex items-center justify-center w-full md:w-auto">
          <img src="@/assets/edit.svg" alt="Editar" class="mr-2">
          <span class="hidden md:inline">Editar</span>
        </router-link>
        <button class="shadow-lg text-[#08245B] bg-white hover:bg-[#E5EAFF] font-medium rounded-full text-sm px-5 py-2.5 flex items-center justify-center w-full md:w-auto">        
          <img src="@/assets/slash.svg" alt="Inactivar" class="mr-2">
          <span class="hidden md:inline">Inactivar</span>
        </button>
        <button class="shadow-lg text-[#08245B] bg-white hover:bg-[#E5EAFF] font-medium rounded-full text-sm px-5 py-2.5 flex items-center justify-center w-full md:w-auto">        
          <img src="@/assets/x.svg" alt="Eliminar" class="mr-2">
          <span class="hidden md:inline">Eliminar</span>
        </button>
      </aside>
    </div>
  </section>
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
  
