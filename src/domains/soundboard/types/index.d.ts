export interface Sound {
  id: string;
  name: string;
  url: string;
}

export interface Soundboard {
  id: string;
  name: string;
  createdAt: string;
  sounds: Sound[];
}

export type Soundboards = Map<string, Soundboard>;
