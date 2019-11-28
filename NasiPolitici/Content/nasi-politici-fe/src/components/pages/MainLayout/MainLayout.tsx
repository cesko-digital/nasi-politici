import React, { ReactNode } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import styled from 'styled-components';

interface MainLayoutProps {
    children: ReactNode;
}


const FullHeightGrid = styled(Grid)`
    height: 100%;
`;

const MainLayout = ({ children }: MainLayoutProps) => (
    <FullHeightGrid container justify="space-between">
        <Grid item xs={12}>
            {/* Navbar */}
            <Paper>xs=12</Paper>
        </Grid>
        <FullHeightGrid container justify="center" alignItems="center">
            <Grid item xs={6}>
                {children}
            </Grid>
        </FullHeightGrid>
        <Grid item xs={12}>
            {/* Footer */}
            <Paper>xs=12</Paper>
        </Grid>
    </FullHeightGrid>
);
export default MainLayout;
