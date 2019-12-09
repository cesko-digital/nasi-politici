import React from "react";
import styled from "styled-components";
import { Box, Input, InputAdornment } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

const SearchInputContainer = styled(Box)`
  display: flex;
  flex-direction: row;
  font-size: 17px;
  height: 40px;
`;

export const SearchInputText = styled(Input)`
  background: #ffffff;
  border: 1px solid #b3b3b3;
  box-sizing: border-box;
  box-shadow: inset 0px 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 20px 0px 0px 20px;
  max-height: 100%;
  padding-left: 10px;
`;

SearchInputText.defaultProps = {
  disableUnderline: true,
  placeholder: "Kalousek",
  startAdornment: (
    <InputAdornment position="start">
      <SearchIcon />
    </InputAdornment>
  )
};

export const SearchInputButton = styled.button`
  border-radius: 0px 20px 20px 0px;
  border: none;
  color: white;
  background-color: #307abe;
  white-space: nowrap;
  line-height: 100%;
  max-height: 100%;
`;

export const SearchInput: React.FunctionComponent = props => {
  return (
    <SearchInputContainer>
      <SearchInputText />
      <SearchInputButton>Hledat&nbsp;politika/čku</SearchInputButton>
    </SearchInputContainer>
  );
};
