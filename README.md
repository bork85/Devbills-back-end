# 💰 Devbills - Backend API

Uma API REST moderna para gerenciamento financeiro pessoal, desenvolvida com Fastify, Prisma e MongoDB.

## ✨ Características

- 🚀 **Alta Performance**: Construído com Fastify para máxima velocidade
- 🔒 **Autenticação Segura**: Integração com Firebase Admin SDK
- 📊 **Gestão Financeira**: Controle completo de receitas e despesas
- 🏷️ **Categorização**: Sistema de categorias personalizadas por tipo
- 🗄️ **MongoDB**: Banco de dados NoSQL escalável com Prisma ORM
- 📱 **CORS Configurado**: Pronto para integração com frontend
- 🎯 **TypeScript**: Código type-safe e manutenível
- ✅ **Validação**: Schemas com Zod para validação de dados

## 📁 Estrutura do Projeto

```
backend/
├── src/
│   ├── config/           # Configurações (env, firebase, prisma)
│   ├── controllers/      # Controladores da aplicação
│   │   └── transactions/ # Controladores de transações
│   ├── middlewares/      # Middlewares de autenticação
│   ├── routes/           # Definição de rotas
│   ├── schemas/          # Schemas de validação Zod
│   ├── services/         # Lógica de negócio
│   ├── types/            # Definições de tipos TypeScript
│   ├── app.ts            # Configuração do Fastify
│   └── server.ts         # Inicialização do servidor
├── prisma/
│   └── schema.prisma     # Schema do banco de dados
├── .env.example          # Exemplo de variáveis de ambiente
├── package.json          # Dependências do projeto
└── tsconfig.json         # Configuração TypeScript
```

## 🛠️ Tecnologias Utilizadas

- **Node.js**: v22.x
- **Fastify**: Framework web de alta performance
- **Prisma**: ORM moderno para TypeScript
- **MongoDB**: Banco de dados NoSQL
- **Firebase Admin**: Autenticação e autorização
- **TypeScript**: Superset JavaScript tipado
- **Zod**: Validação de schemas
- **Day.js**: Manipulação de datas
- **Biome**: Linter e formatter

## 📊 Modelo de Dados

### Category
| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | ObjectId | Identificador único |
| name | String | Nome da categoria |
| color | String | Cor para identificação visual |
| type | TransactionType | Tipo (expense/income) |
| createdAt | DateTime | Data de criação |
| updateAt | DateTime | Data de atualização |

### Transaction
| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | ObjectId | Identificador único |
| description | String | Descrição da transação |
| amount | Float | Valor da transação |
| date | DateTime | Data da transação |
| type | TransactionType | Tipo (expense/income) |
| userId | String | ID do usuário |
| categoryId | ObjectId | Referência à categoria |
| createdAt | DateTime | Data de criação |
| updateAt | DateTime | Data de atualização |

## 🚀 Como Usar

### Pré-requisitos

- Node.js v22.x ou superior
- MongoDB Atlas ou instância local
- Conta Firebase (para autenticação)

### Instalação

1. **Clone o repositório**
```bash
git clone https://github.com/bork85/Devbills-back-end.git
cd backend
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**
```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas credenciais:
- `DATABASE_URL`: String de conexão MongoDB
- `PORT`: Porta do servidor (padrão: 3001)
- `NODE_ENV`: Ambiente (dev/production)
- Credenciais Firebase Admin SDK

4. **Execute as migrations do Prisma**
```bash
npx prisma generate
npx prisma db push
```

5. **Inicie o servidor**

**Desenvolvimento:**
```bash
npm run dev
```

**Produção:**
```bash
npm start
```

O servidor estará rodando em `http://localhost:3001`

## 🔧 Scripts Disponíveis

| Script | Descrição |
|--------|-----------|
| `npm run dev` | Inicia servidor em modo desenvolvimento com hot-reload |
| `npm start` | Inicia servidor em modo produção |
| `npx prisma studio` | Abre interface visual do banco de dados |
| `npx prisma generate` | Gera o Prisma Client |

## 🔐 Autenticação

A API utiliza Firebase Admin SDK para autenticação. Todas as rotas protegidas requerem um token JWT válido no header:

```
Authorization: Bearer <firebase-token>
```

## 📝 Variáveis de Ambiente

```env
PORT=3001
DATABASE_URL=mongodb+srv://<USERNAME>:<PASSWORD>@cluster.mongodb.net/devbills
NODE_ENV=dev

# Firebase Admin SDK
FIREBASE_TYPE=
FIREBASE_PROJECT_ID=
FIREBASE_PRIVATE_KEY_ID=
FIREBASE_PRIVATE_KEY=
FIREBASE_CLIENT_EMAIL=
FIREBASE_CLIENT_ID=
FIREBASE_AUTH_URI=
FIREBASE_TOKEN_URI=
FIREBASE_AUTH_PROVIDER_X509_CERT_URL=
FIREBASE_CLIENT_X509_CERT_URL=
FIREBASE_UNIVERSE_DOMAIN=
```

## 🎯 Funcionalidades

- ✅ Criação, leitura, atualização e exclusão de transações
- ✅ Gerenciamento de categorias personalizadas
- ✅ Filtros por data e categoria
- ✅ Separação entre receitas e despesas
- ✅ Autenticação e autorização por usuário
- ✅ Inicialização automática de categorias globais
- ✅ Validação de dados com Zod

## 📄 Licença

© 2025 - Devbills - Todos os direitos reservados

---

**Versão**: 1.0.0  
**Idioma**: Português (Brasil)  
**Data de Criação**: 26 de outubro de 2025
