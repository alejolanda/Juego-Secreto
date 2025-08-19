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
