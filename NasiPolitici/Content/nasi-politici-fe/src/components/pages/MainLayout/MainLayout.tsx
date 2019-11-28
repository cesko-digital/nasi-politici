import React, { ReactNode } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

interface MainLayoutProps {
    children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => (
    <Grid container justify="space-between">
        <Grid item xs={12}>
            {/* Navbar */}
            <Paper>xs=12</Paper>
        </Grid>
        <Grid container justify="center" alignItems="center">
            <Grid item xs={6}>
                {children}
            </Grid>
        </Grid>
        <Grid item xs={12}>
            {/* Footer */}
            <Paper>xs=12</Paper>
        </Grid>
    </Grid>
);
export default MainLayout;
