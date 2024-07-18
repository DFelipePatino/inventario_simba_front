import axios from 'axios';

export const getProducts = () => {
    return (dispatch) => {
        axios.get('http://localhost:8000/inventario/productos/')
            .then(({ data }) => {
                dispatch({ type: 'GET_PRODUCTS', payload: data });
                // Add any additional dispatch actions if needed
            })
            .catch(error => console.error(error));
    }
};


export const updateProduct = (product) => {
    return (dispatch) => {
        axios.put(`http://127.0.0.1:8000/inventario/inventarios/${product.id}/`, product)
            .then(({ data }) => {
                dispatch({ type: 'UPDATE_PRODUCT', payload: data });
                // Add any additional dispatch actions if needed
            })
            .catch(error => console.error(error));
    }
}


export const generateSale = ({ product, quantity }) => {
    return async (dispatch) => {
        const response = await axios.post('http://127.0.0.1:8000/inventario/ventas/', {
            producto: product.id,
            cantidad: quantity,
        });
        dispatch({ type: 'GENERATE_SALE_LOG', payload: response.data });
    };
};


export const fetchLatestInput = () => {
    return async (dispatch) => {
        const response = await axios.get('http://127.0.0.1:8000/inventario/ventas/');
        const data = response.data;
        dispatch({
            type: 'FETCH_LATEST_INPUT',
            payload: data[data.length - 1]
        });
        console.log(data, 'data');
    }
};
