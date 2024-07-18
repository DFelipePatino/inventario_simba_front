
const initialState = {
    products: [],
    lastSale: [],
    salesLog: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_PRODUCTS':
            return {
                ...state,
                products: action.payload
            };
        case 'ADD_PRODUCT':
            return {
                ...state,
                products: [...state.products, action.payload]
            };
        case 'FETCH_LATEST_INPUT':
            return {
                ...state,
                lastSale: action.payload
            };
        case 'GENERATE_SALE_LOG':
            return {
                ...state,
                salesLog: action.payload
            };
        default:
            return state;
    }
};

export default reducer;