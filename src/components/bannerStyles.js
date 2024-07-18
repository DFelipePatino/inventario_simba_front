import zIndex from "@mui/material/styles/zIndex";

export const bannerStyles = {

    bannerContainerStyles: {
        position: 'absolute', // or 'fixed' if you want it to stay in place when scrolling
        top: 0,
        left: 0,
        width: '100%',
        height: '100%', // Optional: if you want it to cover the full height of the screen
        overflow: 'hidden', // 
        zIndex: '+3' // Adjust z-index as needed
    },

    navButtonsProps1: {
        style: {
            backgroundColor: 'transparent',
            color: 'white'
        }
    },

    navButtonsWrapperProps1: {
        style: {
            bottom: '0',
            top: '0',
            transform: 'none',
            height: '100%'
        }
    }
}