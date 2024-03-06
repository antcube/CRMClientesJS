// Importamos el elemento formulario
import { formulario } from "../selectores.js";

// Definimos la clase UI
class UI {
    // Método para imprimir una alerta en la interfaz de usuario
    imprimirAlerta(mensaje, tipo) {
        // Buscamos un elemento con la clase 'alerta'
        const alerta = document.querySelector('.alerta');

        // Si no existe una alerta en la página
        if(!alerta) {
            // Creamos un nuevo elemento div
            const divMensaje = document.createElement('DIV');
            // Añadimos varias clases al div
            divMensaje.classList.add('px-4', 'py-3', 'rounded', 'max-w-lg', 'mx-auto', 'mt-6', 'text-center', 'border', 'alerta');
    
            // Si el tipo de la alerta es 'error'
            if(tipo === 'error') {
                // Añadimos clases para darle estilo de error al div
                divMensaje.classList.add('bg-red-100', 'border-red-400', 'text-red-700');
            } else {
                // Si no, añadimos clases para darle estilo de éxito al div
                divMensaje.classList.add('bg-green-100', 'border-green-400', 'text-green-700');
            }
    
            // Asignamos el mensaje al contenido del div
            divMensaje.textContent = mensaje;
    
            // Añadimos el div al formulario
            formulario.append(divMensaje);
    
            // Después de 2 segundos, eliminamos el div
            setTimeout(() => {
                divMensaje.remove();
            }, 2000);
        }
    }
}

// Exportamos la clase UI
export default UI;