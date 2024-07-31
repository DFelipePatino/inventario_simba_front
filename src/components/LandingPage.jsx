import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts } from '../redux/actions';
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
import LinearProgress from '@mui/material/LinearProgress';
import { Box } from '@mui/material';

const ProductList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const products = useSelector((state) => state.products);
    console.log(products, 'products');

    const [isLoading, setIsLoading] = useState(false);
    const [useEffectState, setUseEffectState] = useState(false);

    useEffect(() => {
        dispatch(getProducts());
        const timer = setInterval(() => {
            progressRef.current();
        }, 500);
        if (useEffectState && products.length > 0) {
            navigate('/products');
        }

        return () => {
            clearInterval(timer);
        };
    }, [dispatch, products.length]);

    const [progress, setProgress] = useState(0);
    const [buffer, setBuffer] = useState(10);

    const progressRef = React.useRef(() => { });

    useEffect(() => {
        progressRef.current = () => {
            if (progress > 100) {
                setProgress(0);
                setBuffer(10);
            } else {
                const diff = 100 / (70 * 2);  // increment to reach 100 in 70 seconds
                const diff2 = diff;  // ensure buffer progresses at the same rate
                setProgress(progress + diff);
                setBuffer(progress + diff + diff2);
            }
        };
    }, [progress]);

    const handleClick = () => {
        setUseEffectState(true);
        Swal.fire({
            title: 'Atención!',
            text: 'Esta página se encuentra alojada en un servidor de prueba, por lo que la carga de información podría tardar hasta 1 minuto. Gracias por su paciencia.',
            icon: 'warning',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Entendido'
        }).then(() => {
            if (products.length == 0) {
                setIsLoading(true);
            } else {
                setIsLoading(true);
                setTimeout(() => {
                    navigate('/products');
                }, 3000);
            }
        });
    };

    return (
        <div style={{ overflowX: 'hidden' }}>
            <Banner />
            {isLoading ? (
                <Box sx={{ width: '100%', top: "50%", position: 'absolute', zIndex: '+2' }}>
                    <Typography variant="h6" style={{ textAlign: 'center', color: 'white' }}>
                        Waiting for server...
                        <LinearProgress variant="buffer" value={progress} valueBuffer={buffer} />
                    </Typography>
                </Box>
            ) : (
                <div style={cardStyles.landingContainer}>
                    <Typography variant="h6" style={{ textAlign: 'center', color: 'white' }}>
                        Welcome to the E-Commerce Portfolio
                    </Typography>
                    <Button
                        onClick={handleClick}
                        size="small"
                        style={cardStyles.enterButton}
                    >
                        Enter
                    </Button>
                </div>
            )}
        </div>
    );
};

export default ProductList;
