
const initialState = {
    products: [
        {
            descripcion: "Mi página personal",
            id: 0,
            imagen: "portfolio.png",
            link: "https://danielpatinoportfolio.onrender.com/",
            nombre: "Portafolio",
            precio: "100.00",
            stock: 30,
        },
        {
            descripcion: "Esta es una app diseñada para un gym",
            id: 1,
            imagen: "gymapp.png",
            link: "https://gymapp-c8w7.onrender.com/",
            nombre: "Gym App",
            precio: "100.00",
            stock: 1
        },
        {
            descripcion: "Este proyecto te permite explorar una API de perros llena de informacion",
            id: 2,
            imagen: "dogs.png",
            link: "https://dogsproject-rr4u.onrender.com/",
            nombre: "Dogs API Project",
            precio: "100.00",
            stock: 4
        },
        {
            descripcion: "Este proyecto te permite explorar una API de perros llena de informacion",
            id: 2,
            imagen: "Store.png",
            link: "https://danielstore-front.onrender.com/",
            nombre: "E-Commerce",
            precio: "100.00",
            stock: 14
        },
        {
            descripcion: "Este proyecto te permite explorar una API de perros llena de informacion",
            id: 2,
            imagen: "StickyNotes.png",
            link: "https://fictional-university.onrender.com/",
            nombre: "Notes",
            precio: "100.00",
            stock: 3
        },

    ],
    productsCopy: [],
    lastSale: [],
    salesLog: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_PRODUCTS':
            return {
                ...state,
                // products: [...state.products, ...action.payload]
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
        case 'SORT_PRICE':
            return {
                ...state,
                productsCopy: action.payload,
            };
        case 'FILTER_STOCK':
            return {
                ...state,
                productsCopy: action.payload
            };
        case 'FILTER_NAME':
            return {
                ...state,
                productsCopy: action.payload
            };

        default:
            return state;
    }
};

export default reducer;