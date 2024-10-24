# Inteli - Instituto de Tecnologia e Liderança 

<p align="center">
<a href= "https://www.inteli.edu.br/"><img src="documents/others/assets/pt/inteli_logo.png" alt="Inteli - Instituto de Tecnologia e Liderança" border="0"></a>
</p>

# Nome do projeto

## C³ - Code Conecting Cultures

## Integrantes: 
- <a href="https://www.linkedin.com/in/felipe-elgenneni">Felipe de Melo Elgenneni</a>
- <a href="https://www.linkedin.com/in/joao-carbone">João Pedro Ferreira Carbone</a>
- <a href="https://www.linkedin.com/in/lucca-henrique-pereira/">Lucca Henrique Pereira</a> 
- <a href="https://www.linkedin.com/in/miguelclaret">Miguel da Silva Claret</a> 
- <a href="https://www.linkedin.com/in/otavio-vasc/">Otávio de Carvalho Vasconcelos</a>
- <a href="https://www.linkedin.com/in/raphaelfelipesilva/">Raphael Felipe da Silva</a> 
- <a href="https://www.linkedin.com/in/vitor-balbo/">Vítor Margarido Balbo</a>

## Professores:
### Orientador(a) 
- <a href="https://www.linkedin.com/in/fabiana-martins-de-oliveira-8993b0b2/">Fabiana Martins de Oliveira</a>
### Instrutores
- <a href="https://www.linkedin.com/in/kizzyterra/">Kizzy Terra</a>
- <a href="https://www.linkedin.com/in/egondaxbacher/">Egon Daxbacher</a> 
- <a href="https://www.linkedin.com/in/bruna-mayer-00a556174/">Bruna Mayer</a> 
- <a href="https://www.linkedin.com/in/henrique-mohallem-paiva-6854b460/">Henrique Mohallem Paiva</a>
- <a href="https://www.linkedin.com/in/michele-bazana-de-souza-69b77763/">Michele Bazana de Souza</a>

## 📝 Descrição

Uma aplicação web interativa e de fácil uso foi desenvolvida para abordar o desafio da Universidade Zuyd e seu programa IBSM (International Business School Maastricht). Este site possui várias páginas que permitem aos estudantes criar perfis, realizar autoavaliações e avaliações dos colegas, receber feedback e interagir com o grupo, além de oferecer uma visão para o tutor. Por meio deste sistema, os estudantes podem aprofundar seus conhecimentos sobre diversidades culturais, melhorar suas habilidades de interação intercultural e aprender a atuar de maneira eficaz em um contexto multicultural. Assim, este software online é uma ferramenta valiosa para apoiar os alunos do programa IBSM em sua aprendizagem intercultural, capacitando-os a se tornarem profissionais de negócios com enfoque internacional.

## 📝 Link de demonstração

- Link para o projeto publicado: https://github.com/Inteli-College/2024-1B-T12-IN02-G04

- Link para vídeo de demonstração: https://www.youtube.com/watch?v=jLUcSyHiCHk

- Link do deploy da página web: https://two024-1b-t12-in02-g04.onrender.com/

## 📁 Estrutura de pastas

Dentre os arquivos e pastas presentes na raiz do projeto, definem-se:

- <b>assets</b>: aqui estão os arquivos relacionados a elementos não-estruturados deste repositório, como imagens.

- <b>document</b>: aqui estão todos os documentos do projeto, como o Web Application  Document (WAD) bem como documentos complementares, na pasta "other".

- <b>src</b>: Todo o código fonte criado para o desenvolvimento do projeto de aplicação web.

- <b>README.md</b>: arquivo que serve como guia introdutório e explicação geral sobre o projeto e a aplicação (o mesmo arquivo que você está lendo agora).

## 💻 Configuração para desenvolvimento e execução do código

Aqui encontram-se todas as instruções necessárias para a instalação de todos os programas, bibliotecas e ferramentas imprescindíveis para a configuração do ambiente de desenvolvimento.

1. Baixar e instalar o node.js: [https://nodejs.org/pt-br/](https://nodejs.org/pt-br/) (v20.12.2 LTS)

2. Clone o repositório: https://github.com/Inteli-College/2024-1B-T12-IN02-G04.git.

3. No modo administrador, abra o "prompt de comando" ou o "terminal" e, após, abra a pasta "src/backend" no diretório raiz do repositório clonado e digite o segundo comando:

```sh
npm install
```

Isso instalará todas as dependências definidas no arquivo <b>package.json</b> que são necessárias para rodar o projeto. Agora o projeto já está pronto para ser modificado. Caso ainda deseje iniciar a aplicação, digite o comando abaixo no terminal:

```sh
npm start
```
5. Agora você pode acessar a aplicação através do link http://localhost:1337/login
6. O servidor está online.

7. Caso esteja a tentar aceder a este projeto depois de 21 de julho, poderá ter um problema com o banco de dados. Para resolvê-lo, acesse a https://render.com/ e siga os seguintes passos:

    1. Criar uma conta em "Get started for free".
    2. Clique em PostgreSQL.
    3. Adicione um nome e seleccione "Free" no campo "Instance Type" (Tipo de instância) e, em seguida, clique em "Create Database" (Criar banco de dados).
    4. No canto superior direito, clique em "connect" (conectar), selecione "external" (externo) e copie o "External Database URL" (URL da base de dados externa).
    5. Vá para o diretório src/config/datastore.js e altere o campo "url" com o novo URL da base de dados que criou. Além disso, não se esqueça de manter o url entre aspas, tal como:

```sh
url: 'postgres://c3testdb_user:3dbJ7z3UIKu92q1P1IUKdZMZvzX02KIp@dpg-copnh8n79t8c7381uc10-a.oregon-postgres.render.com/c3testdb'
```

## 🗃 Histórico de lançamentos

* 0.5.0 - 2024/06/21
     
* 0.4.0 - 2024/06/07
     
* 0.3.0 - 2024/05/24
     
* 0.2.0 - 2024/05/10
     
* 0.1.0 - 2024/04/26

## 📋 Licença/License

<img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1"><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1"><p xmlns:cc="http://creativecommons.org/ns#" xmlns:dct="http://purl.org/dc/terms/"><a property="dct:title" rel="cc:attributionURL" href="https://github.com/Inteli-College/2024-1B-T12-IN02-G04">MODELO GIT INTELI</a> by <a rel="cc:attributionURL dct:creator" property="cc:attributionName" href="https://www.inteli.edu.br/">Inteli,</a><a property="dct:title" rel="cc:attributionURL" href="https://github.com/Inteli-College/2024-1B-T12-IN02-G04"> Felipe de Melo Elgenneni, João Pedro Ferreira Carbone, Lucca Henrique Pereira, Miguel da Silva Claret, Otávio de Carvalho Vasconcelos, Raphael Felipe da Silva, Vítor Margarido Balbo</a>  is licensed under <a href="http://creativecommons.org/licenses/by/4.0/?ref=chooser-v1" target="_blank" rel="license noopener noreferrer" style="display:inline-block;">Attribution 4.0 International</a>.</p>

