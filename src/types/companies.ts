export interface Companies {
  [name: string]: number;
}

export interface Company {
  id: number;
  name: string;
  persisted: boolean;
}
