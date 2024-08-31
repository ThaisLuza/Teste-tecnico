# Serviço de Leitura de Imagens para Consumo de Água e Gás

## Descrição

Este projeto desenvolve o back-end de um serviço para gerenciar a leitura individualizada de consumo de água e gás. O serviço utiliza IA para obter medições através da foto de um medidor, oferecendo uma API RESTful para interagir com o sistema. O projeto é implementado em Node.js com TypeScript e utiliza Docker para criação e gestão de containers.

## Funcionalidades

1. **Endpoints da API:**
   - **POST api/upload**
     - Recebe uma imagem e um tipo de leitura.
     - Gera um UUID para a medição e armazena os dados no banco.
   - **PATCH api/confirm**
     - Atualiza a medição com o valor confirmado.
     - Marca a medição como confirmada no banco de dados.
   - **GET api/<customer_code>/list**
     - Lista todas as medições realizadas por um cliente específico.
     - Permite filtrar por tipo de medição (`WATER` ou `GAS`).

2. **Integração com a API do Google Gemini**
   - Utiliza a API do Google Gemini para processar e analisar imagens de medidores.

## Tecnologias Utilizadas

- **Node.js** com **TypeScript** para o desenvolvimento da API.
- **PostgreSQL** para gerenciamento de banco de dados.
- **Docker** para criação e gerenciamento de containers.
- **Git** para controle de versão.

  O comando docker-compose up --build irá rodar a aplicação.




