import BD from './BD.js';
import UI from './UI.js';
import { listadoClientes } from './../selectores.js';
import {nombreInput, emailInput, telefonoInput, empresaInput } from "../selectores.js";

class Cliente {
    constructor() {
        // En el constructor, creamos una nueva instancia de UI
        this.ui = new UI;
    }

    crearNuevoCliente(cliente) {
        // Creamos una transacción para leer y escribir en el object store 'clientes'
        const transaccion = BD.DB.transaction(['clientes'], 'readwrite');

        // Obtenemos el object store 'clientes'
        const almacenClientes = transaccion.objectStore('clientes');

        // Intentamos añadir el cliente al object store
        const solicitud = almacenClientes.add(cliente);

        // Si hay un error al añadir el cliente, imprimimos una alerta de error
        solicitud.onerror = () => {
            this.ui.imprimirAlerta('Hubo un error', 'error');
        }

        // Si el cliente se añade correctamente, imprimimos una alerta de éxito y redirigimos al usuario a 'index.html' después de 2 segundos
        solicitud.onsuccess = () => {
            this.ui.imprimirAlerta('El cliente se agregó correctamente');

            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
        }
    }

    obtenerClientes(idCliente) {
        // Creamos una transacción para leer el object store 'clientes'
        const transaccion = BD.DB.transaction(['clientes'], 'readonly');
    
        // Obtenemos el object store 'clientes'
        const almacenClientes = transaccion.objectStore('clientes');
        
        // Abrimos un cursor para iterar sobre los clientes
        almacenClientes.openCursor().onsuccess = e => {
            const cursor = e.target.result;

            // Si el cursor no es null, es decir, si hay un cliente
            if(cursor) {
                // Desestructuramos los datos del cliente
                const { nombre, email, telefono, empresa, id} = cursor.value;

                // Si existe el elemento listadoClientes, añadimos el cliente a la lista
                if(listadoClientes) {
                    listadoClientes.innerHTML += `
                        <tr>
                            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                <p class="text-sm leading-5 font-medium text-gray-700 text-lg  font-bold"> ${nombre} </p>
                                <p class="text-sm leading-10 text-gray-700"> ${email} </p>
                            </td>
                            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 ">
                                <p class="text-gray-700">${telefono}</p>
                            </td>
                            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200  leading-5 text-gray-700">    
                                <p class="text-gray-600">${empresa}</p>
                            </td>
                            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5">
                                <a href="editar-cliente.html?id=${id}" class="text-teal-600 hover:text-teal-900 mr-5">Editar</a>
                                <a href="#" data-cliente="${id}" class="text-red-600 hover:text-red-900 eliminar">Eliminar</a>
                            </td>
                        </tr>  
                    `;
                }

                // Si el id del cliente actual es igual al id del cliente que estamos buscando
                if(cursor.value.id === Number(idCliente)) {
                    // Asignamos los valores del cliente a los inputs correspondientes
                    nombreInput.value = nombre;
                    emailInput.value = email;
                    telefonoInput.value = telefono;
                    empresaInput.value = empresa;
                }
                // Continuamos al siguiente cliente
                cursor.continue();
            }
        }
    }

    // Método para actualizar un cliente
    actualizarCliente(cliente) {
        const transaccion = BD.DB.transaction(['clientes'], 'readwrite');

        const almacenClientes = transaccion.objectStore('clientes');

        // Intentamos actualizar el cliente en el object store
        const solicitud = almacenClientes.put(cliente);

        // Si hay un error al actualizar el cliente, imprimimos una alerta de error
        solicitud.onerror = () => {
            this.ui.imprimirAlerta('Hubo un error', 'error');
        }

        // Si el cliente se actualiza correctamente, imprimimos una alerta de éxito y redirigimos al usuario a 'index.html' después de 2 segundos
        solicitud.onsuccess = () => {
            this.ui.imprimirAlerta('El cliente se actualizó correctamente');

            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
        }
    }

    // Método para eliminar un cliente
    eliminarCliente(e) {
        // Si el elemento tiene la clase 'eliminar'
        if(e.target.classList.contains('eliminar')) {
            // Obtenemos el id del cliente a eliminar
            const idEliminar = Number(e.target.dataset.cliente);
               
            // Pedimos confirmación al usuario para eliminar el cliente
            const confirmar = confirm('¿Deseas eliminar este cliente?');
        
            // Si el usuario confirma la eliminación
            if(confirmar) {
                const transaccion = BD.DB.transaction(['clientes'], 'readwrite');
                
                const almacenClientes = transaccion.objectStore('clientes');

                // Intentamos eliminar el cliente del object store
                const solicitud = almacenClientes.delete(idEliminar);
                
                // Si el cliente se elimina correctamente, eliminamos la fila correspondiente de la tabla
                solicitud.onsuccess = function() {
                    e.target.parentElement.parentElement.remove();
                }
            
                solicitud.onerror = function() {
                    console.log('Hubo un error');
                }
            }    
        }
    }
}

export default Cliente;