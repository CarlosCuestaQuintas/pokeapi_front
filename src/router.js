import { createRouter, createWebHistory } from 'vue-router'
import HomePage from './pages/HomePage.vue'
import PruebaPage from './pages/PruebaPage.vue'
import PokemonPage from './pages/PokemonPage.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            children: [
                {
                    // TODO: Da una advertencia diciendo que home tiene un hijo sin nombre. ¿Tendría que poner esto sobre children?
                    // Si pongo esto sobre children, elminando este hijo, no funciona. Creo que se soluciona poniendo aquí el name, pero me extraña
                    // Tal vez lo que haya que hacer es no tener una ruta con hijos, sino cada ruta por separado y que una de ellas sea '/'
                    path: '',
                    component: HomePage
                },
                {
                    path: 'prueba',
                    name: 'prueba',
                    component: PruebaPage
                },
                {
                    path: 'pokemon/:id',
                    name: 'PokemonPage',
                    component: PokemonPage,
                }
            ]
        }
    ]
})
export default router