import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import DestinationsView from '@/views/DestinationsView.vue'
import PlanetDetail from '@/views/PlanetDetail.vue'
import CrewView from '@/views/CrewView.vue'
import TechnologyView from '@/views/TechnologyView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/destination',
    component: DestinationsView,
    children: [
      {
        path: '', // ruta vacía para mostrar algo por defecto
        name: 'Destination',
        component: PlanetDetail,
      },
      {
        path: ':planet', // ruta dinámica: /destination/mars, etc.
        name: 'PlanetDetail',
        component: PlanetDetail,
      },
    ],
  },
  {
    path: '/crew',
    name: 'Crew',
    component: CrewView,
  },
  {
    path: '/technology',
    name: 'Technology',
    component: TechnologyView,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
