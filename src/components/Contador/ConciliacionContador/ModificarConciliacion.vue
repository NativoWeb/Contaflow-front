<template>
    <section class="contenido z-10 w-full p-6 bg-white shadow-lg rounded-lg">
      <h2 class="w-full text-xl font-bold bg-gradient-to-r from-gray-100 to-blue-100 text-blue-800 p-4 rounded-t-lg text-center">
        Modificar Conciliación
      </h2>
      
      <div class="flex justify-end gap-4 my-8">
        <button @click="saveChanges" class="bg-blue-900 text-white px-6 py-3 rounded-lg shadow-md border border-gray-300 transition-all hover:bg-white hover:text-blue-900 hover:border-blue-900 w-full sm:w-60">
          Guardar Cambios
        </button>
      </div>
  
      <div class="overflow-x-auto">
        <table class="w-full text-sm text-left text-gray-500 border border-gray-200 rounded-lg">
          <thead class="text-xs text-blue-900 uppercase bg-gradient-to-r from-gray-100 to-blue-100">
            <tr>
              <th class="px-6 py-3">Fecha</th>
              <th class="px-6 py-3">Concepto</th>
              <th class="px-6 py-3">Monto Banco</th>
              <th class="px-6 py-3">Monto Contable</th>
              <th class="px-6 py-3">Tipo de Transacción</th>
              <th class="px-6 py-3">Estado</th>  
              <th class="px-6 py-3">Justificación</th>  
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, index) in rows" :key="index" class="bg-white border-b hover:bg-gray-50">
              <td class="px-6 py-4"><input v-model="row.fecha" class="border p-1 w-full" /></td>
              <td class="px-6 py-4"><input v-model="row.concepto" class="border p-1 w-full" /></td>
              <td class="px-6 py-4"><input v-model="row.montoBanco" class="border p-1 w-full" /></td>
              <td class="px-6 py-4"><input v-model="row.montoContable" class="border p-1 w-full" /></td>
              <td class="px-6 py-4"><input v-model="row.transaccion" class="border p-1 w-full" /></td>
              <td class="px-6 py-4"><input v-model="row.estado" class="border p-1 w-full" /></td>
              <td class="px-6 py-4"><input v-model="row.justificacion" class="border p-1 w-full" /></td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import { useRouter, useRoute } from "vue-router";
  
  const router = useRouter();
  const route = useRoute();
  const rows = ref([]);
  
  onMounted(() => {
    if (route.query.data) {
      rows.value = JSON.parse(route.query.data);
    }
  });
  
  const saveChanges = () => {
    router.replace({ name: "ResultadoConcilliacion", query: { data: JSON.stringify(rows.value) } });
  };
  </script>
  