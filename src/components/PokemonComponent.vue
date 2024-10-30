<template>
    <div id="caja">
        <img :src=imagen>
        <div id="nombre">{{ pokemon.name }}</div>
    </div>
</template>

<style scoped>
    @import '../assets/pokemon.scss';
</style>

<script setup>
    import { ref, onBeforeMount } from 'vue';

    const props = defineProps({
        pokemon: Object
    });

    let imagen = ref();
    
    onBeforeMount(async() => {
        console.log("url: " + props.pokemon.url);

        let data = await fetch(props.pokemon.url);
        data = await data.json();
        console.log(data["sprites"]["other"]['official-artwork']["front_default"]);
        imagen.value = data["sprites"]["other"]['official-artwork']["front_default"];
    });
</script>