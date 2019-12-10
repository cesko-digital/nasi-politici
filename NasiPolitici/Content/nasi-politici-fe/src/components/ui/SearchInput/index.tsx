import React, { useState } from "react";
import styled from "styled-components";
import { Box, Input, InputAdornment } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { RouteComponentProps, withRouter } from "react-router";
import { useDesktop } from "../../../hooks";
import { If } from "../../If";

const texts = {
  defaultPlaceholder: "Kalousek",
  defaultButtonLabel: "Hledat politika/čku"
};

const Container = styled(Box)`
  display: flex;
  flex-direction: row;
  font-size: 17px;
  height: 40px;
`;

const DesktopTextInput = styled(Input)`
  background: #ffffff;
  border: 1px solid #b3b3b3;
  box-sizing: border-box;
  box-shadow: inset 0px 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 20px 0px 0px 20px;
  max-height: 100%;
  padding-left: 10px;
  flex-grow: 1;
`;

DesktopTextInput.defaultProps = {
  disableUnderline: true,
  startAdornment: (
    <InputAdornment position="start">
      <SearchIcon />
    </InputAdornment>
  )
};

const MobileTextInput = styled(DesktopTextInput)``;
MobileTextInput.defaultProps = {
  startAdornment: null
};

export const SearchButton = styled.button`
  border-radius: 0px 20px 20px 0px;
  border: none;
  color: white;
  background-color: #307abe;
  white-space: nowrap;
  line-height: 100%;
  max-height: 100%;
`;

type ISearchInputProps = RouteComponentProps<{}> & {
  buttonLabel?: string;
  inputPlaceholder?: string;
  value?: string | null | undefined;
};

export const SearchInputImpl: React.FunctionComponent<ISearchInputProps> = ({
  buttonLabel = texts.defaultButtonLabel,
  inputPlaceholder = texts.defaultPlaceholder,
  value = ""
}) => {
  const [inputValue, setInputValue] = useState(value || "");
  const isDesktop = useDesktop();
  const TextInputComponent = isDesktop ? DesktopTextInput : MobileTextInput;
  return (
    <Container>
      <TextInputComponent
        placeholder={inputPlaceholder}
        value={inputValue}
        onChange={event => setInputValue(event.target.value)}
      />

      <SearchButton>
        <If condition={!isDesktop}>
          <SearchIcon />
        </If>

        <If condition={isDesktop}>{buttonLabel}</If>
      </SearchButton>
    </Container>
  );
};

export const SearchInput = withRouter(SearchInputImpl);
