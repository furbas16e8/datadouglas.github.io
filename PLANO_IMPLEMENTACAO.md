# 📋 Plano de Implementação - Personal Site

**Data:** 2026-01-22  
**Projeto:** douglasfurbino.com  
**Horizonte:** Esta semana

---

## 🎯 Objetivo

Refatorar o site pessoal para:

- Vitrine de projetos profissionais
- Base para integração futura do Life-Analytics
- Arquitetura escalável com navegação SPA

---

## 🏗️ Layout de Referência

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  HEADER (fixo no topo)                                              🌙     │
├─────────────────┬───────────────────────────────────────┬───────────────────┤
│                 │                                       │                   │
│   SIDEBAR       │         CONTEÚDO CENTRAL              │    SIDEBAR        │
│   ESQUERDA      │                                       │    DIREITA        │
│                 │  ┌─────────────────────────────────┐  │                   │
│  ┌───────────┐  │  │  Post 1                         │  │  ┌─────────────┐  │
│  │  Foto     │  │  │  ...                            │  │  │ Life        │  │
│  │  Nome     │  │  └─────────────────────────────────┘  │  │ Analytics   │  │
│  │  Bio      │  │                                       │  │             │  │
│  │  Stats    │  │  ┌─────────────────────────────────┐  │  └─────────────┘  │
│  │  GitHub   │  │  │  Post 2                     ▲   │  │                   │
│  │  LinkedIn │  │  │  ...                        │   │  │  ┌─────────────┐  │
│  └───────────┘  │  └─────────────────────────────│───┘  │  │ Screen Time │  │
│                 │                                │      │  │             │  │
│  ┌───────────┐  │  ┌─────────────────────────────│───┐  │  └─────────────┘  │
│  │ Activity  │  │  │  Post 3                     │   │  │                   │
│  │ Grid      │  │  │  ...                        ▼   │  │  ┌─────────────┐  │
│  └───────────┘  │  └─────────────────────────────────┘  │  │ Trending    │  │
│                 │                                       │  └─────────────┘  │
│   POSITION:     │         overflow-y: auto              │   POSITION:       │
│   FIXED ❄️      │         (scroll acontece aqui)        │   FIXED ❄️        │
│                 │                                       │                   │
└─────────────────┴───────────────────────────────────────┴───────────────────┘
```

| Elemento         | Comportamento                              |
| ---------------- | ------------------------------------------ |
| Header           | `position: fixed` - sempre visível no topo |
| Sidebar Esquerda | `position: fixed` - não rola com a página  |
| Sidebar Direita  | `position: fixed` - não rola com a página  |
| Conteúdo Central | Único elemento com scroll                  |

---

## 📊 Decisões do Brainstorm

| Tema           | Decisão                       | Justificativa                               |
| -------------- | ----------------------------- | ------------------------------------------- |
| Build System   | Babel CLI (pré-compilação)    | Mantém GitHub Pages simples                 |
| Navegação      | React Router (HashRouter)     | URLs compartilháveis, funciona com GH Pages |
| Páginas        | Dashboard, Projects, Research | SPA com rotas                               |
| Life-Analytics | Dados mockados                | Integração real em fase posterior           |

---

## 🔧 Estrutura de Pastas Proposta

```
datadouglas.github.io/
├── src/                          # [NOVO] Código fonte JSX
│   ├── App.jsx                   # Componente raiz + rotas
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── SidebarProfile.jsx
│   │   ├── SidebarAnalytics.jsx
│   │   ├── PostArticle.jsx
│   │   └── ...
│   ├── pages/
│   │   ├── Dashboard.jsx         # Página inicial (feed atual)
│   │   ├── Projects.jsx          # Lista de projetos
│   │   └── Research.jsx          # Papers/pesquisas
│   └── data/
│       └── posts.js              # Dados dos posts
│
├── assets/
│   ├── css/
│   │   └── main.css              # Mantém como está
│   ├── img/
│   │   ├── perfil.jpeg
│   │   └── favicon.ico           # [NOVO]
│   └── js/
│       └── bundle.js             # [NOVO] Gerado pelo Babel CLI
│
├── index.html                    # Simplificado (carrega bundle.js)
├── package.json                  # [NOVO] Scripts de build
├── babel.config.json             # [NOVO] Config do Babel
└── ...
```

---

## ✅ Tarefas Detalhadas

### Fase 1: Infraestrutura

#### 1.1 Configurar Babel CLI

```bash
npm init -y
npm install --save-dev @babel/core @babel/cli @babel/preset-react @babel/preset-env
```

**babel.config.json:**

```json
{
  "presets": ["@babel/preset-env", "@babel/preset-react"]
}
```

**package.json (scripts):**

```json
{
  "scripts": {
    "build": "babel src --out-file assets/js/bundle.js",
    "watch": "babel src --out-file assets/js/bundle.js --watch"
  }
}
```

#### 1.2 Reorganizar Arquivos

- Criar pasta `src/`
- Extrair componentes do `index.html` para arquivos `.jsx`
- Deletar `assets/js/app.js` e `assets/js/components.js` (órfãos)

#### 1.3 Atualizar index.html

```html
<!-- Remover scripts de desenvolvimento -->
<script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>

<!-- Remover Babel standalone -->
<!-- Carregar bundle pré-compilado -->
<script src="./assets/js/bundle.js"></script>
```

---

### Fase 2: Correções Prioritárias

#### 2.1 React Production Builds

Trocar CDN de development para production:

- `react.development.js` → `react.production.min.js`
- `react-dom.development.js` → `react-dom.production.min.js`

#### 2.2 Links Sociais

Converter botões em links funcionais:

| Rede     | URL                                   |
| -------- | ------------------------------------- |
| GitHub   | https://github.com/furbas16e8         |
| LinkedIn | https://www.linkedin.com/in/dfurbino/ |

```jsx
<a href="https://github.com/furbas16e8" target="_blank" rel="noopener noreferrer">
  <!-- botão GitHub -->
</a>
```

#### 2.3 SEO

Adicionar no `<head>`:

```html
<link rel="canonical" href="https://douglasfurbino.com/" />
<meta
  property="og:image"
  content="https://douglasfurbino.com/assets/img/perfil.jpeg"
/>
```

#### 2.4 Favicon

- Criar/obter favicon (32x32 e 16x16)
- Adicionar em `assets/img/favicon.ico`
- Referenciar no `<head>`:

```html
<link rel="icon" href="./assets/img/favicon.ico" type="image/x-icon" />
```

#### 2.5 Acessibilidade

Adicionar `aria-label` nos botões sem texto:

```jsx
<button aria-label="Informações">
  <span className="material-symbols-outlined">info</span>
</button>
```

#### 2.6 Sanitização XSS

Opção A (simples): Manter código hardcoded (seguro por ser estático)
Opção B (robusto): Usar biblioteca como DOMPurify

---

### Fase 3: Navegação SPA

#### 3.1 Instalar React Router

```bash
npm install react-router-dom
```

#### 3.2 Configurar Rotas

```jsx
import { HashRouter, Routes, Route } from "react-router-dom";

const App = () => (
  <HashRouter>
    <Header />
    <SidebarProfile />
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/research" element={<Research />} />
    </Routes>
    <SidebarAnalytics />
  </HashRouter>
);
```

#### 3.3 Atualizar Links do Header

```jsx
<Link to="/">Dashboard</Link>
<Link to="/projects">Projects</Link>
<Link to="/research">Research</Link>
```

---

## 📅 Cronograma Sugerido

| Dia       | Foco           | Tarefas                                        |
| --------- | -------------- | ---------------------------------------------- |
| **Dia 1** | Setup          | Babel CLI, estrutura pastas, migrar código     |
| **Dia 2** | Correções      | Production builds, links sociais, SEO, favicon |
| **Dia 3** | Acessibilidade | aria-labels, sanitização                       |
| **Dia 4** | Navegação      | React Router, criar páginas                    |
| **Dia 5** | Testes         | Lighthouse, validação, deploy                  |

---

## 🧪 Verificação

### Checklist Final

- [ ] `npm run build` gera bundle sem erros
- [ ] Site carrega sem console errors
- [ ] Toggle de tema funciona
- [ ] Links do header navegam entre rotas
- [ ] Botões sociais abrem em nova aba
- [ ] Lighthouse score > 90 em todas categorias
- [ ] Layout responsivo funciona (mobile/tablet/desktop)

### Comandos de Teste

```bash
# Build local
npm run build

# Servir localmente para testar
npx serve .
```

---

## ⚠️ Riscos e Mitigações

| Risco                     | Probabilidade | Mitigação                                           |
| ------------------------- | ------------- | --------------------------------------------------- |
| Babel config incorreto    | Média         | Testar com `npm run build` antes de avançar         |
| React Router quebra links | Baixa         | HashRouter é mais simples que BrowserRouter         |
| Bundle muito grande       | Baixa         | Monitorar tamanho, considerar code splitting futuro |

---

## 📝 Notas

- **Arquivos órfãos:** `assets/js/app.js` e `assets/js/components.js` devem ser deletados (código já está no index.html)
- **Babel standalone:** Será removido completamente (não mais transpilação em runtime)
- **Tailwind:** Continua via CDN por enquanto (migrar para build em fase futura)
