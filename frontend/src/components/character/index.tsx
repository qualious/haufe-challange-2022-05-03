import { FC } from "react";
import { Info } from "./info";
import { CharProps } from "./types";
import {
  Image,
  Button,
  Heading,
  Character,
  Container,
  InfoContainer,
} from "./styled";

export const Char: FC<CharProps> = ({
  id,
  type,
  name,
  image,
  status,
  gender,
  location,
  favorite,
  handleClick,
  handleFavorite,
}: CharProps) => (
  <Container key={id} id={`character-${name}`} aria-label={`character-${name}`}>
    <Image src={image} alt={name} />
    <Character>
      <Heading id="name" onClick={() => handleClick()}>
        {name}
      </Heading>
      <InfoContainer id="details" aria-label="details">
        <Info field="status" value={status} />
        <Info field="type" value={type} />
        <Info field="gender" value={gender} />
        <Info field="location" value={location.name} />
      </InfoContainer>
      <Button favorite={favorite} onClick={() => handleFavorite()}>
        ♥
      </Button>
    </Character>
  </Container>
);
