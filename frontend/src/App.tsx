import { Home } from "./features/home";
import { Auth } from "./features/auth";
import { NotFound } from "./components/nope";
import { useAppSelector } from "./app/hooks";
import React, { FC, ReactElement } from "react";
import { BrowserRouter, useRoutes } from "react-router-dom";
import { AuthState, selectAuthorized } from "./features/auth/slice";

const Routes: FC<Pick<AuthState, "authorized">> = ({
  authorized,
}: Pick<AuthState, "authorized">): ReactElement | null =>
  useRoutes([
    { path: "/", element: authorized ? <Home /> : <Auth /> },
    { path: "*", element: <NotFound /> },
  ]);

const App: FC<{}> = () => {
  const authorized: boolean = useAppSelector(selectAuthorized);
  return (
    <div id="app" aria-label="app">
      <BrowserRouter>
        <Routes authorized={authorized} />
      </BrowserRouter>
    </div>
  );
};

export default App;
