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
        </div>
        
      </section>
</template>

      <script setup>
        import { ref } from "vue";
        
        // Datos simulados
        const companies = ref([
          { name: "Empresa A", successful: 850, pending: 120, discrepancies: 45 },
          { name: "Empresa B", successful: 730, pending: 150, discrepancies: 60 },
          { name: "Empresa C", successful: 920, pending: 80, discrepancies: 30 },
        ]);
        
        const selectedCompany = ref("");
        const selectedData = ref({ successful: 0, pending: 0, discrepancies: 0 });
        
        // Función para actualizar los datos cuando cambia la empresa
        const updateData = () => {
          const company = companies.value.find((c) => c.name === selectedCompany.value);
          if (company) {
            selectedData.value = { ...company };
          }
        };
        </script>

      <style>
        @tailwind base;
        @tailwind components;
        @tailwind utilities;


      </style>
