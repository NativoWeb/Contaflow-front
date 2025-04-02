<template>
  <button @click="goToClients" class="btn-action">Asignar Clientes</button>
</template>

<script setup>
  import { ref, defineProps } from 'vue';
  import Cookies from 'js-cookie';

  const users = ref([]);

  const goToClients = () => {
    console.log("Hola Mundo")
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