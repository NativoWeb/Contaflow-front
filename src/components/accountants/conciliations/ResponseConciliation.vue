<template>
  <section class="p-5">
    <h1 class="text-2xl font-semibold text-[#08245b]">Conciliación</h1>
    <div class="container_conciliation bg-gray-100 p-4 rounded w-[70%] flex flex-col gap-6 text-left" v-html="data"></div>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { marked } from 'marked';
import UserService from '@/services/userService';


const getUserService = new UserService()
const conciliationId = useRoute().params.conciliationId
const isLoading = ref(false);
const data = ref(null)
const err = ref(null);
const VUE_APP_URL = process.env.VUE_APP_URL;
const uri = `/accountants/${accountantId}/`;
const accountantId = localStorage.getItem('id');

onMounted(async () => {
  isLoading.value = true;
  try {
    await  getUserService.getUserById(`${VUE_APP_URL}${uri}`)
    data.value = getUserService.getData().value
    data.value.conciliation_data.forEach(el => {
      if (el.id == conciliationId) data.value = marked.parse(el.response)
    })
  }
  
  catch (error) {
    err.value = getUserService.getError().value
  } finally {
    isLoading.value = false;
  }
})

</script>

<style>
.container_conciliation > p{
  text-align:left;
  color:black;
  margin:2px;
}

.container_conciliation > ul {
  display:flex;
  flex-direction:column;
}
</style>