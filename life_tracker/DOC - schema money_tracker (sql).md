---
Date: 2025-12-26
Project: "[[Life_Tracker]]"
Ref.:
  - "[[Life_Tracker]]"
---

**SCHEMA:** `money_tracker`

---

### Bloco 1: Tabela `carteiras` (Origens/Destinos do Dinheiro)

```sql
CREATE TABLE IF NOT EXISTS `money_tracker`.`carteiras` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(20) NOT NULL,
  `tipo` ENUM("conta_corrente", "cartao_credito", "investimento", "especie") NOT NULL,
  `ativo` TINYINT NULL DEFAULT 1,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
```

Tabela que define **onde o dinheiro está ou pode estar**. Funciona como o dicionário central de contas e carteiras do sistema.

**Campos:**

- `id` → Identificador único auto-incrementado
- `nome` → Nome descritivo da carteira (ex: "Nubank", "Caixa-espécie")
- `tipo` → Classificação tipológica:
  - `conta_corrente` → Contas bancárias tradicionais
  - `cartao_credito` → Cartões de crédito (representam passivo)
  - `investimento` → Aplicações e fundos
  - `especie` → Dinheiro físico
- `ativo` → Flag booleana (1 = ativo, 0 = inativo) para soft-delete

**Papel no Sistema:** Toda movimentação financeira (receita, despesa ou transferência) referencia uma carteira como origem ou destino. Sem esta tabela, não há como rastrear saldos.

---

### Bloco 2: Tabela `transferencias` (Movimentação entre Carteiras)

```sql
CREATE TABLE IF NOT EXISTS `money_tracker`.`transferencias` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `data_ref` DATE NOT NULL,
  `valor` DECIMAL(10,2) NOT NULL,
  `carteira_origem` INT NOT NULL,
  `carteira_destino` INT NOT NULL,
  `detalhes` VARCHAR(255) NULL,
  `criado_em` TIMESTAMP(6) NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`),
  INDEX `fk_transf_origem_idx` (`carteira_origem` ASC) VISIBLE,
  INDEX `fk_transf_destino_idx` (`carteira_destino` ASC) VISIBLE,
  CONSTRAINT `fk_transf_origem`
    FOREIGN KEY (`carteira_origem`)
    REFERENCES `money_tracker`.`carteiras` (`id`)
    ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_transf_destino`
    FOREIGN KEY (`carteira_destino`)
    REFERENCES `money_tracker`.`carteiras` (`id`)
    ON DELETE NO ACTION ON UPDATE NO ACTION)
ENGINE = InnoDB
```

Gerencia a **movimentação de capital entre carteiras** sem alterar o patrimônio líquido — o dinheiro apenas muda de lugar.

**Campos:**

- `data_ref` → Data da transferência (ex: 2025-12-25)
- `valor` → Quantia transferida com precisão de 2 casas decimais
- `carteira_origem` → FK para a carteira de onde saiu o dinheiro
- `carteira_destino` → FK para a carteira onde entrou o dinheiro
- `detalhes` → Campo livre para observações
- `criado_em` → Timestamp de auditoria com precisão de microsegundos

**Papel no Sistema:** Permite registrar operações como "Saquei R$ 200 do Nubank para espécie" sem que isso apareça como despesa. No cálculo de saldo, a fórmula considera: `+ Transf_Destino - Transf_Origem`.

---

### Bloco 3: Tabela `categorias` (Classificação de Receitas/Despesas)

```sql
CREATE TABLE IF NOT EXISTS `money_tracker`.`categorias` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(20) NOT NULL,
  `tipo` ENUM("receita", "despesa") NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
```

Define as **grandes áreas de classificação** para receitas e despesas. É a raiz da árvore hierárquica de categorização.

**Campos:**

- `id` → Identificador único
- `nome` → Nome da categoria macro (ex: "Alimentação", "Transporte", "Salário")
- `tipo` → Define se a categoria agrupa receitas ou despesas

**Papel no Sistema:** Categorias são pais de subcategorias. O campo `tipo` determina se a categoria será usada na tabela `receitas` ou `despesas`, garantindo integridade semântica.

---

### Bloco 4: Tabela `subcategorias` (Detalhamento das Categorias)

```sql
CREATE TABLE IF NOT EXISTS `money_tracker`.`subcategorias` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `categoria_id` INT NOT NULL,
  `nome` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `categoria_id`
    FOREIGN KEY (`categoria_id`)
    REFERENCES `money_tracker`.`categorias` (`id`)
    ON DELETE NO ACTION ON UPDATE NO ACTION)
ENGINE = InnoDB
```

Permite o **detalhamento fino** de cada categoria, criando uma estrutura hierárquica de dois níveis.

**Campos:**

- `id` → Identificador único
- `categoria_id` → FK para a categoria pai
- `nome` → Nome específico da subcategoria (ex: dentro de "Alimentação" → "Restaurante", "Mercado", "Delivery")

**Papel no Sistema:** Subcategorias são vinculadas aos lançamentos de receita e despesa. Essa estrutura permite análises agregadas por categoria ou detalhadas por subcategoria.

---

### Bloco 5: Tabela `receitas` (Entradas de Capital)

```sql
CREATE TABLE IF NOT EXISTS `money_tracker`.`receitas` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `data_ref` DATE NOT NULL,
  `subcategoria_id` INT NOT NULL,
  `carteira_id` INT NOT NULL,
  `valor` DECIMAL(10,2) NOT NULL,
  `detalhes` VARCHAR(255) NULL,
  `criado_em` TIMESTAMP(6) NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`),
  INDEX `carteira_id_idx` (`carteira_id` ASC) VISIBLE,
  INDEX `subcategoria_id_idx` (`subcategoria_id` ASC) VISIBLE,
  CONSTRAINT `fk_receitas_carteira`
    FOREIGN KEY (`carteira_id`)
    REFERENCES `money_tracker`.`carteiras` (`id`)
    ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_receitas_subcategoria`
    FOREIGN KEY (`subcategoria_id`)
    REFERENCES `money_tracker`.`subcategorias` (`id`)
    ON DELETE NO ACTION ON UPDATE NO ACTION)
ENGINE = InnoDB
```

Tabela de **fatos financeiros positivos** — todo dinheiro que entra no sistema é registrado aqui.

**Campos:**

- `data_ref` → Data do recebimento
- `subcategoria_id` → FK para a subcategoria (ex: "Salário", "Freela", "Cashback")
- `carteira_id` → FK para onde o dinheiro entrou
- `valor` → Quantia recebida
- `detalhes` → Observações adicionais
- `criado_em` → Timestamp de criação

**Papel no Sistema:** Representa o lado positivo do balanço. No cálculo dinâmico de saldo, soma-se: `Σ receitas.valor WHERE carteira_id = X`.

---

### Bloco 6: Tabela `despesas` (Saídas de Capital)

```sql
CREATE TABLE IF NOT EXISTS `money_tracker`.`despesas` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `data_ref` DATE NOT NULL,
  `subcategoria_id` INT NOT NULL,
  `carteira_id` INT NOT NULL,
  `valor` DECIMAL(10,2) NOT NULL,
  `detalhes` VARCHAR(255) NULL,
  `criado_em` TIMESTAMP(6) NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`),
  INDEX `carteira_id_idx` (`carteira_id` ASC) VISIBLE,
  INDEX `subcategoria_id_idx` (`subcategoria_id` ASC) VISIBLE,
  CONSTRAINT `fk_despesas_carteira`
    FOREIGN KEY (`carteira_id`)
    REFERENCES `money_tracker`.`carteiras` (`id`)
    ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_despesas_subcategoria`
    FOREIGN KEY (`subcategoria_id`)
    REFERENCES `money_tracker`.`subcategorias` (`id`)
    ON DELETE NO ACTION ON UPDATE NO ACTION)
ENGINE = InnoDB
```

Tabela de **fatos financeiros negativos** — todo dinheiro que sai do sistema é registrado aqui.

**Campos:**

- Estrutura idêntica à tabela `receitas`, diferindo apenas na semântica

**Papel no Sistema:** Representa o lado negativo do balanço. No cálculo dinâmico de saldo, subtrai-se: `Σ despesas.valor WHERE carteira_id = X`.

---

### Modelo Relacional

```
          ┌─────────────────────────────────────────────────┐
          │                   CARTEIRAS                      │
          │ (conta_corrente | cartao_credito | investimento)│
          └────────────────────┬────────────────────────────┘
                               │
         ┌─────────────────────┼─────────────────────┐
         │                     │                     │
         ▼                     ▼                     ▼
┌─────────────────┐   ┌─────────────────┐   ┌─────────────────┐
│  TRANSFERENCIAS │   │     RECEITAS    │   │    DESPESAS     │
│  (origem→dest)  │   │  (+ patrimônio) │   │  (- patrimônio) │
└─────────────────┘   └────────┬────────┘   └────────┬────────┘
                               │                     │
                               └──────────┬──────────┘
                                          ▼
                              ┌─────────────────────┐
                              │   SUBCATEGORIAS     │
                              │ (detalhe de grupos) │
                              └──────────┬──────────┘
                                         ▼
                              ┌─────────────────────┐
                              │    CATEGORIAS       │
                              │ (receita | despesa) │
                              └─────────────────────┘
```

---

### Fórmula de Cálculo de Saldo

```sql
-- Saldo de uma carteira específica
SELECT
  (SELECT COALESCE(SUM(valor), 0) FROM receitas WHERE carteira_id = X)
  - (SELECT COALESCE(SUM(valor), 0) FROM despesas WHERE carteira_id = X)
  + (SELECT COALESCE(SUM(valor), 0) FROM transferencias WHERE carteira_destino = X)
  - (SELECT COALESCE(SUM(valor), 0) FROM transferencias WHERE carteira_origem = X)
AS saldo_atual;
```

---

### Relacionados

- **Projeto:** [[Life_Tracker]]
- **Schema habit_tracker:** [[DOC - schema habit_tracker (sql)]]
