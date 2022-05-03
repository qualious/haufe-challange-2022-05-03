import React, { FC } from "react";

export const NotFound: FC<{}> = () => (
  <div
    style={{
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      minHeight: 320,
    }}
  >
    <h1>
      4
      <span role="img" aria-label="Crying Face">
        😢
      </span>
      4
    </h1>
    <p style={{ fontSize: "1rem", lineHeight: 1.5 }}>Not Found</p>
  </div>
);
