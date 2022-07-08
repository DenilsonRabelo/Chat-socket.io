const express = require('express')
const router = express()
const path = require('path')
const http = require('http')
const servidor = http.createServer(router)
const socket = require('socket.io')
const io = socket(servidor)
const formatacao = require('./addons/js/formatacao.js')
const {bdUsuarios, getUsuario, saida, getSalas} = require('./addons/js/usuarios')


router.use(express.static(path.join(__dirname, 'addons')))

io.on('connection', socket => {
    socket.on('entrar', ({nome, sala}) => {
        const usuario = bdUsuarios(socket.id, nome, sala)
        socket.join(usuario.sala)
        socket.emit('message',formatacao('ADM', `Bem-vindo ${nome}`))
        socket.broadcast.to(usuario.sala).emit('message', formatacao('ADM',`${usuario.nome} conectou-se ao chat`))
        io.to(usuario.sala).emit('nome', {
            sala: usuario.sala,
            nome: getSalas(usuario.sala)
        })
    })
    
    
    socket.on('disconnect', () => {
        const usuario = saida(socket.id)
        if (usuario){
            io.to(usuario.sala).emit('popupDisconect', formatacao(usuario.nome,`O ${usuario.nome} sé desconectou`))
        }

        io.to(usuario.sala).emit('nome', {
            sala: usuario.sala,
            nome: getSalas(usuario.sala)
        })
    })



    socket.on('enviarChat', msg => {
        const usuario = getUsuario(socket.id);
        socket.emit('message1', formatacao(usuario.nome, msg))
        socket.broadcast.to(usuario.sala).emit('message', formatacao(usuario.nome , msg))
    });

})

servidor.listen(process.env.PORT || 3000, () => {
    console.log("rodando")
})

