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
            :class="{ 'is-danger': !isProgramCodeValid }"
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
            <label class="label">Lenguaje</label>

            <div
              class="select is-fullwidth"
              :class="{ 'is-danger': !isSelectedTranslationTypeValid }"
            >
              <select v-model="selectedTranslationType">
                <option value="0" selected>Selecciona una opcion</option>
                <option v-for="translationType in translationTypes" :value="translationType.id">
                  {{ translationType.title }}
                </option>
              </select>
            </div>
          </div>

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
                :class="{ 'is-danger': !isCourseNameValid }"
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
                :class="{ 'is-danger': !isCourseDescriptionValid }"
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
import { ref, onMounted } from 'vue'
import translationService from '../services/translationService'
import { useRouter } from 'vue-router'
import { showErrorDialog, showSuccessDialog } from '../utils/alerts'
const router = useRouter()
const programCode = ref('')
const pseudoCode = ref('')
let translateState = ref('code-to-pseudo') // Default translation state
const programTitle = ref('Codigo')
const pseudoTitle = ref('Pseudocódigo')
const courseName = ref('')
const courseDescription = ref('')
const translationTypes = ref([])
const selectedTranslationType = ref(0)

const isCourseNameValid = ref(true)
const isCourseDescriptionValid = ref(true)
const isProgramCodeValid = ref(true)
const isSelectedTranslationTypeValid = ref(true)

const translateValidation = [
  {
    validate: (value) => !!value,
    errorMessage: 'Por favor, introduce el lenguaje a traducir.',
    isValidRef: isSelectedTranslationTypeValid,
    refValue: selectedTranslationType
  },
  {
    validate: (value) => value.trim() !== '',
    errorMessage: 'Por favor, introduce el codigo a traducir.',
    isValidRef: isProgramCodeValid,
    refValue: programCode
  }
]

const validations = [
  {
    validate: (value) => !!value,
    errorMessage: 'Por favor, introduce el lenguaje a traducir.',
    isValidRef: isSelectedTranslationTypeValid,
    refValue: selectedTranslationType
  },
  {
    validate: (value) => value.trim() !== '',
    errorMessage: 'Por favor, introduce el codigo a traducir.',
    isValidRef: isProgramCodeValid,
    refValue: programCode
  },
  {
    validate: (value) => value.trim() !== '',
    errorMessage: 'Por favor, introduce un nombre de curso.',
    isValidRef: isCourseNameValid,
    refValue: courseName
  },
  {
    validate: (value) => /^[a-zA-Z0-9\s]{1,20}$/.test(value.trim()),
    errorMessage:
      'El nombre del curso debe tener entre 1 y 20 caracteres y solo puede contener números, letras y espacios.',
    isValidRef: isCourseNameValid,
    refValue: courseName
  },
  {
    validate: (value) => value.trim() !== '',
    errorMessage: 'Por favor, introduce una descripción de curso.',
    isValidRef: isCourseDescriptionValid,
    refValue: courseDescription
  },
  {
    validate: (value) => /^[a-zA-Z0-9\s]{1,100}$/.test(value.trim()),
    errorMessage:
      'La descripción del curso debe tener entre 1 y 100 caracteres y solo puede contener números, letras y espacios.',
    isValidRef: isCourseDescriptionValid,
    refValue: courseDescription
  }
]

const validateTranslation = () => {
  const errors = []

  translateValidation.forEach((validation) => {
    if (!validation.validate(validation.refValue.value)) {
      validation.isValidRef.value = false
      errors.push(validation.errorMessage)
    } else {
      validation.isValidRef.value = true
    }
  })

  return errors
}

const validateForm = () => {
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

const getAllTypes = async () => {
  try {
    let responseTypes = await translationService.getAllTranslationTypes()
    console.log(responseTypes)
    translationTypes.value = responseTypes
  } catch (error) {
    await showErrorDialog('Error!', error.message)
    console.error(error.message)
  }
}
const swapContent = () => {
  const tempCode = programCode.value
  programCode.value = pseudoCode.value
  pseudoCode.value = tempCode

  const tempTitle = programTitle.value
  programTitle.value = pseudoTitle.value
  pseudoTitle.value = tempTitle

  // Toggle the translation state
  translateState.value =
    translateState.value === 'code-to-pseudo' ? 'pseudo-to-js' : 'code-to-pseudo'
}

onMounted(() => {
  getAllTypes()
})

const translate = async () => {
  const errors = validateTranslation()

  if (errors.length > 0) {
    await showErrorDialog('Error!', errors.join('\n'))
    return
  }
  try {
    let programCodeVal = programCode.value
    let translationTypeId = selectedTranslationType.value
    let state = translateState.value

    let translated = await translationService.translateCode(
      programCodeVal,
      translationTypeId,
      state
    )

    pseudoCode.value = translated
  } catch (error) {
    await showErrorDialog('Error!', error.message)
    console.error(error.message)
  }
}

const saveCourse = async () => {
  const errors = validateForm()

  if (errors.length > 0) {
    await showErrorDialog('Error!', errors.join('\n'))
    return
  }
  try {
    const translation = {
      originalMessage: programCode.value, // Assuming programCode holds the original message
      translationType: translateState.value,
      translationTypeId: selectedTranslationType.value // Assuming it's a non-official course
    }

    const response = await translationService.saveCourse({
      name: courseName.value,
      description: courseDescription.value,
      availableDate: null, // You can set this value if needed
      official: false, // Assuming it's a non-official course
      translation
    })
    await showSuccessDialog('Exito!', 'Curso guardado en mi libreria')
    router.push({ name: 'bookshelf' }) // Assuming 'login' is the route name for the login page
    console.log(response.message)
  } catch (error) {
    await showErrorDialog('Error!', error.message)
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
