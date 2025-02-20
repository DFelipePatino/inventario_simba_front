import React, { useState, useEffect } from 'react';
import Banner from './Banner';
import { cardStyles } from './styles';
import { Box, Grid, Button, Tooltip } from "@mui/material";



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
</Box>;

        </div>
    </>
    )
}

export default BackOfficeViews;
