import type { Company } from './companies';

export interface Contact {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  status: string;
  company: Company;
}
