let numeroSecreto = 0;
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