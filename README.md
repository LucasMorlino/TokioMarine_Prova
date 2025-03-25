# Tokio Marine Seguradora - Sistema de Gerenciamento de Clientes e Endereços

Este projeto é uma aplicação full-stack para gerenciamento de clientes e seus endereços, desenvolvida como parte de uma prova técnica para a Tokio Marine. O backend é construído com **Spring Boot** (Java) e o frontend com **Angular** (TypeScript). A aplicação permite listar, criar, editar e excluir clientes, além de associar endereços a eles, com a funcionalidade de buscar endereços automaticamente pelo CEP usando a API do ViaCEP.

Tecnologias Utilizadas

----------------------

### Backend

-   Java 11

-   Spring Boot 2.7.18

-   Spring Data JPA

-   Banco de dados H2 (em memória, para desenvolvimento)

-   Maven

### Frontend

-   Angular 19.2.4

-   TypeScript

-   Angular Material

-   ViaCEP API (para busca de endereços por CEP)

-   Node.js e npm

Pré-requisitos

--------------

Antes de começar, certifique-se de ter as seguintes ferramentas instaladas no seu sistema:

### Backend

-   [Java 11](https://www.oracle.com/java/technologies/javase/jdk11-archive-downloads.html) ou superior

-   [Maven](https://maven.apache.org/download.cgi) (para gerenciar dependências e build do projeto)

-   Um IDE como IntelliJ IDEA ou Eclipse (opcional, mas recomendado)

### Frontend

-   [Node.js](https://nodejs.org/en/download/) (versão 18.x ou superior recomendada)

-   [npm](https://www.npmjs.com/) (geralmente instalado junto com o Node.js)

-   [Angular CLI](https://angular.dev/cli) (instalado globalmente)

-   Um editor de código como Visual Studio Code (recomendado)

Estrutura do Projeto

--------------------

O projeto está dividido em dois diretórios principais:

-   **seguradora-backend**: Contém o código do backend (Spring Boot).

-   **seguradora-frontend**: Contém o código do frontend (Angular).

Instruções de Instalação e Execução

-----------------------------------

### 1\. Configuração e Execução do Backend

#### Passo 1: Clonar o Repositório (se aplicável)

Se o projeto estiver em um repositório Git, clone-o para sua máquina:

`git clone https://github.com/LucasMorlino/TokioMarine_Prova.git `

`cd seguradora-backend`

#### Passo 2: Verificar o Java e o Maven

Certifique-se de que o Java 11 e o Maven estão instalados:

`java -version`

`mvn -version`

#### Passo 3: Configurar o Banco de Dados

O projeto usa o banco de dados H2 em memória por padrão, então não é necessário configurar um banco de dados externo. As configurações estão no arquivo src/main/resources/application.properties:

`spring.datasource.url=jdbc:h2:mem:testdb` 

`spring.datasource.driverClassName=org.h2.Driver` 

`spring.datasource.username=sa spring.datasource.password=` 

`spring.jpa.database-platform=org.hibernate.dialect.H2Dialect` 

`spring.h2.console.enabled=true` 

`spring.jpa.hibernate.ddl-auto=update`

#### Passo 4: Instalar Dependências e Executar o Backend

No diretório seguradora-backend, execute os seguintes comandos:

`mvn clean install` 

`mvn spring-boot:run`

-   O backend será iniciado na porta 8080 (http://localhost:8080).

-   Você pode testar as APIs usando ferramentas como o Postman:

    -   GET http://localhost:8080/clients (listar clientes)

    -   POST http://localhost:8080/clients (criar cliente)

    -   POST http://localhost:8080/addresses (criar endereço)

### 2\. Configuração e Execução do Frontend

#### Passo 1: Clonar o Repositório (se aplicável)

Se você ainda não clonou o repositório, faça isso e navegue até o diretório do frontend:

`cd seguradora-frontend`

#### Passo 2: Verificar o Node.js e o Angular CLI

Certifique-se de que o Node.js e o Angular CLI estão instalados:

`node -v`

`npm -v`

`ng version`

Se o Angular CLI não estiver instalado, instale-o globalmente:

`npm install -g @angular/cli`

#### Passo 3: Instalar Dependências

No diretório seguradora-frontend, instale as dependências do projeto:

`npm install`

#### Passo 4: Executar o Frontend

Inicie o servidor de desenvolvimento do Angular:

`ng serve`

-   O frontend será iniciado na porta 4200 (http://localhost:4200).

-   Abra o navegador e acesse http://localhost:4200 para ver a aplicação.

### 3\. Testando a Aplicação

1\.  Certifique-se de que o backend está rodando (http://localhost:8080).

2\.  Acesse o frontend em http://localhost:4200.

3\.  Você verá uma tabela com a lista de clientes.

4\.  Use os botões para:

    -   Criar um novo cliente.

    -   Editar ou excluir um cliente existente.

    -   Adicionar um endereço a um cliente (com busca automática por CEP usando a API do ViaCEP).

    -   Expandir a linha de um cliente para ver os endereços associados.

Funcionalidades

---------------

### Backend

-   API REST para gerenciamento de clientes (/clients) e endereços (/addresses).

-   Persistência de dados usando o banco H2.

-   Suporte a CORS para permitir requisições do frontend.

### Frontend

-   Interface com Angular Material para uma experiência de usuário moderna.

-   Tabela expansível para listar clientes e seus endereços.

-   Formulários para criar/editar clientes e endereços.

-   Busca automática de endereço por CEP usando a API do ViaCEP.

-   Notificações de erro usando MatSnackBar.

Possíveis Melhorias Futuras

---------------------------

-   Configurar um banco de dados persistente (como MySQL ou PostgreSQL) no backend.

-   Adicionar validações mais robustas no frontend e backend.

-   Implementar autenticação e autorização.

-   Adicionar testes unitários e de integração.

-   Hospedar a aplicação em um ambiente de produção (ex.: AWS, Heroku).

Solução de Problemas

--------------------

### Erro NullInjectorError: No provider for _HttpClient! no Frontend

-   Certifique-se de que provideHttpClient() está incluído no app.config.ts.

-   Verifique se o main.ts e o main.server.ts estão usando o appConfig corretamente.

### Erro status 500 ao Salvar no Backend

-   Verifique o console do Spring Boot para detalhes do erro.

-   Confirme se o formato dos dados enviados pelo frontend corresponde ao esperado pelo backend.

### Problemas com o ViaCEP

-   Certifique-se de que sua máquina tem acesso à internet.

-   Verifique se o CEP inserido é válido.
