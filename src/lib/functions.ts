export function saveStorage(valor: any) {
    try {
        localStorage.setItem("user-inventario", JSON.stringify(valor));
    } catch (error) {
        console.error('Error al guardar los datos en localStorage:', error);
    }
}

export function getStorage() {
    try {
        const datos = localStorage.getItem("user-inventario");
        if (datos) {
            return JSON.parse(datos);
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error al obtener los datos de localStorage:', error);
    }
}

export function deleteStorage() {
    try {
        localStorage.removeItem("user-inventario");
        window.location.reload();
    } catch (error) {
        console.error('Error al eliminar los datos de localStorage:', error);
    }
}