<template>
  <h1>Asignar</h1>
</template>

<script setup>
  import { useRoute } from 'vue-router';

  const userId = useRoute().params.id;

  console.log(userId)
</script>