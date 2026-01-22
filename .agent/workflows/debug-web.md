---
description: Análise Completa ou Focada de Repositórios para Identificar Problemas de Código, UI, Performance e Arquitetura
---

Você está iniciando uma **sessão de debug especializada em repositórios web**.

**Determine o Escopo:**

Se o usuário especificou arquivos ou pastas:

- Concentre a análise APENAS nos arquivos/pastas mencionados
- Aprofunde-se nos detalhes específicos dessas áreas

Se o usuário NÃO especificou arquivos ou pastas:

- Realize um debug COMPLETO de todo o repositório
- Analise a estrutura do projeto, arquivos de configuração, dependências e código-fonte
- Identifique problemas em todos os níveis da aplicação

**Leia a Descrição:** Compreenda o problema, comportamento esperado vs atual, ou área de preocupação fornecida pelo usuário.

---

**Análise de Debug Web:**

Execute uma investigação completa e metódica focada em problemas típicos de sites:

**A. Problemas de Renderização e UI:**

- Identifique erros de layout, CSS quebrado ou componentes não renderizando
- Verifique problemas de responsividade em diferentes tamanhos de tela
- Detecte conflitos de estilos, especificidade CSS ou !important desnecessários
- Analise problemas de z-index, overflow, positioning ou flexbox/grid
- Identifique elementos não acessíveis ou sem semântica HTML adequada

**B. JavaScript e Interatividade:**

- Detecte event listeners não funcionando ou attachados incorretamente
- Identifique problemas com manipulação do DOM (querySelector, appendChild, etc.)
- Verifique erros em formulários, validações ou submissões
- Analise problemas com animações, transições ou interações do usuário
- Detecte referências a elementos que não existem no DOM
- Identifique closures problemáticas, memory leaks ou event listeners não removidos

**C. Carregamento e Performance:**

- Identifique recursos bloqueando a renderização (CSS/JS bloqueantes)
- Verifique imagens não otimizadas, sem lazy loading ou com caminhos quebrados
- Detecte requests desnecessários, waterfalls ou carregamentos em cascata
- Analise problemas de cache, preload ou prefetch
- Identifique fontes não carregando ou causando FOIT/FOUT
- Verifique bundle size excessivo ou code splitting inadequado

**D. Roteamento e Navegação:**

- Verifique problemas com links quebrados ou rotas não funcionando
- Identifique erros em SPAs (Single Page Applications) com navegação client-side
- Detecte problemas com histórico do navegador (pushState, replaceState)
- Analise redirects incorretos ou loops de redirecionamento
- Verifique deep linking e bookmarking funcionando corretamente

**E. Estado e Dados:**

- Identifique problemas com gerenciamento de estado (React, Vue, Svelte, etc.)
- Verifique chamadas de API falhando, endpoints incorretos ou CORS
- Detecte problemas com localStorage, sessionStorage ou cookies
- Analise dados não sincronizando entre componentes ou páginas
- Identifique race conditions em fetches ou atualizações de estado
- Verifique hydration errors em SSR

**F. Framework/Biblioteca Específico:**

- React: hooks incorretos, re-renders desnecessários, props não passados, key props faltando
- Vue: reatividade quebrada, computed properties não atualizando, lifecycle hooks incorretos
- Next.js: problemas com SSR/SSG, getServerSideProps, hydration, rotas dinâmicas
- Astro: islands não funcionando, scripts client-side não executando
- Svelte: reatividade não funcionando, stores não atualizando
- Angular: dependency injection, change detection, módulos não importados

**G. Build e Bundling:**

- Verifique problemas com webpack, vite, parcel, rollup ou outros bundlers
- Identifique módulos não resolvidos ou imports quebrados
- Detecte problemas com environment variables não carregando
- Analise erros de transpilação ou polyfills faltando
- Verifique configurações de build (tsconfig, babel, postcss)

**H. Estrutura de Projeto e Arquitetura:**

- Avalie se a estrutura de pastas é lógica e escalável
- Identifique dependências circulares ou acoplamento excessivo
- Verifique se há separation of concerns adequada
- Detecte código duplicado ou componentes que poderiam ser reutilizados
- Analise se a organização facilita manutenção e testes

**I. SEO e Meta Tags:**

- Verifique meta tags faltando ou incorretas
- Identifique problemas com Open Graph, Twitter Cards
- Detecte canonical tags incorretas ou duplicadas
- Analise robots.txt, sitemap.xml ou structured data
- Verifique título e descrição dinâmicos funcionando

**J. Responsividade e Cross-Browser:**

- Identifique problemas específicos de navegador (Safari, Firefox, Chrome, Edge)
- Verifique vendor prefixes faltando ou polyfills necessários
- Detecte features não suportadas em navegadores específicos
- Analise problemas mobile-específicos (touch events, viewport, orientação)
- Verifique media queries e breakpoints

**K. Segurança e Boas Práticas Web:**

- Identifique XSS vulnerabilities ou innerHTML inseguro
- Verifique HTTPS não configurado ou mixed content warnings
- Detecte CORS mal configurado ou headers de segurança faltando
- Analise tokens expostos, API keys no client-side
- Verifique sanitização de inputs e validação server-side

**L. Acessibilidade (a11y):**

- Identifique falta de alt text em imagens
- Verifique contraste de cores inadequado
- Detecte navegação por teclado quebrada ou focus traps
- Analise ARIA labels faltando ou incorretos
- Verifique landmarks e heading hierarchy

**M. Testes e Qualidade:**

- Identifique áreas críticas sem testes
- Verifique se testes existentes estão falhando
- Detecte mocks ou fixtures desatualizados
- Analise coverage insuficiente em áreas críticas

**N. Dependências e Pacotes:**

- Verifique dependências desatualizadas ou com vulnerabilidades
- Identifique pacotes não utilizados ou duplicados
- Detecte versões conflitantes de dependências
- Analise peer dependencies não satisfeitas

---

**Formato do Relatório:**

Organize suas descobertas em:

**🔴 CRÍTICO:** Site não carrega, erros fatais, funcionalidade completamente quebrada, vulnerabilidades de segurança
**🟠 ALTA PRIORIDADE:** Funcionalidades principais não funcionam, experiência do usuário severamente impactada
**🟡 MÉDIA PRIORIDADE:** Problemas de UX, bugs visuais, performance degradada, acessibilidade
**🟢 BAIXA PRIORIDADE:** Otimizações, melhorias de código, refatorações sugeridas

Para cada problema identificado, forneça:

- 📁 Arquivo e linha exata (ou elemento/componente)
- 🌐 Contexto web (onde aparece: página, componente, rota)
- ❌ Descrição clara do problema
- 🔍 Como reproduzir (se aplicável)
- ⚠️ Impacto na experiência do usuário
- ✅ Correção sugerida com código de exemplo quando relevante

**Se análise completa do repositório:**
Inicie com um resumo executivo destacando:

- Estado geral da saúde do projeto
- Principais áreas de preocupação
- Recomendações prioritárias

---

**Importante:** Esta é uma análise diagnóstica. NÃO modifique o código durante este debug. Apenas identifique e reporte os problemas encontrados.

Ao final, se houver comportamento esperado vs atual descrito pelo usuário, forneça um diagnóstico específico explicando a causa raiz da divergência, incluindo possíveis testes no DevTools do navegador ou comandos para reproduzir o problema.
