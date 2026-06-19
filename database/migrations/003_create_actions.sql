CREATE TABLE IF NOT EXISTS actions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  contact_id INT NOT NULL,
  type ENUM('call', 'email', 'meeting', 'task') NOT NULL,
  status ENUM('pending', 'completed', 'cancelled') DEFAULT 'pending',
  due_date DATE NOT NULL,
  assignee VARCHAR(255) NULL,
  priority ENUM('low', 'medium', 'high') DEFAULT 'medium',
  notes TEXT NULL,
  FOREIGN KEY (contact_id) REFERENCES contacts(id) ON DELETE CASCADE
);
