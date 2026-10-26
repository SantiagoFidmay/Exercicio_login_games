const token = localStorage.getItem('token')

if(!token){
    location.href = '../index.html'
}

const resposta = document.getElementById('resposta')
const btn_atualizar = document.getElementById('btn_atualizar')

btn_atualizar.addEventListener('click', async (e) => {
    e.preventDefault()

    const codAgendamento = Number(document.getElementById('codAgendamento').value)
    const data = document.getElementById('data').value
    const hora = document.getElementById('hora').value
    const tipoServico = document.getElementById('tipoServico').value
    const idCliente = document.getElementById('idCliente').value
    const idConsole = document.getElementById('idConsole').value

    if(!codAgendamento){
        resposta.innerHTML = '<p>Por favor, informe o Código do Agendamento!</p>'
        return
    }

    const agendamentoAtualizado = {
        data: data,
        hora: hora,
        tipoServico: tipoServico,
        idCliente: idCliente,
        idConsole: idConsole
    }

    try {
        const res = await fetch(`http://localhost:3000/agendamento/${codAgendamento}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json', 'Authorization': token},
            body: JSON.stringify(agendamentoAtualizado)
        })

        const dados = await res.json()

        if (dados.message) {
            resposta.innerHTML = `<p>${dados.message}</p>`
            return
        }

        resposta.innerHTML = `
        <table>
            <thead>
                <tr>
                    <th>Código</th>
                    <th>Data</th>
                    <th>Hora</th>
                    <th>Tipo de serviço</th>
                    <th>Código do cliente</th>
                    <th>Código do console</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>${dados.codAgendamento}</td>
                    <td>${dados.data}</td>
                    <td>${dados.hora}</td>
                    <td>${dados.tipoServico}</td>
                    <td>${dados.idCliente}</td>
                    <td>${dados.idConsole}</td>
                </tr>
            </tbody>
        </table>
        `

        document.querySelector('form').reset()

    } catch (err) {
        console.error('Erro ao atualizar os dados', err)
        resposta.innerHTML = '<p>Erro ao tentar atualizar o agendamento.</p>'
    }
})
