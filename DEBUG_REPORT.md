# Relatório de Debug Web

**Data:** 23/01/2026
**Contexto:** Problema de visualização das últimas alterações no GitHub Pages.

## Resumo Executivo

A investigação confirmou que o código fonte e o bundle compilado no repositório local estão sincronizados e foram commitados corretamente. O problema não é de código ou de build local, mas sim de **cache do navegador/CDN** no GitHub Pages, uma vez que o nome do arquivo `bundle.js` permanece o mesmo após as alterações.

---

## 🟡 MÉDIA PRIORIDADE

### 1. Cache de Arquivos Estáticos (Browser Caching)

- **📁 Arquivo:** `index.html` (Linha 104)
- **🌐 Contexto:** Deployment no GitHub Pages
- **❌ Problema:** O navegador reutiliza a versão antiga de `assets/js/bundle.js` porque o nome do arquivo não mudou. O GitHub Pages e os navegadores dos usuários fazem cache agressivo de arquivos estáticos.
- **🔍 Diagnóstico:**
  - `src/components/SidebarAnalytics.jsx` contém as novas alterações (eixos, toggle, correlação).
  - `assets/js/bundle.js` no disco local CONTÉM as alterações compiladas (verificado via inspeção de código).
  - `git status` mostra "clean", indicando que o bundle atualizado FOI enviado para o GitHub.
- **⚠️ Impacto:** Usuários (e você) veem a versão antiga do site, mesmo após novos deploys.
- **✅ Correção Sugerida:**
  Adicionar um parâmetro de versão (query string) na importação do script em `index.html`.

  ```html
  <!-- Em index.html -->
  <!-- Antes -->
  <script src="./assets/js/bundle.js"></script>

  <!-- Depois (Sugestão) -->
  <script src="./assets/js/bundle.js?v=20260123-1"></script>
  ```

---

## Outras Observações (Saúde do Projeto)

- **Build Manual:** O projeto depende de um processo de build local (`npm run build/watch`). Certifique-se sempre de que o comando de build rodou (ou o watcher estava ativo) antes de fazer o commit. No caso atual, isso foi feito corretamente.
- **Gitignore:** O arquivo `assets/js/bundle.js` NÃO está no `.gitignore`, o que é correto para este fluxo de trabalho sem CI/CD.

## Próximos Passos

1. **Teste Rápido:** Tente abrir sua página no GitHub Pages e usar `Ctrl + F5` (Windows) ou `Cmd + Shift + R` (Mac) para forçar o recarregamento. As alterações devem aparecer.
2. **Solução Permanente:** Autorize a alteração do `index.html` para incluir o versionamento no script tag.
