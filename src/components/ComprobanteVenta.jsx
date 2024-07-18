import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { fetchLatestInput } from '../redux/actions';
import { jsPDF } from 'jspdf';
import { cardStyles } from './styles';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
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
        doc.text(`Producto: ${latestInput.productoNombre}`, 10, 30);
        doc.text(`Cantidad: ${latestInput.cantidad}`, 10, 40);

        doc.text(`Precio Unitario: ${latestInput.productoPrecio}`, 10, 50);
        const totalPrice = latestInput.productoPrecio * latestInput.cantidad;
        doc.text(`Precio Total: ${totalPrice}`, 10, 60);

        const currentDateTime = new Date().toString();
        doc.text(`Fecha/Hora: ${currentDateTime}`, 10, 70);

        doc.text(`ID comprobante: ${latestInput.purchase_id}`, 10, 80);
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
                            Valor unitario: {latestInput.productoPrecio}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" style={cardStyles.cardDescription}>
                            Valor de la compra: {latestInput.cantidad * latestInput.productoPrecio}
                        </Typography>
                        <br />
                        <Typography variant="body2" color="text.secondary" style={cardStyles.cardDescription}>
                            Fecha: {latestInput.fecha}
                        </Typography>
                        <br />
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
                            Descargar Comprobante
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