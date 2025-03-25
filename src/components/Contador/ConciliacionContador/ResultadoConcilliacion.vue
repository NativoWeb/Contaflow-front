<template>
  <div class="p-6 flex flex-col w-full h-full">
    <!-- Título -->
    <h2 class="text-xl font-bold bg-gradient-to-r from-[#F8F8F8] to-[#E5EAFF] text-[#193368] p-4 rounded-lg shadow-md text-center md:text-left">
      Resultados de la Conciliación
    </h2>

    <!-- Botones -->
    <div class="flex justify-end gap-4 my-8 flex flex-col md:flex-row">
      <button @click="goToModify" class="bg-blue-900 text-white px-6 py-3 rounded-lg shadow-md border border-gray-300 transition-all hover:bg-white hover:text-blue-900 hover:border-blue-900 w-full sm:w-60">
        Modificar
      </button>
      <button @click="goToReport" class="bg-blue-900 text-white px-6 py-3 rounded-lg shadow-md border border-gray-300 transition-all hover:bg-white hover:text-blue-900 hover:border-blue-900 w-full sm:w-60">
        Generar Reporte
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
            <td class="px-6 py-4">{{ row.fecha }}</td>
            <td class="px-6 py-4  md:table-cell">{{ row.concepto }}</td>
            <td class="px-6 py-4  md:table-cell">{{ row.montoBanco }}</td>
            <td class="px-6 py-4  md:table-cell">{{ row.montoContable }}</td>
            <td class="px-6 py-4  md:table-cell">{{ row.transaccion }}</td>
            <td class="px-6 py-4  md:table-cell">{{ row.estado }}</td>
            <td class="px-6 py-4  md:table-cell">{{ row.justificacion }}</td>

          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
  
  <script setup>
  import { ref, watch, onMounted } from "vue";
  import { useRouter, useRoute } from "vue-router";
  
  const router = useRouter();
  const route = useRoute();
  const rows = ref([]);
  
  // Cargar datos al montar el componente
  onMounted(() => {
    if (route.query.data) {
      rows.value = JSON.parse(route.query.data);
    } else {
      rows.value = [
        { fecha: "02/01/2025", concepto: "Pago mercancía", montoBanco: "$35,000", montoContable: "$35,000", transaccion: "Retiro", estado: "Conciliado", justificacion: "" },
        { fecha: "05/01/2025", concepto: "Comisión bancaria", montoBanco: "$1,500", montoContable: "", transaccion: "", estado: "Discrepancia", justificacion: "" },
        { fecha: "11/01/2025", concepto: "Pago factura 9006", montoBanco: "$5,000", montoContable: "", transaccion: "Depósito", estado: "Discrepancia", justificacion: "" },
        { fecha: "16/01/2025", concepto: "Cobranza cliente", montoBanco: "$7,000", montoContable: "$7,000", transaccion: "Depósito", estado: "Conciliado", justificacion: "" },
      ];
    }
  });
  
  // Detectar cambios en la ruta y actualizar los datos
  watch(() => route.query.data, (newData) => {
    if (newData) {
      rows.value = JSON.parse(newData);
    }
  });
  
  const goToModify = () => {
    router.push({ name: "ModificarConciliacion", query: { data: JSON.stringify(rows.value) } });
  };
  
  const goToReport = () => {            
    router.push({ name: "ReportesContador", query: { data: JSON.stringify(rows.value) } });
  };
  
  </script>
  