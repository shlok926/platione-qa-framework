CREATE TABLE IF NOT EXISTS interactions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  contact_id INT NOT NULL,
  type ENUM('call', 'email', 'meeting', 'other') NOT NULL,
  occurred_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  notes TEXT NULL,
  outcome ENUM('interested', 'no_response', 'not_interested') NULL,
  FOREIGN KEY (contact_id) REFERENCES contacts(id) ON DELETE CASCADE
);
