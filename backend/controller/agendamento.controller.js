const Agendamento = require('../models/Agendamento')

const cadastrarAgendamento = async(req,res)=>{
    const valores = req.body

    if(!valores.data || !valores.hora || !valores.tipoServico || !valores.idCliente || !valores.idConsole){
        return res.status(400).json({message: 'Todos os campos são obrigatórios!'})
    }

    try {
        await Agendamento.create({
            data: valores.data,
            hora: valores.hora,
            tipoServico: valores.tipoServico,
            idCliente: valores.idCliente,
            idConsole: valores.idConsole
        })
        return res.status(201).json({message: 'Agendamento cadastrado!'})
    } catch(err){
        console.error('Erro ao cadastrar agendamento',err)
        return res.status(500).json({message: 'Erro ao cadastrar agendamento!'})
    }
}

const listarAgendamentos = async(req,res)=>{
    try {
        const agendamentos = await Agendamento.findAll()
        return res.status(200).json(agendamentos)
    } catch(err){
        console.error('Erro ao listar agendamentos',err)
        return res.status(500).json({message: 'Erro ao listar agendamentos!'})
    }
}

const atualizarAgendamento = async(req,res)=>{
    const id = req.params.id
    const valores = req.body

    if(!valores.data || !valores.hora || !valores.tipoServico || !valores.idCliente || !valores.idConsole){
        return res.status(400).json({message: 'Todos os campos são obrigatórios!'})
    }

    try {
        const agendamento = await Agendamento.findByPk(id)
        if(!agendamento){
            return res.status(404).json({message: 'Agendamento não encontrado!'})
        }

        await Agendamento.update(valores, {where: {codAgendamento: id}})
        const dados = await Agendamento.findByPk(id)

        return res.status(200).json({
            codAgendamento: dados.codAgendamento,
            data: dados.data,
            hora: dados.hora,
            tipoServico: dados.tipoServico,
            idCliente: dados.idCliente,
            idConsole: dados.idConsole
        })
    } catch(err){
        console.error('Erro ao atualizar agendamento',err)
        return res.status(500).json({message: 'Erro ao atualizar agendamento!'})
    }
}

module.exports = {cadastrarAgendamento, listarAgendamentos, atualizarAgendamento}
