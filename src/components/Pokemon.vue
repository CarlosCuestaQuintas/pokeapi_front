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

    // console.log(pokemon.name);
    let imagen = ref();
    
    onBeforeMount(async() => {
        // pokemon -> sprites -> other -> official-artwork
        console.log("url: " + props.pokemon.url);
        // let data = ref();
        // fetch(props.pokemon.url).then(response => response.json()).then((data) => {
        //     console.log(data);
        // });

        let data = await fetch(props.pokemon.url);
        data = await data.json();
        console.log(data["sprites"]["other"]['official-artwork']["front_default"]);
        imagen.value = data["sprites"]["other"]['official-artwork']["front_default"];
    });
</script>