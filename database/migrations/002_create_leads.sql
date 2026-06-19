CREATE TABLE IF NOT EXISTS leads (
  id INT AUTO_INCREMENT PRIMARY KEY,
  contact_id INT NOT NULL,
  score TINYINT UNSIGNED DEFAULT 0,
  stage ENUM('prospect', 'qualified', 'proposal', 'negotiation', 'closed_won', 'closed_lost') DEFAULT 'prospect',
  assigned_to INT NULL,
  last_activity TIMESTAMP NULL,
  FOREIGN KEY (contact_id) REFERENCES contacts(id) ON DELETE CASCADE
);
