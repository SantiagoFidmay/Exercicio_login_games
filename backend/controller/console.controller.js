const Console = require('../models/Console')

const cryptoJs = require('crypto-js')
const CHAVE_SECRETA = 'segredo'


// ======= CONSOLE ======
const cadastrarConsole = async (req, res) => {
    const valores = req.body

    if (!valores.modelo || !valores.marca || !valores.numeroSerie || !valores.tipo || !valores.idCliente) {
        return res.status(400).json({message: "Todos os campos são obrigatórios!"})
    }

    try {
        const numCripto = cryptoJs.AES.encrypt(
            valores.numeroSerie,
            CHAVE_SECRETA
        ).toString()

        const novoConsole = await Console.create({
            modelo: valores.modelo,
            marca: valores.marca,
            numeroSerie: numCripto,
            tipo: valores.tipo,
            idCliente: valores.idCliente
        })

        return res.status(201).json({
            message: 'Console cadastrado!',
            codigo_console: novoConsole.codConsole
        })

    } catch (err) {
        console.error('Erro ao cadastrar console!', err)
        return res.status(500).json({message: 'Erro ao cadastrar console!'})
    }
}


// ======= CONSULTAR CONSOLE POR ID ======
const consultarNome = async (req, res) => {
    const id = req.params.id

    try {
        const consoleEncontrado = await Console.findByPk(id)

        if (!consoleEncontrado) {
            return res.status(404).json({message: 'Console não encontrado!'})
        }

        const bytes = cryptoJs.AES.decrypt(
            consoleEncontrado.numeroSerie,
            CHAVE_SECRETA
        )

        const numDescriptografado = bytes.toString(cryptoJs.enc.Utf8)

        return res.status(200).json({
            codigo_console: consoleEncontrado.codConsole,
            modelo: consoleEncontrado.modelo,
            marca: consoleEncontrado.marca,
            numeroSerie: numDescriptografado,
            tipo: consoleEncontrado.tipo,
            idCliente: consoleEncontrado.idCliente
        })

    } catch (err) {
        console.error('Erro ao consultar console!', err)
        return res.status(500).json({message: 'Erro ao consultar console!'})
    }
}


// ======= LISTAR CONSOLES ======
const listarConsoles = async (req, res) => {
    try {
        const consoles = await Console.findAll()
        let resultado = []

        consoles.forEach((el) => {
            const bytes = cryptoJs.AES.decrypt(
                el.numeroSerie,
                CHAVE_SECRETA
            )

            const numDescriptografado = bytes.toString(cryptoJs.enc.Utf8)

            resultado.push({
                codigo_console: el.codConsole,
                modelo: el.modelo,
                marca: el.marca,
                numeroSerie: numDescriptografado,
                tipo: el.tipo,
                idCliente: el.idCliente
            })
        })

        return res.status(200).json(resultado)

    } catch (err) {
        console.error('Erro ao listar consoles!', err)
        return res.status(500).json({message: 'Erro ao listar consoles!'})
    }
}


module.exports = {
    cadastrarConsole,
    consultarNome,
    listarConsoles
}