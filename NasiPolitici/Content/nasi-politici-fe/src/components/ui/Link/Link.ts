import styled from "styled-components";
import { Link as MuiLink } from "@material-ui/core";

const Link = styled(MuiLink)`
    font-family: Source Serif Pro;
    font-size: 14px;
    @media screen and (min-width: ${props => props.theme.breakpoints.values.sm}px){
        font-size: 17px;
    }
    color: #4276A5 !important;
    cursor: pointer;
`;

export default Link;