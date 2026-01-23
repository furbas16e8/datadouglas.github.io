# Plano de Implementação: Refatoração Visual do Gráfico Life Analytics

> **Data:** 2026-01-23  
> **Projeto:** datadouglas.github.io  
> **Componente:** SidebarAnalytics.jsx  
> **Objetivo:** Melhorar UX do gráfico com botões toggle, eixos visíveis e correlação detalhada

---

## 1. Resumo das Alterações

| Elemento            | Estado Atual | Estado Desejado                        |
| ------------------- | ------------ | -------------------------------------- |
| Botões de categoria | Dropdown     | 3 botões toggle independentes          |
| Estado ativo        | N/A          | Fundo colorido (azul/laranja/vermelho) |
| Estado inativo      | N/A          | Sem cor (cinza/transparente)           |
| Eixo X              | Oculto       | Visível (MM/YY: 10/24, 11/24...)       |
| Eixo Y              | Oculto       | Visível (0-100%)                       |
| Legenda flutuante   | Presente     | Removida                               |
| Correlação          | Valor único  | Lista separada por categoria           |
| Tooltip info        | Não existe   | Tooltip científico                     |

---

## 2. Especificações Detalhadas

### 2.1 Botões de Categoria

**Layout:**

```
[Normal] [Shorts] [Music]   [Semanal] [Mensal]
 (azul)  (laranja) (verm)
```

**Comportamento:**

- Cada botão é um toggle independente
- Múltiplas seleções permitidas
- Clique ativa/desativa a categoria
- Estado persiste entre trocas de período

**Cores:**
| Categoria | Cor Ativo | Cor Inativo |
|-----------|-----------|-------------|
| Normal | `#3b82f6` (azul) | transparente/cinza |
| Shorts | `#f97316` (laranja) | transparente/cinza |
| Music | `#ef4444` (vermelho) | transparente/cinza |

**Linhas Exibidas:**
| Seleção | Linhas |
|---------|--------|
| Normal ✓ | Normal + Journal |
| Normal ✓, Shorts ✓ | Normal + Shorts + Journal |
| Todos ✓ | Normal + Shorts + Music + Journal |
| Nenhum | Apenas Journal |

### 2.2 Eixos do Gráfico

**Eixo X:**

- Formato: `MM/YY` (ex: 10/24, 11/24, 12/24, 01/25)
- Fonte pequena (~9px)
- Cor: `var(--text-muted)`

**Eixo Y:**

- Range: 0-100 (valores normalizados)
- Exibir: 0, 50, 100
- Cor: `var(--text-muted)`

### 2.3 Legenda Flutuante

**Ação:** Deletar completamente
**Razão:** Botões coloridos servem como legenda implícita

### 2.4 Correlação

**Formato:** Lista separada por categoria ativa

**Exemplos:**

- 1 categoria: `Normal: 0.632`
- 2 categorias: `Normal: 0.632 | Shorts: 0.634`
- 3 categorias: `Normal: 0.632 | Shorts: 0.634 | Music: 0.208`
- Nenhuma: (não exibir correlação ou exibir "—")

### 2.5 Tooltip do Ícone Info

**Texto:**

> "Correlação de Pearson entre variáveis: journaling (registros) e consumo de mídia (visualizações normalizadas via Min-Max)."

**Comportamento:**

- Aparecer ao hover no ícone `[info]`
- Posição: abaixo ou ao lado do ícone
- Estilo: caixa pequena com fundo escuro/claro conforme tema

---

## 3. Alterações no Código

### 3.1 Estado do Componente

**Antes:**

```javascript
const [category, setCategory] = React.useState("all");
```

**Depois:**

```javascript
const [activeCategories, setActiveCategories] = React.useState({
  normal: true,
  shorts: true,
  music: true,
});
```

### 3.2 Função Toggle

```javascript
const toggleCategory = (cat) => {
  setActiveCategories((prev) => ({
    ...prev,
    [cat]: !prev[cat],
  }));
};
```

### 3.3 Configuração Chart.js - Eixos

```javascript
scales: {
  x: {
    display: true,
    ticks: {
      font: { size: 9 },
      color: 'var(--text-muted)',
      callback: (value, index) => {
        // Converter label para MM/YY
        const label = data[index].label;
        // Extrair mês/ano do label original
        return formatToMMYY(label);
      }
    }
  },
  y: {
    display: true,
    min: 0,
    max: 100,
    ticks: {
      stepSize: 50,
      font: { size: 9 },
      color: 'var(--text-muted)'
    }
  }
}
```

### 3.4 Função Formatação de Label

```javascript
const formatToMMYY = (label) => {
  // label mensal: "Out/2024" → "10/24"
  // label semanal: "S42/2024" → usar mês aproximado
  const months = {
    Jan: "01",
    Fev: "02",
    Mar: "03",
    Abr: "04",
    Mai: "05",
    Jun: "06",
    Jul: "07",
    Ago: "08",
    Set: "09",
    Out: "10",
    Nov: "11",
    Dez: "12",
  };
  // Implementar lógica de parsing
};
```

### 3.5 Cálculo de Correlação

```javascript
const getCorrelations = () => {
  const correlations =
    period === "weekly"
      ? lifeData.stats.correlation_weekly
      : lifeData.stats.correlation_monthly;

  const active = [];
  if (activeCategories.normal)
    active.push(`Normal: ${correlations.journal_vs_normal.toFixed(3)}`);
  if (activeCategories.shorts)
    active.push(`Shorts: ${correlations.journal_vs_shorts.toFixed(3)}`);
  if (activeCategories.music)
    active.push(`Music: ${correlations.journal_vs_music.toFixed(3)}`);

  return active.join(" | ") || "—";
};
```

---

## 4. Checklist de Implementação

### Fase 1: Estado e Botões

- [ ] Substituir estado `category` por `activeCategories`
- [ ] Criar função `toggleCategory`
- [ ] Remover dropdown
- [ ] Criar 3 botões toggle com cores dinâmicas

### Fase 2: Eixos

- [ ] Habilitar eixo X com display: true
- [ ] Implementar callback de formatação MM/YY
- [ ] Habilitar eixo Y com ticks 0, 50, 100

### Fase 3: Legenda e Correlação

- [ ] Remover div da legenda flutuante
- [ ] Implementar `getCorrelations()` para lista separada
- [ ] Atualizar exibição da correlação

### Fase 4: Tooltip Info

- [ ] Adicionar tooltip ao ícone info
- [ ] Texto científico sobre Pearson e Min-Max
- [ ] Estilizar para dark/light mode

### Fase 5: Build e Teste

- [ ] `npm run build`
- [ ] Testar todas as combinações de botões
- [ ] Verificar dark/light mode
- [ ] Verificar responsividade

---

## 5. Arquivo a Modificar

```
src/components/SidebarAnalytics.jsx
```

Após editar:

```powershell
npm run build
```
