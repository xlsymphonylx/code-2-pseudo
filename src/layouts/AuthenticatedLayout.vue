<script setup>
import { RouterLink, RouterView } from 'vue-router'
import '@fortawesome/fontawesome-free/css/all.css'
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
const host = 'http://ec2-3-148-106-81.us-east-2.compute.amazonaws.com/'
const router = useRouter()
const user = ref(null)
const burgerMenuActive = ref(false)

const toggleBurgerMenu = () => {
  burgerMenuActive.value = !burgerMenuActive.value
}
onMounted(() => {
  const userData = JSON.parse(localStorage.getItem('user'))
  console.log(host)
  if (userData) {
    user.value = userData
  }
})
const logout = () => {
  // Remove the token from local storage
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  router.push({ name: 'login' }) // Assuming 'login' is the route name for the login page
  router.go()
}
</script>
<template>
  <nav class="navbar is-dark" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <!-- <a class="navbar-item" href="https://bulma.io">
        <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28" />
      </a> -->

      <a
        role="button"
        class="navbar-burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
        @click="toggleBurgerMenu"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu" :class="{ 'is-active': burgerMenuActive }">
      <div class="navbar-start">
        <router-link to="/inicio" class="navbar-item"> Inicio </router-link>
        <router-link to="/biblioteca" class="navbar-item"> Biblioteca </router-link>
        <router-link to="/mi-libreria" class="navbar-item"> Mi Libreria </router-link>
        <router-link to="/traduccion" class="navbar-item"> Traducción </router-link>
        <router-link to="/planes" class="navbar-item"> Planes </router-link>
      </div>

      <div class="navbar-end">
        <div class="navbar-item" v-if="user">
          <p class="has-text-info">¡Hola, {{ user.username }}!</p>
        </div>
        <div class="navbar-item" v-if="user && !burgerMenuActive">
          <figure class="image is-flex is-align-items-center">
            <img class="is-rounded" :src="`${host}${user.profile_img}`" alt="Profile Image" />
          </figure>
        </div>
        <div class="navbar-item">
          <div class="buttons">
            <a @click="logout" class="button is-danger">
              <strong>Cerrar Sesión</strong>
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>

  <RouterView />
</template>

<style scoped>
/* Add any custom styles here */
</style>
