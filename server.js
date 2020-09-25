const io = require('socket.io')()
const rooms = {

}

io.on('connection', client => {
    client.on('createRoom', (room) => {
        client.room = room
        if (rooms[room]) {
            client.emit('create failed')
        } else {
            rooms[room] = []
            client.join(room)
            rooms[room].push(client)
        }
        console.log(room ,rooms[room].length)
    })
    client.on('joinRoom', (room) => {
        client.room = room
        if (rooms[room]) {
            client.join(room)
            rooms[room].push(client)
        } else {
            client.emit('joinFailed')
        }
        console.log(room ,rooms[room].length)
    })

    client.on('uploaded', (url) => {
        rooms[client.room][0].emit('onUpload', url)
    })
    client.on('disconnect', () => {
        const room = client.room
        const index = rooms[room].findIndex((c) => {
            return c === client
        })
        rooms[room].splice(index, 1)
        if (rooms[room].length === 0) {
            delete rooms[room]
        }
        console.log('someone leave')
    })
})
io.on('disconnection', client => {
    console.log('leave')
})
io.listen(3000)
console.log('listen 3000')