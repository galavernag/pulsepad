export type Soundboard = {
  id: string;
  name: string;
  sounds: Sound[];
};

type Sound = {
  id: string;
  name: string;
  url: string;
};

type Soundboards = Map<string, Soundboard>;
