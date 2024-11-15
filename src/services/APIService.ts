import api from "@/lib/axios";

export default {
    obtenerCategorias() {
        return api.get('/list.php?c=list')
    }, 
    buscarRecetas(busqueda: any) {
       return api.get(`/filter.php?c=${busqueda.categoria}&i=${busqueda.name}`)
    },
    obtenerReceta(id:any) {
        return api.get(`lookup.php?i=${id}`)
    }
}