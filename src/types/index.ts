export interface Companies {
  [name: string]: number;
}

export interface Company {
  id: number;
  name: string;
  address: string;
  country: string;
  zipcode: string;
  state: string;
  dealCount: number;
  dealTotal: number;
}

export interface Contact {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  status: string;
  companyID: number;
  companyName: string;
}

export interface User {
  id: number;
  name: string;
  persisted?: boolean;
}

export interface Role {
  id: number;
  contactId: number;
  contactName: string;
  contactRole: string;
  persisted?: boolean;
}

export interface Note {
  id: number;
  text: string;
  createdAt: string; // type can be Date?
  persisted?: boolean;
}

export interface Deal {
  id: number;
  name: string;
  price: number;
  status: string;
  user: User;
  notes: Note[];
  roles: Role[];
  company: Company;
  persisted?: boolean;
}

export interface FilterData {
  company: Company[];
  contact: Contact[];
  user: User[];
  minDeal: number | undefined;
  maxDeal: number | undefined;
  state: boolean;
}
