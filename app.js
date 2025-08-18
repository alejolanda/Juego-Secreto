/*let numeroSecreto = 0;
let intentos = 0;
let listaNumerosSorteados = [];
let numeroMaximo = 10;
let vidas = 5;

// Elementos del DOM
const inputUsuario = document.getElementById('valorUsuario');
const botonIntentar = document.getElementById('intentar');
const botonReiniciar = document.getElementById('reiniciar');
const parrafo = document.querySelector('.texto__parrafo');

// Inicialización
function iniciarJuego() {
  // Configuración inicial
  const rango = parseInt(prompt("Rango máximo (ej: 10)\nDefault: 10")) || 10;
  const intentosPermitidos = parseInt(prompt("Intentos permitidos\nDefault: 5")) || 5;
  
  numeroMaximo = rango;
  vidas = intentosPermitidos;
  
  condicionesIniciales();
  configurarEventos();
}

function condicionesIniciales() {
  // Generar número único
  numeroSecreto = generarNumeroUnico();
  
  // Si no hay números disponibles
  if (numeroSecreto === null) {
    asignarTextoElemento('p', '¡Todos los números posibles ya fueron sorteados!');
    deshabilitarControles();
    return;
  }
  
  // Configurar UI (manteniendo tus frases exactas)
  asignarTextoElemento('h1', 'Número Secreto');
  asignarTextoElemento('p', `Adivina del 1 al ${numeroMaximo} (${vidas} intentos)`);
  
  intentos = 1;
  inputUsuario.disabled = false;
  botonIntentar.disabled = false;
  botonReiniciar.disabled = true;
  limpiarCaja();
}

function generarNumeroUnico() {
  // Si ya se sortearon todos los números
  if (listaNumerosSorteados.length >= numeroMaximo) {
    return null;
  }
  
  let numero;
  do {
    numero = Math.floor(Math.random() * numeroMaximo) + 1;
  } while (listaNumerosSorteados.includes(numero));
  
  listaNumerosSorteados.push(numero);
  return numero;
}

function verificaIntento() {
  const valor = inputUsuario.value.trim();
  
  // Validaciones
  if (!valor || isNaN(valor)) {
    asignarTextoElemento('p', 'Ingresa un número válido');
    return;
  }
  
  const numero = parseInt(valor);
  if (numero < 1 || numero > numeroMaximo) {
    asignarTextoElemento('p', `Debe ser entre 1 y ${numeroMaximo}`);
    return;
  }

  // Lógica del juego
  if (numero === numeroSecreto) {
    asignarTextoElemento('p', `¡Correcto! Acertaste en ${intentos} ${intentos === 1 ? 'intento' : 'intentos'}`);
    deshabilitarControles();
  } else {
    intentos++;
    if (intentos > vidas) {
      asignarTextoElemento('p', `¡Agotaste tus intentos! Era ${numeroSecreto}`);
      deshabilitarControles();
    } else {
      asignarTextoElemento('p', `El número es ${numero > numeroSecreto ? 'menor' : 'mayor'} (Intento ${intentos} de ${vidas})`);
      limpiarCaja();
    }
  }
}

function deshabilitarControles() {
  inputUsuario.disabled = true;
  botonIntentar.disabled = true;
  botonReiniciar.disabled = false;
}

function reiniciarJuego() {
  if (listaNumerosSorteados.length >= numeroMaximo) {
    if (confirm('¿Reiniciar con nuevos números?')) {
      listaNumerosSorteados = [];
    }
  }
  iniciarJuego();
}

// Funciones auxiliares
function asignarTextoElemento(elemento, texto) {
  const el = document.querySelector(elemento);
  if (el) el.textContent = texto;
}

function limpiarCaja() {
  inputUsuario.value = '';
  inputUsuario.focus();
}

// CORRECCIÓN DEL EVENTO ENTER
function configurarEventos() {
  inputUsuario.addEventListener('input', () => {
    inputUsuario.value = inputUsuario.value.replace(/[^0-9]/g, '');
  });
  
  // Evento keydown corregido para Enter
  inputUsuario.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Previene el comportamiento por defecto
      verificaIntento();
    }
  });
  
  botonIntentar.addEventListener('click', verificaIntento);
  botonReiniciar.addEventListener('click', reiniciarJuego);
}

// Iniciar al cargar
window.addEventListener('DOMContentLoaded', iniciarJuego);*/

// codigo mejorado para un juego de adivinanza de números secretos
// Este código permite a un usuario adivinar un número secreto generado aleatoriamente entre 1 y un número máximo definido.
// El usuario tiene múltiples intentos para adivinar el número correcto, y el juego proporciona retroalimentación sobre cada intento.  

let numeroSecreto = 0;
let intentos = 0;
let listaNumerosSorteados = [];
let rangoBusqueda = parseInt(prompt("Ingrese el rango máximo para el número secreto (por ejemplo, 10)\n(Si no Pone Nada Sera Hasta el Número 10):"));
let numeroMaximo = rangoBusqueda || 10; // Si el usuario no ingresa un valor, se usa 10 como valor predeterminado
let vidas = parseInt(prompt('Indique en Cuantos Intentos lo Puede Hacer\n(Si no Pone Nada Sera Hasta Terminar la Secuencia')); // Número de vidas o intentos permitidos

console.log(numeroSecreto);

function asignarTextoElemento(elemento, texto) {
    let elementoHtml = document.querySelector(elemento);
    elementoHtml.innerHTML = texto;
    return;
}

function verificaIntento() {
    let inputUsuario = document.getElementById('valorUsuario');
    let numeroDeUsuario = inputUsuario.value;
    
    // Validación de entrada /^[0-9]+$/ asegura que solo se acepten números enteros
    if (!/^[0-9]+$/.test(numeroDeUsuario)) {
        asignarTextoElemento('p', 'Por Favor Ingresa Solo Números Enteros');
        limpiarCaja();
        return;
    }
    
    numeroDeUsuario = parseInt(numeroDeUsuario);
    
    // Validación del rango del número ingresado, de forma clara
    if (numeroDeUsuario < 1 || numeroDeUsuario > numeroMaximo) {
        asignarTextoElemento('p', `El número debe estar entre 1 y ${numeroMaximo}`);
        limpiarCaja();
        return;
    }

    if (intentos >= vidas) {
        asignarTextoElemento('p', `Has agotado tus ${vidas} intentos. \n El número secreto era ${numeroSecreto}.`);
        document.getElementById('reiniciar').disabled = false;
        document.getElementById('intentar').disabled = true;
        return;
    }   

    if (numeroDeUsuario === numeroSecreto) {
        asignarTextoElemento('p', `Acertaste en ${intentos} ${(intentos === 1) ? 'vez' : 'veces'}, Felicitaciones!!!`);
        document.getElementById('reiniciar').disabled = false;
        document.getElementById('intentar').disabled = true;
    } else {
        if (numeroDeUsuario > numeroSecreto) {
            asignarTextoElemento('p', 'El número es Menor');
        } else {
            asignarTextoElemento('p', 'El número es Mayor');
        }
        intentos++;
        limpiarCaja();
    }
}

function limpiarCaja() {
    document.querySelector('#valorUsuario').value = '';
}

function generarNumeroSecreto() {
    let numeroGenerado = Math.floor(Math.random() * numeroMaximo) + 1;

    console.log(numeroGenerado);
    console.log(listaNumerosSorteados);

    if (listaNumerosSorteados.length >= numeroMaximo) {
        asignarTextoElemento('p', '¡Todos los números posibles ya fueron sorteados!');
        return null;
    } else {
        if (listaNumerosSorteados.includes(numeroGenerado)) {
            return generarNumeroSecreto();
        } else {
            listaNumerosSorteados.push(numeroGenerado);
            return numeroGenerado;
        }
    }
}

function condicionesInicales() {
    asignarTextoElemento('h1', 'Bienvenidos al Número Secreto del Cholo');
    asignarTextoElemento('p', `Selecciona un Número del 1 al ${numeroMaximo}`);
    numeroSecreto = generarNumeroSecreto();
    console.log(numeroSecreto);
    intentos = 1;
}

function reiniciarJuego() {
    limpiarCaja();
    condicionesInicales();
    document.getElementById('reiniciar').disabled = true;
    document.getElementById('intentar').disabled = false;
}

// Evento para prevenir la entrada de caracteres no numéricos
document.getElementById('valorUsuario').addEventListener('input', function(e) {
    this.value = this.value.replace(/[^0-9]/g, '');
});

condicionesInicales();


// Código para un juego de adivinanza de números secretos Original

/*let numeroSecreto = 0;
let intentos = 0;
let listaNumerosSorteados = [];
let numeroMaximo = 10;

console.log (numeroSecreto);

//console.log (`el numero secreto es: ${numeroSecreto}`);

function asignarTextoElemento(elemento, texto){
    let elementoHtml = document.querySelector(elemento);
    elementoHtml.innerHTML = texto;
    return;
}

function verificaIntento(){
    let numeroDeUsuario = parseInt(document.getElementById ('valorUsuario').value);
    //console.log (typeof(numeroSecreto));//typeof indica o retorna el valor del dato de retorno 
   
    if (numeroDeUsuario === numeroSecreto){
        asignarTextoElemento('p',  `Acertaste en ${intentos} ${(intentos === 1) ? 'vez' : 'veces'}, Felicitaciones!!!`);
        document.getElementById ('reiniciar').disabled = false;
        document.getElementById ('intentar').disabled = true;
        
    } else {
        //el usuario no acerto
       if (numeroDeUsuario > numeroSecreto){
        asignarTextoElemento ('p', 'El numero es Menor');
       }else  {
            asignarTextoElemento ('p', 'El numero es Mayor')
        } 
            intentos ++;
            limpiarCaja();
    }
    
    return;
}

function limpiarCaja() {
    document.querySelector ('#valorUsuario').value = '';
    
}

function generarNumeroSecreto() {
    let numeroGenerado = Math.floor(Math.random()*numeroMaximo)+1;

    console.log (numeroGenerado);
    console.log (listaNumerosSorteados);

    //El numero esta en la lista se hace una operacion sino la otra
     if (listaNumerosSorteados.length >=numeroMaximo){
            asignarTextoElemento('p', '¡Todos los numeros posibles ya fueron sorteados!');
            return null;
        }else{
            if (listaNumerosSorteados.includes(numeroGenerado)){
                return generarNumeroSecreto(); //recursividad
            }else{
                listaNumerosSorteados.push(numeroGenerado);
                return numeroGenerado;
            }
    }
}

function condicionesInicales(){
    asignarTextoElemento('h1', 'Bienvenidos al Numero Secreto');
    asignarTextoElemento('p', `Selecciona un Numero del 1 al ${numeroMaximo}`);
     // generar el numero aleatorio
    numeroSecreto = generarNumeroSecreto();
    console.log (numeroSecreto);
    // inicializar el numero de intentos
    intentos = 1;
}

function reiniciarJuego() {
    //limpiar la caja
    limpiarCaja();
    // indicar mensaje de inicio o Intervalos
    condicionesInicales();
    // generar el numero aleatorio
    // desabilitar el boton de nuevo juego
    document.getElementById ('reiniciar').disabled = true;
   // habilita el boton en el nuvo juego
    document.getElementById ('intentar').disabled = false;
}

condicionesInicales();


//asignarTextoElemento('h1', 'Bienvenidos al Numero Secreto');
//asignarTextoElemento('p', 'Selecciona un Numero del 1 al 10');
// Ctrl F para buscar lo queremos dentro del codigo

/* 
Para eliminar el último elemento, puedes usar el método pop.
frutas.pop();
console.log(frutas); // Salida: ["Manzana", "Uva", "Naranja"]

Para agregar un elemento al final del array, puedes usar el método push.
frutas.push("Fresa");
console.log(frutas); // Salida: ["Manzana", "Uva", "Naranja", "Fresa"]

Accediendo a los valores Los elementos de un array se acceden mediante índices numéricos, que comienzan en 0.

Índice	Elemento
0	"Manzana"
1	"Uva"
2	"Naranja"
console.log(frutas[0]); // Salida: "Manzana"
console.log(frutas[2]); // Salida: "Naranja"

*/