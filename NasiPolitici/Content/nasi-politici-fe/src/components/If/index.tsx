import React from "react";

export const If: React.FunctionComponent<{ condition: boolean }> = ({
  condition,
  children
}) => {
  if (!condition) {
    return null;
  }

  return <>{children}</>;
};
