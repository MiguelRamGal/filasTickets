var socket = io();

var lblTickets = [
    $("#lblTicket1"),
    $("#lblTicket2"),
    $("#lblTicket3"),
    $("#lblTicket4")
];

var lblEscriotorios = [
    $("#lblEscritorio1"),
    $("#lblEscritorio2"),
    $("#lblEscritorio3"),
    $("#lblEscritorio4")
];

socket.on('estatdoActual', function(data) {
    actualizaHtml(data.ultimos4)
})

socket.on('ultimos4', function (data){
    //REPRODUSCO UN AUDIO
    var audio = new Audio('audio/new-ticket.mp3');
    audio.play();
    actualizaHtml(data.ultimos4)
})

function actualizaHtml ( ultimos4 ){
    for(var i = 0; i <= ultimos4.length -1; i++){
        lblTickets[i].text('Ticket ' + ultimos4[i].numero);
        lblEscriotorios[i].text('Escritorio ' + ultimos4[i].escritorio);
    }
}