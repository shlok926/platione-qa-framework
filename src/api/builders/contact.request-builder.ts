import { ContactPayload } from '../../types';
import { ContactFactory } from '../../data/factories/contact.factory';

export class ContactRequestBuilder {
  private payload: ContactPayload;

  constructor() {
    // Start with a default contact structure
    this.payload = ContactFactory.build();
  }

  withName(name: string): this {
    this.payload.name = name;
    return this;
  }

  withPhone(phone: string): this {
    this.payload.phone = phone;
    return this;
  }

  withEmail(email: string | null): this {
    this.payload.email = email;
    return this;
  }

  withCompany(company: string): this {
    this.payload.company = company;
    return this;
  }

  withStatus(status: 'active' | 'inactive' | 'archived'): this {
    this.payload.status = status;
    return this;
  }

  /**
   * Returns the final built ContactPayload.
   */
  build(): ContactPayload {
    return this.payload;
  }
}
