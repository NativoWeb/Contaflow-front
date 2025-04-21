<template>
  <div class="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
    
    <!-- Título -->
    <div class="mb-6 border-b pb-4 flex justify-between items-center">
      <h2 class="text-2xl font-semibold text-gray-800">Nueva Conciliación</h2>
      <a href="#" class="text-blue-600 hover:underline text-sm">Volver</a>
    </div>

    <!-- Formulario -->
    <form class="space-y-6">

      <!-- Cuenta bancaria -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Cuenta bancaria</label>
        <select class="w-full border-gray-300 rounded-md shadow-sm px-4 py-2 focus:outline-none focus:ring focus:border-blue-500">
          <option>Seleccione una cuenta</option>
          <option>Cuenta Corriente - Bancolombia</option>
          <option>Cuenta Ahorros - Davivienda</option>
        </select>
      </div>

      <!-- Fecha y Periodo -->
      <div class="flex flex-col md:flex-row gap-4">
        <div class="flex-1">
          <label class="block text-sm font-medium text-gray-700 mb-1">Fecha de conciliación</label>
          <input type="date" class="w-full border-gray-300 rounded-md shadow-sm px-4 py-2 focus:outline-none focus:ring focus:border-blue-500">
        </div>
        <div class="flex-1">
          <label class="block text-sm font-medium text-gray-700 mb-1">Mes</label>
          <select class="w-full border-gray-300 rounded-md shadow-sm px-4 py-2 focus:outline-none focus:ring focus:border-blue-500">
            <option>Enero</option>
            <option>Febrero</option>
            <option>Marzo</option>
            <!-- ... -->
          </select>
        </div>
        <div class="flex-1">
          <label class="block text-sm font-medium text-gray-700 mb-1">Año</label>
          <input type="number" min="2000" max="2099" class="w-full border-gray-300 rounded-md shadow-sm px-4 py-2 focus:outline-none focus:ring focus:border-blue-500" placeholder="2025">
        </div>
      </div>

      <!-- Saldos -->
      <div class="flex flex-col md:flex-row gap-4">
        <div class="flex-1">
          <label class="block text-sm font-medium text-gray-700 mb-1">Saldo inicial</label>
          <input type="number" step="0.01" class="w-full border-gray-300 rounded-md shadow-sm px-4 py-2 focus:outline-none focus:ring focus:border-blue-500" placeholder="$0.00">
        </div>
        <div class="flex-1">
          <label class="block text-sm font-medium text-gray-700 mb-1">Saldo final</label>
          <input type="number" step="0.01" class="w-full border-gray-300 rounded-md shadow-sm px-4 py-2 focus:outline-none focus:ring focus:border-blue-500" placeholder="$0.00">
        </div>
      </div>

      <!-- Observaciones -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Observaciones</label>
        <textarea rows="4" class="w-full border-gray-300 rounded-md shadow-sm px-4 py-2 focus:outline-none focus:ring focus:border-blue-500" placeholder="Notas o comentarios..."></textarea>
      </div>

      <!-- Botón Guardar -->
      <div class="flex justify-end">
        <button type="submit" class="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-md font-medium transition">
          Guardar Conciliación
        </button>
      </div>

    </form>
  </div>
</template>

<script setup>

</script>