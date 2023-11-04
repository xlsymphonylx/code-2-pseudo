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
                  <input
                    v-model="username"
                    class="input"
                    type="text"
                    placeholder="Usuario"
                    :class="{ 'is-danger': !isUsernameValid }"
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
              <div class="field">
                <label class="label">Correo Electrónico</label>
                <div class="control">
                  <input
                    v-model="email"
                    class="input"
                    type="email"
                    placeholder="Correo Electrónico"
                    :class="{ 'is-danger': !isEmailValid }"
                  />
                </div>
              </div>
              <div class="field">
                <label class="label">Nombre</label>
                <div class="control">
                  <input
                    v-model="firstName"
                    class="input"
                    type="text"
                    placeholder="Nombre"
                    :class="{ 'is-danger': !isFirstNameValid }"
                  />
                </div>
              </div>
              <div class="field">
                <label class="label">Apellido</label>
                <div class="control">
                  <input
                    v-model="lastName"
                    class="input"
                    type="text"
                    placeholder="Apellido"
                    :class="{ 'is-danger': !isLastNameValid }"
                  />
                </div>
              </div>
              <div class="file has-name is-fullwidth" :class="{ 'is-danger': !isProfileImgValid }">
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
                <div class="control is-flex is-align-items-center">
                  Ya tienes cuenta?
                  <router-link to="/iniciar-sesion" class="button is-text"
                    >Inicia Sesión</router-link
                  >
                </div>
              </div>
              <div class="field is-grouped is-grouped-centered">
                <div class="control">
                  <button type="submit" class="button is-primary">Registrarse</button>
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
import { showErrorDialog, showSuccessDialog } from '../utils/alerts'

const router = useRouter()

const username = ref('')
const password = ref('')
const email = ref('')
const firstName = ref('')
const lastName = ref('')
const profileImg = ref(null)
const profileImgName = ref('')
const onFileChange = (e) => {
  const file = e.target.files[0]
  profileImgName.value = file ? file.name : ''
  profileImg.value = file
}

const isEmailValid = ref(true)
const isPasswordValid = ref(true)
const isUsernameValid = ref(true)
const isFirstNameValid = ref(true)
const isLastNameValid = ref(true)
const isProfileImgValid = ref(true)

const validations = [
  {
    validate: (value) => /\S+@\S+\.\S+/.test(value),
    errorMessage: 'Por favor, introduce una dirección de correo electrónico válida.',
    isValidRef: isEmailValid,
    refValue: email
  },
  {
    validate: (value) => /^[a-zA-Z0-9]{4,}$/.test(value),
    errorMessage:
      'La contraseña debe tener al menos 4 caracteres y solo puede contener números y letras.',
    isValidRef: isPasswordValid,
    refValue: password
  },
  {
    validate: (value) => /^[a-zA-Z0-9]+$/.test(value),
    errorMessage: 'El nombre de usuario solo puede contener caracteres y números.',
    isValidRef: isUsernameValid,
    refValue: username
  },
  {
    validate: (value) => /^[a-zA-Z ]+$/.test(value),
    errorMessage: 'El nombre solo puede contener letras y espacios.',
    isValidRef: isFirstNameValid,
    refValue: firstName
  },
  {
    validate: (value) => /^[a-zA-Z ]+$/.test(value),
    errorMessage: 'El apellido solo puede contener letras y espacios.',
    isValidRef: isLastNameValid,
    refValue: lastName
  }
]

const validateLoginForm = () => {
  const errors = []

  validations.forEach((validation) => {
    if (!validation.validate(validation.refValue.value)) {
      validation.isValidRef.value = false
      errors.push(validation.errorMessage)
    } else {
      validation.isValidRef.value = true
    }
  })

  return errors
}
const registerUser = async () => {
  const errors = validateLoginForm()

  if (errors.length > 0) {
    await showErrorDialog('Error!', errors.join('\n'))
    return
  }
  try {
    const response = await authService.register({
      username: username.value,
      password: password.value,
      email: email.value,
      firstName: firstName.value,
      lastName: lastName.value,
      profileImg: profileImg.value
    })
    await showSuccessDialog('Exito!', 'Registrado usuario correctamente')

    const { token, user } = response
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('token', token)
    router.push({ path: 'home' })
    router.go()
  } catch (error) {
    await showErrorDialog('Error!', error.message)
    console.error(error.message)
  }
}
</script>
