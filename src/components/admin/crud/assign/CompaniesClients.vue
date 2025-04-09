<template>
  <div class="w-[100%] ">
    <h3 class="text-xl font-semibold text-[#2A5CAA] mb-6">Empresas de {{ data.first_name }}</h3>
    
    <div class="overflow-x-auto max-h-[500px] h-[70%] min-h-[300px] p-3 bg-white shadow-md rounded-lg">
      <table class="w-[100%] text-sm text-left text-gray-800 dark:text-gray-400">
        <thead class="text-xs uppercase bg-gradient-to-r from-[#F8F8F8] to-[#E5EAFF] text-[#193368]">
          <tr>
            <th scope="col" class="px-6 py-3">NIT</th>
            <th scope="col" class="px-6 py-3  md:table-cell">Razón Social</th>
            <th scope="col" class="px-6 py-3  md:table-cell">Sector Económico</th>
            <th scope="col" class="px-6 py-3  md:table-cell">Dirección</th>
          </tr>
        </thead>
          <tbody v-if="data && data.companies_data > 0">
            <tr v-for="user in data.companies_data" :key="user.id" @click="goToClientDetails(user.id)" class="cursor-pointer bg-white border-b hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-600">
              <td class="px-6 py-4">{{ user.first_name }} {{ user.last_name }}</td>
              <td class="px-6 py-4">{{ user.id_number }}</td>
              <td class="px-6 py-4">{{ user.username }}</td>
              <td class="px-6 py-4">{{ user.phone_number }}</td>
            </tr>
          </tbody>
          <tr v-else class="flex flex-col justify-center">
            <td class="ml-2 my-6">No tiene empresas registradas</td>
          </tr>
        <div v-if="isLoading" class="flex justify-center items-start">
          <img src="@/assets/loader.svg" alt="carga" class="mt-20 h-32 w-32">
        </div>
        <tr v-if="err" colspan="5" class="flex flex-col justify-center">
          <td class="ml-2 my-6">Ocurrio un error {{ err }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script setup>

  const props = defineProps({data: Object})

  console.log(props.data)
  props
</script>