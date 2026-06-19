import { faker } from '@faker-js/faker';
import { ActionPayload, IFactory } from '../../types';

export class ActionFactoryClass implements IFactory<ActionPayload> {
  build(overrides?: Partial<ActionPayload>): ActionPayload {
    const defaultDueDate = new Date();
    defaultDueDate.setDate(defaultDueDate.getDate() + 3);

    return {
      contact_id: overrides?.contact_id || faker.number.int({ min: 1, max: 1000 }),
      type: faker.helpers.arrayElement(['call', 'email', 'meeting', 'task']),
      status: 'pending',
      due_date: defaultDueDate.toISOString().split('T')[0],
      assignee: faker.person.fullName(),
      priority: 'medium',
      notes: faker.lorem.sentence(),
      ...overrides,
    };
  }

  buildMany(count: number, overrides?: Partial<ActionPayload>): ActionPayload[] {
    return Array.from({ length: count }, () => this.build(overrides));
  }

  buildScenario(scenario: string): ActionPayload {
    const contactId = faker.number.int({ min: 1, max: 1000 });
    const today = new Date();

    const fiveDaysAgo = new Date();
    fiveDaysAgo.setDate(today.getDate() - 5);

    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    switch (scenario) {
      case 'overdue':
        return {
          contact_id: contactId,
          type: 'call',
          status: 'pending',
          due_date: fiveDaysAgo.toISOString().split('T')[0],
          assignee: faker.person.fullName(),
          priority: 'high',
          notes: 'This action is past its due date and needs urgent follow-up.',
        };
      case 'completed':
        return {
          contact_id: contactId,
          type: 'meeting',
          status: 'completed',
          due_date: fiveDaysAgo.toISOString().split('T')[0],
          assignee: faker.person.fullName(),
          priority: 'medium',
          notes: 'Meeting was held and minutes were shared.',
        };
      case 'highPriority':
        return {
          contact_id: contactId,
          type: 'task',
          status: 'pending',
          due_date: tomorrow.toISOString().split('T')[0],
          assignee: faker.person.fullName(),
          priority: 'high',
          notes: 'High priority task due tomorrow.',
        };
      case 'unassigned':
        return {
          contact_id: contactId,
          type: 'email',
          status: 'pending',
          due_date: tomorrow.toISOString().split('T')[0],
          assignee: null,
          priority: 'low',
          notes: 'General email action waiting for assignee.',
        };
      default:
        throw new Error(`Unknown Action scenario: ${scenario}`);
    }
  }
}

export const ActionFactory = new ActionFactoryClass();
