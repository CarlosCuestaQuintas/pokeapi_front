<template>
    <router-link to="/">
        <div>Atrás</div>
    </router-link>
    <div>{{ id }}</div>
    <div class="caja" v-for="movimiento in movimientos">
        <div v-for="elemento in movimiento">
            {{ elemento }}
        </div>
    </div>
</template>

<style scoped>
    div {
        margin-top: 20px;
    }

    .caja {
        margin: 20px;
        border: 2px black solid;
    }
</style>

<script setup>
    import { ref, onBeforeMount } from 'vue';
    import { useRoute } from 'vue-router';

    let route = useRoute();
    let id = ref(route.params.id);
    let movimientos = ref([]);

    onBeforeMount(async () => {
        let data = await fetch("https://pokeapi.co/api/v2/pokemon/" + id.value);
        data = await data.json();
        movimientos.value = data.moves;
        console.log(data);
        console.log(movimientos);
    });
</script>