<template>
  <div class="max-w-7xl mx-auto bg-white shadow-md rounded-lg p-6 flex flex-col gap-6">
  
  <!-- Título -->
  <div class="flex justify-between items-center border-b pb-4">
    <h2 class="text-2xl font-semibold text-gray-800">Conciliación Bancaria</h2>
    <button @click="redirectToCreateConciliation" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition">
      Nueva Conciliación
    </button>
  </div>

  <!-- Filtros -->
  <div class="flex flex-wrap gap-4 items-end">
    <div class="flex flex-col">
      <label class="text-sm text-gray-600 mb-1">Fecha inicial</label>
      <input type="date" class="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500" />
    </div>
    <div class="flex flex-col">
      <label class="text-sm text-gray-600 mb-1">Fecha final</label>
      <input type="date" class="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500" />
    </div>
    <div class="flex flex-col">
      <label class="text-sm text-gray-600 mb-1">Cuenta bancaria</label>
      <select class="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500">
        <option>Seleccione una cuenta</option>
        <option>Cuenta Corriente - Bancolombia</option>
        <option>Cuenta de Ahorros - Davivienda</option>
      </select>
    </div>
    <button class="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-md transition">
      Buscar
    </button>
  </div>

  <!-- Tablas de conciliación -->
  <div class="flex flex-col lg:flex-row gap-6">
    <!-- Transacciones bancarias -->
    <div class="flex-1 border rounded-lg p-4 bg-gray-50 shadow-sm">
      <h3 class="text-lg font-medium mb-3 text-gray-700">Transacciones Bancarias</h3>
      <ul class="space-y-2">
        <li class="flex justify-between items-center bg-white px-3 py-2 rounded shadow">
          <span>Transferencia #4567</span>
          <span>$1.200.000</span>
        </li>
        <li class="flex justify-between items-center bg-white px-3 py-2 rounded shadow">
          <span>Pago Nómina</span>
          <span>$3.400.000</span>
        </li>
      </ul>
    </div>

    <!-- Registros contables -->
    <div class="flex-1 border rounded-lg p-4 bg-gray-50 shadow-sm">
      <h3 class="text-lg font-medium mb-3 text-gray-700">Registros Contables</h3>
      <ul class="space-y-2">
        <li class="flex justify-between items-center bg-white px-3 py-2 rounded shadow">
          <span>Ingreso #984</span>
          <span>$1.200.000</span>
        </li>
        <li class="flex justify-between items-center bg-white px-3 py-2 rounded shadow">
          <span>Pago Servicios</span>
          <span>$3.400.000</span>
        </li>
      </ul>
    </div>
  </div>

  <!-- Botón de conciliación -->
  <div class="flex justify-end">
    <button class="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-md font-medium transition">
      Conciliar Seleccionados
    </button>
  </div>

</div>
</template>

<script setup>
  import router from '@/router';

  const redirectToCreateConciliation = () => {
    router.push(`conciliaciones/crear_conciliacion`)
  }
</script>