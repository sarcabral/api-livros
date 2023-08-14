const porta = 3333
const express = require('express')
const app = express()

const router = express.Router()

const conectaBancoDeDados = require('./bancoDeDados')
conectaBancoDeDados()

function mostraPorta(){
    console.log("Servidor criado e rodando na porta", porta)
}

//GET
function listaLivros(request, response){
    response.json("Lista de Livros:")
}

//POST
function cadastrarLivro(){
    const novoLivro = {
        nome: request.body.nome,
        autor: request.body.autor,
        categoria: request.body
    }

}

function editarLivro(){}

function excluiLivro(){}


app.listen(porta, mostraPorta)
app.use(router.get("/livros", listaLivros))