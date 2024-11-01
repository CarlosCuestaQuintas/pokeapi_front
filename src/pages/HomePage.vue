<template>
    <!-- <router-link to="prueba">prueba</router-link> -->
    <!-- <router-link :to="{name: 'prueba'}">prueba</router-link> -->
    <div id="contenedor">
        <!-- <PokemonComponent v-for="pokemon in listaPokemon" :pokemon=pokemon /> -->
        <!-- i-1 porque empieza en 1, no en 0 -->
        <PokemonComponent v-for="i in listaPokemon.length" :id=i :pokemon=listaPokemon[i-1] />
    </div>
</template>

<style scoped>
    @import '../assets/home-page.scss';
</style>

<script setup>
    import { ref, onBeforeMount } from 'vue';
    import PokemonComponent from '../components/PokemonComponent.vue';
    let listaPokemon = ref([]);

    
    onBeforeMount(async () => {
        let data = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151&offset=0");
        data = await data.json();
        console.log(data);
        listaPokemon.value = data.results;
    });
</script>