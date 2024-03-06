// Importamos la clase Cliente y el elemento listadoClientes
import Cliente from './Cliente.js';
import { listadoClientes } from '../selectores.js';

// Definimos la clase BD
class BD {
    static DB;

    constructor() {
        // En el constructor, creamos la base de datos y una nueva instancia de Cliente
        this.crearDB();
        this.cliente = new Cliente();
    }

    crearDB() {
        // Creamos una nueva base de datos IndexedDB llamada 'crm'
        const crearDB = window.indexedDB.open('crm', 1);

        // Si hay un error al crear la base de datos, lo mostramos en la consola
        crearDB.onerror = e => {
            console.log('Hubo un error', e.target.error);
        }

        // Cuando la base de datos se haya creado con éxito
        crearDB.onsuccess = () => {
            // Guardamos la base de datos en la propiedad estática DB de la clase BD
            BD.DB = crearDB.result;

            // Obtenemos los parámetros de la URL
            const parametrosURL = new URLSearchParams(window.location.search);
            // Obtenemos el id del cliente de los parámetros
            const idCliente = parametrosURL.get('id');

            // Si existe un id de cliente, obtenemos los clientes con ese id
            if(idCliente) {
                this.cliente.obtenerClientes(idCliente);
            } else {
                // Si no existe un id de cliente, obtenemos todos los clientes
                this.cliente.obtenerClientes(null);
            }

            // Si existe el elemento listadoClientes
            if(listadoClientes) {
                // Añadimos un event listener al elemento para eliminar un cliente cuando se haga clic en él
                listadoClientes.addEventListener('click', async (e) => {
                    // Realiza operaciones asíncronas si es necesario
                    await new Promise(resolve => setTimeout(resolve, 0));
                
                    // Llamamos al método eliminarCliente de la instancia cliente
                    this.cliente.eliminarCliente(e);
                });
            }
        }

        // Cuando la base de datos necesite una actualización
        crearDB.onupgradeneeded = e => {
            // Obtenemos la base de datos
            const db = e.target.result;

            // Creamos un object store para los clientes con un id autoincrementado
            const almacenClientes = db.createObjectStore('clientes', {
                keyPath: 'id', autoIncrement: true
            });

            // Creamos índices para el nombre, el email y el teléfono de los clientes
            almacenClientes.createIndex('nombre', 'nombre', { unique: false });
            almacenClientes.createIndex('email', 'email', { unique: true });
            almacenClientes.createIndex('telefono', 'telefono', { unique: false });
            almacenClientes.createIndex('empresa', 'empresa', { unique: false });
            almacenClientes.createIndex('id', 'id', { unique: true });
        }
    }
}

// Exportamos la clase BD
export default BD;