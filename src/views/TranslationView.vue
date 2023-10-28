<template>
  <section class="section">
    <div class="container">
      <h1 class="title has-text-centered">Traductor</h1>
      <div class="columns">
        <div class="column">
          <h2 class="subtitle has-text-centered">{{ programTitle }}</h2>
          <textarea
            v-model="programCode"
            class="textarea"
            placeholder="Ingresa tu código del programa..."
          ></textarea>
        </div>
        <div class="column is-narrow">
          <button id="swapButton" class="button is-primary is-fullwidth" @click="swapContent">
            <span class="icon">
              <i class="fas fa-exchange-alt"></i>
            </span>
          </button>
        </div>
        <div class="column">
          <h2 class="subtitle has-text-centered">{{ pseudoTitle }}</h2>
          <textarea
            v-model="pseudoCode"
            class="textarea"
            placeholder="La traducción aparecerá aquí..."
          ></textarea>
        </div>
      </div>
      <div class="columns">
        <div class="column is-half is-offset-one-quarter">
          <div class="field">
            <div class="control">
              <button
                id="translateButton"
                class="button is-primary is-fullwidth"
                @click="translate"
              >
                Traducir
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="columns">
        <div class="column is-half is-offset-one-quarter">
          <div class="field">
            <label class="label">Nombre del Curso</label>
            <div class="control">
              <input
                v-model="courseName"
                class="input"
                type="text"
                placeholder="Ingrese el nombre del curso"
              />
            </div>
          </div>
          <div class="field">
            <label class="label">Descripción del Curso</label>
            <div class="control">
              <input
                v-model="courseDescription"
                class="input"
                type="text"
                placeholder="Ingrese la descripción del curso"
              />
            </div>
          </div>
          <div class="field">
            <div class="control">
              <button id="saveButton" class="button is-primary is-fullwidth" @click="saveCourse">
                Guardar como Curso
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import { ref } from 'vue'
import translationService from '../services/translationService'
import { useRouter } from 'vue-router'
const router = useRouter()
const programCode = ref('')
const pseudoCode = ref('')
let translateState = ref('js-to-pseudo') // Default translation state
const programTitle = ref('Javascript')
const pseudoTitle = ref('Pseudocódigo')
const courseName = ref('')
const courseDescription = ref('')
const swapContent = () => {
  const tempCode = programCode.value
  programCode.value = pseudoCode.value
  pseudoCode.value = tempCode

  const tempTitle = programTitle.value
  programTitle.value = pseudoTitle.value
  pseudoTitle.value = tempTitle

  // Toggle the translation state
  translateState.value = translateState.value === 'js-to-pseudo' ? 'pseudo-to-js' : 'js-to-pseudo'
}

const translate = async () => {
  try {
    if (translateState.value === 'js-to-pseudo') {
      let jsCode = programCode.value
      let pseudoTranslated = await translationService.translateJS(jsCode)

      pseudoCode.value = pseudoTranslated
    } else if (translateState.value === 'pseudo-to-js') {
      let pseudoCodeVal = pseudoCode.value
      let jsTranslated = await translationService.translatePseudo(pseudoCodeVal)

      programCode.value = jsTranslated
    }
  } catch (error) {
    console.error(error.message)
  }
}

const saveCourse = async () => {
  try {
    const translation = {
      originalMessage: programCode.value, // Assuming programCode holds the original message
      translationType: translateState.value
    }

    const response = await translationService.saveCourse({
      name: courseName.value,
      description: courseDescription.value,
      availableDate: null, // You can set this value if needed
      official: false, // Assuming it's a non-official course
      translation
    })

    router.push({ name: 'bookshelf' }) // Assuming 'login' is the route name for the login page
    console.log(response.message)
  } catch (error) {
    console.error(error.message)
  }
}
</script>
<style scoped>
body {
  font-family: 'Arial', sans-serif;
}

.title {
  font-size: 2em;
}

.subtitle {
  font-size: 1.5em;
}
</style>
