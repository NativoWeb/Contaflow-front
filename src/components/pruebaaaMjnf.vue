<script>
import ConponenteHijo from './ConponenteHijo.vue';

export default {
    components: {
        ConponenteHijo
    }
};
</script>

<template>
    <h1>Padree</h1>
    <ConponenteHijo mensaje="prueba 1"></ConponenteHijo>

    <ConponenteHijo mensaje="prueba 2"></ConponenteHijo>

</template>
