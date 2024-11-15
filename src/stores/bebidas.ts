import { defineStore } from "pinia";
import { computed, onMounted, reactive, ref } from "vue";
import { useModal } from "./modal";

import APIService from "@/services/APIService";

export const useBebidas = defineStore('bebidas', () => {

    const modal = useModal();
    const categorias: any = ref([])
    const busqueda = reactive({
        name: '',
        categoria: ''
    })

    const recetas: any = ref([]);
    const receta: any = ref({})

    async function obtenerRecetas () {
        const {data: { drinks }} = await APIService.buscarRecetas(busqueda)
        recetas.value = drinks;
    }

    async function seleccionarBebida(id: any) {
        const {data: { drinks }} = await APIService.obtenerReceta(id)
        receta.value = drinks[0]
        modal.handleClickModal()
    }

    const noRecetas = computed(() => recetas.value.length === 0)

    onMounted(async()=> {
        const {  data: { drinks }} = await APIService.obtenerCategorias();
        categorias.value = drinks;
    })

    return {
        categorias,
        busqueda,
        obtenerRecetas,
        recetas,
        receta,
        seleccionarBebida,
        noRecetas
    }
})