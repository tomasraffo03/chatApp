const mensajes = document.getElementById('caja-mensajes');
const msgForm = document.getElementById('msgForm');

const socket = io('http://localhost:3000');

if (!localStorage.getItem("nombre") || (localStorage.getItem("nombre") == '')) {
    let username = prompt("Nombre?");
    while (username.length < 1) {
        username = prompt("Nombre?");
    }
    localStorage.setItem("nombre", username);
}

socket.on('message', data => {
    console.log(data);
    agregarMensaje(data);
});

msgForm.addEventListener('submit', e => {
    e.preventDefault();
    socket.emit('send-chat-message', {message: msgForm.msg.value, name: localStorage.getItem("nombre")});
    msgForm.msg.value = "";
})

function agregarMensaje (mensaje) {
    let div = document.createElement('div');
    div.classList.add('mensaje');
    
    if (localStorage.getItem("nombre") == mensaje.name) {
        div.classList.add('enviado');
    } else {
        div.classList.add('recibido');
    }
    
    

    let nombre = document.createElement('p');
    let data = document.createElement('p');

    nombre.innerHTML = mensaje.name;
    nombre.classList.add('nombre');
    data.innerHTML = mensaje.message;
    data.classList.add('data');

    div.appendChild(nombre);
    div.appendChild(data);
    mensajes.appendChild(div);

    mensajes.scrollTop = mensajes.scrollHeight;

}