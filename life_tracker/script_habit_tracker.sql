CREATE DATABASE habit_tracker CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE habit_tracker

CREATE TABLE IF NOT EXISTS `habit_tracker`.`habitos_lista` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NOT NULL,
  `tipo_valor` ENUM("booleano", "decimal", "escala") NOT NULL,
  `unidade_medida` VARCHAR(20) NULL,
  `ativo` TINYINT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `nome_UNIQUE` (`nome` ASC) VISIBLE)
ENGINE = InnoDB


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
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB