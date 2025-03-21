<template>
    <section class="h-full w-full bg-white shadow-md p-4">
      <h2 class="text-left text-[#2A5CAA] font-bold text-3xl mb-6 bg-gradient-to-r from-gray-100 to-[#E5EAFF] p-3">
        Reporte de Conciliación Bancaria y Contable
      </h2>
  
      <!-- Contenedor flexible para la barra de búsqueda -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <span class="text-lg font-semibold text-[#2A5CAA] mb-2 sm:mb-0">Buscar Reporte:</span>
        
        <!-- Barra de búsqueda -->
        <div class="relative w-full sm:w-80">
          <div class="absolute inset-y-0 left-0 flex items-center ps-3 pointer-events-none">
            <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path>
            </svg>
          </div>
          <input type="text" id="table-search" class="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-full sm:w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Buscar">
        </div>
      </div>
  
      <!-- Tabla de reportes -->
      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mt-4">
        <thead class="text-xs text-[#08245B] uppercase bg-gradient-to-r from-gray-100 to-[#E5EAFF] dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3">Empresa</th>
            <th scope="col" class="px-6 py-3">Banco</th>
            <th scope="col" class="px-6 py-3">Número de Cuenta</th>
            <th scope="col" class="px-6 py-3">Fecha de Conciliación</th>
            <th scope="col" class="px-6 py-3">Número de Reporte</th>
            <th scope="col" class="px-6 py-3">Estado</th>
            <th scope="col" class="px-6 py-3">Acción</th>
          </tr>
        </thead>
        <tbody>
          <tr class="bg-white border-b text-[#08245B] dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
            <th scope="row" class="px-6 py-4 font-medium text-[#08245B] whitespace-nowrap dark:text-white">
              Empresa A
            </th>
            <td class="px-6 py-4">Bancolombia</td>
            <td class="px-6 py-4">1234567890</td>
            <td class="px-6 py-4">21/03/2025</td>
            <td class="px-6 py-4">EMP001-202503-002</td>
            <td class="px-6 py-4">Finalizado</td>
            <td class="px-6 py-4">
              <button @click="router.push('/ReportesContador')" class="text-blue-600 hover:underline">Ver</button>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  </template>
  
  <script setup>
  import { useRouter } from "vue-router";
  const router = useRouter();
  </script>