import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { searchByName } from '../redux/actions';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import Sort from './Sort';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { Button, Divider } from '@mui/material';
import { cardStyles } from './styles';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));


export default function SearchAppBar() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const products = useSelector((state) => state.products);

    const [state, setState] = React.useState(false);

    const toggleDrawer = (open) => (event) => {
        if (
            event &&
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }

        setState(open);
    };

    const [term, setTerm] = React.useState('');

    const termTrim = term.trim();
    console.log("este es el termtrim", termTrim)

    const onSubmit = (event) => {
        event.preventDefault();
        if (termTrim === '') {
            window.alert('Search cannot be empty');
        } else {
            dispatch(searchByName(termTrim));
            setTerm('');
        }
    };

    const handleChange = (event) => {
        const { value } = event.target;
        setTerm(value);
    }

    const list = (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <List>
                    <ListItem >
                        <Button
                            onClick={() => window.open("https://inventario-simba-back.onrender.com/inventario/productos/", "_blank")}
                            size="small"
                            style={cardStyles.enterButton}
                        >
                            Back Office
                        </Button>
                    </ListItem>
                    <br />
                    <Divider />
                    <br />
                    <ListItem >
                        <Sort
                            products={products}
                        />
                    </ListItem>

                    <br />
                    <Divider />
                    <br />
                    <ListItem >
                        <Button
                            onClick={() => {
                                navigate("/");
                                console.log("click");
                            }}
                            size="small"
                            style={cardStyles.enterButton}
                        >
                            Exit
                        </Button>
                    </ListItem>
                </List>
            </Box>
        </>
    );



    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 2 }}
                        onClick={toggleDrawer(true)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                    >
                        E-Commerce Portfolio
                    </Typography>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <form onSubmit={(e) => {
                            e.preventDefault(); // Prevent default form submission behavior
                            onSubmit(e); // Pass the event to onSubmit
                        }}>
                            <StyledInputBase
                                type="text"
                                value={term}
                                onChange={handleChange}
                                placeholder="Search…"
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </form>
                    </Search>
                </Toolbar>
            </AppBar>
            <div>
                <React.Fragment >
                    <SwipeableDrawer
                        anchor={'left'}
                        open={state}
                        onClose={toggleDrawer(false)}
                        onOpen={toggleDrawer(true)}
                    >
                        {list}
                    </SwipeableDrawer>
                </React.Fragment>
            </div>
        </Box>
    );
}
