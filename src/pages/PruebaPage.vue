<template>
    <div>Prueba</div>
    <div>{{ $route.params }}</div>
</template>

<style scoped>
    div {
        display: flex;
        justify-content: center;
        font-size: 60px;
    }
</style>

<script setup>
    import router from '@/router';
</script>