Serviço de Leitura de Imagens para Consumo de Água e Gás
Descrição
Este projeto desenvolve o back-end de um serviço para gerenciar a leitura individualizada de consumo de água e gás. O serviço utiliza IA para obter medições através da foto de um medidor, oferecendo uma API RESTful para interagir com o sistema. O projeto é implementado em Node.js com TypeScript e utiliza Docker para criação e gestão de containers.

Funcionalidades
Endpoints da API:

POST /upload
Recebe uma imagem e um tipo de leitura.
Gera um UUID para a medição e armazena os dados no banco.
PATCH /confirm
Atualiza a medição com o valor confirmado.
Marca a medição como confirmada no banco de dados.
GET /<customer_code>/list
Lista todas as medições realizadas por um cliente específico.
Permite filtrar por tipo de medição (WATER ou GAS).
Integração com a API do Google Gemini

Utiliza a API do Google Gemini para processar e analisar imagens de medidores.
Tecnologias Utilizadas
Node.js com TypeScript para o desenvolvimento da API.
PostgreSQL para gerenciamento de banco de dados.
Docker para criação e gerenciamento de containers.
Git para controle de versão.
Instalação e Execução
Clone o repositório:

bash
Copiar código
git clone <URL do repositório>
Instale as dependências:

bash
Copiar código
cd <nome do diretório>
npm install
Configure as variáveis de ambiente:

Crie um arquivo .env na raiz do projeto e adicione as seguintes variáveis:

makefile
Copiar código
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=your_database
GEMINI_API_KEY=your_gemini_api_key
Suba os containers Docker:

bash
Copiar código
docker-compose up --build
Isso iniciará o banco de dados e o serviço de API.

Crie a tabela no banco de dados:

Execute o script para criar a tabela no banco de dados PostgreSQL:

bash
Copiar código
node path/to/createTable.js
Teste os endpoints:

Utilize ferramentas como Postman para testar os seguintes endpoints:

POST /analyze-image
PATCH /confirm
GET /<customer_code>/list
Estrutura do Projeto
src/: Código fonte do projeto.
controllers/: Controladores para lidar com a lógica das rotas.
routes/: Definição das rotas da API.
config/: Configurações do banco de dados e outras configurações.
utils/: Funções utilitárias e helpers.
docker-compose.yml: Arquivo de configuração do Docker Compose.
Dockerfile: Arquivo de configuração para construção do container Docker.
README.md: Este arquivo de documentação.
