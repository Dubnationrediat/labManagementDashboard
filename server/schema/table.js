export let chemicals = `
CREATE TABLE IF NOT EXISTS chemicals (
  chemical_id INT AUTO_INCREMENT,
  chemical_name VARCHAR(255) NOT NULL,
  chemical_formula VARCHAR(255) NOT NULL,
  chemical_purity VARCHAR(255) NOT NULL,
  chemical_manufacturer VARCHAR(255) NOT NULL,
  chemical_state ENUM('solid', 'liquid', 'gas'),
  chemical_packaging ENUM('glass', 'plastic', 'other container') NOT NULL,
  chemical_amount INT NOT NULL,
  chemical_unit_of_measurement ENUM('ml','L','mg','g','kg') NOT NULL,
  chemical_expire_date VARCHAR(255) NOT NULL,
  chemical_location VARCHAR(255) NOT NULL,
  chemical_ordered_by VARCHAR(255) NOT NULL,
  chemical_delivered_date TIMESTAMP,
  chemical_priority ENUM ('High','Low') NOT NULL,
  chemical_bill_path VARCHAR(255) DEFAULT 'not provided', 
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (chemical_id)
)`;

export let registration = `
CREATE TABLE IF NOT EXISTS users (
  user_id INT AUTO_INCREMENT, 
  user_first_name VARCHAR(225) NOT NULL,
  user_last_name VARCHAR(225) NOT NULL,
  user_email VARCHAR(225) NOT NULL,
  user_password VARCHAR(255) NOT NULL,
  user_role VARCHAR(255) DEFAULT '0' NOT NULL,
  date_of_registration TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id)
)`;


export let profile = `
CREATE TABLE IF NOT EXISTS profile (
  profile_id INT AUTO_INCREMENT, 
  user_id INT NOT NULL,
  user_first_name VARCHAR(225) NOT NULL,
  user_last_name VARCHAR(225) NOT NULL,
  user_email VARCHAR(225) NOT NULL,
  user_role VARCHAR(255) DEFAULT '0' NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (profile_id)
)`;


export let gases = `
CREATE TABLE IF NOT EXISTS gases (
  gas_id INT AUTO_INCREMENT,
  gas_name VARCHAR(255) NOT NULL,
  gas_cylinders_amount INT NOT NULL,
  gas_bill_path VARCHAR(255) DEFAULT 'not provided', 
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (gas_id)
)`;


export let chemicalsConsumed = `
CREATE TABLE IF NOT EXISTS chemicals_consumed (
  chemical_consumption_id INT AUTO_INCREMENT,
  chemical_id  VARCHAR(255) NOT NULL,
  user_id INT NOT NULL,
  amount_consumed INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (chemical_consumption_id)
)`;


export let gasesConsumed = `
CREATE TABLE IF NOT EXISTS gases_consumed (
  gas_consumption_id INT AUTO_INCREMENT,
  gas_id VARCHAR(255) NOT NULL,
  gas_cylinders_consumed INT NOT NULL,
  user_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (gas_consumption_id)
)`;


export let consumables = `
CREATE TABLE IF NOT EXISTS consumables (
  consumables_id INT AUTO_INCREMENT,
  user_id INT NOT NULL,
  consumable_name TEXT NOT NULL,
  consumable_location VARCHAR(255) NOT NULL,
  Picture_location VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (consumables_id)
)
`