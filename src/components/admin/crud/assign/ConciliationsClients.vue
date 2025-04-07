<template>
  <h3 class="text-xl font-semibold text-[#2A5CAA] mb-6">Empresas de {{ data.first_name }}</h3>
  
  <div class="overflow-x-auto max-h-[500px] h-[70%] min-h-[300px] p-3 bg-white shadow-md rounded-lg">
    <table class="w-full text-sm text-left text-gray-800 dark:text-gray-400">
      <thead class="text-xs uppercase bg-gradient-to-r from-[#F8F8F8] to-[#E5EAFF] text-[#193368]">
        <tr>
          <th scope="col" class="px-6 py-3">Nombre</th>
          <th scope="col" class="px-6 py-3  md:table-cell">Número de Identificación</th>
          <th scope="col" class="px-6 py-3  md:table-cell">Correo</th>
          <th scope="col" class="px-6 py-3  md:table-cell">Celular</th>
          <th scope="col" class="px-6 py-3  md:table-cell">Estado</th>
        </tr>
      </thead>
      <tbody v-if="data">
        <tr v-for="user in data" :key="user.id" @click="goToClientDetails(user.id)" class="cursor-pointer bg-white border-b hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-600">
        <td class="px-6 py-4">{{ user.first_name }} {{ user.last_name }}</td>
        <td class="px-6 py-4">{{ user.id_number }}</td>
        <td class="px-6 py-4">{{ user.username }}</td>
        <td class="px-6 py-4">{{ user.phone_number }}</td>
        <td v-if="user.status == 'Pendiente'" class="px-6 py-4">
          <span class="text-sm text-orange-500">
            {{ user.status }}
          </span>
        </td>
        <td v-if="user.status == 'Activo'" class="px-6 py-4">
          <span class="text-sm text-green-500">
            {{ user.status }}
          </span>
        </td>
        <td v-if="user.status == 'Inactivo'" c class="px-6 py-4">
          <span class="text-sm text-red-500">
            {{ user.status }}
          </span>
        </td>
        </tr>
      </tbody>
      <tr v-else colspan="5" class="flex flex-col justify-center">
        <td class="ml-2 my-6">No existen {{ roles }} registrados</td>
      </tr>
      <tr v-if="err" colspan="5" class="flex flex-col justify-center">
        <td class="ml-2 my-6">Ocurrio un error</td>
        <span>{{ err }}</span>
      </tr>
    </table>
  </div>
  </template>
  
  <script setup> 
    
    const props = defineProps({
      data: Object
    })
    
    console.log(props)
  </script>