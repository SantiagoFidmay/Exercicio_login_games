const token = localStorage.getItem('token')

if(!token){
    location.href = '../index.html'
}

const resposta_consultID = document.getElementById('resposta_consultID')
const btn_consultarID = document.getElementById('btn_consultarID')

btn_consultarID.addEventListener('click', async(e)=>{
    e.preventDefault()

    const id = document.getElementById('id').value

    try {
        
        const res = await fetch(`http://localhost:3000/console/${id}`,{
        headers: {'Authorization': token}
    })

        const dados = await res.json()

        if(!dados || dados.message){
            return resposta_consultID.innerHTML = `<p>${dados.message || 'Cliente não encontrado!'}</p>`
        }

        resposta_consultID.innerHTML = `
        
        <table>
            <thead>
                <tr>
                    <th>Código</th>
                    <th>Modelo</th>
                    <th>Marca</th>
                    <th>Número de série</th>
                    <th>Tipo</th>
                    <th>Código do cliente</th>
                </tr>
            </thead>

            <tbody>
                <tr>
                    <td>${dados.codigo_console}</td>
                    <td>${dados.modelo}</td>
                    <td>${dados.marca}</td>
                    <td>${dados.numeroSerie}</td>
                    <td>${dados.tipo}</td>
                    <td>${dados.idCliente}</td>
                </tr>
            </tbody>
        </table>

        `

    } catch (err) {
        console.error('Erro ao consultar o console', err)
        resposta_consultID.innerHTML = '<p>Erro ao consultar o console!</p>'
    }
})