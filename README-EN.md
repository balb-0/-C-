# Inteli - Technology and Leadership Institute 

<p align="center">
<a href= "https://www.inteli.edu.br/"><img src="documents/others/assets/pt/inteli_logo.png" alt="Inteli - Instituto de Tecnologia e Liderança" border="0"></a>
</p>

# Code Connecting Cultures

## C³ - Code Connecting Cultures

## Group Members: 
- <a href="https://www.linkedin.com/in/felipe-elgenneni">Felipe de Melo Elgenneni</a>
- <a href="https://www.linkedin.com/in/joao-carbone">João Pedro Ferreira Carbone</a>
- <a href="https://www.linkedin.com/in/lucca-henrique-pereira/">Lucca Henrique Pereira</a> 
- <a href="https://www.linkedin.com/in/miguelclaret">Miguel da Silva Claret</a> 
- <a href="https://www.linkedin.com/in/otavio-vasc/">Otávio de Carvalho Vasconcelos</a>
- <a href="https://www.linkedin.com/in/raphaelfelipesilva/">Raphael Felipe da Silva</a> 
- <a href="https://www.linkedin.com/in/vitor-balbo/">Vítor Margarido Balbo</a>

## Teachers:
### Mastermind 
- <a href="https://www.linkedin.com/in/fabiana-martins-de-oliveira-8993b0b2/">Fabiana Martins de Oliveira</a>
### Instructors
- <a href="https://www.linkedin.com/in/kizzyterra/">Kizzy Terra</a>
- <a href="https://www.linkedin.com/in/egondaxbacher/">Egon Daxbacher</a> 
- <a href="https://www.linkedin.com/in/bruna-mayer-00a556174/">Bruna Mayer</a> 
- <a href="https://www.linkedin.com/in/henrique-mohallem-paiva-6854b460/">Henrique Mohallem Paiva</a>
- <a href="https://www.linkedin.com/in/michele-bazana-de-souza-69b77763/">Michele Bazana de Souza</a>

## 📝 Description

An interactive and user-friendly web application has been developed to address the challenge of Zuyd University and its IBSM (International Business School Maastricht) program. This site has several pages that allow students to create profiles, carry out self-assessments and peer assessments, receive feedback and interact with the group, as well as offer a view of the tutor. Through this system, students can deepen their knowledge of cultural diversity, improve their intercultural interaction skills, and learn to act effectively in a multicultural context. Thus, this online software is a valuable tool for supporting IBSM students in their intercultural learning, enabling them to become internationally focused business professionals.

## 📝 Demonstration Link

- Project link: https://github.com/Inteli-College/2024-1B-T12-IN02-G04.git

- Demonstrative video: https://www.youtube.com/watch?v=jLUcSyHiCHk

- Web page deploy link: https://two024-1b-t12-in02-g04.onrender.com/

## 📁 Folder structure

Among the files and folders in the root of the project, define:

- <b>assets</b>: Here are the files related to non-structured elements of this repository, like images.

- <b>document</b>: Here is all project documentation, like the Web Application Document (WAD) and complementary documents on "others" folder.

- <b>src</b>: All the source code created for the development of the web application project.

- <b>README.md</b>: File that works as the general introduction and overview of the project and the application (the same file you are reading right now).

## 💻 Configuration to development and execution of the project.

Right here, you can find all the instructions needed to install all essential programs, libraries and tools to set up the development environment.

1. Download and install node.js: [https://nodejs.org/pt-br/](https://nodejs.org/pt-br/) (v16.15.1 LTS).

2. Clone the repository: https://github.com/Inteli-College/2024-1B-T12-IN02-G04.git.

3. In administrator mode, open "Command Prompt" then open the src folder on the root of the cloned directory and type the following command:

```sh
npm install
```

This will install all dependencies defined in the file <b>package.json</b>, which are necessary to run the project. Now, you are ready to go and modify the project the way you want. Also, if you wish, you can start the application by typing the command below in terminal:

```sh
npm start
```
5. Now you are able to access the application by clicking the link: http://localhost:1337/login

6. The server is online.

7. In case you are trying to acess this project after july 21th, you might have a problem with database. To solve this, go to https://render.com/ and follow the steps:

    1. create a render account on "Get Started for Free".
    2. Click on PostgreSQL.
    3. Add a Name and select "Free" in the "Instance Type" field, then click "Create Database".
    4. On top right, click "connect", select "external" and copy the "External Database URL".
    5. Go to the src/config/datastore.js file and change the "URL" field with the new database URL you just created. Also, remember to keep the URL in quotation marks, just like:

```sh
url: 'postgres://c3testdb_user:3dbJ7z3UIKu92q1P1IUKdZMZvzX02KIp@dpg-copnh8n79t8c7381uc10-a.oregon-postgres.render.com/c3testdb'
```

## 🗃 Release history

* 0.5.0 - 2024/06/21
     
* 0.4.0 - 2024/06/07
     
* 0.3.0 - 2024/05/24
     
* 0.2.0 - 2024/05/10
     
* 0.1.0 - 2024/04/26
    

## 📋 License

<img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1"><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1"><p xmlns:cc="http://creativecommons.org/ns#" xmlns:dct="http://purl.org/dc/terms/"><a property="dct:title" rel="cc:attributionURL" href="https://github.com/Inteli-College/2024-1B-T12-IN02-G04">INTELI GIT MODEL</a> by <a rel="cc:attributionURL dct:creator" property="cc:attributionName" href="https://www.inteli.edu.br/">Inteli,</a><a property="dct:title" rel="cc:attributionURL" href="https://github.com/Inteli-College/2024-1B-T12-IN02-G04"> Felipe de Melo Elgenneni, João Pedro Ferreira Carbone, Lucca Henrique Pereira, Miguel da Silva Claret, Otávio de Carvalho Vasconcelos, Raphael Felipe da Silva, Vítor Margarido Balbo</a>  is licensed under <a href="http://creativecommons.org/licenses/by/4.0/?ref=chooser-v1" target="_blank" rel="license noopener noreferrer" style="display:inline-block;">Attribution 4.0 International</a>.</p>

