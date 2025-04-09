<template>
  <div class="w-full mt-10">
    <h3 class="text-2xl font-semibold text-[#2A5CAA] mb-6 border-b pb-2">🧑‍💼 Clientes Asociados</h3>

    <div class="overflow-x-auto shadow rounded-lg">
      <table class="min-w-full text-sm text-left text-gray-700 bg-white border border-gray-200">
        <thead class="bg-[#F1F5F9] text-gray-600 uppercase text-xs">
          <tr>
            <th class="px-6 py-4">Nombre</th>
            <th class="px-6 py-4">Correo Electrónico</th>
            <th class="px-6 py-4">Teléfono</th>
          </tr>
        </thead>
        <tbody>
          <tr 
            class="border-t hover:bg-gray-50 transition-colors"
          >
            <td class="px-6 py-4 font-medium">sa</td>
            <td class="px-6 py-4">sa</td>
            <td class="px-6 py-4">sa</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- <div v-if="loading" class="text-gray-500 mt-3 text-sm text-center">Cargando clientes...</div>
    <div v-if="error" class="text-red-500 mt-3 text-sm text-center">Error: {{ error }}</div> -->
  </div>
</template>

<script setup>
</script>
