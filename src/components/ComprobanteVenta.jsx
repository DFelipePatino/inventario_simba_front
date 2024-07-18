import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { fetchLatestInput } from '../redux/actions';
import axios from 'axios';
import { jsPDF } from 'jspdf';
import { cardStyles } from './styles';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function ComprobanteVenta() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const latestInput = useSelector(state => state.lastSale);
    console.log(latestInput, 'latestInput');
    const salesLog = useSelector(state => state.salesLog);
    console.log(salesLog, 'salesLog');

    useEffect(() => {
        dispatch(fetchLatestInput());
    }, []);

    const downloadPDF = () => {
        if (!latestInput) return;

        const doc = new jsPDF();
        doc.text('Comprobante de Venta Amazon', 10, 10);
        doc.text(`Producto: ${latestInput.productoNombre}`, 10, 20);
        doc.text(`Cantidad: ${latestInput.cantidad}`, 10, 30);
        doc.text(`Fecha: ${latestInput.fecha}`, 10, 40);
        doc.text(`ID comprobante: ${latestInput.purchase_id}`, 10, 50);
        doc.save('comprobante_venta.pdf');
    };

    return (
        <div style={cardStyles.containerComprobante}>
            <h1>Comprobante de Venta</h1>
            {latestInput ? (
                <Card sx={{ maxWidth: 345 }} style={cardStyles.card}>
                    <CardContent style={cardStyles.cardContent}>
                        <Typography gutterBottom variant="h5" component="div" style={cardStyles.cardTitle}>
                            {latestInput.productoNombre}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" style={cardStyles.cardDescription}>
                            Cantidad: {latestInput.cantidad}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" style={cardStyles.cardDescription}>
                            Fecha: {latestInput.fecha}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" style={cardStyles.cardDescription}>
                            ID comprobante: {latestInput.purchase_id}
                        </Typography>
                    </CardContent>
                    <CardActions>

                        <Button
                            onClick={downloadPDF}
                            size="small"
                            style={cardStyles.button}
                        >
                            Download PDF
                        </Button>

                    </CardActions>
                </Card>
            ) : (
                <p>Cargando...</p>
            )}
            <br />
            <Link to="/products">
                <Button style={cardStyles.button}>Ir a Productos</Button>
            </Link>
        </div>
    );
}

export default ComprobanteVenta;