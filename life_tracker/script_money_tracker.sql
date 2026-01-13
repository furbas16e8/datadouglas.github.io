CREATE DATABASE money_tracker CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE money_tracker

CREATE TABLE IF NOT EXISTS `money_tracker`.`carteiras` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(20) NOT NULL,
  `tipo` ENUM("conta_corrente", "cartao_credito", "investimento", "especie") NOT NULL,
  `ativo` TINYINT NULL DEFAULT 1,
  PRIMARY KEY (`id`))
ENGINE = InnoDB


--- TRANSFERÊNCIAS
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
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_transf_destino`
    FOREIGN KEY (`carteira_destino`)
    REFERENCES `money_tracker`.`carteiras` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB

--- CATEGORIAS
CREATE TABLE IF NOT EXISTS `money_tracker`.`categorias` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(20) NOT NULL,
  `tipo` ENUM("receita", "despesa") NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB

--- SUBCATEGORIAS
CREATE TABLE IF NOT EXISTS `money_tracker`.`subcategorias` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `categoria_id` INT NOT NULL,
  `nome` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `categoria_id`
    FOREIGN KEY (`categoria_id`)
    REFERENCES `money_tracker`.`categorias` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB

--- RECEITAS
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
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_receitas_subcategoria`
    FOREIGN KEY (`subcategoria_id`)
    REFERENCES `money_tracker`.`subcategorias` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB

--- DESPESAS
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
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_despesas_subcategoria`
    FOREIGN KEY (`subcategoria_id`)
    REFERENCES `money_tracker`.`subcategorias` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB