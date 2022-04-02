const tempo = require('moment')
function formatacao (nome, mensagem) {
    return {
        nome,
        mensagem,
        tempo: tempo().format('h:mm:ss a')
    }
}

module.exports = formatacao
