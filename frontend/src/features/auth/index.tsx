import { useAppSelector, useAppDispatch } from "../../app/hooks";
import React, { ChangeEvent, FC, useState } from "react";
import { login, register, selectStatus } from "./slice";
import { Status } from "../types";
import {
  Button,
  Container,
  Header,
  Heading,
  Input,
  InputContainer,
  Label,
} from "./styled";

// IMPROVEMENT: Use u18next instead of static strings.
export const Auth: FC<{}> = () => {
  const dispatch = useAppDispatch();
  const status: Status = useAppSelector(selectStatus);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isRegister, setIsRegister] = useState<boolean>(false);
  return (
    <Container id="auth" aria-label="auth">
      <Header>
        <Heading
          opacity={isRegister ? 0.2 : 1}
          onClick={() => setIsRegister(false)}
        >
          Login
        </Heading>
        <Heading
          opacity={isRegister ? 1 : 0.2}
          onClick={() => setIsRegister(true)}
        >
          Register
        </Heading>
      </Header>
      <InputContainer>
        <Label htmlFor="email" aria-labelledby="email">
          Email
        </Label>
        <Input
          id="email"
          type="text"
          value={email}
          autoComplete="off"
          // placeholder="Email"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
          pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{1,63}$"
        />
      </InputContainer>
      <InputContainer>
        <Label htmlFor="password" aria-labelledby="password">
          Password
        </Label>
        <Input
          id="password"
          type="password"
          value={password}
          autoComplete="off"
          // placeholder="Password"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
        />
      </InputContainer>
      <Button
        disabled={status === Status.LOADING}
        onClick={() => {
          if (isRegister) {
            dispatch(register({ email, password }));
            setIsRegister(false);
          } else {
            dispatch(login({ email, password }));
          }
        }}
      >
        {isRegister ? "Register" : "Login"}
      </Button>
    </Container>
  );
};
