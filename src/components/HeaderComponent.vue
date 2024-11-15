<script setup lang="ts">
import { computed } from "vue";
import { RouterLink, useRoute } from "vue-router";
import { useBebidas } from "@/stores/bebidas";
import { useNotificacionStore } from "@/stores/notificaciones";

const route = useRoute();
const store = useBebidas();
const notificacion = useNotificacionStore()

const handleSubmit = () => {
  if(Object.values(store.busqueda).includes('')) {
    // notificacion.texto = 'Todos los campos son obligatorios'
    // notificacion.mostrar = true
    // notificacion.error = true
    notificacion.$patch({
      texto: 'Todos los campos son obligatorios',
      mostrar: true, 
      error: true
    })

    return
  }
  store.obtenerRecetas();
}
const homePage = computed(() => route.name === "home");
</script>

<template>
  <header class="bg-slate-800" :class="{ header: homePage }">
    <div class="mx-auto container px-5 py-16">
      <div class="flex justify-between items-center">
        <div>
          <RouterLink :to="{ name: 'home' }">
            <img class="w-32" src="/img/logo.svg" alt="Logo" />
          </RouterLink>
        </div>

        <nav class="flex gap-4 text-white">
          <RouterLink
            :to="{ name: 'home' }"
            class="uppercase font-bold"
            active-class="text-orange-500"
          >
            Home
          </RouterLink>

          <RouterLink
            :to="{ name: 'favorites' }"
            class="uppercase font-bold"
            active-class="text-orange-500"
          >
            Favoritos
          </RouterLink>
        </nav>
      </div>

      <form
        v-if="homePage"
        action="#"
        class="md:w-1/2 2xl:w-1/3 bg-orange-400 my-10 p-10 rounded-lg shadow space-y-6"
        @submit.prevent="handleSubmit"
      >
        <div class="space-y-4">
          <label
            class="block text-white uppercase font-extrabold text-lg"
            for="ingrediente"
            >Nombre o Ingredientes</label
          >
          <input
            class="p-3 w-full rounded-lg focus:outline-none"
            id="ingrediente"
            type="text"
            placeholder="Nombre o Ingredientes: Eje... Vodka, Tequila,.... otros"
            v-model="store.busqueda.name"
          />
        </div>
        <div class="space-y-4">
          <label
            class="block text-white uppercase font-extrabold text-lg"
            for="categoria"
            >Categoría</label
          >
          <select
            class="p-3 w-full rounded-lg focus:outline-none"
            id="categoria"
            v-model="store.busqueda.categoria"
          >
            <option value="">-- Seleccione --</option>
            <option
              :value="categoria.strCategory"
              v-for="categoria in store.categorias"
              :key="categoria.strCategory"
            >
              {{ categoria.strCategory }}
            </option>
          </select>
        </div>

        <input
          class="bg-orange-800 hover:bg-orange-900 cursor-pointer text-white font-extrabold w-full p-2 rounded-lg uppercase"
          type="submit"
          value="Buscar Recetas"
        />
      </form>
    </div>
  </header>
</template>

<style>
.header {
  background-image: url("/img/bg.jpg");
  background-size: cover;
  background-position: center;
}
</style>
