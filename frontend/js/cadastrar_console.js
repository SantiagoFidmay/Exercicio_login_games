const token = localStorage.getItem('token')

if (!token) {
    location.href = '../index.html'
}

const resposta = document.getElementById('resposta')
const btn_cadastrar = document.getElementById('btn_cadastrar')

btn_cadastrar.addEventListener('click', (e) => {
    e.preventDefault()

    const modelo = document.getElementById('modelo').value
    const marca = document.getElementById('marca').value
    const numeroSerie = document.getElementById('numeroSerie').value
    const tipo = document.getElementById('tipo').value
    const idCliente = Number(document.getElementById('idCliente').value)

    if (!modelo || !marca || !numeroSerie || !tipo || !idCliente) {
        resposta.textContent = 'Todos os campos são obrigatórios!'
        return
    }

    const valores = {
        modelo: modelo,
        marca: marca,
        numeroSerie: numeroSerie,
        tipo: tipo,
        idCliente: idCliente
    }

    console.log('Dados enviados:', valores)

    fetch('http://localhost:3000/console', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(valores)
    })
    .then(async res => {
        const dados = await res.json()

        console.log('Status:', res.status)
        console.log('Resposta:', dados)

        if (!res.ok) {
            throw new Error(dados.message || 'Erro ao cadastrar console!')
        }

        return dados
    })
    .then(dados => {
        resposta.textContent = dados.message || 'Console cadastrado com sucesso!'
        document.querySelector('form').reset()
    })
    .catch(err => {
        console.error('Erro ao cadastrar console:', err)
        resposta.textContent = err.message
    })
})