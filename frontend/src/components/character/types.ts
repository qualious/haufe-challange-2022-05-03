import { Character } from "../../features/home/types";

export interface CharProps extends Character {
  handleClick: () => void;
  handleFavorite: () => void;
}
