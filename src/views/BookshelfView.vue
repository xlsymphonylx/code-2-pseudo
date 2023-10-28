<template>
  <section class="section">
    <div class="container">
      <h3 class="title has-text-centered">Lecciones Guardadas</h3>
      <div class="columns is-multiline is-mobile">
        <div
          v-for="course in nonOfficialCourses"
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
              :translationType="course.SavedTranslation.translationType"
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
import SavedTranslationComponent from '../components/SavedTranslationComponent.vue'
const nonOfficialCourses = ref([])
const selectedCourse = ref(null)
onMounted(async () => {
  try {
    nonOfficialCourses.value = await translationService.getNonOfficialCourses()
  } catch (error) {
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
