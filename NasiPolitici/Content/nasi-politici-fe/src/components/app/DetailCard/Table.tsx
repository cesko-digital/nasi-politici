import React from 'react';
import { List } from '@material-ui/core';
import { FlexWrapperElement, SectionNameElement, WrapperDivider, WrapperListItemText, WrapperListItem } from './style';

interface RowProps {
    name: string,
    data: string,
}

interface TableProps {
    rows: Array<RowProps>,
    sectionName: string,
}

const Table = ({ sectionName, rows }: TableProps) => {
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