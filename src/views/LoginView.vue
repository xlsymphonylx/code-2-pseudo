<template>
  <section class="section">
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-half">
          <div class="box">
            <h1 class="title has-text-centered">Iniciar Sesión</h1>
            <form @submit.prevent="login">
              <div class="field">
                <label class="label">Email</label>
                <div class="control">
                  <input
                    v-model="email"
                    class="input"
                    type="text"
                    placeholder="Email"
                    :class="{ 'is-danger': !isEmailValid }"
                  />
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
                    :class="{ 'is-danger': !isPasswordValid }"
                  />
                </div>
              </div>
              <div class="field is-grouped is-grouped-centered">
                <div class="control is-flex is-align-items-center">
                  No tienes cuenta?
                  <router-link to="/registrarse" class="button is-text">Registrarte</router-link>
                </div>
              </div>

              <div class="field is-grouped is-grouped-centered">
                <div class="control">
                  <button type="submit" class="button is-primary">Iniciar Sesión</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import authService from '../services/authService' // Replace with actual path
import { useRouter } from 'vue-router'
import { showSuccessDialog, showErrorDialog } from '../utils/alerts'
const router = useRouter()
const email = ref('')
const password = ref('')
const isEmailValid = ref(true)
const isPasswordValid = ref(true)

const validateEmail = (email) => {
  // You can use a regular expression or any other validation logic here
  return /\S+@\S+\.\S+/.test(email)
}
const validatePass = (password) => {
  // Check if the password is at least length 4
  if (password.length < 4) {
    return false
  }

  // Check if the password contains only numbers and letters
  return /^[a-zA-Z0-9]+$/.test(password)
}

const validateLoginForm = () => {
  const errors = []

  // Validate email
  if (!validateEmail(email.value)) {
    isEmailValid.value = false
    errors.push('Por favor, introduce una dirección de correo electrónico válida.')
  }

  // Validate password
  if (!validatePass(password.value)) {
    isPasswordValid.value = false

    errors.push(
      'La contraseña debe tener al menos 4 caracteres y solo puede contener números y letras.'
    )
  }

  return errors
}
const login = async () => {
  const errors = validateLoginForm()

  if (errors.length > 0) {
    await showErrorDialog('Error!', errors.join('\n'))
    return
  }
  try {
    const response = await authService.login(email.value, password.value)
    const { token } = response
    const { user } = response

    // Save token to localStorage
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))
    await showSuccessDialog('Exito!', 'Iniciado sesión correctamente')
    // Redirect to home page
    // Assuming you're using Vue Router, replace 'home' with the actual route name for your home page
    router.push({ path: 'home' })
    router.go()
  } catch (error) {
    // Handle login errors here
    await showErrorDialog('Error!', error.message)
    console.error(error.message)
  }
}
</script>

<style>
body {
  font-family: 'Arial', sans-serif;
}

.title {
  font-size: 2em;
}

.button {
  font-size: 1em;
}
</style>
