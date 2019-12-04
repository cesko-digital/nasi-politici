import React from 'react';
import styled from 'styled-components';
import Link from '@material-ui/core/Link';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import IconButton from '@material-ui/core/IconButton';

interface FooterProps {
    link: string,
    linkName: string,
    onClick: any,
}

const LinkElement = styled(Link)`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const FooterElement = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 0 8px 8px 32px;
`;

const Footer = ({ onClick, link, linkName }: FooterProps) => (
    <FooterElement>
        <LinkElement onClick={onClick}>
            {linkName}
            <KeyboardArrowDownIcon />
        </LinkElement>
        <IconButton onClick={()=> window.open(link, "_blank")}>
            <OpenInNewIcon />
        </IconButton>
    </FooterElement>
)

export default Footer;
