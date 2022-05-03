import { Auth } from ".";
import { Provider } from "react-redux";
import { store } from "../../app/store";
import { configureStore } from "@reduxjs/toolkit";
import { fireEvent, screen, render, act } from "@testing-library/react";
import authReducer, {
  initialState,
  login,
  register,
  RequestPayload,
} from "./slice";

describe("Auth Reducer", () => {
  it("should handle initial state", () => {
    expect(authReducer(undefined, { type: "unknown" })).toEqual({
      status: initialState.status,
      authorized: initialState.authorized,
    });
  });
});

const spy = jest
  .spyOn(global, "fetch")
  .mockImplementation(
    jest.fn((emailAndPassword) => emailAndPassword) as jest.Mock
  );

describe("Login", () => {
  it("should call login with proper fetch options", async () => {
    const emailAndPassword: RequestPayload = {
      email: "email@email.com",
      password: "password",
    } as const;
    const store = configureStore({
      reducer: (state, _) => state,
    });
    await store.dispatch(login(emailAndPassword));
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toBeCalledWith(
      `${process.env.REACT_APP_BACKEND_URL}/auth/login`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "X-Requested-With": "XMLHttpRequest",
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(emailAndPassword),
      }
    );
  });
});

describe("Register", () => {
  it("should call register with proper fetch options", async () => {
    const emailAndPassword: RequestPayload = {
      email: "email@email.com",
      password: "password",
    } as const;
    const store = configureStore({
      reducer: (state, _) => state,
    });
    await store.dispatch(register(emailAndPassword));
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toBeCalledWith(`${process.env.REACT_APP_BACKEND_URL}/user/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
      },
      credentials: "include",
      body: JSON.stringify(emailAndPassword),
    });
  });
});

test("renders clickible headers that toggle login/register", async () => {
  const { getAllByText } = render(
    <Provider store={store}>
      <Auth />
    </Provider>
  );

  // NOTE: Heading and Button
  expect(getAllByText(/Login/i).length).toEqual(2);
  // NOTE : Heading
  expect(getAllByText(/Register/i).length).toEqual(1);

  act(() => {
    fireEvent.click(screen.getByRole("heading", { name: /register/i }));
  });

  // NOTE : Heading
  expect(getAllByText(/Login/i).length).toEqual(1);
  // NOTE: Heading and Button
  expect(getAllByText(/Register/i).length).toEqual(2);
});
