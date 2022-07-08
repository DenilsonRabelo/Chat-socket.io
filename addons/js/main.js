const form = document.getElementById('form-mensagem')
const scrollMsg = document.querySelector('.mensagens')
const nSala = document.getElementById('nome-sala');
const listaDeUsuarios = document.getElementById('usuarios');

const { nome, sala } = Qs.parse(location.search, {
    ignoreQueryPrefix: true,
})

const socket = io();

socket.on('nome', ({ sala, nome }) => {
    nomeSala(sala);
    usu(nome)
});


function nomeSala(sala) {
    nSala.innerText = sala;
}



socket.emit('entrar', { nome, sala })


socket.on('popupDisconect', message => {
    poupDisconect(message)
    scrollMsg.scrollTop = scrollMsg.scrollHeight
    new Audio('../sons/receber.mp3').play()
})



socket.on('message', message => {
    exibirMensagem(message)
    scrollMsg.scrollTop = scrollMsg.scrollHeight
    new Audio('../sons/receber.mp3').play()
})

socket.on('message1', message => {
    exibirMensagem1(message)
    scrollMsg.scrollTop = scrollMsg.scrollHeight
})

form.addEventListener('submit', (form) => {
    form.preventDefault()
    let mensagem = form.target.elements.msg.value
    mensagem = mensagem.trim()
    if (!mensagem) {
        return false;
    }
    socket.emit('enviarChat', mensagem)
    form.target.elements.msg.value = '';
    form.target.elements.msg.focus()
    new Audio('../sons/enviar.mp3').play()
})


function poupDisconect(mensagem) {
    const div = document.createElement('div')
    div.classList.add('popup')
    div.classList.add('show')
    div.innerHTML = `
        <span class="popupMsg">O usuario ${mensagem.nome} sé desconectou</span>
        <div class="close-btn">
            <span class="fas fa-times"></span>
        </div>
    `
    document.querySelector('.alert').appendChild(div)
}


function exibirMensagem(mensagem) {
    const div = document.createElement('div')
    div.classList.add('mensagem')
    div.innerHTML = `<p class='infos'>${mensagem.nome}</p>
        <p class='texto-mensagem'>${mensagem.mensagem}</p>
        <span class='tempo'> ${mensagem.tempo} </span>
    `
    document.querySelector('.mensagens').appendChild(div)
}

function exibirMensagem1(mensagem) {
    const div = document.createElement('div')
    div.classList.add('mensagem1')
    div.innerHTML = `<p class='infos'>${mensagem.nome}</p>
        <p class='texto-mensagem'>${mensagem.mensagem}</p>
        <span class='tempo'> ${mensagem.tempo} </span>
    `
    document.querySelector('.mensagens').appendChild(div)
}



function usu(usuario) {
    document.querySelector('#usuarios').innerHTML = ""
    for (a in usuario) {
        const div = document.createElement('li');
        div.classList.add('message');
        div.innerText = usuario[a].nome
        document.querySelector('#usuarios').appendChild(div);
    }
}


document.getElementById('sair').addEventListener('click', () => {
    const sair = confirm('Você deseja realmente sair');
    if (sair) {
        window.location = '../index.html';
    } else {
    }
});


$(document).on('click', '.fas', function() {
    const div = document.querySelector('.show')
    div.classList.replace('show', 'hiden');
    setTimeout(() => {
        div.parentNode.removeChild(div)
    }, 1000)
});







