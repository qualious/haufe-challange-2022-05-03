import { Status } from "../types";
import { Character, Info } from "./types";
import { Char } from "../../components/character";
import { Button, Container, List, ListItem } from "./styled";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { useEffect, useRef, useCallback, FC, useState } from "react";
import {
  selectInfo,
  selectStatus,
  selectCharacters,
  getCharacters,
  getCharacter,
  goBack,
  postFavorite,
  delFavorite,
} from "./slice";

// IMPROVEMENT: Use u18next instead of static strings.
export const Home: FC<{}> = () => {
  // NOTE: I'd use react-query and handle everything locally instead of redux
  // And use the hook `useInfiniteQuery` instead of all this. But redux is asked, so.
  // (imo, global state makes everything unnecessarily complex and hard to follow)
  const dispatch = useAppDispatch();
  const info: Info = useAppSelector(selectInfo);
  const [position, setPosition] = useState<number>(0);
  const status: Status = useAppSelector(selectStatus);
  const characters: Array<Character> = useAppSelector(selectCharacters);
  // NOTE: There are libraries that implement infinite scrolling.
  // Assuming a manual implementation is preferred to demonstrate knowledge.
  // Also, it's generally not preferable to add libraries haphazardly.
  const observer = useRef<IntersectionObserver | null>();
  const fetchWhenVisible = useCallback(
    (node: HTMLElement | null) => {
      if (status === Status.LOADING) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !!info.next) {
          const nextPage: number | null = Number(info.next.match(/\d/g));
          if (nextPage) {
            return dispatch(getCharacters(nextPage));
          }
        }
      });
      if (node) observer.current.observe(node);
    },
    [dispatch, status, info.next]
  );
  const showingDetail: boolean = characters.length === 1;
  useEffect(() => {
    if (!showingDetail) {
      window.scrollTo(0, position);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showingDetail]);
  useEffect(() => {
    dispatch(getCharacters(1));
  }, [dispatch]);
  return (
    <Container id="home" aria-label="home" role="main">
      {(status === Status.IDLE || status === Status.LOADING) && (
        <>
          <List>
            {characters.map((character: Character, index: number) => (
              <ListItem
                key={character.id}
                ref={index === characters.length - 2 ? fetchWhenVisible : null}
              >
                <Char
                  {...character}
                  handleClick={() => {
                    if (characters.length > 1) {
                      setPosition(window.pageYOffset);
                      dispatch(getCharacter(character.id));
                    }
                  }}
                  handleFavorite={() =>
                    dispatch(
                      character.favorite
                        ? delFavorite(character.id)
                        : postFavorite(character.id)
                    )
                  }
                />
              </ListItem>
            ))}
          </List>
          <Button
            onClick={() => {
              if (showingDetail) {
                return dispatch(goBack());
              }
            }}
            disabled={!info.next || status === Status.LOADING}
          >
            {status === Status.LOADING
              ? "Loading..."
              : showingDetail
              ? "Go Back"
              : !info.next && "Nothing more to load"}
          </Button>
        </>
      )}
      {status === Status.FAILED && <div>Something went wrong.</div>}
    </Container>
  );
};
