// Importamos los elementos del DOM y las clases necesarias
import UI from './Clases/UI.js';
import Cliente from './Clases/Cliente.js';
import {nombreInput, emailInput, telefonoInput, empresaInput, formulario } from "./selectores.js";

// Creamos nuevas instancias de las clases UI y Cliente
const ui = new UI();
const cliente = new Cliente;

// Función para manejar el envío del formulario de nuevo cliente
export function formNuevo(e) {
    e.preventDefault();

    // Leemos los valores de los inputs
    const nombre = nombreInput.value;
    const email = emailInput.value;
    const telefono = telefonoInput.value;
    const empresa = empresaInput.value;

    // Verificamos que todos los campos estén llenos
    if(nombre === '' || email === '' || telefono === '' || empresa === '') {
        ui.imprimirAlerta('Todos los campos son obligatorios', 'error');
        return;
    }

    // Validamos que el email sea válido
    const regexCorreo =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ ;
    if(!regexCorreo.test(email)) {
        ui.imprimirAlerta('Email no es válido', 'error');
        return;
    }

    // Validamos que el teléfono sea válido, 9 digitos y comienza con 9
    const regexTelefono = /^9\d{8}$/;
    if(!regexTelefono.test(telefono)) {
        ui.imprimirAlerta('Teléfono no válido, son 9 dígitos', 'error');
        return;
    }

    // Creamos un objeto con los datos del cliente
    const clienteObj = {
        nombre,
        email,
        telefono,
        empresa
    }

    // Asignamos un ID único al cliente
    clienteObj.id = Date.now();
    
    // Creamos un nuevo cliente con los datos del formulario
    cliente.crearNuevoCliente(clienteObj);

    // Reseteamos el formulario
    formulario.reset();
}

// Función para manejar el envío del formulario de edición de cliente
export function formEditar(idCliente) {

    // Leemos los valores de los inputs
    const nombre = nombreInput.value;
    const email = emailInput.value;
    const telefono = telefonoInput.value;
    const empresa = empresaInput.value;

    // Verificamos que todos los campos estén llenos
    if(nombre === '' || email === '' || telefono === '' || empresa === '') {
        ui.imprimirAlerta('Todos los campos son obligatorios', 'error');
        return;
    }

    // Validamos que el email sea válido
    const regexCorreo =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ ;
    if(!regexCorreo.test(email)) {
        ui.imprimirAlerta('Email no es válido', 'error');
        return;
    }

    // Validamos que el teléfono sea válido, 9 digitos y comienza con 9
    const regexTelefono = /^9\d{8}$/;
    if(!regexTelefono.test(telefono)) {
        ui.imprimirAlerta('Teléfono no válido, son 9 dígitos', 'error');
        return;
    }

    // Creamos un objeto con los datos actualizados del cliente
    const clienteActualizado = {
        nombre,
        email,
        telefono,
        empresa,
        id: Number(idCliente),
    }

    // Llamamos al método actualizarCliente de la instancia cliente con el cliente actualizado
    cliente.actualizarCliente(clienteActualizado);

    // Deshabilitar inputs actualizado
    // Obtener todos los elementos del formulario
    const elementosFormulario = [...formulario.elements];

    // Recorrer los elementos y deshabilitarlos
    for (let i = 0; i < elementosFormulario.length; i++) {
        // Deshabilitamos cada elemento del formulario para prevenir cambios después de enviar los datos
        elementosFormulario[i].disabled = true;
    }
}
