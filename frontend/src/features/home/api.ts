import {
  CharacterListResponse,
  CharacterResponse,
  FavoriteResponse,
} from "./types";

export const fetchCharacter = (id: number): Promise<CharacterResponse> =>
  fetch(`${process.env.REACT_APP_BACKEND_URL}/ricky/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
    },
    credentials: "include",
  }).then((res) => {
    if (res.status === 401) {
      window.sessionStorage.setItem("loggedIn", "false");
      window.location.reload();
      return;
    }
    if (res.ok) return res.json();
  });

export const fetchCharacters = (
  page: number = 1
): Promise<CharacterListResponse> =>
  fetch(`${process.env.REACT_APP_BACKEND_URL}/ricky/?page=${page}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
    },
    credentials: "include",
  }).then((res) => {
    if (res.status === 401) {
      window.sessionStorage.setItem("loggedIn", "false");
      window.location.reload();
      return;
    }
    if (res.ok) return res.json();
  });

export const setFavorite = (characterId: number): Promise<FavoriteResponse> =>
  fetch(`${process.env.REACT_APP_BACKEND_URL}/favorite`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
    },
    body: JSON.stringify({ characterId }),
    credentials: "include",
  }).then((res) => {
    if (res.status === 401) {
      window.sessionStorage.setItem("loggedIn", "false");
      window.location.reload();
      return;
    }
    if (res.ok) return res.json();
  });

export const deleteFavorite = (
  characterId: number
): Promise<FavoriteResponse> =>
  fetch(`${process.env.REACT_APP_BACKEND_URL}/favorite`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
    },
    body: JSON.stringify({ characterId }),
    credentials: "include",
  }).then((res) => {
    if (res.status === 401) {
      window.sessionStorage.setItem("loggedIn", "false");
      window.location.reload();
      return;
    }
    if (res.ok) return res.json();
  });
