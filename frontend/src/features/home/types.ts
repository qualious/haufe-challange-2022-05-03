import { Response } from "../types";

export interface ListContactsResponse {
  contacts: any[];
  meta: { nextPage: number | null };
}
export interface CharacterResponse extends Response<Character> {}
export interface CharacterListResponse extends Response<Payload> {}

export interface Payload {
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

export interface FavoriteResponse extends Response<Data> {}

export interface Data {
  characterId: number;
  user: User;
  id: number;
  userId: string;
}

export interface User {
  id: string;
  email: string;
  favorites: Favorite[];
}

export interface Favorite {
  id: number;
  characterId: number;
}
