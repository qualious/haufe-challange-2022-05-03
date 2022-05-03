export interface CharacterListResponse {
  info: Info;
  results: Array<Character>;
}

export interface Character {
  id: number;
  url: string;
  name: string;
  type: string;
  image: string;
  created: Date;
  gender: string;
  status: string;
  species: string;
  origin: Location;
  favorite: boolean;
  location: Location;
  episode: Array<string>;
}

export interface Location {
  name: string;
  url: string;
}

export interface Info {
  count: number;
  pages: number;
  next: string | undefined;
  prev: string | undefined;
}
