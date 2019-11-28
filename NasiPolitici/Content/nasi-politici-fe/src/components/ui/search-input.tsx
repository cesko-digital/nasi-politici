import React from "react";
import styled from "styled-components";
import { Box, Input, InputAdornment } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

export const SearchTextInput = styled(Input)`
  background: #ffffff;
  border: 1px solid #b3b3b3;
  box-sizing: border-box;
  box-shadow: inset 0px 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 20px 0px 0px 20px;
  width: 100%;
  padding: 10px;
  font-size: 21px;
`;

SearchTextInput.defaultProps = {
  disableUnderline: true,
  placeholder: "Kalousek",
  startAdornment: (
    <InputAdornment position="start">
      <SearchIcon />
    </InputAdornment>
  )
};

export const SearchSubmitButton = styled.button`
  border-radius: 0px 20px 20px 0px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border: 1px solid black;
  color: white;
  background-color: #307abe;
  white-space: nowrap;

  font-weight: 600;
  line-height: 100%;

  padding: 0px 18px;
`;

export const SearchInput: React.FunctionComponent = props => {
  return (
    <Box display="flex" flexDirection="row">
      <SearchTextInput />
      <SearchSubmitButton>Hledat&nbsp;politika/čku</SearchSubmitButton>
    </Box>
  );
};
