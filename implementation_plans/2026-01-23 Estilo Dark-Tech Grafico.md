# Plano de Implementação: Estilo Dark-Tech no Gráfico Life Analytics

> **Data:** 2026-01-23  
> **Objetivo:** Aplicar estética dark-tech com cores neon, botões translúcidos e correlação minimalista

---

## 1. Resumo das Alterações

| Elemento             | Estado Atual       | Estado Dark-Tech                                 |
| -------------------- | ------------------ | ------------------------------------------------ |
| Botões ativos        | Cor sólida         | Fundo `rgba(cor, 0.15)` + borda `rgba(cor, 0.4)` |
| Texto botão ativo    | Branco             | Cor da categoria                                 |
| Cores das linhas     | Cores básicas      | Cores neon mais claras                           |
| Correlação           | 2 linhas com nomes | 1 linha, apenas valores coloridos                |
| Separador correlação | Pipe texto         | Pipe texto mantido                               |

---

## 2. Nova Paleta de Cores

| Categoria | Cor Atual    | Cor Neon Dark-Tech |
| --------- | ------------ | ------------------ |
| Normal    | `#3b82f6`    | `#60a5fa`          |
| Shorts    | `#f97316`    | `#fb923c`          |
| Music     | `#ef4444`    | `#f87171`          |
| Journal   | branco/cinza | `#a855f7` (roxo)   |

---

## 3. Estilo dos Botões (Dark-Tech)

### Botão Ativo

```css
backgroundColor: rgba(cor, 0.15)
borderColor: rgba(cor, 0.4)
color: cor
```

### Botão Inativo

```css
backgroundColor: transparent
borderColor: var(--border)
color: var(--text-muted)
```

---

## 4. Layout da Correlação

**Antes:**

```
Correlação (Pearson):
Normal: 0.63 | Shorts: 0.63 | Music: 0.21
```

**Depois:**

```
Correlação (Pearson): 0.63 | 0.63 | 0.21
                     (azul) (lar)  (verm)
```

Cada valor tem a cor da sua categoria. Sem nomes - a cor indica.

---

## 5. Alterações no Código

### 5.1 Novas Cores

```javascript
const colors = {
  normal: "#60a5fa", // Azul neon
  shorts: "#fb923c", // Laranja neon
  music: "#f87171", // Vermelho neon
  journal: "#a855f7", // Roxo
};
```

### 5.2 Botões Toggle Dark-Tech

```javascript
style={{
  backgroundColor: activeCategories[cat]
    ? `rgba(${hexToRgb(colors[cat])}, 0.15)`
    : 'transparent',
  borderColor: activeCategories[cat]
    ? `rgba(${hexToRgb(colors[cat])}, 0.4)`
    : 'var(--border)',
  color: activeCategories[cat]
    ? colors[cat]
    : 'var(--text-muted)'
}}
```

### 5.3 Correlação Inline com Cores

```javascript
const getCorrelations = () => {
  const correlations =
    period === "weekly"
      ? lifeData.stats.correlation_weekly
      : lifeData.stats.correlation_monthly;

  const active = [];
  if (activeCategories.normal)
    active.push({
      value: correlations.journal_vs_normal,
      color: colors.normal,
    });
  if (activeCategories.shorts)
    active.push({
      value: correlations.journal_vs_shorts,
      color: colors.shorts,
    });
  if (activeCategories.music)
    active.push({ value: correlations.journal_vs_music, color: colors.music });

  return active;
};
```

### 5.4 Renderização da Correlação

```jsx
<div className="mt-2 flex items-center gap-1 flex-wrap">
  <span
    className="text-[10px] font-medium"
    style={{ color: "var(--text-muted)" }}
  >
    Correlação (Pearson):
  </span>
  {getCorrelations().map((item, index) => (
    <React.Fragment key={index}>
      {index > 0 && <span style={{ color: "var(--text-muted)" }}>|</span>}
      <span className="text-[10px] font-bold" style={{ color: item.color }}>
        {item.value.toFixed(2)}
      </span>
    </React.Fragment>
  ))}
</div>
```

---

## 6. Função Helper hexToRgb

```javascript
const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
    : "0, 0, 0";
};
```

---

## 7. Checklist

- [ ] Atualizar paleta de cores para neon
- [ ] Implementar função hexToRgb
- [ ] Refatorar estilo dos botões toggle
- [ ] Ajustar getCorrelations para retornar array de objetos
- [ ] Refatorar renderização da correlação para 1 linha com cores
- [ ] Atualizar cores das linhas do gráfico
- [ ] Build e teste

---

## 8. Arquivo a Modificar

```
src/components/SidebarAnalytics.jsx
```
