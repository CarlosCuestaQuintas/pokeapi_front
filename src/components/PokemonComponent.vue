<template>
    <router-link class="caja" :pokemon=pokemon :to="{name: 'PokemonPage', params: {id: id}}">
        <img :src=imagen>
        <div class="nombre">{{ pokemon.name }}</div>
    </router-link>
</template>

<style scoped>
    @import '../assets/scss/pokemon.scss';
</style>

<script setup>
    import { ref, onBeforeMount } from 'vue';

    const props = defineProps({
        id: Number,
        pokemon: Object
    });

    let imagen = ref();
    
    onBeforeMount(async() => {
        // console.log("url: " + props.pokemon.url);

        let data = await fetch(props.pokemon.url);
        data = await data.json();
        // console.log(data["sprites"]["other"]['official-artwork']["front_default"]);
        imagen.value = data["sprites"]["other"]['official-artwork']["front_default"];
    });
</script>