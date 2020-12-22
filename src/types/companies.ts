import type { Deal } from './deals';

export interface Companies {
  [name: string]: number;
}

export interface Company {
  id: number;
  name: string;
  address: string;
  country: string;
  state: string;
  deals: Deal[];
  persisted?: boolean;
}
