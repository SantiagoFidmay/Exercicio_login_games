const Cliente = require('../models/Cliente')

const cryptoJs = require('crypto-js')
const CHAVE_SECRETA = 'segredo'



// ===== CLIENTE =====
const cadastrarCliente = async (req, res) => {
    const valores = req.body

    if(!valores.nome || !valores.email || !valores.senha || !valores.cpf || !valores.endereco || !valores.celular){
        return res.status(400).json({message: "Todos os campos são obrigatórios!"})
    }

    if(valores.cpf.length !== 11){
        return res.status(404).json({message: "Cpf inválido! Digite novamente!"})
    }

    try {

        const cpfCripto = cryptoJs.AES.encrypt(valores.cpf, CHAVE_SECRETA).toString()
        const senhaCripto = cryptoJs.AES.encrypt(valores.senha, CHAVE_SECRETA).toString()
        

        await Cliente.create({
            nome: valores.nome,
            email: valores.email,
            senha: senhaCripto, 
            cpf: cpfCripto,     
            endereco: valores.endereco,
            celular: valores.celular
        })
        return res.status(201).json({ message: 'Cliente cadastrado com sucesso!' })
    } catch (err) {
        return res.status(500).json({ message: 'Erro ao cadastrar cliente!' })
    }
}

const consultarID = async(req,res)=>{
    const id = req.params.id
    console.log(id)

    try {
        const cliente = await Cliente.findByPk(id)

        if(!cliente){
            return res.status(404).json({message: "Não foi possivel encontrar o cliente"})
        }

        const bytes = cryptoJs.AES.decrypt(cliente.cpf, CHAVE_SECRETA)
        cpfDescriptografados = bytes.toString(cryptoJs.enc.Utf8)

        return res.status(200).json({
            nome: cliente.nome,
            email: cliente.email,
            cpf: cpfDescriptografados,
            celular: cliente.celular
        })


    } catch (err) {
        console.error('Erro ao consultar por id')
        return res.status(500).json({ message: 'Erro ao cadastrar cliente!' })

    }

}

const listarClientes = async (req, res) => {

    try {
        const clientes = await Cliente.findAll()
        let resultado = []
        let cpfDescriptografados = ''

        clientes.forEach((el)=>{
            const bytes = cryptoJs.AES.decrypt(el.cpf, CHAVE_SECRETA)
            cpfDescriptografados = bytes.toString(cryptoJs.enc.Utf8)

            resultado.push({
                codigo_cliente: el.codCliente,
                nome: el.nome,
                email: el.email,
                senha: el.senha,
                cpf: el.cpf,
                endereco: el.endereco
                
            })
        })

        res.status(200).json(resultado)

    } catch (err) {
        return res.status(500).json({ message: 'Erro ao listar o cliente!' })

    }
}

const apagar = async(req,res)=>{
    const id = req.params.id
    console.log(id)

    try {
        const cliente = await Cliente.findByPk(id)
        if(!cliente){
            return res.status(404).json({message: "Não foi possivel encontrar o cliente"})
        }

        await Cliente.destroy({where: {codCliente: id}})
        return res.status(200).json({message: "Cliente não encontrado!"})

    } catch (err){
        console.error("'Erro ao listar o cliente!",err)
        return res.status(500).json({ message: 'Erro ao listar o cliente!' })

    }
}

const atualizar = async(req,res)=>{
    const id = req.params.id
    const valores = req.body

    if(!valores.nome || !valores.email || !valores.senha || !valores.cpf || !valores.endereco){
        return res.status(400).json({message: "Todos os campos são obrigatórios!"})
    }

    if(valores.cpf.length !== 11){
        return res.status(404).json({message: "Cpf inválido! Digite novamente!"})
    }

    try {

        let dados = await Cliente.findByPk(id)

        if(!dados){
            return res.status(404).json({message: "Não foi possivel encontrar o cliente"})
        
        }else{
            valores.cpf = cryptoJs.AES.encrypt(valores.cpf, CHAVE_SECRETA).toString()
            valores.senha = cryptoJs.AES.encrypt(valores.senha, CHAVE_SECRETA).toString()

            await Cliente.update(valores, {where: {codCliente: id}})
            dados = await Cliente.findByPk(id)

            const bytes = cryptoJs.AES.decrypt(dados.cpf, CHAVE_SECRETA)
            const cpfDescriptografados = bytes.toString(cryptoJs.enc.Utf8)

            return res.status(200).json({
                nome: dados.nome,
                email: dados.email,
                cpf: cpfDescriptografados,
                celular: dados.celular
            })
    
        }

    } catch (err) {
        console.error("'Erro ao atualizar o cliente!",err)
        return res.status(500).json({ message: 'Erro ao atualizar o cliente!' })
    }

}



module.exports = {cadastrarCliente,consultarID, listarClientes, apagar, atualizar}