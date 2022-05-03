import { Status } from "../types";
import homeReducer, {
  delFavorite,
  getCharacter,
  getCharacters,
  goBack,
  HomeState,
  initialState,
  postFavorite,
} from "./slice";
import { Character, Info } from "./types";
import { configureStore } from "@reduxjs/toolkit";

describe("home reducer", () => {
  it("should handle initial state", () => {
    expect(homeReducer(undefined, { type: "unknown" })).toEqual({
      info: initialState.info,
      status: initialState.status,
      before: initialState.before,
      characters: initialState.characters,
    });
  });
  it("should have the previous values when user goes back from detail", () => {
    const state: HomeState = {
      info: {} as Info,
      status: Status.IDLE,
      before: [{ id: 12, name: "Pickle Rick" }] as Array<Character>,
      characters: [] as Array<Character>,
    };
    const actual = homeReducer(state, goBack());
    expect(actual.characters).toEqual(state.before);
  });
});

const spy = jest
  .spyOn(global, "fetch")
  .mockImplementation(
    jest.fn((emailAndPassword) => emailAndPassword) as jest.Mock
  );

describe("getCharacter", () => {
  it("should call getCharacter with proper fetch options", async () => {
    const id: number = 1;
    const store = configureStore({
      reducer: (state, _) => state,
    });
    await store.dispatch(getCharacter(id));
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toBeCalledWith(
      `${process.env.REACT_APP_BACKEND_URL}/ricky/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
        },
        credentials: "include",
      }
    );
  });
});

describe("getCharacters", () => {
  it("should call getCharacters with proper fetch options", async () => {
    const page: number = 1;
    const store = configureStore({
      reducer: (state, _) => state,
    });
    await store.dispatch(getCharacters(page));
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toBeCalledWith(
      `${process.env.REACT_APP_BACKEND_URL}/ricky/?page=${page}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
        },
        credentials: "include",
      }
    );
  });
});

describe("postFavorite", () => {
  it("should call postFavorite with proper fetch options", async () => {
    const characterId: number = 1;
    const store = configureStore({
      reducer: (state, _) => state,
    });
    await store.dispatch(postFavorite(characterId));
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toBeCalledWith(
      `${process.env.REACT_APP_BACKEND_URL}/favorite`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
        },
        body: JSON.stringify({ characterId }),
        credentials: "include",
      }
    );
  });
});

describe("delFavorite", () => {
  it("should call postFavorite with proper fetch options", async () => {
    const characterId: number = 1;
    const store = configureStore({
      reducer: (state, _) => state,
    });
    await store.dispatch(delFavorite(characterId));
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toBeCalledWith(
      `${process.env.REACT_APP_BACKEND_URL}/favorite`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
        },
        body: JSON.stringify({ characterId }),
        credentials: "include",
      }
    );
  });
});
