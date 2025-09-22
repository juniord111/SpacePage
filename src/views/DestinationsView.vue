<template>
  <div class="destination-view">
    <div class="destination-content">
      <!-- Imagen a la izquierda -->
      <div class="text-image">
        <h2><span>01</span> PICK YOUR DESTINATION</h2>
        <div class="planet-image" v-if="planet">
          <img :src="planet.images.png" :alt="planet.name" />
        </div>
      </div>
      <!-- Tabs + Info a la derecha -->
      <div class="planet-info">
        <!-- Submenú estilo tabs -->
        <nav class="planet-tabs">
          <router-link
            v-for="p in planets"
            :key="p.name"
            :to="`/destination/${p.name.toLowerCase()}`"
            class="tab"
            :class="{ active: p.name.toLowerCase() === currentPlanet }"
          >
            {{ p.name }}
          </router-link>
        </nav>

        <!-- Renderiza los detalles del planeta -->
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { computed, ref, watchEffect } from 'vue'
import data from '@/data/data.json'

// Cargamos todas las imágenes de planetas
const imageMap = import.meta.glob('@/assets/destination/*.png', {
  eager: true,
  import: 'default',
})

const route = useRoute()
const router = useRouter()

const planets = ref(data.destinations)

// Si no hay planeta seleccionado, redirige a Moon
watchEffect(() => {
  if (!route.params.planet) {
    router.replace('/destination/moon')
  }
})

const currentPlanet = computed(() => route.params.planet)

const planet = computed(() => {
  const found = planets.value.find((p) => p.name.toLowerCase() === currentPlanet.value)
  if (found) {
    const filename = found.images.png.split('/').pop()
    found.images.png = imageMap[`/src/assets/destination/${filename}`]
  }
  return found
})
</script>

<style scoped>
.destination-view {
  padding: 2rem;
  color: white;
  text-align: center;
}
h2 {
  font-size: 1.8rem;
  margin-bottom: 2rem;
  text-align: center;
}

h2 span {
  opacity: 0.3;
  margin-right: 1rem;
  font-weight: bold;
}

.destination-content {
  display: flex;
  gap: 3rem;
  align-items: flex-start;
  justify-content: space-evenly;
  flex-wrap: wrap;
  text-align: left;
}

.planet-image img {
  width: 300px;
  height: auto;
}

.planet-info {
  max-width: 400px;
}

.planet-tabs {
  display: flex;
  gap: 2rem;
  justify-content: flex-start;
  margin-bottom: 1.5rem;
}

.tab {
  color: white;
  text-transform: uppercase;
  font-weight: 400;
  letter-spacing: 2px;
  text-decoration: none;
  position: relative;
  padding-bottom: 0.5rem;
}

.tab.active::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  height: 3px;
  width: 100%;
  background-color: white;
}

@media (max-width: 768px) {
  .destination-content {
    flex-direction: column;
    align-items: center;
  }
  .planet-image img {
    width: 100%;
    max-width: 400px;
  }
  .planet-info {
    max-width: 100%;
    text-align: center;
  }
  .planet-tabs {
    justify-content: center;
  }
}
</style>
