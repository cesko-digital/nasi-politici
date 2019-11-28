import { ListItem, ListItemText, Divider } from '@material-ui/core';
import styled from 'styled-components';
import { ListItemProps } from '@material-ui/core/ListItem';

const GRAY = '#ececec';

interface WrapperListItemProps extends ListItemProps {
    withBackground?: boolean;
}

interface RowProps {
    name: string,
    data: string,
}

interface TableProps {
    rows: [RowProps],
    sectionName: string,
}

export const WrapperListItem = styled(ListItem)`
    flex-wrap: wrap;
    flex: 1 1 50%;

    ${(props: WrapperListItemProps) => props.withBackground && `
        background-color: ${GRAY};
    `}
`;

export const WrapperListItemText = styled(ListItemText)`
    min-width: 200px !important;
    padding: 0 !important;

    @media screen and (min-width: 448px){
        &:last-child {
            text-align: right;
        }
    }
`;

export const WrapperDivider = styled(Divider)`
    margin-right: 20px;
    display: flex;
    flex: 1 1 auto;
`;

export const SectionNameElement = styled(ListItemText)`
    flex-grow: 0 !important;
    font-weight: 700px !important;
`;

export const FlexWrapperElement = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    padding-left: 16px;
    box-sizing: border-box;
`;
