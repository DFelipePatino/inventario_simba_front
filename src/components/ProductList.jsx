import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts, generateSale } from '../redux/actions';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Swal from 'sweetalert2';
import { cardStyles } from './styles';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Banner from './Banner';

const ProductList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    const products = useSelector(state => state.products);
    const productsCopy = useSelector(state => state.productsCopy);

    const [selectedQuantities, setSelectedQuantities] = useState({});

    const handleQuantityChange = (productId, event) => {
        setSelectedQuantities({
            ...selectedQuantities,
            [productId]: event.target.value,
        });
    };

    const generarCompra = (product, quantity) => {
        dispatch(generateSale({ product, quantity }));
    };

    const handleClick = (product) => {
        const selectedQuantity = selectedQuantities[product.id] || 1;
        Swal.fire({
            title: 'Estas seguro?',
            text: `Deseas continuar con la compra de ${selectedQuantity} ${product.nombre} ?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, comprar!'
        }).then((result) => {
            if (result.isConfirmed) {
                generarCompra(product, selectedQuantity);
                Swal.fire(
                    'Compra realizada!',
                    'Tu compra ha sido realizada con éxito!',
                    'success'
                ).then(() => {
                    navigate('/comprobante');
                });
            }
        });
    };

    return (
        <div
         style={{ overflowX: 'hidden' }}
        >
            <Banner />
            {productsCopy && productsCopy.length > 0 ? (
                <div style={cardStyles.container2}>
                    <Grid container rowSpacing={2} columnSpacing={{ xs: 0, sm: 1, md: 1, lg: 1 }}>
                        {productsCopy.map(product => (
                            <Grid item xs={6} sm={6} md={4} lg={3} xl={2} key={product.id}>
                                <Card sx={{ maxWidth: 345 }} style={cardStyles.card}>
                                    <CardMedia
                                        sx={{ height: 140 }}
                                        style={cardStyles.media}
                                        image={product.imagen}
                                        title="product image"
                                    />
                                    <CardContent style={cardStyles.cardContent}>
                                        <Typography gutterBottom variant="h5" component="div" style={cardStyles.cardTitle}>
                                            {product.nombre}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" style={cardStyles.cardDescription}>
                                            {product.descripcion}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" style={cardStyles.cardDescription}>
                                            Stock: {product.stock === 0 ? 'Out of Stock' : product.stock}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" style={cardStyles.cardPrice}>
                                            ${product.precio}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" style={cardStyles.cardPrice}>
                                            Link: <a href={product.link}>Visit me!</a>
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Select
                                            value={selectedQuantities[product.id] || 1}
                                            onChange={(event) => handleQuantityChange(product.id, event)}
                                            style={{ marginRight: '10px', height: '40px' }}
                                        >
                                            {[...Array(product.stock).keys()].map((num) => (
                                                <MenuItem key={num + 1} value={num + 1}>
                                                    {num + 1}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        {product.stock !== 0 ? (
                                            <Button
                                                onClick={() => handleClick(product)}
                                                size="small"
                                                style={cardStyles.button}
                                            >
                                                Comprar
                                            </Button>
                                        ) : null}
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </div>
            ) : (
                <div style={cardStyles.container2}>
                    <Grid container rowSpacing={2} columnSpacing={{ xs: 0, sm: 1, md: 1, lg: 1 }}>
                        {products.map(product => (
                            <Grid item sx={{paddingRight: '16px'}} xs={6} sm={6} md={4} lg={3} xl={2} key={product.id}>
                                <Card sx={{ maxWidth: 345 }} style={cardStyles.card}>
                                    <CardMedia
                                        sx={{ height: 140 }}
                                        style={cardStyles.media}
                                        image={product.imagen}
                                        title="product image"
                                    />
                                    <CardContent style={cardStyles.cardContent}>
                                        <Typography gutterBottom variant="h5" component="div" style={cardStyles.cardTitle}>
                                            {product.nombre}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" style={cardStyles.cardDescription}>
                                            {product.descripcion}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" style={cardStyles.cardDescription}>
                                            Stock: {product.stock === 0 ? 'Out of Stock' : product.stock}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" style={cardStyles.cardPrice}>
                                            ${product.precio}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" style={cardStyles.cardPrice}>
                                            Link: <a href={product.link}>Visit me!</a>
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Select
                                            value={selectedQuantities[product.id] || 1}
                                            onChange={(event) => handleQuantityChange(product.id, event)}
                                            style={{ marginRight: '10px', height: '40px' }}
                                        >
                                            {[...Array(product.stock).keys()].map((num) => (
                                                <MenuItem key={num + 1} value={num + 1}>
                                                    {num + 1}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        {product.stock !== 0 ? (
                                            <Button
                                                onClick={() => handleClick(product)}
                                                size="small"
                                                style={cardStyles.button}
                                            >
                                                Comprar
                                            </Button>
                                        ) : null}
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </div>
            )}
        </div>
    );
}

export default ProductList;
