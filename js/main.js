//Variables
const btnEnviar = document.querySelector('#enviar');
const btnReset = document.querySelector('#resetBtn');
const formulario = document.querySelector('#enviar-mail');

//Variables para campos
const nombre = document.querySelector('#nombre');
const apellido = document.querySelector('#apellido');
const email = document.querySelector('#email');
const mensaje = document.querySelector('#mensaje');

const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

eventListener();

function eventListener() {
    //Cuando la App arranca
    document.addEventListener('DOMContentLoaded', iniciarApp);

    //Campos del formulario
    nombre.addEventListener('blur', validarFormulario);
    apellido.addEventListener('blur', validarFormulario);
    email.addEventListener('blur', validarFormulario);
    mensaje.addEventListener('blur', validarFormulario);

    //Enviar email
    formulario.addEventListener('submit', enviarEmail);

    //Reinicia el formulario
    btnReset.addEventListener('click', resetearFormulario);
}



function iniciarApp() {
    btnEnviar.disabled = true;
    btnEnviar.classList.add('bg-dark', 'btn_disabled');
}

//Funciones

function validarFormulario(e) {
    if (e.target.value.length > 0) {

        //Elimina los errores
        const error = document.querySelector('p.error');
        if(error) {
            error.remove();
        }

        e.target.classList.remove('border-danger');
        e.target.classList.add('border-success');
    } else {
        e.target.classList.remove('border-success');
        e.target.classList.add('border-danger');
        mostrarError('Todos los campos son obligatorios');
    }

    if(e.target.type === 'email') {
        if(er.test( e.target.value )) {
            const error = document.querySelector('p.error');
            if(error) {
                error.remove();
            }
    
            e.target.classList.remove('border-danger');
            e.target.classList.add('border-success');
        } else {
            e.target.classList.remove('border-success');
            e.target.classList.add('border-danger');    
            mostrarError('El email no es valido');
        }
    }

    if(er.test( email.value ) && apellido.value !== '' && email.value !== '' && mensaje.value !== '') {
        btnEnviar.disabled = false;
        btnEnviar.classList.remove('bg-dark', 'btn_disabled');
    }
}

function mostrarError(mensaje) {
    const mensajeError = document.createElement("p");
    mensajeError.textContent = mensaje;
    mensajeError.classList.add('border-danger','text-white', 'error', 'fw-bold', 'text-center', 'text-uppercase', 'bg-danger');
    
    const errores = document.querySelectorAll('.error');
    if(errores.length === 0) {
      formulario.insertBefore(mensajeError, document.querySelector('.before'));
    }
}

function enviarEmail(e) {
   e.preventDefault();

   //Mostrar el spinner
   const spinner = document.querySelector('#spinner');
   spinner.style.display = "flex";

   //Set time out
   setTimeout( () => {
    spinner.style.display = "none";

    //Mensaje de enviado
    const mensajeEnviado = document.createElement('p');
    mensajeEnviado.textContent = 'El mensaje se envio correctamente';

    //Inserta el parrafo antes del spinner
    formulario.insertBefore(mensajeEnviado, spinner);
    mensajeEnviado.classList.add('text-center', 'text-white', 'bg-success', 'p-2', 'text-uppercase', 'fw-bold')

    setTimeout( () => {
    mensajeEnviado.remove();
    resetearFormulario();
    }, 3000);
   }, 3000);
}

function resetearFormulario() {
    formulario.reset();

    iniciarApp();
}














