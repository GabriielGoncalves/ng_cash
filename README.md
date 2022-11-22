
# NG_CASH API

## Descrição do Projeto
<p>API desenvolvida em Node.js visando fornecer funcionalidades bancárias proposta pela empresa NG_Cash.</p>

<br/>
### Requisitos.
<ul>
    <li>
        <a href="https://nodejs.org/en/" target="_blank" >Node.js - v14.15.4 ou superior  </a>
    </li>
    <li>
        <a href="https://www.npmjs.com/" target="_blank" >Node Package Manager (npm) - 6.14.17 ou superior</a>
    </li>
    <li>
        <a href="https://docs.docker.com/compose/install/" target="_blank" >Docker Compose</a>
    </li>
</ul>

### Inicializar a aplicação
Para a execução do projeto de maneira local deve ser executado os seguintes passos.
<br/>
<ul>
    <li><b>Inicializar a aplicação: </b>
    <br/>
    Para inicializar a aplicação é necessário entrar na pasta do projeto e rodar o comando:
    <br/>
    <code>sudo docker-compose up</code>
    </li>

</ul>

<p>Após a finalização desse processo você terá a aplicação rodando localmente na porta <code>3000</code>, mais especificamente: <code>http://localhost:3000/</code></p>
<br/>

<p><b>OBS:</b> Você DEVE utilizar um software como <a href="https://www.postman.com/" target="_blank">Postman</a> para disparar requisições para a API.</p>
<br/>


## Detalhamento das rotas

Dentro da aplicação veremos dois grupos de rotas:
Rotas relacionadas a conta (AccountRouter); e
rotas relacionadas a parte de autenticação e cadastro(AuthRouter)

Como dito anteriormente, as rotas referentes a <strong>autenticação (AuthRouter)</strong>, englobam cadastro e login e são elas:

<code>POST /api/users/register </code>-> devemos informar no corpo (body) da requisição as seguintes informações para que seja criado um usuario:
{"username" e "password"}. Username deve ter no minimo 3 caracteres e password deve conter minimo de 8 caracteres com 1 letra MAIÚSCULA e 1 número.

<code>POST /api/users/login</code> -> aqui devemos informar os dados de cadastro que foram realizado na rota /register.

As rotas referentes as operações de <strong>Conta (AccountRouter)</strong> do usuários são:

<code>GET /api/account/balance</code> -> retorna o saldo da conta do usuário (não necessário informação de parametros)

<code>POST /api/account/transfer</code> -> deve-se informar no corpo da requisição o username do usuário que deverá receber a transferência (importante que seja criado um usuário para receber a transferência se não, não será concluído com êxito)
e o valor que será enviado ( {"username", "money"}

<code>GET /api/account/extract</code> -> será retornado o histórico de transferência realizado pelo usuário que está logado. As informações presentes são, todas as transações
que  usuário esteve presente, como: envio e recebimento.

