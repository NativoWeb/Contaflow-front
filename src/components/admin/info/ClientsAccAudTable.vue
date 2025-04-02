<template>
	<div class="flex w-[90%]">
		<div class="relative overflow-x-auto shadow-md sm:rounded-lg">
			<h2 class="text-xl font-bold text-[#2A5CAA] p-3">Bancos</h2>
			<table class="w-full text-sm text-left rtl:text-right text-[#08245B]">
				<thead class="text-xs uppercase bg-gradient-to-r from-[#F8F8F8] to-[#E5EAFF]">
					<tr>
						<th scope="col" class="px-7 py-3">
							Bancos
						</th>
						<th scope="col" class="px-7 py-3">
							Número de cuenta
						</th>
						<th scope="col" class="px-7 py-3">
							Tipo de cuenta
						</th>
						<th scope="col" class="px-7 py-3">
							Acción
						</th>
					</tr>
				</thead>
				<tbody>
					<tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
						<td class="px-7 py-6">Bancolombia</td>
						<td class="px-7 py-6">9876543210</td>
						<td class="px-7 py-6">Ahorro</td>
						<td class="px-7 py-6">
							<button class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Ver</button>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
		<div class="flex flex-col justify-center items-center">
			<button>Eliminar Cliente</button>
			<AssignClientsModal :apiUrl="`${VUE_APP_URL}/clients/`"/>
		</div>
	</div>
</template>

<script setup>
import AssignClientsModal from '../crud/AssignClientsModal.vue';
</script>