<template>
    <router-link to="/">
        <div>Atrás</div>
    </router-link>
    <div>{{ id }}</div>
    <div class="caja" :class="datos.tipos[i-1]" v-for="i in datos.nombres.length">
        <div>{{ datos.nombres[i-1] }}</div>
        <div>{{ datos.tipos[i-1] }}</div>
    </div>
    <!-- <div class="caja" v-for="movimiento in movimientos">
        <div>{{ movimiento.move.name }}</div>
        <div>{{ movimiento.move.url }}</div>
        <div v-for="elemento in movimiento">
            {{ elemento }}
        </div>
    </div> -->
</template>

<style scoped>
    @import '../assets/pokemon-page.scss';
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