<template>
  <section class="section">
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-half">
          <div class="box">
            <h1 class="title has-text-centered">Registrarse</h1>
            <form @submit.prevent="registerUser">
              <div class="field">
                <label class="label">Usuario</label>
                <div class="control">
                  <input v-model="username" class="input" type="text" placeholder="Usuario" />
                </div>
              </div>
              <div class="field">
                <label class="label">Contraseña</label>
                <div class="control">
                  <input
                    v-model="password"
                    class="input"
                    type="password"
                    placeholder="Contraseña"
                  />
                </div>
              </div>
              <div class="field">
                <label class="label">Correo Electrónico</label>
                <div class="control">
                  <input
                    v-model="email"
                    class="input"
                    type="email"
                    placeholder="Correo Electrónico"
                  />
                </div>
              </div>
              <div class="field">
                <label class="label">Nombre</label>
                <div class="control">
                  <input v-model="firstName" class="input" type="text" placeholder="Nombre" />
                </div>
              </div>
              <div class="field">
                <label class="label">Apellido</label>
                <div class="control">
                  <input v-model="lastName" class="input" type="text" placeholder="Apellido" />
                </div>
              </div>
              <div class="file has-name is-fullwidth">
                <!-- Added is-fullwidth for 100% width -->
                <label class="file-label">
                  <input class="file-input" type="file" @change="onFileChange" name="profile_img" />
                  <span class="file-cta">
                    <span class="file-icon">
                      <i class="fas fa-upload"></i>
                    </span>
                    <span class="file-label"> Elige una imagen... </span>
                  </span>
                  <span class="file-name" v-if="profileImgName">
                    <!-- Added v-if to conditionally show the name -->
                    {{ profileImgName }}
                  </span>
                </label>
              </div>
              <div class="field is-grouped is-grouped-centered mt-3">
                <div class="control">
                  <button type="submit" class="button is-primary">Registrarse</button>
                </div>
                <div class="control">
                  <router-link to="/iniciar-sesion" class="button is-info"
                    >Iniciar Sesión</router-link
                  >
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style>
.title {
  font-size: 2em;
}

.button {
  font-size: 1em;
}
</style>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import authService from '../services/authService'

const router = useRouter()

const username = ref('')
const password = ref('')
const email = ref('')
const firstName = ref('')
const lastName = ref('')
const profileImg = ref('')
const profileImgName = ref('')
const onFileChange = (e) => {
  const file = e.target.files[0]
  profileImgName.value = file ? file.name : ''
  profileImg.value = file
}
const registerUser = async () => {
  try {
    console.log(username.value)
    const response = await authService.register({
      username: username.value,
      password: password.value,
      email: email.value,
      firstName: firstName.value,
      lastName: lastName.value,
      profileImg: profileImg.value
    })

    const { token } = response
    localStorage.setItem('token', token)
    router.push({ path: 'home' })
    router.go()
  } catch (error) {
    console.error(error.message)
  }
}
</script>
