import { faker } from '@faker-js/faker';
import { LeadPayload, IFactory } from '../../types';

export class LeadFactoryClass implements IFactory<LeadPayload> {
  build(overrides?: Partial<LeadPayload>): LeadPayload {
    return {
      contact_id: overrides?.contact_id || faker.number.int({ min: 1, max: 1000 }),
      score: faker.number.int({ min: 21, max: 79 }),
      stage: 'prospect',
      assigned_to: null,
      last_activity: null,
      ...overrides,
    };
  }

  buildMany(count: number, overrides?: Partial<LeadPayload>): LeadPayload[] {
    return Array.from({ length: count }, () => this.build(overrides));
  }

  buildScenario(scenario: string): LeadPayload {
    const contactId = faker.number.int({ min: 1, max: 1000 });
    const oneDayAgo = new Date();
    oneDayAgo.setDate(oneDayAgo.getDate() - 1);
    
    const thirtyFiveDaysAgo = new Date();
    thirtyFiveDaysAgo.setDate(thirtyFiveDaysAgo.getDate() - 35);

    switch (scenario) {
      case 'hot':
        return {
          contact_id: contactId,
          score: 85,
          stage: 'negotiation',
          assigned_to: faker.number.int({ min: 1, max: 10 }),
          last_activity: oneDayAgo.toISOString(),
        };
      case 'cold':
        return {
          contact_id: contactId,
          score: 10,
          stage: 'prospect',
          assigned_to: null,
          last_activity: thirtyFiveDaysAgo.toISOString(),
        };
      case 'warm':
        return {
          contact_id: contactId,
          score: 50,
          stage: 'qualified',
          assigned_to: faker.number.int({ min: 1, max: 10 }),
          last_activity: oneDayAgo.toISOString(),
        };
      case 'converted':
        return {
          contact_id: contactId,
          score: 100,
          stage: 'closed_won',
          assigned_to: faker.number.int({ min: 1, max: 10 }),
          last_activity: new Date().toISOString(),
        };
      default:
        throw new Error(`Unknown Lead scenario: ${scenario}`);
    }
  }
}

export const LeadFactory = new LeadFactoryClass();
