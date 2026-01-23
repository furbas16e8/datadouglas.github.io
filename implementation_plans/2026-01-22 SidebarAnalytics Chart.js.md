# Plano de Implementação: Gráfico Chart.js no SidebarAnalytics

> **Data:** 2026-01-22  
> **Projeto:** datadouglas.github.io  
> **Componente:** SidebarAnalytics.jsx  
> **Objetivo:** Substituir gráfico SVG mockado por gráfico Chart.js interativo com dados reais

---

## 1. Visão Geral

### 1.1 Estado Atual

- Gráfico SVG com curvas bezier hardcoded
- Dados mockados ("2.5M+")
- Sem interatividade

### 1.2 Estado Desejado

- Gráfico Chart.js com dados reais do `life_analytics_detailed.json`
- Dropdown para selecionar categoria (Normal, Shorts, Music, Todas)
- Toggle para período (Semanal / Mensal)
- Correlação dinâmica (Pearson) exibida abaixo do gráfico
- Tooltip no hover

---

## 2. Arquitetura

```
┌─────────────────────────────────────────────────────────────┐
│  LIFE ANALYTICS                                    [info]   │
├─────────────────────────────────────────────────────────────┤
│  [▼ Categoria ]                    [Semanal] [Mensal]       │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   ─── Normal (azul)      ─── Shorts (laranja)              │
│   ─── Music (vermelho)   ─── Journal (branco)              │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│   Correlação (Pearson): 0.625                               │
└─────────────────────────────────────────────────────────────┘
```

---

## 3. Especificações Técnicas

### 3.1 Dependências

| Dependência | Método | URL/Comando                             |
| ----------- | ------ | --------------------------------------- |
| Chart.js    | CDN    | `https://cdn.jsdelivr.net/npm/chart.js` |

Adicionar no `index.html` antes do bundle:

```html
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
```

### 3.2 Cores das Linhas

| Categoria | Cor      | Hex                                  |
| --------- | -------- | ------------------------------------ |
| Normal    | Azul     | `#3b82f6`                            |
| Shorts    | Laranja  | `#f97316`                            |
| Music     | Vermelho | `#ef4444`                            |
| Journal   | Branco   | `#ffffff` (dark) / `#374151` (light) |

### 3.3 Estrutura de Dados (JSON)

Fonte: `src/projects/life_analytics_detailed.json`

```json
{
  "weekly": [
    {
      "label": "S42/2024",
      "normal": { "raw": 174, "normalized": 51.1 },
      "shorts": { "raw": 614, "normalized": 37.66 },
      "music": { "raw": 181, "normalized": 27.32 },
      "journal": { "raw": 9, "normalized": 39.13 }
    }
  ],
  "stats": {
    "correlation_weekly": {
      "journal_vs_normal": 0.216,
      "journal_vs_shorts": -0.014,
      "journal_vs_music": 0.002,
      "journal_vs_total": 0.028
    },
    "correlation_monthly": { ... }
  }
}
```

### 3.4 Estado do Componente

```javascript
const [period, setPeriod] = useState("monthly"); // 'weekly' | 'monthly'
const [category, setCategory] = useState("all"); // 'normal' | 'shorts' | 'music' | 'all'
```

### 3.5 Mapeamento Categoria → Correlação

| Categoria | Chave JSON          |
| --------- | ------------------- |
| Normal    | `journal_vs_normal` |
| Shorts    | `journal_vs_shorts` |
| Music     | `journal_vs_music`  |
| Todas     | `journal_vs_total`  |

---

## 4. Componentes a Criar/Modificar

### 4.1 Arquivos

| Arquivo                | Ação      | Descrição                      |
| ---------------------- | --------- | ------------------------------ |
| `index.html`           | MODIFICAR | Adicionar CDN do Chart.js      |
| `SidebarAnalytics.jsx` | MODIFICAR | Implementar gráfico interativo |

### 4.2 Estrutura do Componente Refatorado

```
SidebarAnalytics
├── Card "Life Analytics"
│   ├── Header (título + info button)
│   ├── Controls
│   │   ├── CategoryDropdown (custom styled)
│   │   └── PeriodToggle (Semanal/Mensal)
│   ├── ChartContainer
│   │   └── <canvas> (Chart.js)
│   ├── Legend (quando "Todas" selecionado)
│   └── CorrelationDisplay
├── Card "Screen Time" (sem alterações)
└── Card "Trending" (sem alterações)
```

---

## 5. Lógica de Renderização

### 5.1 Datasets por Categoria

| Seleção | Datasets renderizados                        |
| ------- | -------------------------------------------- |
| Normal  | Normal + Journal (2 linhas)                  |
| Shorts  | Shorts + Journal (2 linhas)                  |
| Music   | Music + Journal (2 linhas)                   |
| Todas   | Normal + Shorts + Music + Journal (4 linhas) |

### 5.2 Configuração do Chart.js

```javascript
{
  type: 'line',
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false }, // Legenda customizada
      tooltip: { enabled: true }
    },
    scales: {
      x: { display: false }, // Ocultar eixo X (espaço limitado)
      y: {
        display: false,
        min: 0,
        max: 100      // Valores normalizados
      }
    },
    elements: {
      line: { tension: 0.4 }, // Curvas suaves
      point: { radius: 0 }    // Sem pontos (cleaner)
    }
  }
}
```

---

## 6. Passos de Implementação

### Fase 1: Preparação

1. [ ] Adicionar CDN do Chart.js no `index.html`
2. [ ] Verificar se JSON é acessível via fetch ou import

### Fase 2: Componente

3. [ ] Criar estado para `period` e `category`
4. [ ] Criar dropdown customizado para categoria
5. [ ] Criar toggle buttons para período
6. [ ] Carregar dados do JSON
7. [ ] Implementar canvas + Chart.js
8. [ ] Implementar lógica de atualização do gráfico
9. [ ] Exibir correlação dinâmica

### Fase 3: Estilo

10. [ ] Estilizar dropdown (dark/light mode)
11. [ ] Estilizar toggle buttons
12. [ ] Ajustar altura para `h-36`
13. [ ] Adicionar legenda quando "Todas"

### Fase 4: Polimento

14. [ ] Testar responsividade
15. [ ] Testar dark/light mode
16. [ ] Rebuild do bundle

---

## 7. Dropdown Customizado

### 7.1 Opções

| Value    | Label  |
| -------- | ------ |
| `normal` | Normal |
| `shorts` | Shorts |
| `music`  | Music  |
| `all`    | Todas  |

### 7.2 Estilo Visual

```
┌──────────────────────┐
│  ▼ Todas             │  ← Botão que abre dropdown
└──────────────────────┘
       ↓ (quando aberto)
┌──────────────────────┐
│    Normal            │
│    Shorts            │
│    Music             │
│  ✓ Todas             │  ← Item selecionado
└──────────────────────┘
```

---

## 8. Toggle de Período

### 8.1 Visual

```
┌─────────────┬─────────────┐
│   Semanal   │   Mensal    │  ← Botões lado a lado
└─────────────┴─────────────┘
      (ativo)     (inativo)
```

### 8.2 Estados

| Estado  | Estilo                               |
| ------- | ------------------------------------ |
| Ativo   | Background com cor, texto destacado  |
| Inativo | Background transparente, texto muted |

---

## 9. Verificação

### 9.1 Checklist de Testes

- [ ] Gráfico renderiza com dados reais
- [ ] Dropdown alterna categorias corretamente
- [ ] Toggle alterna entre semanal/mensal
- [ ] Correlação atualiza dinamicamente
- [ ] Tooltip funciona no hover
- [ ] Dark mode funciona
- [ ] Light mode funciona
- [ ] Build não quebra

### 9.2 Comandos de Build

```powershell
cd c:\Users\dougf\OneDrive\Documentos\GitHub\datadouglas.github.io
npm run build
```

---

## 10. Referências

- [Chart.js Documentation](https://www.chartjs.org/docs/latest/)
- [Chart.js Line Chart](https://www.chartjs.org/docs/latest/charts/line.html)
- Dados: `src/projects/life_analytics_detailed.json`
