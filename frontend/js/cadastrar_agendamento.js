const token = localStorage.getItem('token')

if (!token) {
    location.href = '../index.html'
}

const resposta = document.getElementById('resposta')
const btn_cadastrar = document.getElementById('btn_cadastrar')

btn_cadastrar.addEventListener('click', (e)=>{
    e.preventDefault()

    const data = document.getElementById('data').value
    const hora = document.getElementById('hora').value
    const tipoServico = document.getElementById('tipoServico').value
    const idCliente = document.getElementById('idCliente').value
    const idConsole = document.getElementById('idConsole').value

    const valores = {
        data: data,
        hora: hora,
        tipoServico: tipoServico,
        idCliente: idCliente,
        idConsole: idConsole
    }

    fetch(`http://localhost:3000/agendamento`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(valores)

    })

    .then(res => res.json())
    .then(dados =>{
        resposta.innerHTML = ''
        resposta.innerHTML += `${dados.message}`
    })

    .catch((err)=>{
        console.error('Erro ao cadastrar agendamento',err)

    })

})
