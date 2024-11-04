<template>
    <div class="contenedor-movimiento">
        <div class="mayus">{{ nombre }}</div>
        <div>{{ tipo }}</div>
        <div>PP {{ pp }}</div>
        <div>Poder {{ poder }}</div>
    </div>
</template>

<style scoped>
    @import '../assets/movimiento.scss';
</style>

<script setup>
    const props = defineProps({
        nombre: String,
        tipo: String,
        pp: Number,
        poder: Number
    });
</script>