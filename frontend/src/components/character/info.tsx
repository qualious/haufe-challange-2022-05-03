import { FC } from "react";

export const Info: FC<{ field: string; value: string }> = ({
  field,
  value,
}: {
  field: string;
  value: string;
}) => (
  <>
    <label
      id={`${field}-label`}
      aria-label={`${field}-label`}
      htmlFor={field}
    />
    <span id={field} aria-label={field}>
      {value}
    </span>
  </>
);
