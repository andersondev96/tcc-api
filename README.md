# Trabalho de conclusão de curso (TCC)

<b> Índice </b>
<div>
<ul>
<li><a href="#-sobre-o-projeto">Sobre o projeto</a></li>
<li><a href="#-tecnologias-utilizadas">Tecnologias utilizadas</a></li>
<li><a href="#-requisitos">Requisitos</a></li>
<li><a href="#-banco-de-dados">Banco de dados</a></li>
<li><a href="#-como-executar-a-aplicação">Como executar a aplicação</a></li>
<li><a href="#-deploy-da-aplicação">Deploy da aplicação</a></li>
<li><a href="#-como-contribuir">Como contribuir</a></li>
<li><a href="#-licença">Licença</a></li>
<li><a href="#-autor">Autor</a></li>
</ul>
<div>


Projeto desenvolvido para o trabalho de conclusão de curso (TCC) de Sistemas de Informação - UFOP.

## 📄 Sobre o projeto

O projeto desenvolvido tem o objetivo de auxiliar os microempreendedores individuais (MEIs), por meio de um sistema que permite divulgar os seu negócio e serviços, aproximando do seu público-alvo e aumentando o seu alcance.

## 🧑‍💻 Tecnologias utilizadas

Para a implementação do servidor, foi utilizada como linguagem de programação o TypeScript, com os bancos de dados Postgres e Redis e a biblioteca do Node.js.

<div>
  <a href="https://www.typescriptlang.org/">
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white">
  </a>
  <a href="https://nodejs.org/en">
    <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white">
  </a>
  <a href="https://www.postgresql.org/">
    <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white">
  </a>
  <a href="https://redis.io/">
    <img src="https://img.shields.io/badge/Redis-D9281A?style=for-the-badge&logo=redis&logoColor=white">
  </a>
  <a href="https://www.docker.com/">
    <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white">
  </a>
</div>


## 🔧 Requisitos

### Usuários
<ul>
  <li>Autenticar usuário</li>
  <li>Cadastrar usuário</li>
  <li>Recuperar senha</li>
  <li>Criar refresh token</li>
  <li>Editar usuário</li>
  <li>Excluir usuário</li>
</ul>

### MEIs
<ul>
  <li>Cadastrar MEIs</li>
  <li>Editar MEIs</li>
  <li>Listar MEIs</li>
  <li>Favoritar MEIs</li>
  <li>Avaliar MEIs</li>
  <li>Excluir MEIs</li>
  <li>Adicionar imagens de MEIs</li>
</ul>

### Serviços
<ul>
  <li>Adicionar serviços</li>
  <li>Editar serviços</li>
  <li>Listar serviços</li>
  <li>Filtrar serviços</li>
  <li>Favoritar serviços</li>
  <li>Avaliar serviços</li>
  <li>Excluir serviços</li>
  <li>Adicionar imagens de serviços</li>
  <li>Fazer <i>upload</i> de uma lista de serviços através de um arquivo <i>.xlsx</i>
</ul>


### Orçamentos
<ul>
  <li>Criar uma solicitação de orçamento para o empreendedor</li>
  <li>Listar orçamentos do cliente</li>
  <li>Listar propostas de orçamentos do empreendedor</li>
  <li>Criar orçamento para o cliente</li>
  <li>Pesquisar por orçamentos</li>
  <li>Editar orçamentos</li>
  <li>Enviar orçamentos</li>
  <li>Aceitar ou recusar orçamentos</li>
</ul>

### Chat
<ul>
  <li>Acessar chat</li>
  <li>Iniciar conversa</li>
  <li>Enviar mensagens para o empreendedor</li>
</ul>


### Clientes
<ul>
  <li>Listar clientes</li>
  <li>Pesquisar clientes</li>
</ul>

### Configurações
<ul>
  <li>Atualizar configurações</li>
  <li>Remover conta</li>
</ul>

## 🔑 Banco de dados

O banco de dados principal foi o potgreSQL, abaixo é exibido o diagrama ER com as tabelas e relacionamentos.

<img src="tcc-api - public.png">

## 🚀 Como executar a aplicação
Antes de executar a aplicação certifique que você tenha instalada uma versão LTS do Node, npm e docker.

Para executar a aplicação deve seguir os seguintes passos:

<ol>
  <li>Clone o repositório:
  <code>https://github.com/andersondev96/tcc-api</code>
  <li>Abra o terminal e acesse a pasta <code>tcc-api</code> com o comando: <code>cd tcc-api</code>
  <li>Instale as dependências do projeto:<br>
  <code>npm install</code> ou <code>yarn install</code>
  <li>Configure as variáveis ambiente:

<br>

  ```
  APP_ENV="local"

# APP URLS LOCAL
APP_API_URL="http://localhost:3333"
APP_WEB_URL="http://localhost:3000"

# DATABASE
DATABASE_URL="postgresql://database:password@localhost:5432/tcc-api?schema=public"
APP_SECRET_TOKEN=your-secret-token
APP_SECRET_REFRESH_TOKEN=your-secret-refresh-token

# GOOGLE MAPS API
GOOGLE_MAPS_API_KEY=your-google-maps-api-key

## Storage
disk=local

## Email
MAIL_PROVIDER=s3

#Redis
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=your-redis-password

  ```

  </li>
  <li>Execute as migrations do prisma: <br>
  <code>npx prisma migrate dev</code></li>
<li>Para testar as requisições você pode utilizar <i>softwares</i> como insomnia ou postman.

As collections estão disponíveis no link abaixo:

<a href="insomnia-All_2023-10-15.json" target="_blank">

<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128"><path fill="currentColor" d="M17.033 46.967C7.626 46.967 0 54.593 0 64s7.626 17.033 17.033 17.033S34.064 73.407 34.064 64s-7.624-17.033-17.03-17.033zm0 1.732c8.45 0 15.301 6.85 15.301 15.301c0 8.45-6.85 15.3-15.3 15.3c-8.451 0-15.302-6.85-15.302-15.3c0-8.45 6.851-15.3 15.301-15.3zm.192 3.176c-1.637 0-3.197.324-4.621.912a4.716 4.716 0 1 1-6.592 6.592A12.085 12.085 0 0 0 5.1 64c0 6.696 5.428 12.125 12.125 12.125c6.696 0 12.125-5.429 12.125-12.125s-5.43-12.125-12.125-12.125zm98.832 4.018c-.707 0-1.287.552-1.287 1.218c0 .667.58 1.211 1.287 1.211c.701 0 1.285-.544 1.285-1.21c0-.667-.584-1.22-1.285-1.22zm-67.686.558v13.936h2.102V56.45H48.37zM58.537 59.8c-1.572 0-2.599.729-3.082 1.838h-.13v-1.701H53.37v10.45h2.035v-6.204c0-1.668 1.02-2.62 2.436-2.62c1.381 0 2.219.905 2.219 2.422v6.403h2.035v-6.649c0-2.585-1.422-3.94-3.559-3.94zm10.166 0c-2.361 0-4.035 1.245-4.035 3.096c0 1.483.898 2.47 2.857 2.906l1.77.388c1.007.225 1.476.673 1.476 1.327c0 .81-.863 1.443-2.197 1.443c-1.218 0-2-.525-2.246-1.553l-1.967.301c.34 1.85 1.88 2.89 4.227 2.89c2.524 0 4.271-1.34 4.271-3.232c0-1.476-.938-2.388-2.857-2.83l-1.66-.38c-1.15-.273-1.648-.66-1.64-1.368c-.007-.803.864-1.375 2.02-1.375c1.266 0 1.852.702 2.09 1.402l1.844-.328c-.422-1.626-1.694-2.687-3.953-2.687zm10.797 0c-2.946 0-4.873 2.157-4.873 5.41c0 3.232 1.927 5.389 4.873 5.389s4.871-2.157 4.871-5.389c0-3.253-1.925-5.41-4.871-5.41zm12.068 0c-1.381 0-2.408.688-2.843 1.838h-.13v-1.701h-1.952v10.45h2.033v-6.443c0-1.408.987-2.388 2.144-2.388c1.13 0 1.912.748 1.912 1.884v6.948h2.028v-6.662c0-1.26.769-2.17 2.095-2.17c1.076 0 1.96.598 1.96 2.013v6.819h2.035V63.38c0-2.388-1.333-3.58-3.225-3.58c-1.504 0-2.633.722-3.137 1.838h-.11c-.455-1.143-1.415-1.838-2.81-1.838zm17.174 0c-1.572 0-2.6.729-3.084 1.838h-.129v-1.701h-1.953v10.45h2.035v-6.204c0-1.668 1.021-2.62 2.436-2.62c1.382 0 2.219.905 2.219 2.422v6.403h2.035v-6.649c0-2.585-1.422-3.94-3.559-3.94zm15.201 0c-1.891 0-3.632.762-4.312 2.668l1.912.435c.3-.741 1.06-1.457 2.428-1.457c1.313 0 1.988.687 1.988 1.871v.05c0 .74-.762.727-2.64.945c-1.98.23-4.008.748-4.008 3.123c0 2.054 1.543 3.185 3.53 3.185c1.73 0 2.703-.877 3.09-1.66h.083v1.428H128v-6.94c0-3.041-2.396-3.648-4.057-3.648zm-8.914.137v10.45h2.035v-10.45h-2.035zM79.506 61.5c1.912 0 2.81 1.703 2.81 3.703c0 2.007-.898 3.688-2.81 3.688c-1.926 0-2.824-1.68-2.824-3.688c0-2 .898-3.703 2.824-3.703zm46.459 3.77v1.347c0 1.239-.987 2.37-2.682 2.37c-1.15 0-1.978-.519-1.978-1.526c0-1.089.965-1.476 2.142-1.633c.66-.088 2.225-.266 2.518-.558z"/></svg>

</a>
</ol>

## ⚙ Deploy da aplicação
O deploy da aplicação foi feito utilizando a plataforma AWS da Amazon, utilizando o EC2.

Para o deploy foi criada uma máquina virtual do ubuntu e configurada as chaves de SSH.

Além disso foi utilizado o Proxy Reverso, com o <i>nginx</i> e o PM2 para gerenciar os processos do Node.

## 🤝 Como contribuir
<ol>
<li>
  Faça um fork do repositório.
  Crie uma nova branch com as suas alterações:
  
  <code>git checkout -b my-feature</code>
  </li>

<li>Salve as suas alterações e crie uma mensagem de commit, dizendo o que você fez: 
  
  <code>git commit -m "feature: My new feature"</code>
</li>

<li>
Envie as suas alterações: 
  
  <code>git push origin my-feature</code>
</li>
</ol>

## 📝 Licença
 <p>Este projeto está sobre a licença <a href="LICENSE">MIT</a>.

## 👥 Autor

<div style="display:flex; flex-direction:column; align-items: center;">
  <a href="https://www.linkedin.com/in/anderson-fernandes96/">
    <div style="display: flex; flex-direction: column; align-items: center; gap: 10px">
    <img src="https://avatars.githubusercontent.com/u/49786548?v=4" width="64" style="border: 2px solid blue; border-radius: 50px" />
    <strong>Anderson Fernandes Ferreira</strong>
    </div><br>
    <div style="display:flex; flex-direction:row;gap:8px;">
  <a href="https://instagram.com/anderson_ff13" target="_blank"><img src="https://img.shields.io/badge/-Instagram-%23E4405F?style=for-the-badge&logo=instagram&logoColor=white" target="_blank"></a>
  <a href = "mailto:andersonfferreira96@gmail.com.br"><img src="https://img.shields.io/badge/-Gmail-%23333?style=for-the-badge&logo=gmail&logoColor=white" target="_blank"></a> 
  <a href="https://www.linkedin.com/in/anderson-fernandes96/" target="_blank"><img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank"></a> 
  </div>
</div>

</a>
<br>
<p style="text-align: center;">
  Feito com 💚 por Anderson Fernandes 👋 
  <a href="https://www.linkedin.com/in/anderson-fernandes96/">Entre em contato!</a>
  <br>
</p>
