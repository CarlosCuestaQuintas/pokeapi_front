import { createRouter, createWebHistory } from 'vue-router'
import HomePage from './pages/HomePage.vue'
import PruebaPage from './pages/PruebaPage.vue'
import PokemonPage from './pages/PokemonPage.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            /*
                Tal y como estaba antes el router daba la siguiente advertencia:
                [Vue Router warn]: The route named "home" has a child without a name and an empty path. Using that name won't render the empty path child so you probably want to move the name to the child instead. If this is intentional, add a name to the child route to remove the warning.   [router.js:6]
                La única manera que me ha ocurrido de solucionarla es quitar el name del padre y ponérselo al hijo.
                Además, parece indiferente poner '/' en el path del padre, del hijo, de ambos o de ninguno.
            */
            path: '/',
            children: [
                {
                    path: '/',
                    name: 'home',
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