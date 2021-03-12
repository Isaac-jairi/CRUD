# CRUD
Teste técnico

No desenvolvimento desse sistema foram usados: NodeJS, Mysql, Express e Nunjucks. E as seguinte linguagens: JavaScript, HTML e CSS.

Para rodar o sistema, são neescessarios ter instalados o nodeJS(https://nodejs.org/en/) e mysql(https://dev.mysql.com/downloads/).

Após clonar o repositorio, crie o banco de dados Mysql com o script BD.sql. 

Navegue pelo CMD até o diretório e execute o comando "npm install", que instalará todas as dependências.

Substitua os seguintes valores pelos valores do seu Mysql. editando o arquivo app.js
const connection = mysql.createConnection({
    host: "seuHost",
    user: "seuUsuario",
    password: "suaSenha",
    database: "crud_teste",
    multipleStatements: true
});

Por fim ultilizando o CMD navegue até a pasta onde o arquivo "app.js" se encontra e execute o comando "node app.js". abra o navegador Microsoft EDGE no endereço "http://localhost:8080/" e ultilize a aplicação.

O funcionamento é simples, os botões no canto superior direito cadastram um usuario ou produto, que aparecem em duas listas logo abaixo na tela.

Cada usuario ou produto possui um botao para apagar ou editar seus valores.
