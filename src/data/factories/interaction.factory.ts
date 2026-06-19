import { faker } from '@faker-js/faker';
import { InteractionPayload, IFactory } from '../../types';

export class InteractionFactoryClass implements IFactory<InteractionPayload> {
  build(overrides?: Partial<InteractionPayload>): InteractionPayload {
    return {
      contact_id: overrides?.contact_id || faker.number.int({ min: 1, max: 1000 }),
      type: faker.helpers.arrayElement(['call', 'email', 'meeting', 'other']),
      occurred_at: new Date().toISOString(),
      notes: faker.lorem.sentence(),
      outcome: faker.helpers.arrayElement(['interested', 'no_response', 'not_interested']),
      ...overrides,
    };
  }

  buildMany(count: number, overrides?: Partial<InteractionPayload>): InteractionPayload[] {
    return Array.from({ length: count }, () => this.build(overrides));
  }

  buildScenario(scenario: string): InteractionPayload {
    const contactId = faker.number.int({ min: 1, max: 1000 });
    const todayISO = new Date().toISOString();

    switch (scenario) {
      case 'noResponse':
        return {
          contact_id: contactId,
          type: 'call',
          occurred_at: todayISO,
          notes: 'Called the client multiple times, but there was no response. Left a voicemail.',
          outcome: 'no_response',
        };
      case 'interested':
        return {
          contact_id: contactId,
          type: 'meeting',
          occurred_at: todayISO,
          notes: 'Client showed high interest in our Enterprise plan. Requested a formal proposal.',
          outcome: 'interested',
        };
      case 'notInterested':
        return {
          contact_id: contactId,
          type: 'email',
          occurred_at: todayISO,
          notes: 'Client responded via email stating they do not have the budget this quarter.',
          outcome: 'not_interested',
        };
      default:
        throw new Error(`Unknown Interaction scenario: ${scenario}`);
    }
  }
}

export const InteractionFactory = new InteractionFactoryClass();
