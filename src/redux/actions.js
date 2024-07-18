import axios from 'axios';

const API_URL = 'http://localhost:8000/inventario';

export const getProducts = () => {
    return (dispatch) => {
        axios.get(`${API_URL}/productos/`)
            .then(({ data }) => {
                dispatch({ type: 'GET_PRODUCTS', payload: data });
                // Add any additional dispatch actions if needed
            })
            .catch(error => console.error(error));
    }
};


export const updateProduct = (product) => {
    return (dispatch) => {
        axios.put(`${API_URL}/inventarios/${product.id}/`, product)
            .then(({ data }) => {
                dispatch({ type: 'UPDATE_PRODUCT', payload: data });
                // Add any additional dispatch actions if needed
            })
            .catch(error => console.error(error));
    }
}


export const generateSale = ({ product, quantity }) => {
    return async (dispatch) => {
        const response = await axios.post(`${API_URL}/ventas/`, {
            producto: product.id,
            cantidad: quantity,
        });
        dispatch({ type: 'GENERATE_SALE_LOG', payload: response.data });
    };
};


export const fetchLatestInput = () => {
    return async (dispatch) => {
        const response = await axios.get(`${API_URL}/ventas/`);
        const data = response.data;
        dispatch({
            type: 'FETCH_LATEST_INPUT',
            payload: data[data.length - 1]
        });
        console.log(data, 'data');
    }
};


export const searchByName = (name) => {
    return (dispatch, getState) => {
        const { products } = getState();
        const orderCopy = [...products]

        const filtered = orderCopy.filter(product => product.nombre.toLowerCase().includes(name.toLowerCase()));

        return dispatch({ type: 'FILTER_NAME', payload: filtered });
    }
}



export const sortPrices = (order) => {
    return (dispatch, getState) => {
        const { products, productsCopy } = getState();

        const arrayToSort = productsCopy.length > 0 ? [...productsCopy] : [...products];

        if (order === "A") {
            arrayToSort.sort((a, b) => a.id - b.id);
        }
        if (order === "D") {
            arrayToSort.sort((a, b) => b.id - a.id);
        }

        return dispatch({ type: 'SORT_PRICE', payload: arrayToSort });
    }
};


export const sortStock = (order) => {

    return (dispatch, getState) => {
        const { products } = getState();
        const orderCopy = [...products]

        let stock

        if (order === "A") {
            stock = orderCopy.filter(product => product.stock > 0);
        }
        if (order === "D") {
            stock = orderCopy.filter(product => product.stock <= 0);
        }
        if (order === "T") {
            stock = orderCopy;
        }

        return dispatch({ type: 'FILTER_STOCK', payload: stock });
    }
};  