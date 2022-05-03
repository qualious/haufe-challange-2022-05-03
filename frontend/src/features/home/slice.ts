import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { AsyncThunkConfig, Status } from "../types";
import {
  deleteFavorite,
  fetchCharacter,
  fetchCharacters,
  setFavorite,
} from "./api";
import {
  Info,
  Character,
  CharacterListResponse,
  CharacterResponse,
  FavoriteResponse,
} from "./types";

export interface HomeState {
  info: Info;
  status: Status;
  before: Array<Character>;
  characters: Array<Character>;
}

export const initialState: HomeState = {
  info: {} as Info,
  status: Status.IDLE,
  before: [] as Array<Character>,
  characters: [] as Array<Character>,
};

export const getCharacter = createAsyncThunk<
  CharacterResponse,
  number,
  AsyncThunkConfig
>("home/detail", async (id, _) => await fetchCharacter(id));

export const getCharacters = createAsyncThunk<
  CharacterListResponse,
  number,
  AsyncThunkConfig
>("home/list", async (page, _) => await fetchCharacters(page));

export const postFavorite = createAsyncThunk<
  FavoriteResponse,
  number,
  AsyncThunkConfig
>("home/postFavorite", async (id, _) => await setFavorite(id));

export const delFavorite = createAsyncThunk<
  FavoriteResponse,
  number,
  AsyncThunkConfig
>("home/deleteFavorite", async (id, _) => await deleteFavorite(id));

export const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    goBack: (state) => {
      state.characters = state.before;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCharacter.pending, (state) => {
        state.status = Status.LOADING;
      })
      .addCase(
        getCharacter.fulfilled,
        (state, action: PayloadAction<CharacterResponse>) => {
          state.status = Status.IDLE;
          const { status_code, data } = action.payload;
          if (status_code > 200 || status_code < 300) {
            state.before = state.characters;
            state.characters = [data];
          } else {
            state.status = Status.FAILED;
          }
        }
      )
      .addCase(getCharacter.rejected, (state) => {
        state.status = Status.FAILED;
      })
      .addCase(getCharacters.pending, (state) => {
        state.status = Status.LOADING;
      })
      .addCase(
        getCharacters.fulfilled,
        (state, action: PayloadAction<CharacterListResponse>) => {
          const { status_code, data } = action.payload;
          if (status_code > 200 || status_code < 300) {
            const { info, results } = data;
            state.info = info;
            state.status = Status.IDLE;
            state.characters = Array.from(
              new Set([...state.characters, ...results])
            );
          } else {
            state.status = Status.FAILED;
          }
        }
      )
      .addCase(getCharacters.rejected, (state) => {
        state.status = Status.FAILED;
      })
      .addCase(
        postFavorite.fulfilled,
        (state, action: PayloadAction<FavoriteResponse>) => {
          const { status_code, data } = action.payload;
          if (status_code > 200 || status_code < 300) {
            state.characters = state.characters.reduce(
              (acc: Array<Character>, character: Character) =>
                character.id === data.characterId
                  ? [...acc, { ...character, favorite: true }]
                  : [...acc, character],
              []
            );
            // NOTE: Don't let the old data become stale
            if (state.characters.length === 1) {
              state.before = state.before.reduce(
                (acc: Array<Character>, character: Character) =>
                  character.id === data.characterId
                    ? [...acc, { ...character, favorite: true }]
                    : [...acc, character],
                []
              );
            }
            state.status = Status.IDLE;
          } else {
            state.status = Status.FAILED;
          }
        }
      )
      .addCase(postFavorite.rejected, () => {
        alert("Can't add favorite. Try again.");
      })
      .addCase(
        delFavorite.fulfilled,
        (state, action: PayloadAction<FavoriteResponse>) => {
          state.status = Status.IDLE;
          const { status_code, data } = action.payload;
          if (status_code > 200 || status_code < 300) {
            state.characters = state.characters.reduce(
              (acc: Array<Character>, character: Character) =>
                character.id === data.characterId
                  ? [...acc, { ...character, favorite: false }]
                  : [...acc, character],
              []
            );
            // NOTE: Don't let the old data become stale
            if (state.characters.length === 1) {
              state.before = state.before.reduce(
                (acc: Array<Character>, character: Character) =>
                  character.id === data.characterId
                    ? [...acc, { ...character, favorite: false }]
                    : [...acc, character],
                []
              );
            }
          } else {
            state.status = Status.FAILED;
          }
        }
      )
      .addCase(delFavorite.rejected, () => {
        alert("Can't remove from favorites. Try again.");
      });
  },
});

export const { goBack } = homeSlice.actions;

export const selectCharacters = (state: RootState): Array<Character> =>
  state.home.characters;

export const selectInfo = (state: RootState): Info => state.home.info;

export const selectStatus = (state: RootState): Status => state.home.status;

export default homeSlice.reducer;
