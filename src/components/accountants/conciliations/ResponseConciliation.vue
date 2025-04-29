<template>
  <section class="p-5">
    <h2 class="text-xl font-bold text-blue-700">Respuesta de n8n:</h2>
    <pre class="bg-gray-100 p-4 rounded">{{ data }}</pre>
  </section>
</template>

<script setup>
import Cookies from 'js-cookie';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';


const conciliationId = useRoute().params.conciliationId
const isLoading = ref(false);
const data = ref(null)
// const err = ref(null)
const VUE_APP_URL = process.env.VUE_APP_URL;
const accountantId = localStorage.getItem('id');


onMounted(async () => {
  isLoading.value = true;
  try{
    const res = await fetch(`${VUE_APP_URL}/accountants/${accountantId}/`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Cookies.get('jwt')}` 
      }
    })
    const json = await res.json() 
    json.conciliations_data.forEach( el => {
      if (el.id == conciliationId) data.value = el.response
    })
  }
  catch(err){
    console.log(err)
  }
})

</script>