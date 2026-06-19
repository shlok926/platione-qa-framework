import { BaseAPISeeder } from './base.api-seeder';
import { ContactPayload, ContactResponse } from '../../../types';

export class ContactAPISeeder extends BaseAPISeeder<ContactPayload, ContactResponse> {
  protected get endpoint(): string {
    return '/api/v1/contacts';
  }
}
