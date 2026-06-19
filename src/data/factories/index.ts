import { ContactFactory } from './contact.factory';
import { LeadFactory } from './lead.factory';
import { ActionFactory } from './action.factory';
import { InteractionFactory } from './interaction.factory';
import { IFactory } from '../../types';

export class DataFactoryClass {
  private factories: Record<string, IFactory<any>> = { // eslint-disable-line @typescript-eslint/no-explicit-any
    contact: ContactFactory,
    lead: LeadFactory,
    action: ActionFactory,
    interaction: InteractionFactory,
  };

  /**
   * Retrieves a factory by entity name.
   * @param entity The name of the entity.
   */
  get(entity: 'contact'): IFactory<import('../../types').ContactPayload>;
  get(entity: 'lead'): IFactory<import('../../types').LeadPayload>;
  get(entity: 'action'): IFactory<import('../../types').ActionPayload>;
  get(entity: 'interaction'): IFactory<import('../../types').InteractionPayload>;
  get(entity: string): IFactory<any> { // eslint-disable-line @typescript-eslint/no-explicit-any
    const factory = this.factories[entity];
    if (!factory) {
      throw new Error(`No factory registered for entity: ${entity}`);
    }
    return factory;
  }
}

export const DataFactory = new DataFactoryClass();
export { ContactFactory, LeadFactory, ActionFactory, InteractionFactory };
export * from '../../types';
