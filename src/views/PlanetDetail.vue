<template>
  <div v-if="planet" class="planet-detail">
    <div class="planet-content">
      <!-- Información del planeta -->
      <div class="planet-info">
        <h1>{{ planet.name }}</h1>
        <p class="description">{{ planet.description }}</p>

        <div class="extra-info">
          <div class="info-block">
            <h4>AVG. DISTANCE</h4>
            <p>{{ planet.distance }}</p>
          </div>
          <div class="info-block">
            <h4>EST. TRAVEL TIME</h4>
            <p>{{ planet.travel }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import data from '@/data/data.json'

// Cargamos todas las imágenes de planetas
const imageMap = import.meta.glob('@/assets/destination/*.png', {
  eager: true,
  import: 'default',
})

const route = useRoute()

// Computamos el planeta actual desde el parámetro de la ruta
const planet = computed(() => {
  const found = data.destinations.find((p) => p.name.toLowerCase() === route.params.planet)

  if (found) {
    const filename = found.images.png.split('/').pop()
    found.images.png = imageMap[`/src/assets/destination/${filename}`]
  }

  return found
})
</script>

<style scoped>
.planet-detail {
  color: white;
  padding: 1.5rem 0;
}

.planet-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.planet-image img {
  width: 250px;
  height: auto;
}

.planet-info {
  text-align: center;
  max-width: 500px;
}

.planet-info h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.description {
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.extra-info {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 2rem;
  border-top: 1px solid #999;
  padding-top: 1.5rem;
}

.info-block h4 {
  font-size: 0.8rem;
  opacity: 0.6;
  letter-spacing: 2px;
  margin-bottom: 0.3rem;
}

.info-block p {
  font-size: 1.1rem;
  font-weight: bold;
}
</style>
