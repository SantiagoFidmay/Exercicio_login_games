let resposta = document.getElementById('resposta')
let btn_cadastrar = document.getElementById('btn_cadastrar')

btn_cadastrar.addEventListener('click', (e)=>{
    e.preventDefault()

    let nome = document.getElementById('nome').value
    let email = document.getElementById('email').value
    let senha = document.getElementById('senha').value
    let cpf = document.getElementById('cpf').value
    let endereco = document.getElementById('endereco').value
    let celular = document.getElementById('celular').value

    const valores = {
        nome: nome,
        email: email,
        senha: senha,
        cpf: cpf,
        endereco: endereco,
        celular: celular
    }

    fetch(`http://localhost:3000/cliente`,{
        method: 'POST',
        headers: {'Content-type':'application/json'},
        body: JSON.stringify(valores)
    })
    .then(res => res.json())
    .then(dados => {
        resposta.innerHTML = ``
        resposta.innerHTML += `${dados.message}`
    })
    .catch((err)=>{
        console.error('Erro ao cadastrar o cliente',err)
        resposta.innerHTML = 'Erro ao cadastrar o usuario'
    })

})