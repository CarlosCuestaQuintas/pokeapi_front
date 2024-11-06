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
        v-on:click="transicion(
            datos.nombres[i-1],
            datos.tipos[i-1])" />
    </div>

    <template class="transparencia" 
    v-on:click="transicion()">
        <div class="caja-flotante undefined">
            <div class="nombre-movimiento mayus"></div>
            <div class="contenedor-gif">
                <img :src=gif alt="gif">
            </div>
        </div>
    </template>
</template>

<style scoped>
    @import '../assets/scss/pokemon-page.scss';
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

    // No puedo hacer lo siguiente porque el cors no lo permite, y una respuesta opaca (mode:"no-cors") no nos vale
    // fetch("https://www.pocketmonsters.net/dex/move/13",{mode:"no-cors"}).then((data) => console.log(data));
    let gif = ref();

    function transicion(nombre, tipo) {
        let t = document.querySelector(".transparencia");
        (t.style.display=="none") ? t.style.display = "block" : t.style.display = "none";
        
        // IMPORTANTE: si el div no tiene una segunda clase (es decir, si no tiene classList[1]) no funciona, porque nada es sustituido
        if (tipo) {
            document.querySelector(".nombre-movimiento").textContent = nombre;
            // Si hiciésemos esto fuera del if sin especificar tipo entonces se sustituiría la clase existente por la clase undefined
            let c = document.querySelector(".caja-flotante");
            c.classList.replace(c.classList[1], tipo);
            
            // Esto lo dejo aquí de momento hasta saber hacer lo del gif
            gif.value = "https://media.pocketmonsters.net/dex/moves/" + nombre.replace(/-/g,"") + ".gif";
            /*
            TODO: gestionar correctamente el gif
            Fase 1: saber si el recurso solicitado existe o no (200/404) para poner el gif o una imagen de error (guardada en el proyecto)
            Fase 2: estudiar todos los casos posibles en cuanto a la url del gif (tiene guiones, no tiene, etc) e implementar la lógica apropiada
            De momento no he podido hacerlo ni usando fetch (ni siquiera en modo no-cors), ni usando XMLHttpRequest. No soy capaz de saber si devuelve un 200 o un 404.
            */
        }
    }

    onMounted(() => {
        document.querySelector(".transparencia").style.display = "none";
    })
</script>