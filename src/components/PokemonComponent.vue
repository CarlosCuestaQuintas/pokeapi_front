<template>
    <router-link id="caja" :pokemon=pokemon :to="{name: 'PokemonPage', params: {id: id}}">
        <img :src=imagen>
        <div id="nombre">{{ pokemon.name }}</div>
    </router-link>
</template>

<style scoped>
    @import '../assets/pokemon.scss';
</style>

<script setup>
    import { ref, onBeforeMount } from 'vue';

    const props = defineProps({
        id: Number,
        pokemon: Object
    });

    let imagen = ref();
    let movimientos = ref([]);
    
    onBeforeMount(async() => {
        // console.log("url: " + props.pokemon.url);

        let data = await fetch(props.pokemon.url);
        data = await data.json();
        // console.log(data["sprites"]["other"]['official-artwork']["front_default"]);
        imagen.value = data["sprites"]["other"]['official-artwork']["front_default"];
    });
</script>