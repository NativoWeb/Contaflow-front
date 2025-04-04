<template>
	<div class="w-full bg-white flex flex-col md:flex-row p-8">
		<div class="flex-1">
			<h2 class="text-xl font-bold text-[#2A5CAA] p-3">Clientes</h2>
			<table class="w-full text-sm text-left rtl:text-right text-[#193368] dark:text-gray-400">
                <thead class="text-xs text-[#193368] uppercase bg-gradient-to-r from-[#F8F8F8] to-[#E5EAFF] dark:bg-gray-700 dark:text-gray-400 ">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                          Nombre
                        </th>
                        <th scope="col" class="px-6 py-3">
                          Número de Identificación
                        </th>
                        <th scope="col" class="px-6 py-3">
                          Estado
                        </th>
                    </tr>
                </thead>
                <tbody v-if="data">
                    <tr v-for="user in data" :key="user.id_number" 
                    class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {{ user.first_name }} {{ user.last_name }}
                        </th>
                        <td class="px-6 py-4">
                          {{ user.id_number }}
                        </td>
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
                    <td class="ml-2 my-6">No existen registrados</td>
                  </tr>

                  <div v-if="err">
                    <span>{{ err }}</span>
                    <img class="mt-10 w-[100px] h-[100px]" src="@/assets/error_status.svg" alt="">
                  </div>
                  <div v-if="isLoading"  class="loader flex flex-col items-center justify-center w-40 h-40 m-auto">
                    <img src="@/assets/loader.svg" alt="carga">
                  </div>
                </table>
		</div>
		<div class="flex flex-col gap-6 ml-2 p-8">
			<button class="btn-action">Eliminar Cliente</button>
			<AssignClientsModal :apiUrl="`${VUE_APP_URL}/clients/`" :updateUrl="'/accountants/update/'" :user="data"/>
		</div>
	</div>
</template>

<script setup>
import UserService from '@/services/userService';
import AssignClientsModal from '../crud/AssignClientsModal.vue';
import {  defineProps } from 'vue';
import { useRoute } from 'vue-router';

const props = defineProps({ role: String })
const getUserService = new UserService();
const data = getUserService.getData();
const err = getUserService.getError();
const isLoading = getUserService.getLoader();
const VUE_APP_URL = process.env.VUE_APP_URL;
const userId = useRoute().params.id;
const uri = `/${props.role}/${userId}/`
const urlApi = `${VUE_APP_URL}${uri}`

getUserService.getUsers(urlApi);

</script>