var socket = io();

//VERIFICO QUE LA URL TENGO UN ESCRITORIO
var searchParams = new URLSearchParams( window.location.search );
if( !searchParams.has('escritorio') ){
    window.location = 'index.html';
    throw new Error ('El escritorio es necesario')
}

var escritorio = searchParams.get('escritorio')
$('h1').text('Escritorio ' + escritorio)


$('button').on('click', function(){

    socket.emit('atenderTicket', {escritorio: escritorio}, function( response ) {

        if(response === 'No hay tickets'){
            alert(response)
            $("small").text(response)
            return;
        }

        $("small").text('Ticket:' + response.numero)

    })
})