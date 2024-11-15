<script setup lang="ts">
import { useFavoritosStore } from '@/stores/favoritos';

import RecetaComponent from "@/components/RecetaComponent.vue";


const favoritos = useFavoritosStore()

</script>

<template>
    <h1 class="text-6xl font-extrabold">Favoritos</h1>

    <p v-if="favoritos.noFavoritos" class="text-center my-10 text-2xl">No hay favoritos</p>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 my-10 gap-10">
    <RecetaComponent
      v-for="favorito in favoritos.favoritos"
      :key="favorito.idDrink"
      :receta="favorito"
    />
  </div>
</template>

