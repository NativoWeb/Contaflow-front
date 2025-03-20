<template>
  <section class="contenido z-10 w-full h-full p-6 bg-white shadow-lg rounded-lg">
    <h2 class="w-full text-xl font-bold bg-gradient-to-r from-gray-100 to-blue-100 text-blue-800 p-4 rounded-t-lg">
      Resultados de la Conciliación
    </h2>
    
    <div class="flex justify-end gap-4 my-8">
      <button @click="goToModify" class="bg-blue-900 text-white px-6 py-3 rounded-lg shadow-md border border-gray-300 transition-all hover:bg-white hover:text-blue-900 hover:border-blue-900 w-full sm:w-60">
        Modificar
      </button>
      <button @click="goToReport" class="bg-blue-900 text-white px-6 py-3 rounded-lg shadow-md border border-gray-300 transition-all hover:bg-white hover:text-blue-900 hover:border-blue-900 w-full sm:w-60">
        Generar Reporte
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
            <td class="px-6 py-4">{{ row.fecha }}</td>
            <td class="px-6 py-4">{{ row.concepto }}</td>
            <td class="px-6 py-4">{{ row.montoBanco }}</td>
            <td class="px-6 py-4">{{ row.montoContable }}</td>
            <td class="px-6 py-4">{{ row.transaccion }}</td>
            <td class="px-6 py-4">{{ row.estado }}</td>
            <td class="px-6 py-4">{{ row.justificacion }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
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
  router.push({ name: "ModificarCon", query: { data: JSON.stringify(rows.value) } });
};

const goToReport = () => {            
  router.push({ name: "ReporteAdmin", query: { data: JSON.stringify(rows.value) } });
};

</script>
