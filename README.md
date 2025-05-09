# 💈 SoBarba - Sistema de Agendamento para Barbearias

Um aplicativo web moderno para gerenciamento de agendamentos em barbearias. Desenvolvido com **React.js**, **TypeScript**, **Bootstrap 5** e **Axios** no Front-End.

---

## 🚀 Tecnologias Utilizadas

- ⚛️ **React.js** – Biblioteca para criação de interfaces modernas e responsivas
- 🟦 **TypeScript** – Superset de JavaScript com tipagem estática
- 🎨 **Bootstrap 5** – Estilização rápida e responsiva com componentes prontos
- 🔁 **React Router** – Gerenciamento de rotas
- 📦 **Axios** – Requisições HTTP
- 📅 **React Datepicker ou Flatpickr** – Para seleção de datas
- 🗂️ **Context API** – Gerenciamento de estado global

---

## 🧱 **Padrão de Projeto: Flat Modular (ou Clean Architecture para Frontend)**

## ✅ Featureless Clean Architecture (ou "App-level Modular Structure")

### 🧩 Também pode ser chamado de:

- **Flat Modular Structure**
- **Clean Folder Structure**
- **Padrão de Projeto Limpo (Clean Pattern) para React**
- **Minimalist Scalable React Architecture**


### 📌 Características desse modelo:

| Característica | Descrição |
| --- | --- |
| 📦 **Flat** (sem "features/") | Tudo organizado por tipo de responsabilidade |
| 🧼 **Clean** | Estrutura limpa, sem nesting excessivo |
| 🧩 **Modular** | Cada parte (context, hooks, services, etc) tem seu próprio lugar |
| 🚀 **Escalável** | Cresce bem em projetos pequenos a médios |
| 🧠 **Didático** | Fácil de entender e aplicar por qualquer dev React |

---


## 📁 Estrutura de Pastas

```bash
src/
├── assets/            # Ícones, imagens, fontes
├── components/        # Botões, inputs, modais reutilizáveis
├── pages/             # Páginas como Login, Agenda, Clientes, Serviços
├── context/           # Contextos globais (AuthContext, ScheduleContext)
├── services/          # Comunicação com APIs
├── hooks/             # Hooks customizados
├── routes/            # Sistema de rotas
├── types/             # Interfaces e enums
├── styles/            # Estilos globais e temas
│   ├── global.css
│   └── bootstrap.custom.css
├── utils/             # Funções utilitárias (ex: formatadores)
├── App.tsx            # Componente principal
└── main.tsx           # Ponto de entrada
```

---

## 📌 Funcionalidades Principais

- 🧑 Cadastro e login de usuários (barbeiros)
- 📅 Visualização e criação de agendamentos
- 🧔 Gerenciamento de clientes
- ✂️ Controle de serviços e preços
- 📊 Painel com estatísticas básicas
- 🔔 Notificações e alertas

---

## ⚙️ Como rodar localmente o projeto

```bash
# Clone o projeto
git clone https://github.com/UnoDevs/SoBarba-front-end.git

# Acesse a pasta
cd SoBarba-front-end

# Instale as dependências
npm install

# Rode o projeto
npm run dev
```

---

## 📌 Observações

- Este projeto está em constante desenvolvimento.
- Em breve: integração com APIs de pagamento, relatórios e muitos mais.

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
