// Importamos los elementos y funciones necesarios
import { formulario } from '../selectores.js';
import { formNuevo, formEditar } from '../funciones.js';
import BD from './BD.js';

// Definimos la clase App
class App {
    constructor() {
        this.initApp();
    }

    // Método para inicializar la aplicación
    initApp() {
        // Llamamos a la función eventListeners
        eventListeners();

        function eventListeners() {
            // Cuando el documento esté listo, ejecutamos el siguiente código
            document.addEventListener('DOMContentLoaded', () => {
                // Creamos una nueva instancia de BD
                new BD();

                // Si existe un formulario en la página
                if(formulario) {
                    // Obtenemos los parámetros de la URL
                    const parametrosURL = new URLSearchParams(window.location.search);
                    // Obtenemos el id del cliente de los parámetros
                    const idCliente = parametrosURL.get('id');

                    // Si existe un id de cliente
                    if(idCliente) {
                        // Añadimos un event listener al formulario para editar el cliente cuando se envíe
                        formulario.addEventListener('submit', (e) => {
                            e.preventDefault();
                            formEditar(idCliente)
                        });
                    } else {
                        // Si no existe un id de cliente, añadimos un event listener al formulario para crear un nuevo cliente cuando se envíe
                        formulario.addEventListener('submit', formNuevo);
                    }
                }
            });
        }
    }
}

// Exportamos la clase App
export default App;