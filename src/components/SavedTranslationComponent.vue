<template>
  <section class="section">
    <div class="container">
      <h1 class="title has-text-centered">{{ title }}</h1>
      <p class="subtitle has-text-centered">{{ description }}</p>
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
    </div>
  </section>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import translationService from '../services/translationService'
import { showErrorDialog } from '../utils/alerts'
const props = defineProps({
  title: String,
  description: String,
  originalMessage: String,
  selectedTranslationType: Number,
  state: String,
  codeTitle: String
})
const programCode = ref(props.originalMessage || '')
const pseudoCode = ref('')
let translateState = ref(props.translationType || 'code-to-pseudo')
const programTitle = ref('Codigo')
const pseudoTitle = ref('Pseudocódigo')

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

const translate = async () => {
  try {
    let programCodeVal = programCode.value
    let translationTypeId = props.selectedTranslationType
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
onMounted(() => {
  if (props.state === 'pseudo-to-js') {
    programTitle.value = 'Pseudocódigo'
    pseudoTitle.value = props.codeTitle
  } else {
    programTitle.value = props.codeTitle
    pseudoTitle.value = 'Pseudocódigo'
  }
})
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
