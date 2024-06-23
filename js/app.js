//Ejecutar una vez que todo el codigo ya haya ejecutado
document.addEventListener('DOMContentLoaded', function () {
    //Cargar las funciones
    LoadFunctions();
})

//Creamos un objeto
const variables = {
    email: '',
    asunto: '',
    mensaje: ''
}

//Seleccionar los elementos de la interfaz
const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');
const destinario = document.querySelector('#destinario');
const btnSubmit = document.querySelector('#formulario button[type="submit"]');
const btnReset = document.querySelector('#formulario button[type="reset"]');
const formulario = document.querySelector('#formulario');
const spiner = document.querySelector('#spiner');

//Traer todas las funciones
function LoadFunctions() {
    //Blur -> luego de salirse del input
    email.addEventListener('blur', ValidateMessage);
    destinario.addEventListener('input', validateRecipient);
    asunto.addEventListener('blur', ValidateMessage);
    mensaje.addEventListener('blur', ValidateMessage);
    btnSubmit.addEventListener('click', showEspiner)
    btnReset.addEventListener('click', e => {
        e.preventDefault();
        resetForm();
    });
}

//Validar en caso haya un destinario
const validateRecipient = (e => {
    if (e.target.value != '') {
        if(!ValidateEmail(e.target.value)){
            ShowAlert(`Destinatario inconrrecto`, e.target.parentElement);
            e.target.name = '';
            return;
        }
        //Asigna a destonario
        e.target.name = e.target.value.trim().toLowerCase();
        
        cleanAlert(e.target.parentElement);
    }
});

//Validar Mensaje
const ValidateMessage = (e => {
    //Evaluar si el value está vacío
    if (e.target.value.trim() === '') {
        //id = para que traiga el nombre - //Target trae toda la informacion de lo que estamos seleccionando
        //parentElement -> retrocede al padre
        ShowAlert(`El campo ${e.target.id} es obligatorio`, e.target.parentElement);
        //Reiniciamos
        variables[e.target.name] = '';
        //Comprobar en caso fallen las validaciones
        CheckFields();
        return;
    }

    //Si es de id email y no se cumple el id -> muestra mensaje
    if (e.target.id === 'email' && !ValidateEmail(e.target.value)) {
        //Mostrar mensaje de alerta luego de ir al padre del evento donde se está disparando
        ShowAlert(`Email inconrrecto`, e.target.parentElement);
        //Reiniciamos
        variables[e.target.name] = '';
        //Comprobar en caso fallen las validaciones
        CheckFields();
        return;
    }

    //Eliminar la alerta en caso todo este correcto
    cleanAlert(e.target.parentElement);

    //Asignar los valores
    variables[e.target.name] = e.target.value.trim().toLowerCase();

    //Comprobar los campos
    CheckFields();
});

//Crear Alerta y mostrarla
const ShowAlert = ((mensaje, muestra) => {
    cleanAlert(muestra);
    //Crear el párrafo
    const parrafo = document.createElement('p');
    parrafo.textContent = mensaje;
    parrafo.classList.add('bg-red-600', 'text-center', 'text-white', 'font-bold', 'px-3', 'py-2', 'alerta');
    //Agregar en el formulario
    muestra.appendChild(parrafo);
});

//Funcion limpiar
const cleanAlert = ((referencia) => {
    //Comprobar si la alerta existe 
    const alerta = referencia.querySelector('.alerta');
    if (alerta) {
        alerta.remove();
    }
})

//Funcion de Validar email
const ValidateEmail = (email => {
    //Creamos la constante regex
    const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    //Test -> retorna true o false
    const resultado = regex.test(email);
    return resultado;
});

//Funcion comprobar campos
const CheckFields = (() => {
    console.log(variables)
    //traer el lado derecho del objeto - //includes -> verifica si hay un string vacío retorna true o false
    if (!Object.values(variables).includes('')) {
        btnSubmit.classList.remove('opacity-50');
        btnSubmit.disabled = false;
        return;
    } else {
        btnSubmit.classList.add('opacity-50');
        btnSubmit.disabled = true;
        return;
    }
});

//Mostrar espiner
const showEspiner = (e => {
    e.preventDefault();
    spiner.classList.remove('hidden');
    //Después de 3 segundos
    setTimeout(() => {
        spiner.classList.add('hidden');
        resetForm();
        const alerta = document.createElement('P');
        alerta.textContent = 'Entrega exitosa';
        alerta.classList.add('bg-green-500', 'text-center', 'text-white', 'font-bold', 'px-3', 'py-2', 'rounded-lg');
        formulario.appendChild(alerta);
        //Después de 2sg eliminar
        setTimeout(() => {
            alerta.remove();
        }, 2000);
    }, 3000)
});

//Funcion resetar form
const resetForm = () => {
        variables.email = '';
        variables.asunto = '';
        variables.mensaje = ''; 

    //Reinicia formulario
    formulario.reset();
    //Comprueba los campos
    CheckFields();
}