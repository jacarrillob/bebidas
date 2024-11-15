<script setup lang="ts">
import { useBebidas } from "@/stores/bebidas";
import RecetaComponent from "@/components/RecetaComponent.vue";

const bebidas = useBebidas();
</script>

<template>
  <h1 class="text-6xl font-extrabold">Recetas</h1>

  <p v-if="bebidas.noRecetas" class="text-center my-10 text-2xl">No hay recetas, utiliza el formulario para buscar recetas</p>
  <div v-else class="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 my-10 gap-10">
    <RecetaComponent
      v-for="receta in bebidas.recetas"
      :key="receta.idDrink"
      :receta="receta"
    />
  </div>
</template>
