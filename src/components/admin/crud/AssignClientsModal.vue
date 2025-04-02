<template>
  <button @click="toggleModal" class="btn-action">Asignar Clientes</button>

  <div v-if="showModal"
  tabindex="-1" 
   class="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
    <div class="w-[90%] h-[90%] m-auto relative p-5">
      <div class="relative bg-white rounded-lg shadow-sm dark:bg-gray-700 w-[100%] h-[100%]">
        <!-- Contenido del Modal -->
        <div class="p-6 md:p-5 text-center">
          <table class="text-sm text-left rtl:text-right text-[#08245B]">
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
      
          <!-- Botones -->
          <button @click="toggleModal"
              class="px-5 py-2.5 text-[#193368] bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 
                     focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 
                     dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                Cancelar
          </button>
          <button @click="toggleModal"
              type="button" 
              class="py-3 px-5 ms-3 text-sm font-medium focus:outline-none bg-[#08245B] hover:bg-[#2a4b8d] text-white rounded-lg border">
              Confirmar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, defineProps } from 'vue';
  import Cookies from 'js-cookie';

  const users = ref([]);
  const showModal = ref(false);

  const toggleModal = () => {
    showModal.value = !showModal.value;
  }

  const props = defineProps({
    apiUrl: String
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