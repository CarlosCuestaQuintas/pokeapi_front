<template>
    <div>
        <div>{{ nombre }}</div>
        <div>{{ tipo }}</div>
    </div>
</template>

<script setup>
    const props = defineProps({
        nombre: String,
        tipo: String
    });
</script>