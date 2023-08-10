const porta = 3333
const express = require('express')
const app = express()

const router = express.Router()

function mostraPorta(){
    console.log("Servidor criado e rodando na porta", porta)
}

function cadastrarLivro(){}
function editarLivro(){}
function excluiLivro(){}
function listaLivros(request, response){
    response.json("Lista de Livros:")
}

app.listen(porta, mostraPorta)
app.use(router.get("/livros", listaLivros))