<template>
  <section>
    <!-- Selector de Empresa -->
    <select
      v-model="selectedCompany"
      @change="updateData"
      class="mb-6 p-3 border border-[gray-300] rounded-full bg-white text-blue-800 
            w-full max-w-xs shadow-md focus:outline-none focus:ring-2 
            focus:ring-blue-400 focus:border-blue-400 cursor-pointer transition-all
            hover:text-blue-600"
    >
      <option disabled value="" class="text-[#193368]">Seleccionar Empresa</option>
      <option 
        v-for="(company, index) in companies" 
        :key="index" 
        :value="company.name"
        class="text-[#193368]"
      >
        {{ company.name }}
      </option>
    </select>

    <div class="p-8 bg-[white] min-h-screen flex flex-col items-center w-full">
      <!-- Tarjetas de Estadísticas -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-20 w-full font-bold">
        <div class="bg-[#4CAF50] p-6 rounded-lg shadow-md text-center w-full flex flex-col justify-center items-center h-40">
          <h3 class="text-white text-lg">Conciliaciones Exitosas</h3>
          <p class="text-3xl text-white">{{ selectedData.successful }}</p>
        </div>

        <div class="bg-[#2A5CAA] p-6 rounded-lg shadow-md text-center w-full flex flex-col justify-center items-center h-40">
          <h3 class="text-white text-lg">Conciliaciones Pendientes</h3>
          <p class="text-3xl text-white">{{ selectedData.pending }}</p>
        </div>

        <div class="bg-[#E53935] p-6 rounded-lg shadow-md text-center w-full flex flex-col justify-center items-center h-40">
          <h3 class="text-white text-lg">Discrepancias</h3>
          <p class="text-3xl text-white">{{ selectedData.discrepancies }}</p>
        </div>
      </div>

      <!-- Gráficas -->
      <div class="row mt-10 w-[90%]">
        <div class="col-md-6 offset-3">
          <div class="card border border-dark">
            <div class="card-header bg-dark text-white">Conciliaciones por Mes</div>
            <div class="card-body">
              <!-- Canvas para la gráfica -->
              <canvas id="conciliationsChart"></canvas>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Chart from 'chart.js/auto';

// Datos simulados de las empresas
const companies = ref([
  { name: "Empresa A", monthlyData: [
    { month: 'Enero', successful: 20, pending: 5, discrepancies: 3 },
    { month: 'Febrero', successful: 25, pending: 6, discrepancies: 4 },
    { month: 'Marzo', successful: 30, pending: 3, discrepancies: 2 },
    // Agregar más meses...
  ]},
  { name: "Empresa B", monthlyData: [
    { month: 'Enero', successful: 18, pending: 7, discrepancies: 5 },
    { month: 'Febrero', successful: 22, pending: 4, discrepancies: 6 },
    { month: 'Marzo', successful: 28, pending: 2, discrepancies: 1 },
    // Agregar más meses...
  ]},
  { name: "Empresa C", monthlyData: [
    { month: 'Enero', successful: 15, pending: 3, discrepancies: 2 },
    { month: 'Febrero', successful: 20, pending: 5, discrepancies: 4 },
    { month: 'Marzo', successful: 18, pending: 4, discrepancies: 3 },
    // Agregar más meses...
  ]},
]);

const selectedCompany = ref("");
const selectedData = ref({ successful: 0, pending: 0, discrepancies: 0 });
const chartInstance = ref(null);

// Función para actualizar los datos cuando cambia la empresa seleccionada
const updateData = () => {
  const company = companies.value.find((c) => c.name === selectedCompany.value);
  if (company) {
    // Actualizar los valores de las tarjetas con la suma total de cada categoría
    selectedData.value.successful = company.monthlyData.reduce((acc, month) => acc + month.successful, 0);
    selectedData.value.pending = company.monthlyData.reduce((acc, month) => acc + month.pending, 0);
    selectedData.value.discrepancies = company.monthlyData.reduce((acc, month) => acc + month.discrepancies, 0);
    
    // Actualizar la gráfica
    updateChart(company.monthlyData);
  }
};

// Función para actualizar la gráfica
const updateChart = (monthlyData) => {
  const ctx = document.getElementById('conciliationsChart').getContext('2d');
  if (chartInstance.value) {
    chartInstance.value.destroy(); // Elimina la gráfica anterior si existe
  }
  chartInstance.value = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: monthlyData.map(row => row.month),
      datasets: [
        {
          label: 'Conciliaciones Exitosas',
          data: monthlyData.map(row => row.successful),
          backgroundColor: '#4CAF50',
        },
        {
          label: 'Conciliaciones Pendientes',
          data: monthlyData.map(row => row.pending),
          backgroundColor: '#2A5CAA',
        },
        {
          label: 'Discrepancias',
          data: monthlyData.map(row => row.discrepancies),
          backgroundColor: '#E53935',
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'Meses'
          }
        },
        y: {
          title: {
            display: true,
            text: 'Cantidad'
          },
          beginAtZero: true,
        }
      }
    }
  });
};

// Inicializa la gráfica al cargar el componente
onMounted(() => {
  if (companies.value.length > 0) {
    updateChart(companies.value[0].monthlyData); // Inicializar con los datos de la primera empresa
  }
});
</script>


      <style>
        @tailwind base;
        @tailwind components;
        @tailwind utilities;
        canvas {
    max-width: 100%;
    height: 400px;
  }

      </style>
