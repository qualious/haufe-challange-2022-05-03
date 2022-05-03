import styled from "styled-components";

export const Container = styled.span`
  width: 100%;
  padding: 5px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

export const Header = styled.header`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const Heading = styled.h1<{ opacity: number }>`
  opacity: ${(p) => p.opacity};
  cursor: pointer;
  margin-left: 20px;
  color: #7b8589;
`;

export const InputContainer = styled.span`
  width: 70%;
  position: relative;
  margin-top: 5rem;
`;

export const Label = styled.label`
  opacity: 1;
  line-height: 2;
  font-size: 1.2rem;
`;

export const Input = styled.input`
  margin: 0;
  width: 100%;
  border: none;
  display: block;
  line-height: 1.8;
  font-size: 1.2rem;
  border-radius: 0.4rem;
  padding: 0.8rem 1.6rem;
  transition: box-shadow 300ms;
  box-shadow: 0 0 0 0.1rem #b0bec5;

  &::plaholder {
    color: #b0bec5;
  }

  &:focus {
    outline: none;
    box-shadow: 0.2rem 0.8rem 1.6rem #7b8589;
  }
`;

export const Button = styled.button`
  width: 20rem;
  margin: 1rem;
  line-height: 1;
  color: #b0bec5;
  cursor: pointer;
  background: none;
  border: 2px solid;
  margin-top: 10rem;
  transition: 0.25s;
  padding: 1.5rem 2rem;

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
