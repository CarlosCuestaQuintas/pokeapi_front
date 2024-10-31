<template>
    <router-link to="/">
        <button>Atrás</button>
    </router-link>
    <div>{{ id }}</div>
</template>

<script setup>
    import { ref } from 'vue';
    import { useRoute } from 'vue-router';

    let route = useRoute();
    let id = ref(route.params.id);
    let lnk = ref(route.params.lnk);
    console.log(lnk);
</script>