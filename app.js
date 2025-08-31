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
let rangoBusqueda = parseInt(prompt("Ingrese el rango máximo para el número secreto (por ejemplo, 10)\n(Si no ingresa nada será hasta el número 10):"));
let numeroMaximo = (!isNaN(rangoBusqueda) && rangoBusqueda > 0) ? rangoBusqueda : 10;
let vidasInput = parseInt(prompt('Indique en cuántos intentos puede adivinar\n(Si no ingresa nada tendrá intentos ilimitados)'));
let vidas = (!isNaN(vidasInput) && vidasInput > 0) ? vidasInput : numeroMaximo;

console.log(`Número máximo: ${numeroMaximo}, Vidas: ${vidas}`);

function asignarTextoElemento(elemento, texto) {
    let elementoHtml = document.querySelector(elemento);
    elementoHtml.innerHTML = texto;
    return;
}

function verificaIntento() {
    let inputUsuario = document.getElementById('valorUsuario');
    let numeroDeUsuario = inputUsuario.value;
    
    // Validación de entrada
    if (!/^[0-9]+$/.test(numeroDeUsuario)) {
        asignarTextoElemento('p', 'Por favor ingresa solo números enteros');
        limpiarCaja();
        return;
    }
    
    numeroDeUsuario = parseInt(numeroDeUsuario);
    
    // Validación del rango
    if (numeroDeUsuario < 1 || numeroDeUsuario > numeroMaximo) {
        asignarTextoElemento('p', `El número debe estar entre 1 y ${numeroMaximo}`);
        limpiarCaja();
        return;
    }

    if (intentos >= vidas) {
        asignarTextoElemento('p', `Has agotado tus ${vidas} intentos. \nEl número secreto era ${numeroSecreto}.`);
        deshabilitarJuego();
        return;
    }   

    if (numeroDeUsuario === numeroSecreto) {
        asignarTextoElemento('p', `¡Acertaste en ${intentos} ${(intentos === 1) ? 'intento' : 'intentos'}! Felicitaciones!!!`);
        deshabilitarJuego();
    } else {
        if (numeroDeUsuario > numeroSecreto) {
            asignarTextoElemento('p', `El número es menor. Te quedan ${vidas - intentos} intentos`);
        } else {
            asignarTextoElemento('p', `El número es mayor. Te quedan ${vidas - intentos} intentos`);
        }
        intentos++;
        limpiarCaja();
    }
}

function limpiarCaja() {
    document.querySelector('#valorUsuario').value = '';
}

function deshabilitarJuego() {
    document.getElementById('reiniciar').disabled = false;
    document.getElementById('intentar').disabled = true;
    document.getElementById('valorUsuario').disabled = true;
}

function generarNumeroSecreto() {
    if (listaNumerosSorteados.length >= numeroMaximo) {
        asignarTextoElemento('p', '¡Todos los números posibles ya fueron sorteados!');
        return null;
    }
    
    // Crear array de números disponibles
    let numerosDisponibles = [];
    for (let i = 1; i <= numeroMaximo; i++) {
        if (!listaNumerosSorteados.includes(i)) {
            numerosDisponibles.push(i);
        }
    }
    
    // Seleccionar aleatoriamente de los disponibles
    let indiceAleatorio = Math.floor(Math.random() * numerosDisponibles.length);
    let numeroGenerado = numerosDisponibles[indiceAleatorio];
    
    listaNumerosSorteados.push(numeroGenerado);
    return numeroGenerado;
}

function condicionesIniciales() {
    asignarTextoElemento('h1', 'Juego del número secreto');
    asignarTextoElemento('p', `Indica un número del 1 al ${numeroMaximo}. Tienes ${vidas} intentos.`);
    numeroSecreto = generarNumeroSecreto();
    console.log(`Número secreto: ${numeroSecreto}`);
    intentos = 1;
}

function reiniciarJuego() {
    limpiarCaja();
    condicionesIniciales();
    document.getElementById('reiniciar').disabled = true;
    document.getElementById('intentar').disabled = false;
    document.getElementById('valorUsuario').disabled = false;
}

// Evento para prevenir la entrada de caracteres no numéricos
document.getElementById('valorUsuario').addEventListener('input', function(e) {
    this.value = this.value.replace(/[^0-9]/g, '');
});

condicionesIniciales();

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