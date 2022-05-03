import styled from "styled-components";

export const Container = styled.span``;

export const List = styled.ul`
  margin: 0;
  gap: 16px;
  padding: 2rem;

  display: flex;
  flex-wrap: wrap;

  & > * {
    flex-basis: 400px;
    flex-grow: 1;
  }
`;

export const ListItem = styled.li`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
`;

export const Button = styled.button`
  width: 90%;
  margin: 3rem;
  line-height: 1;
  color: #b0bec5;
  cursor: pointer;
  background: none;
  border: 2px solid;
  transition: 0.25s;
  padding: 2rem;

  &:hover {
    box-shadow: 0 0.5em 0.5em -0.4em #b0bec5;
    transform: translateY(-0.25em);
  }

  &:focus {
    box-shadow: 0 0.5em 0.5em -0.4em #b0bec5;
    transform: translateY(-0.25em);
  }

  &:hover,
  &:focus {
    border-color: #b0bec5;
    color: #7b8589;
  }
`;
