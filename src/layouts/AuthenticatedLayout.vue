<script setup>
import { RouterLink, RouterView } from 'vue-router'
import '@fortawesome/fontawesome-free/css/all.css'
import { useRouter } from 'vue-router'
const router = useRouter()
const logout = () => {
  // Remove the token from local storage
  localStorage.removeItem('token')

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
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-start">
        <router-link to="/inicio" class="navbar-item"> Inicio </router-link>
        <router-link to="/biblioteca" class="navbar-item"> Biblioteca </router-link>
        <router-link to="/mi-libreria" class="navbar-item"> Mi Libreria </router-link>
        <router-link to="/traduccion" class="navbar-item"> Traducción </router-link>
        <router-link to="/planes" class="navbar-item"> Planes </router-link>
      </div>

      <div class="navbar-end">
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
