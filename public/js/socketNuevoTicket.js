var socket = io();
var labelTicketNuevo = $("#lblNuevoTicket")

socket.on("connect", function(){
    console.log("Servidor conectado")
})

socket.on('disconnect', function(){
    console.log("Se perdió la conección con el servidor")
})

socket.on('estatdoActual', function(response){
    labelTicketNuevo.text(response.actual)
})

$('button').on('click', function(){

    socket.emit('siguienteTicket',{}, function(siguienteTicket){
        labelTicketNuevo.text(siguienteTicket)
    });

})