<template>
  <section class="max-w-4xl mx-auto mt-4 p-6 bg-white rounded-lg shadow-md">
    
    <!-- Contenedor principal con información y botones al lado -->
    <div class="w-full flex flex-col md:flex-row justify-between p-8 gap-6" style="border-radius: 0 0 8px 8px;">
      
      <!-- Información de la empresa -->
      <div class="flex-1">
        <h2 class="text-2xl font-bold text-[#2A5CAA] mb-6 text-center">Información de la Empresa</h2>
        <div class="flex flex-col space-y-4 text-gray-700">
          <div class="flex justify-between items-center">
            <p class="font-semibold w-1/3">Razón Social:</p>
            <p class="w-2/3">{{ company.name }}</p>
          </div>
          <div class="flex justify-between items-center">
            <p class="font-semibold w-1/3">NIT:</p>
            <p class="w-2/3">{{ company.nit }}</p>
          </div>
          <div class="flex justify-between items-center">
            <p class="font-semibold w-1/3">Dirección:</p>
            <p class="w-2/3">{{ company.address }}</p>
          </div>
          <div class="flex justify-between items-center">
            <p class="font-semibold w-1/3">Sector Económico:</p>
            <p class="w-2/3">{{ company.sector }}</p>
          </div>
          <div class="flex justify-between items-center">
            <p class="font-semibold w-1/3">Fecha de Registro:</p>
            <p class="w-2/3">{{ formatDate(company.createdAt) }}</p>
          </div>
        </div>
      </div>

      <!-- Botones al lado derecho -->
      <div class="flex flex-col gap-4 md:w-1/5 w-full md:items-end mt-10">
        <button class="w-full transition duration-300 ease-in-out hover:drop-shadow-lg hover:scale-105 bg-[#2A5CAA] text-white px-4 py-2 rounded-md hover:bg-blue-700">Editar</button>
        <button class="w-full transition duration-300 ease-in-out hover:drop-shadow-lg hover:scale-105 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"> Eliminar </button>

      </div>

    </div>
  </section>
</template>


<script setup>
import { ref } from 'vue'

const company = ref({
  name: 'ContaFlow S.A.S',
  nit: '12345678-9',
  address: 'Cra 45 #78-91, Medellín, Colombia',
  sector: 'Tecnología e Informática',
  createdAt: '2025-04-07T12:34:56Z'
})

function formatDate(dateStr) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(dateStr).toLocaleDateString('es-CO', options)
}
</script>
