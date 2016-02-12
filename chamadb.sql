-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema chamadb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema chamadb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `chamadb` DEFAULT CHARACTER SET utf8 ;
USE `chamadb` ;

-- -----------------------------------------------------
-- Table `chamadb`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `chamadb`.`user` (
  `user_id` VARCHAR(45) NOT NULL,
  `user_name` VARCHAR(45) NULL,
  `status` VARCHAR(45) NULL,
  `password` VARCHAR(255) NULL,
  `create_time` VARCHAR(45) NULL,
  `last_login` VARCHAR(45) NULL,
  PRIMARY KEY (`user_id`),
  INDEX `user_name` (`user_name` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `chamadb`.`group`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `chamadb`.`groups` (
  `group_id` INT NOT NULL,
  `group_name` VARCHAR(45) NULL,
  `password` VARCHAR(255) NULL,
  `create_time` VARCHAR(45) NULL,
  `location` VARCHAR(45) NULL,
  PRIMARY KEY (`group_id`),
  INDEX `group_name` (`group_name` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `chamadb`.`group_user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `chamadb`.`group_user` (
  `group_user_id` INT NOT NULL,
  `user_id` VARCHAR(45) NULL,
  `group_id` INT NULL,
  `group_name` VARCHAR(45) NULL,
  `user_access_level` VARCHAR(45) NULL,
  PRIMARY KEY (`group_user_id`),
  INDEX `fk_group_user_1_idx` (`user_id` ASC),
  INDEX `fk_group_user_2_idx` (`group_id` ASC),
  INDEX `fk_group_user_3_idx` (`group_name` ASC),
  CONSTRAINT `fk_group_user_1`
    FOREIGN KEY (`user_id`)
    REFERENCES `chamadb`.`user` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_group_user_2`
    FOREIGN KEY (`group_id`)
    REFERENCES `chamadb`.`groups` (`group_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_group_user_3`
    FOREIGN KEY (`group_name`)
    REFERENCES `chamadb`.`groups` (`group_name`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `chamadb`.`savings`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `chamadb`.`savings` (
  `savings_id` INT NOT NULL,
  `user_id` VARCHAR(45) NULL,
  `date` VARCHAR(45) NULL,
  `amount` VARCHAR(45) NULL,
  `month` VARCHAR(45) NULL,
  `total_savings` VARCHAR(45) NULL,
  `group_id` INT NULL,
  PRIMARY KEY (`savings_id`),
  INDEX `fk_savings_1_idx` (`user_id` ASC),
  INDEX `fk_savings_2_idx` (`group_id` ASC),
  CONSTRAINT `fk_savings_1`
    FOREIGN KEY (`user_id`)
    REFERENCES `chamadb`.`user` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_savings_2`
    FOREIGN KEY (`group_id`)
    REFERENCES `chamadb`.`groups` (`group_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `chamadb`.`loans`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `chamadb`.`loans` (
  `loan_id` INT NOT NULL,
  `user_id` VARCHAR(45) NULL,
  `amount` VARCHAR(45) NULL,
  `date` VARCHAR(45) NULL,
  `rate` VARCHAR(45) NULL,
  `repayment_period` VARCHAR(45) NULL,
  `group_id` INT NULL,
  PRIMARY KEY (`loan_id`),
  INDEX `fk_loans_1_idx` (`user_id` ASC),
  INDEX `fk_loans_2_idx` (`group_id` ASC),
  CONSTRAINT `fk_loans_1`
    FOREIGN KEY (`user_id`)
    REFERENCES `chamadb`.`user` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_loans_2`
    FOREIGN KEY (`group_id`)
    REFERENCES `chamadb`.`groups` (`group_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `chamadb`.`loans_payment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `chamadb`.`loans_payment` (
  `loans_payment_id` INT NOT NULL,
  `loan_id` INT NULL,
  `user_id` VARCHAR(45) NULL,
  `group_id` INT NULL,
  `installment` VARCHAR(45) NULL,
  `principal` VARCHAR(45) NULL,
  `Interest` VARCHAR(45) NULL,
  `savings` VARCHAR(45) NULL,
  PRIMARY KEY (`loans_payment_id`),
  INDEX `fk_loans_payment_1_idx` (`user_id` ASC),
  INDEX `fk_loans_payment_2_idx` (`loan_id` ASC),
  INDEX `fk_loans_payment_3_idx` (`group_id` ASC),
  CONSTRAINT `fk_loans_payment_1`
    FOREIGN KEY (`user_id`)
    REFERENCES `chamadb`.`user` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_loans_payment_2`
    FOREIGN KEY (`loan_id`)
    REFERENCES `chamadb`.`loans` (`loan_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_loans_payment_3`
    FOREIGN KEY (`group_id`)
    REFERENCES `chamadb`.`groups` (`group_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `chamadb`.`Advances`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `chamadb`.`Advances` (
  `advance_id` INT NOT NULL,
  `amount` VARCHAR(45) NULL,
  `rate` VARCHAR(45) NULL,
  `user_id` VARCHAR(45) NULL,
  `group_id` INT NULL,
  PRIMARY KEY (`advance_id`),
  INDEX `fk_Advances_1_idx` (`user_id` ASC),
  INDEX `fk_Advances_2_idx` (`group_id` ASC),
  CONSTRAINT `fk_Advances_1`
    FOREIGN KEY (`user_id`)
    REFERENCES `chamadb`.`user` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Advances_2`
    FOREIGN KEY (`group_id`)
    REFERENCES `chamadb`.`groups` (`group_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `chamadb`.`Advance_payments`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `chamadb`.`Advance_payments` (
  `Advance_payments_id` INT NOT NULL,
  `advance_id` INT NULL,
  `user_id` VARCHAR(45) NULL,
  `group_id` INT NULL,
  `Interest` VARCHAR(45) NULL,
  `balance` VARCHAR(45) NULL,
  PRIMARY KEY (`Advance_payments_id`),
  INDEX `fk_Advance_payments_1_idx` (`advance_id` ASC),
  INDEX `fk_Advance_payments_2_idx` (`group_id` ASC),
  INDEX `fk_Advance_payments_3_idx` (`user_id` ASC),
  CONSTRAINT `fk_Advance_payments_1`
    FOREIGN KEY (`advance_id`)
    REFERENCES `chamadb`.`Advances` (`advance_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Advance_payments_2`
    FOREIGN KEY (`group_id`)
    REFERENCES `chamadb`.`groups` (`group_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Advance_payments_3`
    FOREIGN KEY (`user_id`)
    REFERENCES `chamadb`.`user` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `chamadb`.`Projects`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `chamadb`.`Projects` (
  `Projects_id` INT NOT NULL,
  `user_id` VARCHAR(45) NULL,
  `amount` VARCHAR(45) NULL,
  `date` VARCHAR(45) NULL,
  `total_amount` VARCHAR(45) NULL,
  `group_id` INT NULL,
  PRIMARY KEY (`Projects_id`),
  INDEX `fk_Projects_1_idx` (`group_id` ASC),
  INDEX `fk_Projects_2_idx` (`user_id` ASC),
  CONSTRAINT `fk_Projects_1`
    FOREIGN KEY (`group_id`)
    REFERENCES `chamadb`.`groups` (`group_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Projects_2`
    FOREIGN KEY (`user_id`)
    REFERENCES `chamadb`.`user` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `chamadb`.`fines`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `chamadb`.`fines` (
  `fines_id` INT NOT NULL,
  `user_id` VARCHAR(45) NULL,
  `amount` VARCHAR(45) NULL,
  `description` LONGTEXT NULL,
  `group_id` INT NULL,
  PRIMARY KEY (`fines_id`),
  INDEX `fk_fines_1_idx` (`group_id` ASC),
  INDEX `fk_fines_2_idx` (`user_id` ASC),
  CONSTRAINT `fk_fines_1`
    FOREIGN KEY (`group_id`)
    REFERENCES `chamadb`.`groups` (`group_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_fines_2`
    FOREIGN KEY (`user_id`)
    REFERENCES `chamadb`.`user` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

