<template>
  <!-- <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />
  </header> -->

  <main>
    <img alt="Pokedex logo" class="logo" src="./assets/pokeball.svg" width="125" height="125" />
    <!-- <Pokemon v-for="pokemon in listaPokemon" :pokemon=pokemon /> -->
    <div class="contenedor" v-for="i in 30">
      <div class="fila" v-for="j in 5">
        <!-- {{ (i-1)*5 + j-1 }} {{ listaPokemon[5*(i-1)+j-1] }} -->
        <Pokemon class="pokemon" :pokemon=listaPokemon[5*(i-1)+j-1] />
      </div>
    </div>
  </main>
</template>

<style scoped>
  @import 'assets/app.scss';
</style>

<script setup>
  import { ref, onBeforeMount, onMounted } from 'vue';
  import Pokemon from './components/Pokemon.vue';
  let listaPokemon = ref([]);

  // fetch("https://pokeapi.co/api/v2/pokemon?limit=151&offset=0").then(response => response.json()).then((data) =>{
  //   listaPokemon = data.results;
  // });
  onBeforeMount(async() => {
    console.log("En onBeforeMount");
    let data = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151&offset=0");
    data = await data.json();
    console.log(data);
    listaPokemon.value = data.results;
  });
</script>