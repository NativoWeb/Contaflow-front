<template>
  <div class="p-6 flex flex-col w-full h-full">
    <!-- Título -->
    <h2 class="text-xl font-bold bg-gradient-to-r from-[#F8F8F8] to-[#E5EAFF] text-[#193368] p-4 rounded-lg shadow-md text-center md:text-left">
      Modificar Conciliación
    </h2>

    <!-- Botones -->
    <div class="flex justify-end gap-4 my-8">
        <button @click="saveChanges" class="bg-blue-900 text-white px-6 py-3 rounded-lg shadow-md border border-gray-300 transition-all hover:bg-white hover:text-blue-900 hover:border-blue-900 w-full sm:w-60">
          Guardar Cambios
        </button>
      </div>

   <!-- Tabla -->
   <div class="overflow-x-auto p-4 bg-white shadow-md rounded-lg">
      <table class="w-full text-sm text-left text-gray-800 dark:text-gray-400">
        <thead class="text-xs uppercase bg-gradient-to-r from-[#F8F8F8] to-[#E5EAFF] text-[#193368]">
          <tr>
            <th scope="col" class="px-6 py-3">Fecha</th>
            <th scope="col" class="px-6 py-3  md:table-cell">Concepto</th>
            <th scope="col" class="px-6 py-3  md:table-cell">Monto Banco</th>
            <th scope="col" class="px-6 py-3  md:table-cell">Monto Contable</th>
            <th scope="col" class="px-6 py-3  md:table-cell">Tipo de Transacción</th>
            <th scope="col" class="px-6 py-3  md:table-cell">Estado</th>
            <th scope="col" class="px-6 py-3  md:table-cell">Justificación</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in rows" :key="index" class="bg-white border-b hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-600">
            <td class="px-6 py-4"><input v-model="row.fecha" class="border p-1 w-full" /></td>
            <td class="px-6 py-4  md:table-cell"><input v-model="row.concepto" class="border p-1 w-full" /></td>
            <td class="px-6 py-4  md:table-cell"><input v-model="row.montoBanco" class="border p-1 w-full" /></td>
            <td class="px-6 py-4  md:table-cell"><input v-model="row.montoContable" class="border p-1 w-full" /></td>
            <td class="px-6 py-4  md:table-cell"><input v-model="row.transaccion" class="border p-1 w-full" /></td>
            <td class="px-6 py-4  md:table-cell"><input v-model="row.estado" class="border p-1 w-full" /></td>
            <td class="px-6 py-4  md:table-cell"><input v-model="row.justificacion" class="border p-1 w-full" /></td>

          </tr>
        </tbody>
      </table>
    </div>
  </div>
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
  