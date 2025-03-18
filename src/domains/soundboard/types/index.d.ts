export interface Sound {
  name: string;
  url: string;
}

export interface Soundboard {
  name: string;
  createdAt: string;
  sounds: Sound[];
}

export type Soundboards = Map<string, Soundboard>;
