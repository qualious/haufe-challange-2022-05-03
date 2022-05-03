import styled from "styled-components";

export const Container = styled.span`
  padding: 5;
  color: white;
  display: flex;
  flex-direction: row;
  background: #24282f;
`;

export const Image = styled.img`
  width: 200px;
  height: 200px;
`;

export const Character = styled.span`
  margin-left: 2rem;
`;

export const Heading = styled.h3`
  cursor: pointer;
`;

export const InfoContainer = styled.section`
  display: flex;
  flex-direction: column;
`;

export const Button = styled.button<{ favorite: boolean }>`
  all: unset;
  cursor: pointer;
  margin-top: 1rem;
  color: ${(p) => (p.favorite ? "red" : "#b0bec5;")};
`;
