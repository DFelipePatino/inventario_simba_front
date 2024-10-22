import zIndex from "@mui/material/styles/zIndex";

export const cardStyles = {
    landingContainer: {
        height: '20px',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: '+2',
        flexDirection: "column",
        display: 'flex',
    },
    ProgressContainer: {
        // height: '20px',
        position: 'relative',
        // top: '50%',
        // left: '50%',
        // transform: 'translate(-50%, -50%)',
        zIndex: '+2',
        // justifyContent: 'center',
        // display: 'flex',
    },
    container: {
        backgroundColor: '#FFFFFF',
        padding: '20px',
        borderRadius: '5px',
    },
    containerComprobante: {
        backgroundColor: '#F0F0F0',
        padding: '20px',
        borderRadius: '5px',
    },
    container2: {
        height: '20px',
        position: 'absolute',
        top: '100px',
        zIndex: '+2',
        // justifyContent: 'center',
        // display: 'flex',
        width: '100%',
    },
    title: {
        color: '#FFFFFF',
        marginLeft: '20px',
        position: 'absolute',
        zIndex: '+1'
    },
    card: {
        // minWidth: 345,
        border: '1px solid #EAEDED',
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
        marginLeft: '5%',
    },
    media: {
        height: 140,
    },
    cardContent: {
        backgroundColor: '#232F3E',
        color: '#FFFFFF',
    },
    cardTitle: {
        color: '#FF9900',
    },
    cardDescription: {
        color: '#EAEDED',
    },
    cardPrice: {
        color: '#FF9900',
        fontWeight: 'bold',
    },
    enterButton: {
        backgroundColor: 'rgb(25, 118, 210)',
        color: '#FFFFFF',
        '&:hover': {
            backgroundColor: '#146EB4',
        },
    },
    button: {
        backgroundColor: '#FF9900',
        color: '#FFFFFF',
        '&:hover': {
            backgroundColor: '#146EB4',
        },
    },
};