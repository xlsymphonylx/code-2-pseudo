<template>
  <section class="section">
    <div class="container">
      <h3 class="title has-text-centered">Javascript Basico</h3>
      <div class="columns is-multiline is-mobile">
        <div
          v-for="course in jsCourses"
          :key="course.id"
          class="column is-half-desktop is-full-mobile"
        >
          <div class="card">
            <div class="card-content">
              <p class="title">{{ course.name }}</p>
              <p class="subtitle">{{ course.description }}</p>
              <a @click="toggleTranslation(course.id)" class="button is-primary">
                <strong>Ver</strong>
              </a>
            </div>
            <SavedTranslationComponent
              v-if="selectedCourse === course.id"
              :title="course.name"
              :description="course.description"
              :originalMessage="course.SavedTranslation.originalMessage"
              :state="course.SavedTranslation.translationType"
              :selectedTranslationType="course.SavedTranslation.translationTypeId"
              :codeTitle="course.SavedTranslation.TranslationType.title"
            />
          </div>
        </div>
      </div>
      <h3 class="title has-text-centered">PHP Basico</h3>
      <div class="columns is-multiline is-mobile">
        <div
          v-for="course in phpCourses"
          :key="course.id"
          class="column is-half-desktop is-full-mobile"
        >
          <div class="card">
            <div class="card-content">
              <p class="title">{{ course.name }}</p>
              <p class="subtitle">{{ course.description }}</p>
              <a @click="toggleTranslation(course.id)" class="button is-primary">
                <strong>Ver</strong>
              </a>
            </div>
            <SavedTranslationComponent
              v-if="selectedCourse === course.id"
              :title="course.name"
              :description="course.description"
              :originalMessage="course.SavedTranslation.originalMessage"
              :state="course.SavedTranslation.translationType"
              :selectedTranslationType="course.SavedTranslation.translationTypeId"
              :codeTitle="course.SavedTranslation.TranslationType.title"
            />
          </div>
        </div>
      </div>
      <h3 class="title has-text-centered">SQL Basico</h3>
      <div class="columns is-multiline is-mobile">
        <div
          v-for="course in sqlCourses"
          :key="course.id"
          class="column is-half-desktop is-full-mobile"
        >
          <div class="card">
            <div class="card-content">
              <p class="title">{{ course.name }}</p>
              <p class="subtitle">{{ course.description }}</p>
              <a @click="toggleTranslation(course.id)" class="button is-primary">
                <strong>Ver</strong>
              </a>
            </div>
            <SavedTranslationComponent
              v-if="selectedCourse === course.id"
              :title="course.name"
              :description="course.description"
              :originalMessage="course.SavedTranslation.originalMessage"
              :state="course.SavedTranslation.translationType"
              :selectedTranslationType="course.SavedTranslation.translationTypeId"
              :codeTitle="course.SavedTranslation.TranslationType.title"
            />
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
import SavedTranslationComponent from '../components/SavedTranslationComponent.vue'

const officialCourses = ref([])
const selectedCourse = ref(null)

const jsCourses = ref([])
const phpCourses = ref([])
const sqlCourses = ref([])

onMounted(async () => {
  try {
    officialCourses.value = await translationService.getOfficialCourses()

    // Filter courses based on translationTypeId
    jsCourses.value = officialCourses.value.filter(
      (course) => course.SavedTranslation.translationTypeId === 1
    )
    phpCourses.value = officialCourses.value.filter(
      (course) => course.SavedTranslation.translationTypeId === 2
    )
    sqlCourses.value = officialCourses.value.filter(
      (course) => course.SavedTranslation.translationTypeId === 3
    )
  } catch (error) {
    await showErrorDialog('Error!', error.message)
    console.error(error.message)
  }
})

const toggleTranslation = (courseId) => {
  selectedCourse.value = selectedCourse.value === courseId ? null : courseId
}
</script>

<style scoped>
.title {
  font-size: 2em;
}

.button {
  font-size: 1em;
}
</style>
