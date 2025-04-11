<template>
  <div class="w-full mt-10">
    <h3 class="text-2xl font-semibold text-[#2A5CAA] mb-6 border-b pb-2">📑 Conciliaciones</h3>

    <div v-if="loading" class="text-gray-500 mt-3 text-sm text-center">Cargando conciliaciones...</div>
    <div v-if="error" class="text-red-500 mt-3 text-sm text-center">Error: {{ error }}</div>

    <div v-if="conciliations" class="overflow-x-auto shadow rounded-lg">
      <table class="min-w-full text-sm text-left text-gray-700 bg-white border border-gray-200">
        <thead class="bg-[#F1F5F9] text-gray-600 uppercase text-xs">
          <tr>
            <th class="px-6 py-4">Conciliacion</th>
            <th class="px-6 py-4">Monto</th>
            <th class="px-6 py-4">Estado</th>
          </tr>
        </thead>
        <tbody v-if="conciliations.length > 0">
          <tr 
            v-for="conciliation in conciliations" :key="conciliation.id"
            class="border-t hover:bg-gray-50 transition-colors"
          >
            <td class="px-6 py-4">{{ conciliation.account_number }}</td>
            <td class="px-6 py-4">{{ conciliation.client }}</td>
            <td class="px-6 py-4">
              <span 
                :class="{
                  'text-green-600 font-semibold': 'Completado' === 'Completado',
                  'text-yellow-600 font-semibold': 's' === 'Pendiente',
                  'text-red-600 font-semibold': 'ds' === 'Fallido'
                }"
              >
              {{ conciliation.company }}
              </span>
            </td>
          </tr>
        </tbody>
        <tr v-else colspan="5" class="flex flex-col justify-center">
          <td class="ml-2 my-6">El cliente no tiene conciliaciones registradas.</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script setup>
  const props = defineProps({
    conciliations: Array
  })
  props
</script>
