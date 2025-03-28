<script setup>
import { useRoute } from 'vue-router';

  // acceder al id de la url
  const route = useRoute()
  console.log(route.params.id)
</script>