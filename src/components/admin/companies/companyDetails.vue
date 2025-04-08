<template>
  <section class="max-w-4xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
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
