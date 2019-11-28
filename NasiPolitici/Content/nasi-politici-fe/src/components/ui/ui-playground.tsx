import React from 'react';
import styled from "styled-components";
import {Input} from "@material-ui/core";
import {Button} from '@material-ui/core';
import styles from './search.scss';

export const SearchInput = styled.input`
    background: #FFFFFF;
    border: 1px solid #B3B3B3;
    box-sizing: border-box;
    box-shadow: inset 0px 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: 20px;
    width: 100%;
    height: 100%;
`;
export const SearchButton = Button;
const UiPlaygroundDiv = styled.div`
    padding: 20px;
    outline: none;
`

export const Search: React.FunctionComponent = (props) => {
    return (
        <Box display="flex" flexDirection="row">
            <SearchInput/>
            <Button variant="contained">Default</Button>
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
