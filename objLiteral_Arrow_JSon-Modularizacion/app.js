const v = "\x1b[32m%s\x1b[0m"; // NO TOCAR
const o = "*".repeat(80) + "\n"; // NO TOCAR
const oo = "*".repeat(25); // NO TOCAR

/*******************************/
/* Desarrollo de las consignas */
/*******************************/

const archivos = require("./jsonHelper");
let bicicletas = archivos.leerJson('bicicletas');

// A Crear un objeto literal que represente la aplicación.

let carrera = {
// B Agregar una propiedad llamada bicicletas en la que asignarás las bicicletas obtenidas a partir del método leer del objeto requerido como módulo 
    bicicletas,

// C Agregar una propiedad llamada bicicletasPorTanda que contenga el valor 4.
    bicicletasPorTanda: 4,
// D Agregar un método ciclistasHabilitados que devuelva una lista donde los ciclistas tengan un dopaje negativo.
    ciclistasHabilitados : function(){
       return this.bicicletas.filter(ciclista => !ciclista.dopaje);
    },
// E  Agregar un método listarBicicletas que reciba como parámetro un array e imprima el listado
    listarBicicletas: function (array) {
        array.forEach(bici => {
            console.log(`Ciclista:${bici.ciclista}, marca:${bici.marca}, rodado: ${bici.rodado}, peso:${bici.peso} kg, largo:${bici.largo} cm, estado:${bici.dopaje ? 'inhabilitado':'habilitado'}.`);
        });
    },
// F gregar un método buscarPorId que permita buscar un ciclista en función de su id.
    buscarPorId: function (id) {
        return this.bicicletas.find(bici => bici.id === id)
    },
// G gregar un método filtrarPorPeso que permita filtrar los ciclistas habilitados, siempre y cuando su peso sea menor o igual al enviado como argumento.
    filtrarPorPeso: function (kilos) {
        let aptos = this.ciclistasHabilitados()
        return aptos.filter(ciclista => ciclista.peso <= kilos) //&& (ciclista.dopaje === false)))
    },
// H Agregar un método ordenarPorRodado que ordene las bicicletas de menor a mayor según su rodado.
    ordenarPorRodado: function () {
        return this.bicicletas.sort((a,b) => a.rodado - b.rodado)
    },

// H2 ordenar por odern alfabetico los ciclistas
    ordenarPorApellido : function () {
        return console.table(this.bicicletas.sort((a,b) => a.ciclista > b.ciclista ? 1 : a.ciclista < b.ciclista? -1 : 0))
       
    },
   
// I Agregar un método largoPromedio que permita saber el largo promedio de todas las bicicletas.
    largoPromedio: function () {
        let promedio = this.bicicletas.reduce(((acumul, bici) => acumul + bici.largo),0)/this.bicicletas.length;
        return `el largo promedio es ${promedio}`;
    },
// J Agregar un método aumentarPeso, el cual deberá aumentar el peso de una bicicleta y guardar los cambios en la base de datos.
    aumentarPeso: function (kg, id) {
        let biciAumentar = this.buscarPorId(id);
        biciAumentar ? biciAumentar.peso += kg : undefined;
        archivos.escribirJson('bicicletas', this.bicicletas);
        return biciAumentar
    },
// K Agregar un método generarTanda que retorne un array de ciclistas, que cumplan con las siguientes condiciones:
    generarTanda: function (rodad, kg) {
        return this.bicicletas.filter(bici =>(!bici.dopaje)&&(bici.rodado<=rodad)&&(bici.peso>=kg)).slice(0,this.bicicletasPorTanda)
    },
// L Agregar un método que permita calcularPodio, el mismo deberá calcular al ganador y los siguientes dos puestos en función de su puntaje
    calcularPodio: function(array) {
        let podio = array.sort((a,b)=> b.puntaje -a.puntaje).slice(0,3);
        console.log(`El ganador es ${podio[0].ciclista} con un puntaje de ${podio[0].puntaje}`);
        console.log(`El segundo puesto es para ${podio[1].ciclista} con un puntaje de ${podio[1].puntaje}`);
        console.log(`El tercer puesto es para ${podio[2].ciclista} con un puntaje de ${podio[2].puntaje}`);
        
    },
// M Modificar podio. Se descalifica al tercero y lo reemplaza el cuarto
    modificarPodio: function() {
        let tanda = this.generarTanda(26,7).sort((a,b)=> b.puntaje -a.puntaje);
        console.table(tanda);
        let cuarto = tanda[3]
        let podio = tanda.splice(0,3)
        podio.splice(2, 1, cuarto)
        console.table(podio);
    },
    // modificarPeso: function () {
    //     let nuevoEstado = this.bicicletas.map(bici =>(
    //         {
    //         id: bici.id,
    //         ciclista: bici.ciclista,
    //         puntaje: bici.puntaje,
    //         marca: bici.marca,
    //         rodado: bici.rodado,
    //         peso: Math.round(bici.peso),
    //         largo: bici.largo,
    //         dopaje: !bici.dopaje
    //         }
    //     ));
    //     archivos.escribirJson('bicicletas', nuevoEstado);
    //     return nuevoEstado;
    // },
    modificarLargo: function () {
        let nuevoEstado = this.bicicletas;
        nuevoEstado.map(bici => bici.largo = Math.round(bici.largo))
        archivos.escribirJson('bicicletas', nuevoEstado);
        return nuevoEstado;
    },
   

}
/******************************/
/* Ejecución de las consignas */
/******************************/

console.log(v, "\n" + oo + " .D. ");
console.table(carrera.ciclistasHabilitados());
console.log(o);

console.log(v, oo + " .E.");
carrera.listarBicicletas(carrera.bicicletas);
console.log(o);

console.log(v, oo + " .F.");
console.table(carrera.buscarPorId(10));
console.log(o);

console.log(v, oo + " .G.");
carrera.listarBicicletas(carrera.filtrarPorPeso(10));
console.log(o);

console.log(v, oo + " .H.");
console.table(carrera.ordenarPorRodado());
carrera.ordenarPorApellido();
console.log(o);

console.log(v, oo + " .I.");
console.log(carrera.largoPromedio());
console.log(o);

console.log(v, oo + " .J. ");
console.table(carrera.aumentarPeso(300, 3));
console.log(o);

console.log(v, oo + " .K. ");
console.table(carrera.generarTanda(26, 7))
console.log(o);

console.log(v, oo + " .L. ");
carrera.calcularPodio(carrera.generarTanda(26, 7));
console.log(o);

carrera.modificarPodio();

console.table(carrera.modificarLargo());