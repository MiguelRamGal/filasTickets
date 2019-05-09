const { io } = require('../server');
const { TicketControl } = require('../class/ticket-control')

//Inicializo mi Ticket Control
const ticketControl = new TicketControl()

io.on('connection', (client) => {

    //EMITO UN EVENTO CON LA INFORMACION ACTUAL
    client.emit('estatdoActual',{
       actual: ticketControl.getUltimoTicket(),
       ultimos4: ticketControl.getUltimos4()
    })    

    //ESCUCHA PARA EL EVENTO DE siguienteTicket
    client.on('siguienteTicket', (data, callback) => {
        let siguienteTicket = ticketControl.siguiente()
        //REGRESO EN MI CALLBAK EL RESULTADO DEL NUEVO TICKET
        callback(siguienteTicket)
    });

    //ESCUCHA PARA ATENDER EL TICKET
    client.on('atenderTicket', (data, callback) => {
        
        if( !data.escritorio ){
            return callback({
                err: true,
                mensaje: "El escritorio es necesario"
            })
        }

        let atenderTicket = ticketControl.atenderTicket( data.escritorio );
        callback(atenderTicket);

        //ACTUALIZACION DE LA PANTALLA DONDE MUESTRA LOS ULTIMOS 4
        client.broadcast.emit('ultimos4', {
            ultimos4: ticketControl.getUltimos4()
        })

    })


});