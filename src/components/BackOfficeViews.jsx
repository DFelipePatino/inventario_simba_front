import React, { useState, useEffect } from 'react';
import Banner from './Banner';
import { cardStyles } from './styles';
import { Box, Grid, Button, Tooltip, Typography } from "@mui/material";
import ListItem from '@mui/material/ListItem';


const BackOfficeViews = () => {


    const buttons = [
        { url: "https://inventario-simba-back.onrender.com/inventario/productos/", label: "Productos", tooltip: "Aqui puedes agregar productos" },
        { url: "https://inventario-simba-back.onrender.com/inventario/inventarios/", label: "Inventarios", tooltip: "Aqui puedes manejar el inventario" },
        { url: "https://inventario-simba-back.onrender.com/inventario/ventas/", label: "Ventas", tooltip: "Aqui puedes ver tus ventas" }
    ];
    return (

        <>
            <Banner />
            <div style={cardStyles.container2}>

                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2} justifyContent="center">
                        {buttons.map((item, index) => (
                            <Grid item xs={12} sm={4} key={index}>
                                <Tooltip title={item.tooltip} arrow>
                                    <Button
                                        onClick={() => window.open(item.url, "_blank")}
                                        size="small"
                                        style={cardStyles.enterButton}
                                        fullWidth
                                    >
                                        {item.label}
                                    </Button>
                                </Tooltip>
                            </Grid>
                        ))}
                    </Grid>
                    <br />
                    <br />
                    <br />
                    <ListItem>
                        <Typography>
                            Some data is currently hardcoded
                            <br /> while the backend is being updated.
                            <br />Certain features may be limited.
                            <br />
                            <br />
                            Please visit the Git Repository
                            <br />of the app to learn more about this project.
                        </Typography>

                    </ListItem>
                    <ListItem>
                        <Button
                            component="a"
                            href="https://github.com/DFelipePatino/inventario_simba_front.git"
                            target="_blank"
                            rel="noopener noreferrer"
                            size="small"
                            style={cardStyles.enterButton}
                        >
                            Git Repo
                        </Button>
                    </ListItem>
                </Box>;

            </div>


        </>
    )
}

export default BackOfficeViews;
