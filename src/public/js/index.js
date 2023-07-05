const socketClient = io()

socketClient.on('saludoDesdeBack', (message)=>{
    console.log(message)
})

