import React, { FC, useCallback, useRef, useState } from "react";
import { Info } from "../../features/home/types";
import { Status } from "../../features/types";

interface InfiniteProps {
  info: Info;
  status: Status;
  fetchNext: Function;
}

export const Infinite: FC<InfiniteProps> = ({
  info,
  status,
  fetchNext,
}: InfiniteProps) => {
  const [position, setPosition] = useState<number>(0);
  const observer = useRef<IntersectionObserver | null>();
  const fetchWhenVisible = useCallback(
    (node: any) => {
      if (status === Status.LOADING) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !!info.next) {
          const nextPage: number | null = Number(info.next.match(/\d/g));
          if (nextPage) {
            return fetchNext();
          }
        }
      });
      if (node) observer.current.observe(node);
    },
    [status, info.next]
  );

  return (
    <ul
      style={{
        padding: 0,
        margin: 0,
        marginTop: 5,
        listStyleType: "none",
      }}
    ></ul>
  );
};
