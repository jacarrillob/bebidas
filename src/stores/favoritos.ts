import { computed, onMounted, ref, watch } from "vue";
import { defineStore } from "pinia";
import { useBebidas } from "./bebidas";
import { useModal } from "./modal";
import { useNotificacionStore } from "./notificaciones";

export const useFavoritosStore = defineStore('favoritos', () => {
    
    const bebidas = useBebidas()
    const favoritos: any = ref([])
    const modal = useModal()
    const notificacion = useNotificacionStore()

    watch(favoritos,() => {
        sincronizarLocalStorage()
    }, {
        deep: true
    })

    function sincronizarLocalStorage() {
        localStorage.setItem('favoritos', JSON.stringify(favoritos.value))
    }

    function existeFavorito() {
        const favoritosLocalStorage = JSON.parse(localStorage.getItem('favoritos') || '[]') ?? []
        return favoritosLocalStorage.some((favorito: any) => favorito.idDrink === bebidas.receta.idDrink)
    }

    function eliminarFavorito() {
        favoritos.value = favoritos.value.filter((favorito: any) => favorito.idDrink !== bebidas.receta.idDrink)

        notificacion.mostrar = true
        notificacion.error = true
        notificacion.texto = 'Eliminado de favoritos'

        // setTimeout(() => {
        //     notificacion.$reset()
        // }, 3000)
    }

    function agregarFavorito() {
        favoritos.value.push(bebidas.receta)

        notificacion.mostrar = true
        notificacion.texto = 'Se agregó a favoritos'

        // setTimeout(() => {
        //     notificacion.$reset()
        // }, 3000)
    }

    function handleClickFavorito() {
        if(!existeFavorito()) {
            agregarFavorito()
        } else {
            eliminarFavorito()
        }
        modal.modal = false
    }

    const noFavoritos = computed(()=> favoritos.value.length === 0)

    onMounted(()=> favoritos.value = JSON.parse(localStorage.getItem('favoritos') || '[]') ?? [])


    return {
        favoritos,
        handleClickFavorito,
        existeFavorito,
        noFavoritos
    }
})