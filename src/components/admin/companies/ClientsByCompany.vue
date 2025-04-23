<template>
  <div class="w-full mt-10">
    <h3 class="text-2xl font-semibold text-[#2A5CAA] mb-6 border-b pb-2">🧑‍💼 Empleados Asociados</h3>

    <!-- <div v-if="loading" class="text-gray-500 mt-3 text-sm text-center">Cargando clientes...</div>
    <div v-if="error" class="text-red-500 mt-3 text-sm text-center">Error: {{ error }}</div> -->

    <div v-if="employees" class="overflow-x-auto shadow rounded-lg">
      <table class="min-w-full text-sm text-left text-gray-700 bg-white border border-gray-200">
        <thead class="bg-[#F1F5F9] text-gray-600 uppercase text-xs">
          <tr>
            <th class="px-6 py-4">Nombre</th>
            <th class="px-6 py-4">Correo Electrónico</th>
            <th class="px-6 py-4">Teléfono</th>
          </tr>
        </thead>
        <tbody v-if="employees.length > 0" >
          <tr v-for="employee in employees" :key="employee.id" class="border-t hover:bg-gray-50 transition-colors">
            <td class="px-6 py-4 font-medium">{{ employee.first_name }} {{ employee.last_name }}</td>
            <td class="px-6 py-4">{{ employee.username }}</td>
            <td class="px-6 py-4">{{ employee.phone_number }}</td>
          </tr>
        </tbody>
        <tr v-else colspan="5" class="flex flex-col justify-center">
          <td class="ml-2 my-6">El cliente no tiene empleados registrados.</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script setup>

  const props = defineProps({
    employees: Array,
  })

  console.log(props.employees)
  
</script>
