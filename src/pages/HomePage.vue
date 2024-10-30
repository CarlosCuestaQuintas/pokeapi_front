<template>
    <div id="contenedor">
      <PokemonComponent v-for="pokemon in listaPokemon" :pokemon=pokemon />
    </div>
</template>

<style>
  @import '../assets/home-page.scss';
</style>

<script setup>
import { ref, onBeforeMount } from 'vue';
import PokemonComponent from '../components/PokemonComponent.vue';
let listaPokemon = ref([]);

onBeforeMount(async() => {
  console.log("En onBeforeMount");
  let data = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151&offset=0");
  data = await data.json();
  console.log(data);
  listaPokemon.value = data.results;
});
</script>