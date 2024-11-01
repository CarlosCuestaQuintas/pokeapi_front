<template>
    <div id="contenedor">
        <div>{{ nombre }}</div>
        <div>{{ tipo }}</div>
    </div>
</template>

<style scoped>
    @import '../assets/movimiento.scss';
</style>

<script setup>
    const props = defineProps({
        nombre: String,
        tipo: String
    });
</script>