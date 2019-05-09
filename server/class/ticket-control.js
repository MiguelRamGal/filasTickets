const fs = require('fs')

//CLASE PARA CONTROLAR LOS TICKETS
class Ticket{
    
    constructor(numero, escritorio){
        this.numero = numero;
        this.escritorio = escritorio;
    }
    
}

class TicketControl {

    constructor() {
        
        this.ultimo = 0;
        this.hoy = new Date().getDate();
        let data = require('../data/data.json'); //IMPORTO MI ARCHIVO JSON
        this.tickets = [];
        this.ultimos4 = [];

        if( data.hoy === this.hoy){
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimos4 = data.ultimos4;
        }else{
            this.reiniciarConteo();
        }

    }

    //FUNCION PARA CREAR EL SIGUIENTE TICKET
    siguiente(){
        this.ultimo += 1;
        let ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket);

        this.grabarArchivo();        

        return `Ticket ${this.ultimo}`
    }

    //FUNCION PARA OBTER LOS DATOS ACUTALES
    getUltimoTicket(){
        return `Ticket ${this.ultimo}`
    }

    //FUNCION PARA OBTEER LOS DATOS ACUTALES
    getUltimos4(){
        return this.ultimos4
    }

    //FUNCION PARA ATENDER TICKET
    atenderTicket(escritorio){
        if( this.tickets.length === 0 ){
            return "No hay tickets";
        }else{
            let numeroTicket = this.tickets[0].numero;
            this.tickets.shift(); //DES ESTA FORMA ELIMINO EL PRIMER PARAMETRO

            let atenderTicket = new Ticket(numeroTicket, escritorio)
            this.ultimos4.unshift( atenderTicket );//UNSHIFT SIRVE PARA PONER UN VALOR AL INICIO DE UNA ARREGLO

            if(this.ultimos4.length > 4){
                this.ultimos4.splice(-1,1);//ESTO ME AYUDA A ELIMINAR LA ULTIMA POSICION DEL ARREGLO
            }

            this.grabarArchivo();

            return atenderTicket;
        }
    }

    //FUNCION PARA REINCIAR EL CONTEO
    reiniciarConteo(){
        this.ultimo = 0;
        this.grabarArchivo();
        this.tickets = [];
        this.ultimos4 = [];
    }


    //FUNCION PARA GRABAR EN EL ARCHIVO
    grabarArchivo(){
         //CREO MI OBJETO
         let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4
        };
        let jsonDataString = JSON.stringify(jsonData);

        //ALMACENO LAS VARIABLES EN MI ARCHIVO DE TEXTO
        fs.writeFileSync('./server/data/data.json', jsonDataString)
    }
}


module.exports = {
    TicketControl
}