import React from "react";
import { Button, Paper, TextField, Grid, Stack } from "@mui/material";

const EntryPage = ({ children, title }) => {
    return (
        <Grid
            container
            justifyContent="center"
            alignItems="center"
            height='100%'
        >
            <Paper
                elevation={10}
                sx={{
                    padding: 10,
                
                }}
            >
                <Grid
                    container
                    justifyContent="center"
                >
                    <h1>{title}</h1>
                </Grid>
                {children}
            </Paper>
        </Grid>
    )
}

export default EntryPage;