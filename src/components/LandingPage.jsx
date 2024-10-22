import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts } from '../redux/actions';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Swal from 'sweetalert2';
import { cardStyles } from './styles';
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
                const diff = 100 / (85 * 2);  // increment to reach 100 in 85 seconds
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
            text: 'This instance will spin down with inactivity, which can delay requests by 50 seconds or more. Thank you for your patience. - Esta instancia se detendrá por inactividad, lo que puede retrasar las solicitudes en 50 segundos o más. Gracias por su paciencia.',
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
