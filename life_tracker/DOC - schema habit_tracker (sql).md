---
Date: 2025-12-26
Project: "[[Life_Tracker]]"
Ref.:
  - "[[Life_Tracker]]"
---

**SCHEMA:** `habit_tracker`

---

### Bloco 1: Tabela `habitos_lista` (Catálogo de Hábitos)

```sql
CREATE TABLE IF NOT EXISTS `habit_tracker`.`habitos_lista` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NOT NULL,
  `tipo_valor` ENUM("booleano", "decimal", "escala") NOT NULL,
  `unidade_medida` VARCHAR(20) NULL,
  `ativo` TINYINT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `nome_UNIQUE` (`nome` ASC) VISIBLE)
ENGINE = InnoDB
```

Tabela que funciona como o **dicionário central de hábitos** — define quais comportamentos podem ser rastreados e como devem ser medidos.

**Campos:**

- `id` → Identificador único auto-incrementado
- `nome` → Nome do hábito (ex: "Academia", "Água", "Humor", "Leitura")
  - Possui constraint `UNIQUE` para evitar duplicidades
- `tipo_valor` → Define como o hábito será quantificado:
  - `booleano` → Sim/Não (0 ou 1) — para hábitos binários como "Meditou?"
  - `decimal` → Valores numéricos com casas decimais — para quantidades como "45.5 minutos"
  - `escala` → Notas discretas — tipicamente 1 a 10 para autoavaliações
- `unidade_medida` → Unidade contextual (ex: "minutos", "km", "litros", "páginas")
  - Campo opcional, útil apenas para tipo `decimal`
- `ativo` → Flag booleana (1 = ativo, 0 = inativo) para soft-delete

**Papel no Sistema:** Esta tabela é puramente dimensional — não armazena dados de performance, apenas metadados que definem o que pode ser medido. O design permite adicionar novos hábitos sem alterar a estrutura do banco.

---

### Bloco 2: Tabela `habitos_log` (Registro Diário de Performance)

```sql
CREATE TABLE IF NOT EXISTS `habit_tracker`.`habitos_log` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `data_ref` DATE NOT NULL,
  `habito_id` INT NOT NULL,
  `valor` DECIMAL(10,2) NOT NULL,
  `detalhes` VARCHAR(255) NULL,
  `criado_em` TIMESTAMP(6) NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`),
  INDEX `habito_id_idx` (`habito_id` ASC) VISIBLE,
  UNIQUE INDEX `data_habito_unico_idx` (`data_ref` ASC, `habito_id` ASC) VISIBLE,
  CONSTRAINT `fk_habito_id`
    FOREIGN KEY (`habito_id`)
    REFERENCES `habit_tracker`.`habitos_lista` (`id`)
    ON DELETE NO ACTION ON UPDATE NO ACTION)
ENGINE = InnoDB
```

Tabela de **fatos comportamentais** — onde a performance diária é efetivamente gravada e histórica.

**Campos:**

- `id` → Identificador único
- `data_ref` → Data do registro (ex: 2025-12-25)
- `habito_id` → FK para o hábito sendo rastreado
- `valor` → Quantia/nota registrada como `DECIMAL(10,2)`:
  - Para hábitos `booleano`: 0.00 ou 1.00
  - Para hábitos `decimal`: valor contínuo (ex: 45.50, 2.00)
  - Para hábitos `escala`: nota inteira (ex: 7.00, 9.00)
- `detalhes` → Campo livre para contexto (ex: "Acordei mal", "Treino de perna")
- `criado_em` → Timestamp de auditoria com precisão de microsegundos

**Constraint Crítica — Índice Único Composto:**

```sql
UNIQUE INDEX `data_habito_unico_idx` (`data_ref` ASC, `habito_id` ASC)
```

Esta constraint garante que **cada hábito só pode ser registrado uma vez por dia**. Tentativas de inserção duplicada resultarão em erro, evitando corrupção de dados históricos.

**Papel no Sistema:** Esta é a tabela transacional do schema — onde queries de análise serão executadas para extrair padrões, correlações e tendências de comportamento ao longo do tempo.

---

### Modelo Relacional

```
┌───────────────────────────────────────────────────────────────────┐
│                        HABITOS_LISTA                               │
│         (Dicionário de Hábitos Disponíveis)                        │
│                                                                    │
│  ┌──────┬────────────────┬───────────┬──────────────┬──────────┐  │
│  │  id  │     nome       │ tipo_valor│ unidade_medida│  ativo  │  │
│  ├──────┼────────────────┼───────────┼──────────────┼──────────┤  │
│  │  1   │ Academia       │ decimal   │ minutos       │    1    │  │
│  │  2   │ Água           │ decimal   │ litros        │    1    │  │
│  │  3   │ Meditação      │ booleano  │ NULL          │    1    │  │
│  │  4   │ Humor          │ escala    │ NULL          │    1    │  │
│  └──────┴────────────────┴───────────┴──────────────┴──────────┘  │
└──────────────────────────────────┬────────────────────────────────┘
                                   │
                                   │ 1:N (um hábito, muitos logs)
                                   ▼
┌───────────────────────────────────────────────────────────────────┐
│                         HABITOS_LOG                                │
│          (Registros Diários de Performance)                        │
│                                                                    │
│  ┌──────┬────────────┬───────────┬────────┬─────────────────────┐ │
│  │  id  │  data_ref  │ habito_id │  valor │      detalhes       │ │
│  ├──────┼────────────┼───────────┼────────┼─────────────────────┤ │
│  │  1   │ 2025-12-25 │     1     │  45.00 │ Treino de perna     │ │
│  │  2   │ 2025-12-25 │     2     │   2.50 │ NULL                │ │
│  │  3   │ 2025-12-25 │     3     │   1.00 │ 15min manhã         │ │
│  │  4   │ 2025-12-25 │     4     │   8.00 │ Dia produtivo       │ │
│  └──────┴────────────┴───────────┴────────┴─────────────────────┘ │
│                                                                    │
│  UNIQUE(data_ref + habito_id) → Impede duplicidade diária          │
└───────────────────────────────────────────────────────────────────┘
```

---

### Exemplos de Queries de Análise

**Média de um hábito nos últimos 30 dias:**

```sql
SELECT AVG(l.valor) AS media_mensal
FROM habitos_log l
JOIN habitos_lista h ON l.habito_id = h.id
WHERE h.nome = 'Academia'
  AND l.data_ref >= CURDATE() - INTERVAL 30 DAY;
```

**Frequência de um hábito booleano (% de dias praticados):**

```sql
SELECT
  COUNT(CASE WHEN l.valor = 1 THEN 1 END) * 100.0 / COUNT(*) AS percentual_praticado
FROM habitos_log l
JOIN habitos_lista h ON l.habito_id = h.id
WHERE h.nome = 'Meditação'
  AND l.data_ref >= CURDATE() - INTERVAL 30 DAY;
```

**Correlação simples entre dois hábitos (humor vs academia):**

```sql
SELECT
  h1.data_ref,
  h1.valor AS humor,
  h2.valor AS academia
FROM habitos_log h1
JOIN habitos_log h2 ON h1.data_ref = h2.data_ref
WHERE h1.habito_id = (SELECT id FROM habitos_lista WHERE nome = 'Humor')
  AND h2.habito_id = (SELECT id FROM habitos_lista WHERE nome = 'Academia');
```

---

### Fluxo de Uso

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│  Novo Hábito    │────►│  habitos_lista   │     │                 │
│  (ex: Corrida)  │     │  + tipo: decimal │     │                 │
└─────────────────┘     │  + unidade: km   │     │                 │
                        └────────┬─────────┘     │                 │
                                 │               │                 │
                                 ▼               │                 │
┌─────────────────┐     ┌──────────────────┐     │ ┌─────────────┐ │
│  Registro Diário│────►│   habitos_log    │────►│ │  ANÁLISE    │ │
│  (ex: 5.5 km)   │     │  data + valor    │     │ │  Estatística│ │
└─────────────────┘     └──────────────────┘     │ │  Correlação │ │
                                │                │ │  Tendências │ │
                                │ UNIQUE INDEX   │ └─────────────┘ │
                                └────────────────┘                 │
                                                                   │
```

---

### Relacionados

- **Projeto:** [[Life_Tracker]]
- **Schema money_tracker:** [[DOC - schema money_tracker (sql)]]
