const porta = 3333
const express = require('express')
const app = express()

const router = express.Router()

const cors = require('cors')

const conectaBancoDeDados = require('./bancoDeDados')
conectaBancoDeDados()

const Livro = require('./livroModel')

app.use(express.json())
app.use(cors())

//GET
async function listaLivros(request, response){
    try{
        const livrosDoBanco = await Livro.find()
        response.json(livrosDoBanco)
    }
    catch(erro){
        console.log(erro)
    }
    
}

//POST
async function cadastrarLivro(request, response){
    const novoLivro = new Livro({
        nome: request.body.nome,
        autor: request.body.autor,
        categoria: request.body.categoria
    })

    try{
        const livroCriado = await novoLivro.save()
        response.status(201).json(livroCriado)
    }
    catch(erro){
        console.log(erro)
    }

}

//PATCH
async function editarLivro(request, response){
    try{
        const livroEncontrado = await Livro.findById(request.params.id)

        if(request.body.nome){
            livroEncontrado.nome = request.body.nome
        }
        if(request.body.autor){
            livroEncontrado.autor = request.body.autor
        }
        if(request.body.categoria){
            livroEncontrado.categoria = request.body.categoria
        }

        const livroAtualizado = await livroEncontrado.save()
        response.json(livroAtualizado)
    }
    catch(erro){
        console.log(erro)
    }
}

//DELETE
async function excluirLivro(request, response){
    try{
        await Livro.findByIdAndDelete(request.params.id)
        response.json({
            message: 'Livro deletado com sucesso!'
        })
    }
    catch(erro){
        console.log(erro)
    }
}

app.use(router.get("/livros", listaLivros))
app.use(router.post("/livros", cadastrarLivro))
app.use(router.patch("/livros/:id", editarLivro))
app.use(router.delete("/livros/:id", excluirLivro))

function mostraPorta(){
    console.log("Servidor criado e rodando na porta", porta)
}
app.listen(porta, mostraPorta)