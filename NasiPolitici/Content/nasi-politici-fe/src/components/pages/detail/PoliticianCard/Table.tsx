import React from 'react';
import { List, ListItem, ListItemText, Divider } from '@material-ui/core';
import styled from 'styled-components';
import { ListItemProps } from '@material-ui/core/ListItem';

const GRAY = '#ececec';

interface WrapperListItemProps extends ListItemProps {
    withBackground?: boolean;
}

interface TableProps {
    rows?: [],
    sectionName: string,
}

const WrapperListItem = styled(ListItem)`
    flex-wrap: wrap;
    flex: 1 1 50%;

    ${(props: WrapperListItemProps) => props.withBackground && `
        background-color: ${GRAY};
    `}
`;

const WrapperListItemText = styled(ListItemText)`
    min-width: 200px !important;
    padding: 0 !important;

    @media screen and (min-width: 448px){
        &:last-child {
            text-align: right;
        }
    }
`;

const WrapperDivider = styled(Divider)`
    margin-right: 20px;
    display: flex;
    flex: 1 1 auto;
`;

const SectionNameElement = styled(ListItemText)`
    flex-grow: 0 !important;
    font-weight: 700px !important;
`;

const FlexWrapperElement = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    padding-left: 16px;
    box-sizing: border-box;
`;

function createData(name: string, data: string) {
    return { name, data };
  }
  
const rows = [
    createData('pro ODS', '3 mil Kc'),
    createData('pro STAN', '2 mil Kc'),
];

const Table = ({ sectionName }: TableProps) => {
  return (
    <div>
        <FlexWrapperElement>
            <SectionNameElement primary={sectionName} />
            <WrapperDivider variant="fullWidth" />
        </FlexWrapperElement>
        <List>
        {rows.map((row, index) => (
            // @ts-ignore @ts-nocheck
            <WrapperListItem key={index} withBackground={index % 2 === 0}>
                <WrapperListItemText primary={row.name} />
                <WrapperListItemText primary={row.data} />
            </WrapperListItem>
        ))}
        </List>
    </div>
  );
}

export default Table;