<template>
    <div class="titulo">ID de pokemon: {{ id }}</div>
    <router-link class="subtitulo" to="/">
        <div>Atrás</div>
    </router-link>
    <!-- <div class="caja" :class="datos.tipos[i-1]" v-for="i in datos.nombres.length">
        <div>{{ datos.nombres[i-1] }}</div>
        <div>{{ datos.tipos[i-1] }}</div>
    </div> -->

    <div class="contenedor">
        <div class="sprite" v-if="sprites.back_default">
            <div class="subtitulo mayus">trasera por defecto</div>
            <img :src=sprites.back_default>
        </div>
        <div class="sprite" v-if="sprites.back_female">
            <div class="subtitulo mayus">trasera hembra</div>
            <img :src=sprites.back_female>
        </div>
        <div class="sprite" v-if="sprites.back_shiny">
            <div class="subtitulo mayus">trasera varicolor</div>
            <img :src=sprites.back_shiny>
        </div>
        <div class="sprite" v-if="sprites.back_shiny_female">
            <div class="subtitulo mayus">trasera hembra varicolor</div>
            <img :src=sprites.back_shiny_female>
        </div>
        <div class="sprite" v-if="sprites.front_default">
            <div class="subtitulo mayus">frontal por defecto</div>
            <img :src=sprites.front_default>
        </div>
        <div class="sprite" v-if="sprites.front_female">
            <div class="subtitulo mayus">frontal hembra</div>
            <img :src=sprites.front_female>
        </div>
        <div class="sprite" v-if="sprites.front_shiny">
            <div class="subtitulo mayus">frontal varicolor</div>
            <img :src=sprites.front_shiny>
        </div>
        <div class="sprite" v-if="sprites.front_shiny_female">
            <div class="subtitulo mayus">frontal hembra varicolor</div>
            <img :src=sprites.front_shiny_female>
        </div>
    </div>

    <div class="contenedor">
        <MovimientoComponent :class="datos.tipos[i-1]" v-for="i in datos.nombres.length"
        :nombre=datos.nombres[i-1]
        :tipo=datos.tipos[i-1]
        :pp=datos.pps[i-1]
        :poder=datos.poderes[i-1]
        v-on:click="prueba(
            datos.nombres[i-1],
            datos.tipos[i-1])" />
    </div>

    <template class="transparencia" 
    v-on:click="prueba()">
        <div class="caja-flotante undefined">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum tenetur dolores laboriosam commodi dolorum veritatis vitae rem corrupti, modi tempora quod labore repellat recusandae impedit minima totam? Rerum, nobis adipisci?</div>
    </template>
</template>

<style scoped>
    @import '../assets/pokemon-page.scss';
</style>

<script setup>
    import MovimientoComponent from '@/components/MovimientoComponent.vue';
    import { ref, onBeforeMount, onMounted } from 'vue';
    import { useRoute } from 'vue-router';

    let route = useRoute();
    let id = ref(route.params.id);

    let datos = ref(
        {
            "nombres": [],
            "tipos": [],
            "pps": [],
            "poderes": []
        }
    );

    let sprites = ref({});

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
                datos.value.pps.push(data.pp);
                datos.value.poderes.push(data.power);
            });
        }
        sprites.value = data.sprites;
    });    

    function prueba(nombre, tipo) {
        let t = document.querySelector(".transparencia");
        nombre ? console.log(nombre) : console.log("Implementar el funcionamiento en la llamada del div y quitar esta línea");
        // (t.style.display=="none") ? console.log("sí") : console.log("no");
        (t.style.display=="none") ? t.style.display = "block" : t.style.display = "none";
        // Solo se sustituye la clase en caso de que se especifique un tipo. Cuando se cambia el display del contenedor a none no importa que se quede la clase anterior.
        // IMPORTANTE: si el div no tiene una segunda clase (es decir, si no tiene classList[1]) no funciona, porque nada es sustituido
        if (tipo) {
            // Si hiciésemos esto fuera del if sin especificar tipo entonces se sustituiría la clase existente por la clase undefined
            let c = document.querySelector(".caja-flotante");
            c.classList.replace(c.classList[1], tipo);
        }
        // c.textContent="prueba";
    }

    onMounted(() => {
        document.querySelector(".transparencia").style.display = "none";
    })
</script>