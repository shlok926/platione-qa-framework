-- ==============================================================================
-- Baseline Database Seed Script for Platione Sales Assist QA Framework
-- Provides a clean, initial dataset for regression and smoke testing.
-- ==============================================================================

-- Clean up existing data to ensure idempotency
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE followups;
TRUNCATE TABLE interactions;
TRUNCATE TABLE actions;
TRUNCATE TABLE leads;
TRUNCATE TABLE contacts;
SET FOREIGN_KEY_CHECKS = 1;

-- 1. Insert Baseline Contacts
INSERT INTO contacts (id, name, phone, email, company, status) VALUES
(1, 'Baseline Contact One', '+919000000001', 'contact.one@baseline.com', 'Baseline Corp 1', 'active'),
(2, 'Baseline Contact Two', '+919000000002', 'contact.two@baseline.com', 'Baseline Corp 2', 'active'),
(3, 'Baseline Contact Three', '+919000000003', NULL, 'Baseline Corp 3', 'inactive'),
(4, 'Baseline Contact Four', '+919000000004', 'contact.four@baseline.com', 'Baseline Corp 4', 'archived');

-- 2. Insert Baseline Leads
INSERT INTO leads (id, contact_id, score, stage, assigned_to, last_activity) VALUES
(1, 1, 50, 'qualified', 1, NOW()),
(2, 2, 85, 'negotiation', 2, NOW()),
(3, 3, 10, 'prospect', NULL, NULL);

-- 3. Insert Baseline Actions
INSERT INTO actions (id, contact_id, type, status, due_date, assignee, priority, notes) VALUES
(1, 1, 'call', 'pending', DATE_ADD(CURRENT_DATE, INTERVAL 2 DAY), 'QA Admin User', 'medium', 'Follow up on contract discussion'),
(2, 2, 'meeting', 'completed', DATE_SUB(CURRENT_DATE, INTERVAL 2 DAY), 'Sales Manager', 'high', 'Initial proposal presentation');

-- 4. Insert Baseline Interactions
INSERT INTO interactions (id, contact_id, type, occurred_at, notes, outcome) VALUES
(1, 1, 'email', DATE_SUB(NOW(), INTERVAL 1 DAY), 'Sent product catalog and pricing sheets.', 'interested'),
(2, 2, 'call', DATE_SUB(NOW(), INTERVAL 3 DAY), 'Introduced sales team and scheduled presentation.', 'interested');

-- 5. Insert Baseline Follow-ups
INSERT INTO followups (id, contact_id, trigger_event, due_date, status) VALUES
(1, 1, 'Proposal Sent', DATE_ADD(CURRENT_DATE, INTERVAL 5 DAY), 'pending');
