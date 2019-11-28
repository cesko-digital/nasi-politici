import React from 'react';
import {Input} from "@material-ui/core";
import styled from "styled-components";
import {Button} from '@material-ui/core';

export const SearchInput = Input;
export const SearchButton = Button;
const UiPlaygroundDiv = styled.div`
    padding: 20px;
`


export class UiPlayground extends React.Component {
    render() {
        return (
            <UiPlaygroundDiv>
                <SearchInput />
                <SearchButton/>
            </UiPlaygroundDiv>
        )
    }
}
