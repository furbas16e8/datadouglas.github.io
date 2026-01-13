---
Date: 2025-12-25
Updated:
Ref.:
stack:
  - SQL
github_url:
local_folder:
links:
tags:
---


> [!summary]
> **Objetivo:** Criar um banco de dados com todos os meus hábitos e finanças, para correlacioná-los e estudá-los.
> **Resultado:** 
> **Contexto:** Pessoal

---
<br>


## Problema / Hipótese

A ideia é ter dados suficientes para fazer um **modelo de regressão da minha vida** e poder analisar meus próprios padrões e assim evoluir em todas as áreas da minha vida.
* **Contexto:** 
	Criar um sistema de monitoramento de hábitos e finanças pessoais.
	<br>
* **Dores:** 
	Sempre gostei de quantificar minha vida, mas nunca encontrei um aplicativo ou site que atendesse a todas as minhas necessidades. 
	<br>
* **Objetivo:** 
	Conseguir hospedar o banco de dados no meu site pessoal para ter acesso de qualquer lugar, usando um aplicativo ou fazendo login no próprio site. 
	<br>

---
<br>

## Tech Stack & Ferramentas
* **Linguagem:** `SQL`, `Python`, `R`, `HTML`, `JavaScript`, `CSS`
* **Bibliotecas Principais:** ...
* **Ambiente:** `MySQL`, `Google Antigravity`, `RStudio`
* **Modelos Utilizados:** Ex: Regressão Linear, ARIMA, Random Forest (com wikilinks) ...

---
<br>

## Estrutura 

### Banco de Dados MySQL

> Optei por usar o MySQL porque já o utilizo no estagio e seria uma oportunidade de aprendizado para ser implementado também em minha carreira.

#### 1. Schema: `money_tracker` (Gestão Financeira)

Este banco foi estruturado para registrar o fluxo de capital sem inflar receitas ou despesas artificialmente.

##### Tabelas e Papéis:

* **`carteiras`**: Define as origens/destinos do dinheiro (Contas, Cartões, Espécie).
* **`transferencias`**: Gerencia a movimentação entre carteiras. Logicamente, não altera o patrimônio líquido, apenas muda o local do recurso.
* **`categorias` e `subcategorias`**: Estrutura em árvore para classificar ganhos e gastos. O `tipo` (receita/despesa) é definido na categoria pai.
* **`receitas` e `despesas`**: Tabelas de fatos onde ocorrem os lançamentos diários vinculados a uma subcategoria e a uma carteira.

##### Lógicas Implementadas:

* **Saldo Inicial e Ajustes**: Em vez de campos estáticos, o saldo é calculado dinamicamente. Para iniciar o sistema ou corrigir divergências, implementei categorias de **"Ajuste de Saldo"** e **"Saldo Inicial"** dentro da tabela de receitas/despesas.
* **Cálculo de Saldo**: O saldo atual é a soma aritmética: `Receitas - Despesas + (Transf_Destino - Transf_Origem)`.
* **Precisão Numérica**: Uso de `DECIMAL(10,2)` em todos os valores monetários e `TIMESTAMP(6)` na coluna `criado_em` para auditoria.

---

#### 2. Schema: `habit_tracker` (Gestão de Comportamento)

Este banco foi desenhado para ser totalmente dinâmico, permitindo adicionar novos tipos de medição sem alterar a estrutura das tabelas.

##### Tabelas e Papéis:

* **`habitos_lista`**: O catálogo (dicionário) de hábitos. Define o nome, o tipo de dado esperado (booleano, decimal ou escala) e a unidade (ex: minutos, km, litros).
* **`habitos_log`**: Onde a performance diária é gravada.

##### Lógicas Implementadas:

* **Restrição de Unicidade**: Implementação de um **Índice Único Composto** (`data_ref` + `habito_id`). Isso garante, que só seja possível registrar cada hábito uma única vez por dia, evitando duplicidade de dados.
* **Tipagem**:
	* **Booleano**: Registra 0 ou 1.
	* **Decimal**: Registra quantidades (ex: 45.00 minutos de academia, 2.50 litros de água).
	* **Escala**: Registra notas (ex: Humor de 1 a 10).

---
