import { computed, ref } from "vue";
import { defineStore } from "pinia";
import { useFavoritosStore } from "./favoritos";

export const useModal = defineStore('modal', () => {
    const favoritos = useFavoritosStore()
    const modal = ref(false)

    function handleClickModal() {
        modal.value = !modal.value
    }

    const textoBoton = computed(()=> {
        return favoritos.existeFavorito() ? 'Eliminar de Favoritos' : 'Agregar a Favoritos'
    })


    return {
        modal,
        handleClickModal,
        textoBoton
    }
})