import express from 'express'
import http from 'http'
import cors from 'cors'
import { Server } from 'socket.io'

const app = express()
app.use(cors())

const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: "*"
  }
})

app.get('/', (req, res) => {
  res.status(200).json({ msg: 'eae men kk' })
})

io.on('connection', (socket) => {
  console.log('a user connected')

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })

  socket.on('chat message', (data) => {
    //quando recebe uma mensagem de chat, retransmite pra todo mundo
    io.emit('chat message', data);
    console.log('emit:', data)
  })

})

server.listen(3333)