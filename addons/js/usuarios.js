const usuarios = []

function bdUsuarios (identificacao, nome, sala){
    const usuario = {identificacao, nome, sala}
    usuarios.push(usuario)
    return usuario
}



function getUsuario(identificacao) {
    return usuarios.find(user => user.identificacao === identificacao);
}

function saida(identificacao) {
    const index = usuarios.findIndex(usuarios => usuarios.identificacao === identificacao);
    
    if (index !== -1) {
      return usuarios.splice(index, 1)[0];
    }
}

function getSalas(sala) {
    return usuarios.filter(user => user.sala === sala);
}

module.exports = {bdUsuarios,getUsuario, saida, getSalas}

