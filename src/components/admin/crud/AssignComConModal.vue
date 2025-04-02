<template>
  <button @click="toggleAssignModal" class="btn-action">Asignar Empresa y Banco</button>

  <!-- Modal para asignar empresa -->
  <div v-if="isAssignModalOpen" 
   class="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50 p-4">
    <div class="p-10 relative w-[80%] h-[80%] bg-white rounded-lg shadow-lg dark:bg-gray-800">
      <!-- Encabezado -->
      <div>
        <h3 class="text-xl font-semibold text-[#2A5CAA]">Asignar empresa</h3>
      </div>

      <!-- Contenedor de las tablas con flexbox -->
      <div class="tables-container flex flex-wrap gap-4 p-2 h-[80%]">
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg w-1/2 h-[100%]">
          <h2 class="text-xl font-bold text-[#2A5CAA] p-3">Empresas</h2>
          <table class="w-full text-sm text-left rtl:text-right text-[#08245B]">
            <thead class="text-xs uppercase bg-gradient-to-r from-[#F8F8F8] to-[#E5EAFF]">
              <tr>
                <th scope="col" class="px-6 py-3">Nit</th>
                <th scope="col" class="px-6 py-3">Razón Social</th>
                <th scope="col" class="px-6 py-3">Sector Económico</th>
                <th scope="col" class="px-6 py-3">Dirección</th>
                <th scope="col" class="px-6 py-3">Acción</th>
              </tr>
            </thead>
            <tbody>
                <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                    <td class="px-6 py-4">123456789</td>
                    <td class="px-6 py-4">Empresa A</td>
                    <td class="px-6 py-4">Finanzas</td>
                    <td class="px-6 py-4">Calle 123</td>
                    <td class="px-6 py-4">
                        <button class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Ver</button>
                    </td>
                </tr>
            </tbody>
          </table>
        </div>

        <div class="relative overflow-x-auto shadow-md sm:rounded-lg w-1/2">
          <h2 class="text-xl font-bold text-[#2A5CAA] p-3">Empresas</h2>
          <table class="w-full text-sm text-left rtl:text-right text-[#08245B]">
            <thead class="text-xs uppercase bg-gradient-to-r from-[#F8F8F8] to-[#E5EAFF]">
              <tr>
                <th scope="col" class="px-6 py-3">Nit</th>
                <th scope="col" class="px-6 py-3">Razón Social</th>
                <th scope="col" class="px-6 py-3">Sector Económico</th>
                <th scope="col" class="px-6 py-3">Dirección</th>
                <th scope="col" class="px-6 py-3">Acción</th>
              </tr>
            </thead>
            <tbody>
                <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                    <td class="px-6 py-4">123456789</td>
                    <td class="px-6 py-4">Empresa A</td>
                    <td class="px-6 py-4">Finanzas</td>
                    <td class="px-6 py-4">Calle 123</td>
                    <td class="px-6 py-4">
                        <button class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Ver</button>
                    </td>
                </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Botones -->
      <div class="flex justify-center space-x-3 p-5 dark:border-gray-700">
        <button @click="toggleAssignModal"
                class="px-5 py-2.5 text-[#193368] bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 
                      focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 
                      dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
          Cancelar
        </button>
        <button @click="confirmAssign"
                type="button" 
                class="py-3 px-5 ms-3 text-sm font-medium focus:outline-none bg-[#08245B] hover:bg-[#2a4b8d] text-white rounded-lg border">
          Confirmar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>