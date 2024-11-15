<script setup lang="ts">
import { RouterView } from 'vue-router';
import HeaderComponent from './components/HeaderComponent.vue'
import ModalComponent from './components/ModalComponent.vue';
import NotificationComponent from './components/NotificationComponent.vue';
</script>

<template>
  <HeaderComponent/>
  <main class="container mx-auto mt-10">
    <RouterView/>
  </main>

  <ModalComponent/>
  <NotificationComponent/>
</template>
