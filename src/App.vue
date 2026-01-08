<template>
  <div :style="backgroundStyle">
    <nav>
      <img :src="logo" alt="Logo" class="logo" />

      <button class="hamburger" @click="toggleMenu">
        <span :class="{ open: isMenuOpen }"></span>
        <span :class="{ open: isMenuOpen }"></span>
        <span :class="{ open: isMenuOpen }"></span>
      </button>

      <div class="fondo" :class="{ show: isMenuOpen }">
        <router-link to="/" exact-active-class="active">00 Home</router-link>
       <!-- <router-link to="/destination" exact-active-class="active">01 Destination</router-link>-->
        <router-link to="/crew" exact-active-class="active">01 Crew</router-link>
        <router-link to="/technology" exact-active-class="active">02 Technology</router-link>
      </div>
    </nav>

    <div id="app">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
import logo from '@/assets/shared/logo.svg'

const isMenuOpen = ref(false)
const toggleMenu = () => (isMenuOpen.value = !isMenuOpen.value)

const route = useRoute()

// Detectar ancho de pantalla
const screenWidth = ref(window.innerWidth)
const updateWidth = () => {
  screenWidth.value = window.innerWidth
}
onMounted(() => {
  window.addEventListener('resize', updateWidth)
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', updateWidth)
})

// Tipo de pantalla
const screenSize = computed(() => {
  if (screenWidth.value <= 768) return 'mobile'
  if (screenWidth.value <= 1024) return 'tablet'
  return 'desktop'
})

// Cargar todas las imágenes posibles
const bgImages = import.meta.glob('@/assets/**/background-*.jpg', {
  eager: true,
  import: 'default',
})

// Calcular imagen de fondo según sección y tamaño
const backgroundStyle = computed(() => {
  let section = 'home'
  if (route.path.includes('destination')) section = 'destination'
  else if (route.path.includes('crew')) section = 'crew'
  else if (route.path.includes('technology')) section = 'technology'

  const pathKey = `/src/assets/${section}/background-${section}-${screenSize.value}.jpg`
  const backgroundImage = bgImages[pathKey]

  return {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh',
    width: '100%',
    color: 'white',
  }
})
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

nav {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  z-index: 100;
}

.logo {
  margin: 3rem;
  width: 48px;
  height: 48px;
}

.fondo {
  display: flex;
  justify-content: center;
  gap: 2rem;
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  padding: 1rem 2rem;
  width: 60%;
  height: 70px;
  margin-top: 2rem;
  transition: all 0.3s ease;
}

.fondo a {
  padding-bottom: 52px;
  font-size: 1.1rem;
  text-transform: uppercase;
}

.fondo a.active {
  color: white;
  text-decoration: none;
  border-bottom: 2px solid white;
}

#app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
}

/* HAMBURGUESA */
.hamburger {
  display: none;
  flex-direction: column;
  gap: 6px;
  margin-right: 2rem;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 110;
}

.hamburger span {
  width: 25px;
  height: 3px;
  background: white;
  border-radius: 2px;
  transition: all 0.3s ease;
}

.hamburger span.open:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}
.hamburger span.open:nth-child(2) {
  opacity: 0;
}
.hamburger span.open:nth-child(3) {
  transform: rotate(-45deg) translate(5px, -5px);
}

/* RESPONSIVE */
@media (max-width: 768px) {
  .hamburger {
    display: flex;
  }

  .fondo {
    position: absolute;
    top: 100%;
    right: 0;
    width: 100%;
    height: auto;
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
    padding: 2rem;
    background: rgba(0, 0, 0, 0.8);
    transform: translateY(-200%);
    opacity: 0;
    pointer-events: none;
  }

  .fondo.show {
    transform: translateY(0);
    opacity: 1;
    pointer-events: all;
  }

  .fondo a {
    padding: 0;
    font-size: 1.2rem;
    border: none;
  }
}
</style>
