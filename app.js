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

