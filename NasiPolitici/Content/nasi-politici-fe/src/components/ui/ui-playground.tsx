import React from 'react';
import styled from "styled-components";
import {Box, Input, InputAdornment} from "@material-ui/core";
import {Button} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

export const SearchTextInput = styled(Input)`
    background: #FFFFFF;
    border: 1px solid #B3B3B3;
    box-sizing: border-box;
    box-shadow: inset 0px 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: 20px;
    width: 100%;
    height: 100%;
`;

SearchTextInput.defaultProps = {
    disableUnderline: true,
    placeholder: 'Kalousek',
    startAdornment: (
<InputAdornment position="start">
    <SearchIcon />
</InputAdornment>
    )
}

export const SearchSubmitButton = styled(Button)`
`

const UiPlaygroundDiv = styled.div`
    padding: 20px;
`

export const Search: React.FunctionComponent = (props) => {
    return (
        <Box display="flex" flexDirection="row">
            <SearchTextInput/>
            <SearchSubmitButton>Hledat politika</SearchSubmitButton>
        </Box>
    )
}


export class UiPlayground extends React.Component {
    render() {
        return (
            <UiPlaygroundDiv>
                <Search/>
            </UiPlaygroundDiv>
        )
    }
}
