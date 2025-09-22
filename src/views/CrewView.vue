<template>
  <div class="crew-view" v-if="crew.length">
    <h2 class="section-title"><span>02</span> MEET YOUR CREW</h2>

    <div class="crew-content">
      <!-- Info a la izquierda -->
      <div class="crew-info">
        <h3 class="role">{{ currentCrew.role }}</h3>
        <h1 class="name">{{ currentCrew.name }}</h1>
        <p class="bio">{{ currentCrew.bio }}</p>

        <!-- Dots debajo del texto siempre -->
        <div class="dots">
          <button
            v-for="(_, i) in crew"
            :key="i"
            :class="{ active: i === currentIndex }"
            @click="currentIndex = i"
          ></button>
        </div>
      </div>

      <!-- Imagen a la derecha -->
      <div class="crew-image">
        <img :src="currentCrew.imageUrl" :alt="currentCrew.name" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import data from '@/data/data.json'

const crew = ref(data.crew)
const currentIndex = ref(0)

const imageMap = import.meta.glob('@/assets/crew/*.png', {
  eager: true,
  import: 'default',
})

const currentCrew = computed(() => {
  const member = crew.value[currentIndex.value]
  const imageName = member.images.png.split('/').pop()
  const imageUrl = imageMap[`/src/assets/crew/${imageName}`]
  return { ...member, imageUrl }
})
</script>

<style scoped>
.crew-view {
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

.crew-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 4rem;
  margin-top: 3rem;
}

.crew-info {
  flex: 1 1 40%;
  display: flex;
  flex-direction: column;
  text-align: left;
}

.role {
  font-size: 1.1rem;
  text-transform: uppercase;
  opacity: 0.5;
  margin-bottom: 0.5rem;
}

.name {
  font-size: 2.5rem;
  text-transform: uppercase;
  margin-bottom: 1rem;
}

.bio {
  font-size: 1rem;
  line-height: 1.8;
  max-width: 500px;
}

.dots {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

.dots button {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: gray;
  border: none;
  opacity: 0.3;
  transition: all 0.3s;
  cursor: pointer;
}

.dots button.active {
  background-color: white;
  opacity: 1;
}

.crew-image {
  flex: 1 1 40%;
  display: flex;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.crew-image img {
  max-height: 666px;
  width: auto;
  mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1) 80%, rgba(0, 0, 0, 0));
  -webkit-mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1) 80%, rgba(0, 0, 0, 0));
}

/* Responsive */
@media (max-width: 768px) {
  .crew-content {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .crew-info {
    order: 2;
    align-items: center;
    margin-top: -20px;
  }

  .crew-image {
    order: 1;
    margin-top: -20px;
  }

  .dots {
    justify-content: center;
  }

  .crew-image img {
    max-height: 400px;
  }
}
</style>
