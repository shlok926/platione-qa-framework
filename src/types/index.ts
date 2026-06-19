// ==============================================================================
// Entity Type Definitions for Platione Sales Assist QA Framework
// ==============================================================================

// --- User Entity (Reference / Static Data) ---
export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'agent';
}

// --- Contact Entity ---
export interface ContactPayload {
  name: string;
  phone: string;
  email: string | null;
  company: string;
  status: 'active' | 'inactive' | 'archived';
}

export interface ContactResponse extends ContactPayload {
  id: string;
  created_at: string;
  updated_at: string;
}

export interface ContactRecord {
  id?: number;
  name: string;
  phone: string;
  email: string | null;
  company: string;
  status: 'active' | 'inactive' | 'archived';
  created_at?: string;
  updated_at?: string;
}

// --- Lead Entity ---
export interface LeadPayload {
  contact_id: string | number;
  score: number;
  stage: 'prospect' | 'qualified' | 'proposal' | 'negotiation' | 'closed_won' | 'closed_lost';
  assigned_to?: number | null;
  last_activity?: string | null;
}

export interface LeadResponse extends LeadPayload {
  id: string;
}

export interface LeadRecord {
  id?: number;
  contact_id: number;
  score: number;
  stage: 'prospect' | 'qualified' | 'proposal' | 'negotiation' | 'closed_won' | 'closed_lost';
  assigned_to?: number | null;
  last_activity?: string | null;
}

// --- Action Entity (Planned & Completed Actions) ---
export interface ActionPayload {
  contact_id: string | number;
  type: 'call' | 'email' | 'meeting' | 'task';
  status: 'pending' | 'completed' | 'cancelled';
  due_date: string;
  assignee?: string | null;
  priority: 'low' | 'medium' | 'high';
  notes?: string | null;
}

export interface ActionResponse extends ActionPayload {
  id: string;
}

export interface ActionRecord {
  id?: number;
  contact_id: number;
  type: 'call' | 'email' | 'meeting' | 'task';
  status: 'pending' | 'completed' | 'cancelled';
  due_date: string;
  assignee?: string | null;
  priority: 'low' | 'medium' | 'high';
  notes?: string | null;
}

// --- Completed Interaction Entity ---
export interface InteractionPayload {
  contact_id: string | number;
  type: 'call' | 'email' | 'meeting' | 'other';
  occurred_at: string;
  notes?: string | null;
  outcome?: string | null;
}

export interface InteractionResponse extends InteractionPayload {
  id: string;
}

export interface InteractionRecord {
  id?: number;
  contact_id: number;
  type: 'call' | 'email' | 'meeting' | 'other';
  occurred_at: string;
  notes?: string | null;
  outcome?: string | null;
}

// --- Follow-up Scenario Entity ---
export interface FollowupPayload {
  contact_id: string | number;
  trigger_event: string;
  due_date: string;
  status: 'pending' | 'completed';
}

export interface FollowupResponse extends FollowupPayload {
  id: string;
  created_at: string;
}

export interface FollowupRecord {
  id?: number;
  contact_id: number;
  trigger_event: string;
  due_date: string;
  status: 'pending' | 'completed';
  created_at?: string;
}

// --- Factory Registry Interface ---
export interface IFactory<T, TOverride = T> {
  build(overrides?: Partial<TOverride>): T;
  buildMany(count: number, overrides?: Partial<TOverride>): T[];
  buildScenario(scenario: string): T;
}
