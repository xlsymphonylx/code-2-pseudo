<template>
  <div>
    <RouterView />
    <!-- Add login-specific footer or other elements here -->
  </div>
</template>
<script setup>
import { RouterLink, RouterView } from 'vue-router'
import '@fortawesome/fontawesome-free/css/all.css'
</script>
