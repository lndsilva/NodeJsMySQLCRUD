const { Router } = require('express')
const querys = require('../querys')

const router = Router()

router.get('/', async (req, res) => {
    const query = await querys.getAllActors()
    return res.status(200).json(query)
})

router.get('/:id', async (req, res)=>{
    const { id } = req.params
    const query = await querys.getActorsById(id)
    if(query.length === 0 ){
        return res.status(400).json({
            message: 'Ator não encontrado!!!'
        })
    }
    return res.status(200).json(query)
})

router.post('/', async (req, res)=>{
    const { first_name, last_name } = req.body
    const query = await querys.createActor(first_name,last_name)
    return res.status(200).json(query)
})

router.put('/', async (req, res)=>{
    const { id, first_name, last_name } = req.body
    const query = await querys.updateActor(id, first_name, last_name)
    if(query === null){
        return res.status(400).json({message : 'Ator não encontrado'})
    }
    return res.status(200).json({message: 'Ator registrado com sucesso!!!'})
})

router.delete('/', async (req, res) =>{
    const { id } = req.body
    const query = await querys.deleteActor(id)
    if(query === 0 ){
        return res.status(400).json({message: 'Ator não encontrado.'})
    }
    return res.status(200).json({message: 'Ator deletado com sucesso!!!'})
})

module.exports = router