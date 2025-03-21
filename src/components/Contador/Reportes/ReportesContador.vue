<template>
  <section class="h-full w-full">
    <div class="relative text-right z-10">
      <button @click="toggleDropdown" class="bg-[#08245B] text-white px-4 py-2 rounded-full shadow-md hover:bg-[#2A5CAA] w-40">
        Descargar
      </button>
      <ul v-if="dropdownVisible" class="absolute right-0 mt-2 bg-white shadow-md rounded-md w-40 text-left">
        <li @click="exportToPDF" class="px-4 py-2 hover:bg-gray-200 cursor-pointer">Descargar PDF</li>
        <li @click="exportToExcel" class="px-4 py-2 hover:bg-gray-200 cursor-pointer">Descargar Excel</li>
        <li @click="exportToCSV" class="px-4 py-2 hover:bg-gray-200 cursor-pointer">Descargar CSV</li>
      </ul>
    </div>

    <div class="informacion relative shadow-md w-full bg-white p-4 md:p-6 mt-6">
      <h2 class="text-lg sm:text-2xl font-semibold text-[#193368] text-center">
          Reporte de Conciliación Bancaria y Contable
      </h2>
      
      <div class="grid gap-4 mt-6">
        <p class="text-[#193368] text-left"><strong>Número de Reporte:</strong> 00123</p>
        <p class="text-[#193368] text-left"><strong>Cuenta Bancaria:</strong> 1234567890</p>
        <p class="text-[#193368] text-left"><strong>Fecha de conciliación:</strong> 10/03/2025</p>
        <p class="text-[#193368] text-left"><strong>Periodo Analizado:</strong> Febrero 2025</p>
        <p class="text-[#193368] text-left"><strong>Usuario Responsable:</strong> Juan Pérez</p>
      </div>

      <div class="mt-6">
        <h3 class="text-lg md:text-xl font-semibold text-[#193368]">Resumen General de la Conciliación</h3>
      </div>

      <div class="overflow-x-auto">
        <table ref="tableRef" class="w-full text-sm text-left text-gray-500 border border-gray-200 rounded-lg">
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
    </div>
  </section>
</template>

<script>
import { jsPDF } from "jspdf";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import html2canvas from "html2canvas";
import "jspdf-autotable";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

export default {
setup() {
  const route = useRoute();
  const rows = ref([]);
  const dropdownVisible = ref(false);

  onMounted(() => {
    if (route.query.data) {
      rows.value = JSON.parse(route.query.data);
    }
  });

  const toggleDropdown = () => {
    dropdownVisible.value = !dropdownVisible.value;
  };

  const exportToPDF = () => {
    const informacion = document.querySelector(".informacion");
    html2canvas(informacion, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const doc = new jsPDF("p", "mm", "a4");
      const imgWidth = 190;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      doc.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
      doc.save("reporte.pdf");
    });
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(rows.value);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Reporte");
    XLSX.writeFile(wb, "reporte_conciliacion.xlsx");
  };

  const exportToCSV = () => {
    let csvContent = "";
    document.querySelectorAll(".informacion p, h2, h3").forEach((element) => {
      csvContent += `"${element.innerText.replace(/"/g, '""')}"\n`;
    });
    document.querySelectorAll("table tr").forEach((row) => {
      let rowData = [];
      row.querySelectorAll("th, td").forEach((cell) => {
        rowData.push(`"${cell.innerText.replace(/"/g, '""')}"`);
      });
      csvContent += rowData.join(",") + "\n";
    });
    const csvBlob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    saveAs(csvBlob, "reporte_completo.csv");
  };

  return {
    rows,
    dropdownVisible,
    toggleDropdown,
    exportToPDF,
    exportToExcel,
    exportToCSV
  };
}
};
</script>
