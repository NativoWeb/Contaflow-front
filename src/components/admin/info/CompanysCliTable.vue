<template>
	<div class="w-full bg-white flex flex-col md:flex-row p-8">
		<div class="flex-1">
			<h2 class="text-xl font-bold text-[#2A5CAA] p-3">Empresas</h2>
			<table class="w-full text-sm text-left rtl:text-right text-[#193368] dark:text-gray-400">
                <thead class="text-xs text-[#193368] uppercase bg-gradient-to-r from-[#F8F8F8] to-[#E5EAFF] dark:bg-gray-700 dark:text-gray-400 ">
                    <tr>
                        <th scope="col" class="p-4">
                            <div class="flex items-center">
                                <input id="checkbox-all-search" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                <label for="checkbox-all-search" class="sr-only">checkbox</label>
                            </div>
                        </th>
                        <th scope="col" class="px-6 py-3">
                          Nit
                        </th>
                        <th scope="col" class="px-6 py-3">
                          Razón Social
                        </th>
                        <th scope="col" class="px-6 py-3">
                          
                          Sector económico
                        </th>
                        <th scope="col" class="px-6 py-3">
                          Dirección
                        </th>
                    </tr>
                </thead>
                <tbody v-if="users.length > 0">
                    <tr v-for="user in users" :key="user.id_number" 
                    class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td class="w-4 p-4">
                            <div class="flex items-center">
                                <input id="checkbox-table-search-2" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                <label for="checkbox-table-search-2" class="sr-only">checkbox</label>
                            </div>
                        </td>
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          
                        </th>
                        <td class="px-6 py-4">
                          
                        </td>
                        <td v-if="user.status == 'Pendiente'" class="px-6 py-4">
                          <span class="text-sm text-orange-500">
                            
                          </span>
                        </td>
                        <td v-if="user.status == 'Activo'" class="px-6 py-4">
                          <span class="text-sm text-green-500">
                           
                          </span>
                        </td>
                        <td v-if="user.status == 'Inactivo'" c class="px-6 py-4">
                          <span class="text-sm text-red-500">
                            
                          </span>
                        </td>
                    </tr>
                    
                    
                    
                  </tbody>
                  <tr v-else colspan="5" class="flex flex-col justify-center">
                    <td class="ml-2 my-6">No existen empresas registradas</td>
                  </tr>
                </table>
		</div>
		<div class="flex flex-col gap-6 ml-2 p-8">
			<button class="btn-action">Eliminar Empresas</button>
			<AssignComConModal :apiUrl="`${VUE_APP_URL}/clients/`"/>
		</div>
	</div>

  <div class="w-full bg-white flex flex-col md:flex-row p-8">
		<div class="flex-1">
			<h2 class="text-xl font-bold text-[#2A5CAA] p-3">Conciliaciones Realizadas</h2>
			<table class="w-full text-sm text-left rtl:text-right text-[#193368] dark:text-gray-400">
                <thead class="text-xs text-[#193368] uppercase bg-gradient-to-r from-[#F8F8F8] to-[#E5EAFF] dark:bg-gray-700 dark:text-gray-400 ">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                          Fecha de Conciliación
                        </th>
                        <th scope="col" class="px-6 py-3">
                          Número de Reporte 
                        </th>
                        <th scope="col" class="px-6 py-3">
                          Empresa
                        </th>
                        <th scope="col" class="px-6 py-3">
                          Banco
                        </th>
                        <th scope="col" class="px-6 py-3">
                          Número de Cuenta
                        </th>
                        <th scope="col" class="px-6 py-3">
                          Acción
                        </th>
                    </tr>
                </thead>
                <tbody v-if="users.length > 0">
                    <tr v-for="user in users" :key="user.id_number" 
                    class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td class="w-4 p-4">
                            <div class="flex items-center">
                                <input id="checkbox-table-search-2" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                <label for="checkbox-table-search-2" class="sr-only">checkbox</label>
                            </div>
                        </td>
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          
                        </th>
                        <td class="px-6 py-4">
                          
                        </td>
                        <td v-if="user.status == 'Pendiente'" class="px-6 py-4">
                          <span class="text-sm text-orange-500">
                            
                          </span>
                        </td>
                        <td v-if="user.status == 'Activo'" class="px-6 py-4">
                          <span class="text-sm text-green-500">
                           
                          </span>
                        </td>
                        <td v-if="user.status == 'Inactivo'" c class="px-6 py-4">
                          <span class="text-sm text-red-500">
                            
                          </span>
                        </td>
                    </tr>
                    
                    
                    
                  </tbody>
                  <tr v-else colspan="5" class="flex flex-col justify-center">
                    <td class="ml-2 my-6">No existen conciliaciones Realizadas</td>
                  </tr>
                </table>
		</div>
	</div>
</template>

<script setup>
import { ref, defineProps } from 'vue';
import Cookies from 'js-cookie';
import AssignComConModal from '../crud/assign/AssignComConModal.vue';

const VUE_APP_URL = process.env.VUE_APP_URL;
const users = ref([]);

const props = defineProps({
    apiUrl: String,
    roles: String
  })


  fetch(props.apiUrl, {
    headers: {
      'Authorization': `Bearer ${Cookies.get('jwt')}`
    }
  })
  .then(res => res.json())
  .then(json => {
    users.value = json;
  })
  .catch(err => console.error(err))

</script>