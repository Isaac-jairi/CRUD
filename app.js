//importando e configurando dependencias necessarias 
const express = require("express");
const app = express();

var nunjucks = require('nunjucks');

const bodyparser = require("body-parser");

app.use(bodyparser.urlencoded({ extended: false }));
app.set("view engine", "html")

nunjucks.configure('views/pages', {
    autoescape: true,
    express: app
});

//Criando conexão com o banco de dados
const mysql = require("mysql");
const connection = mysql.createConnection({
    host: "localhost",
    user: "isaac",
    password: "isaac18024089",
    database: "crud_teste",
    multipleStatements: true
});
connection.connect(function (err) {
    if (err) {
        console.error("Erro ao conectar ao DB: ", err.stack);
    } else {
        console.error("Conectado ao db");
    }
});

//Rotas
//rota principal executa as querys e trás os resultados
app.get("/", function (req, res) {
    connection.query("select * from clientes", function (err, results) {
        if (err) {
            console.log("erro select clientes " + err);
        } else {
            connection.query("select * from produtos", function (err, results1) {
                if (err) {
                    console.log("erro select produtos " + err);
                } else {
                    res.render("home",{ clientes: results, produtos: results1}); 
                }
            });
        }
    });
});
//cadastra cliente
app.post("/add-cliente", function (req, res) {
    connection.query("insert into clientes (nome, telefone , email) values (?,?,?); SET @count = 0; UPDATE `clientes` SET `clientes`.`id` = @count:= @count + 1;", [req.body.nomeCliente, req.body.telefoneCliente, req.body.emailCliente], function (err) {
        if (err) {
            console.log("Erro ao inserir Cliente" + err.stack);
            res.redirect("/");
        } else {
            console.log("Cliente inserido com sucesso");
            res.redirect("/");
        }
    });
});
//cadastra produto
app.post("/add-produto", function (req, res) {
    connection.query("insert into produtos (nome, descricao , preco) values (?,?,?); SET @count = 0; UPDATE `produtos` SET `produtos`.`id` = @count:= @count + 1;", [req.body.nomeProduto, req.body.descricaoProduto, req.body.precoProduto], function (err) {
        if (err) {
            console.log("Erro ao inserir Produto" + err.stack);
            res.redirect("/");
        } else {
            console.log("Produto inserido com sucesso");
            res.redirect("/");
        }
    });
});
//deleta cliente
app.get("/del-cliente/:id", function (req, res) {
    connection.query("delete from clientes where id=?; SET @count = 0; UPDATE `clientes` SET `clientes`.`id` = @count:= @count + 1", [req.params.id], function (err, result) {
        if (err) {
            console.log('Erro ao deletar cliente' + err.stack);
            res.redirect("/");
        } else {
            console.log('Cliente deletado com sucesso');
            res.redirect("/");
        }
    });
});
//deleta produto
app.get("/del-produto/:id", function (req, res) {
    connection.query("delete from produtos where id=?; SET @count = 0; UPDATE `produtos` SET `produtos`.`id` = @count:= @count + 1", [req.params.id],function (err, result) {
        if (err) {
            console.log('Erro ao deletar produto' + err.stack);
            res.redirect("/");
        } else {
            console.log('Produto deletado com sucesso');
            res.redirect("/");
        }
    });
    
});
//Atualiza produto
app.get("/up-produto/:id", function (req, res) {
    connection.query("select * from produtos where id=?", [req.params.id], function (err, result) {
        if (err) {
            console.log('erro ao atualizar produto1');
            res.redirect("/");
        } else {
            res.render("updateProduto",{ produto: result} )
        }
    });  
});
app.post("/up-produto/:id", function (req, res) {
    connection.query("update produtos set nome=?, descricao=?, preco=? where id=?", [req.body.nomeProduto, req.body.descricaoProduto, req.body.precoProduto, req.params.id], function (err) {
        if (err) {
            console.log("Erro ao atualizar Produto" + err.stack);
            res.redirect("/");
        } else {
            console.log("Produto Atualizado com sucesso");
            res.redirect("/");
        }
    });
});
//Atualiza cliente
app.get("/up-cliente/:id", function (req, res) {
    connection.query("select * from clientes where id=?", [req.params.id], function (err, result) {
        if (err) {
            console.log('erro ao atualizar cliente1');
            res.redirect("/");
        } else {
            res.render("updateCliente",{ cliente: result} )
        }
    });  
});
app.post("/up-cliente/:id", function (req, res) {
    connection.query("update clientes set nome=?, telefone=?, email=? where id=?", [req.body.nomeCliente, req.body.telefoneCliente, req.body.emailCliente, req.params.id], function (err) {
        if (err) {
            console.log("Erro ao atualizar Cliente" + err.stack);
            res.redirect("/");
        } else {
            console.log("Cliente Atualizado com sucesso");
            res.redirect("/");
        }
    });
});



app.listen(8080, () => {
    console.log("Servidor iniciado na porta 8080: http://localhost:8080");
});