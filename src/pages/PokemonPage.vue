<template>
    <div id="titulo">ID de pokemon: {{ id }}</div>
    <router-link id="subtitulo" to="/">
        <div>Atrás</div>
    </router-link>
    <!-- <div class="caja" :class="datos.tipos[i-1]" v-for="i in datos.nombres.length">
        <div>{{ datos.nombres[i-1] }}</div>
        <div>{{ datos.tipos[i-1] }}</div>
    </div> -->
    <div id="contenedor">
        <MovimientoComponent :class="datos.tipos[i-1]" v-for="i in datos.nombres.length" :nombre=datos.nombres[i-1] :tipo=datos.tipos[i-1] />
    </div>
</template>

<style scoped>
    @import '../assets/pokemon-page.scss';
</style>

<script setup>
    import MovimientoComponent from '@/components/MovimientoComponent.vue';
    import { ref, onBeforeMount } from 'vue';
    import { useRoute } from 'vue-router';

    let route = useRoute();
    let id = ref(route.params.id);

    let datos = ref(
        {
            "nombres": [],
            "tipos": []
        }
    );

    onBeforeMount(async () => {
        let data = await fetch("https://pokeapi.co/api/v2/pokemon/" + id.value);
        data = await data.json();
        let movimientos = data.moves;

        for (let i = 0; i < movimientos.length; i++) {
            fetch(movimientos[i].move.url)
            .then(response => response.json())
            .then((data) => {
                datos.value.nombres.push(data.name);
                datos.value.tipos.push(data.type.name);
            });
        }

        console.log(datos.value.tipos);
    });
</script>