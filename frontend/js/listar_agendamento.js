const token = localStorage.getItem('token')

if(!token){
    location.href = '../index.html'
}

const resposta = document.getElementById('resposta')
const btn_listar = document.getElementById('btn_listar')

btn_listar.addEventListener('click', async (e) => {
    e.preventDefault()

    try {
        const res = await fetch('http://localhost:3000/agendamentos', {
        headers: {'Authorization': token}
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
                    <th>Tipo de serviço</th>
                    <th>Código do cliente</th>
                    <th>Data</th>
                    <th>Hora</th>
                    <th>Código do console</th>
                </tr>
            </thead>

            <tbody>
                ${dados.map(el => `
                    <tr>
                        <td>${el.codAgendamento}</td>
                        <td>${el.tipoServico}</td>
                        <td>${el.idCliente}</td>
                        <td>${el.data}</td>
                        <td>${el.hora}</td>
                        <td>${el.idConsole}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
        `
    } catch (err) {
        console.error('Erro ao listar os agendamentos', err)
        resposta.innerHTML = '<p>Erro ao listar os agendamentos.</p>'
    }
})
