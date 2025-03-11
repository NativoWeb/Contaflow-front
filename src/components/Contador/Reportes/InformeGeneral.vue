<template>
    <MenuContador />
    <section class="contenido z-10 p-4 sm:p-6 pt-[100px] sm:pt-[250px] bg-gray-100 ml-2 sm:ml-20 min-h-screen transition-all">      <!-- Botón de descarga fijo a la derecha -->
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
        <!-- Título centrado en móviles y alineado en escritorio -->
        <h2 class="text-lg sm:text-2xl font-semibold text-[#193368] text-center">
            Reporte de Conciliación Bancaria y Contable
        </h2>
        
        <!-- Información de reporte -->
        <div class="grid gap-4 mt-6" >
          <p class="text-[#193368] text-left"><strong>Número de Reporte:</strong> 00123</p>
          <p class="text-[#193368] text-left"><strong>Cuenta Bancaria:</strong> 1234567890</p>
          <p class="text-[#193368] text-left"><strong>Fecha de conciliación:</strong> 10/03/2025</p>
          <p class="text-[#193368] text-left"><strong>Periodo Analizado:</strong> Febrero 2025</p>
          <p class="text-[#193368] text-left"><strong>Usuario Responsable:</strong> Juan Pérez</p>
        </div>
  
        <!-- Título de sección -->
        <div class="mt-6">
          <h3 class="text-lg md:text-xl font-semibold text-[#193368]">Resumen General de la Conciliación</h3>
        </div>
  
        <!-- Contenedor responsivo para la tabla -->
        <div class="overflow-x-auto mt-4">
            <table class="w-full text-sm text-left text-gray-500 border border-gray-200">
            <thead class="text-xs text-[#08245B] uppercase bg-gradient-to-r from-gray-100 to-[#E5EAFF]">
              <tr>
                <th class="px-4 py-3">NIT</th>
                <th class="px-4 py-3">Razón Social</th>
                <th class="px-4 py-3">Sector económico</th>
                <th class="px-4 py-3">Correo</th>
                <th class="px-4 py-3">Dirección</th>
              </tr>
            </thead>
            <tbody>
              <tr class="bg-white border-b text-[#08245B] hover:bg-gray-50">
                <td class="px-4 py-4 font-medium">224521-9</td>
                <td class="px-4 py-4">SPA Laura</td>
                <td class="px-4 py-4">Comercio y Ventas</td>
                <td class="px-4 py-4">SPA.Laura@gmail.com</td>
                <td class="px-4 py-4">Cra 4 #22-65</td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- Título de sección -->
        <div class="mt-6">
          <h3 class="text-lg md:text-xl font-semibold text-[#193368]">Resumen General de la Conciliación</h3>
        </div>
  
        <!-- Contenedor responsivo para la tabla -->
        <div class="overflow-x-auto mt-4">
            <table class="w-full text-sm text-left text-gray-500 border border-gray-200">
            <thead class="text-xs text-[#08245B] uppercase bg-gradient-to-r from-gray-100 to-[#E5EAFF]">
              <tr>
                <th class="px-4 py-3">NIT</th>
                <th class="px-4 py-3">Razón Social</th>
                <th class="px-4 py-3">Sector económico</th>
                <th class="px-4 py-3">Correo</th>
                <th class="px-4 py-3">Dirección</th>
              </tr>
            </thead>
            <tbody>
              <tr class="bg-white border-b text-[#08245B] hover:bg-gray-50">
                <td class="px-4 py-4 font-medium">224521-9</td>
                <td class="px-4 py-4">SPA Laura</td>
                <td class="px-4 py-4">Comercio y Ventas</td>
                <td class="px-4 py-4">SPA.Laura@gmail.com</td>
                <td class="px-4 py-4">Cra 4 #22-65</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  </template>
  

  <script>
 import MenuContador from '../MenuContador.vue';
  import { jsPDF } from "jspdf";  // Para generar archivos PDF
  import * as XLSX from "xlsx";   // Para generar archivos Excel
  import { saveAs } from "file-saver";  // Para descargar archivos en el navegador
  import html2canvas from "html2canvas"; // Para capturar contenido como imagen
  
  export default {
  components: {
    MenuContador
  },
  data() {
    return {
      dropdownVisible: false,
      data: [
        { id: 1, nombre: "Juan Pérez", email: "juan@example.com" },
        { id: 2, nombre: "María López", email: "maria@example.com" }
      ]
    };
  },
    methods: {
      toggleDropdown() {
        this.dropdownVisible = !this.dropdownVisible;
      },
  
      exportToPDF() {
        console.log("Descargando PDF...");
        const informacion = document.querySelector(".informacion"); 
  
        html2canvas(informacion, { scale: 2 }).then((canvas) => {
          const imgData = canvas.toDataURL("image/png");
          const doc = new jsPDF("p", "mm", "a4");
          const imgWidth = 190; 
          const imgHeight = (canvas.height * imgWidth) / canvas.width;
  
          doc.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
          doc.save("reporte.pdf");
        });
      },
  
      exportToExcel() {
        console.log("Descargando Excel...");
        const informacion = document.querySelector(".informacion");
        const data = [];
  
        // Captura todo el texto relevante
        informacion.querySelectorAll("p, h1, h2, h3, h4, h5, h6, li").forEach((element) => {
          data.push([element.innerText]);
        });
  
        // Captura las tablas
        informacion.querySelectorAll("table").forEach((table) => {
          const rows = table.querySelectorAll("tr");
          rows.forEach((row) => {
            const rowData = [];
            row.querySelectorAll("th, td").forEach((cell) => {
              rowData.push(cell.innerText);
            });
            data.push(rowData);
          });
        });
  
        const worksheet = XLSX.utils.aoa_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Reporte");
  
        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
        const dataBlob = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
  
        saveAs(dataBlob, "reporte_completo.xlsx");
      },
  
      exportToCSV() {
        console.log("Descargando CSV...");
        const informacion = document.querySelector(".informacion");
        let csvContent = "";
  
        // Captura de textos
        informacion.querySelectorAll("p, h1, h2, h3, h4, h5, h6, li").forEach((element) => {
          csvContent += `"${element.innerText.replace(/"/g, '""')}"\n`;
        });
  
        // Captura de tablas
        informacion.querySelectorAll("table").forEach((table) => {
          table.querySelectorAll("tr").forEach((row) => {
            const rowData = [];
            row.querySelectorAll("th, td").forEach((cell) => {
              rowData.push(`"${cell.innerText.replace(/"/g, '""')}"`);
            });
            csvContent += rowData.join(",") + "\n";
          });
        });
  
        const csvBlob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        saveAs(csvBlob, "reporte_completo.csv");
      }
    }
  };
  </script>
  
    
    <style scoped>
    .contenido {
      padding: 21px;
      transition: margin-left 0.3s ease;
      padding-top: 250px;
      background-color: #F5F5F5;
      margin-left: 80px; /* Esto se aplica por defecto en pantallas de escritorio */
      height: 100vh;
    }
    
    .menu-lateral.open ~ .contenido {
      margin-left: 309px;
      width: calc(100% - 309px);
    }
    
    /* Media query para pantallas móviles */
    @media (max-width: 768px) {
      .contenido {
        margin-left: 0; /* Esto se aplica en pantallas móviles */
        padding-top: 110px;
        height: 100%;
      }
    
      .menu-lateral.open ~ .contenido {
        margin-left: 0; /* Asegúrate de que el margen izquierdo sea 0 en móviles incluso cuando el menú esté abierto */
        width: 100%; /* Asegúrate de que el contenido ocupe el 100% del ancho en móviles */
        padding-top: 110px;
      }
    }
    
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
    
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: 'Roboto', sans-serif;
    }


    </style>
    