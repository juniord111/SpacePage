<template>
  <div class="technology-view" v-if="technology.length">
    <h2 class="section-title"><span>03</span> SPACE LAUNCH 101</h2>

    <div class="tech-content">
      <!-- Botones y texto -->
      <div class="tech-left">
        <div class="circle-buttons">
          <button
            v-for="(_, i) in technology"
            :key="i"
            :class="{ active: i === currentIndex }"
            @click="currentIndex = i"
          >
            {{ i + 1 }}
          </button>
        </div>

        <div class="tech-text">
          <h3 class="subtitle">THE TERMINOLOGY…</h3>
          <h1 class="title">{{ currentTech.name }}</h1>
          <p class="description">{{ currentTech.description }}</p>
        </div>
      </div>

      <!-- Imagen -->
      <div class="tech-image">
        <img :src="currentTech.imageUrl" :alt="currentTech.name" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import data from '@/data/data.json'

const technology = ref(data.technology)
const currentIndex = ref(0)

const imageMap = import.meta.glob('@/assets/technology/*.jpg', {
  eager: true,
  import: 'default',
})

const currentTech = computed(() => {
  const item = technology.value[currentIndex.value]
  const imageName = item.images.portrait.split('/').pop()
  const imageUrl = imageMap[`/src/assets/technology/${imageName}`]
  return { ...item, imageUrl }
})
</script>

<style scoped>
.technology-view {
  padding: 4rem 2rem;
  color: white;
}

.section-title {
  text-transform: uppercase;
  font-size: 1.2rem;
  letter-spacing: 2px;
}
.section-title span {
  opacity: 0.3;
  margin-right: 1rem;
}

.tech-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 4rem;
  margin-top: 3rem;
}

.tech-left {
  display: flex;
  align-items: center;
  flex: 1 1 50%;
  gap: 2rem;
}

.circle-buttons {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.circle-buttons button {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 1px solid white;
  background: transparent;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  transition: 0.3s;
  font-weight: bold;
}

.circle-buttons button.active {
  background-color: white;
  color: black;
}

.tech-text {
  max-width: 400px;
}

.subtitle {
  font-size: 0.9rem;
  opacity: 0.5;
  text-transform: uppercase;
  margin-bottom: 0.5rem;
}

.title {
  font-size: 2rem;
  text-transform: uppercase;
  margin-bottom: 1rem;
}

.description {
  font-size: 1rem;
  line-height: 1.8;
}

.tech-image {
  flex: 1 1 40%;
  display: flex;
  justify-content: center;
}

.tech-image img {
  max-height: 450px;
  width: auto;
  object-fit: contain;
}

/* Responsive */
@media (max-width: 768px) {
  .tech-content {
    flex-direction: column;
    text-align: center;
  }

  .tech-left {
    flex-direction: column;
    align-items: center;
  }

  .circle-buttons {
    flex-direction: row;
  }

  .tech-image img {
    max-height: 300px;
  }
}
</style>
