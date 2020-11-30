export interface Companies {
  [name: string]: number;
}

export interface Company {
  id: string;
  name: string;
  persisted: boolean;
}
