import * as React from 'react';
import { useNavigate } from 'react-router-dom';
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
import { useMediaQuery, useTheme } from '@mui/material';
import Badge from '@mui/material/Badge';
import Tooltip from '@mui/material/Tooltip';

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
    const [showMenuNotification, setShowMenuNotification] = React.useState(false);
    const [showBackOfficeNotification, setShowBackOfficeNotification] = React.useState(false);
    const [hasSearched, setHasSearched] = React.useState(false);

    React.useEffect(() => {
        const menuTimer = setTimeout(() => {
            setShowMenuNotification(true);
        }, 1500);

        const backOfficeTimer = setTimeout(() => {
            setShowBackOfficeNotification(true);
        }, 1500);

        return () => {
            clearTimeout(menuTimer);
            clearTimeout(backOfficeTimer);
        };
    }, []);

    const toggleDrawer = (open) => (event) => {
        if (
            event &&
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }

        if (open) {
            setShowMenuNotification(false);
        }
        setState(open);
    };

    const [term, setTerm] = React.useState('');


    const termTrim = term.trim();


    const onSubmit = (event) => {
        event.preventDefault();
        if (termTrim === '') {
            window.alert('Search cannot be empty');
        } else {
            dispatch(searchByName(termTrim));
            setTerm('');
            setHasSearched(true);
        }
    };

    const handleChange = (event) => {
        const { value } = event.target;
        setTerm(value);
    }

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const list = (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <List>
                    <ListItem >
                        {isMobile && (
                            <Button
                                onClick={() => {
                                    if (hasSearched) {
                                        window.location.reload();
                                    } else {
                                        toggleDrawer(false)();
                                        setTimeout(() => navigate("/products"), 300);
                                    }
                                }}
                                size="small"
                                style={cardStyles.enterButton}
                                fullWidth
                            >
                                Home
                            </Button>
                        )}
                    </ListItem>
                    <ListItem >
                        <Tooltip title="Aqui puedes agregar productos!" arrow placement="right">
                            <Badge
                                variant="dot"
                                color="error"
                                invisible={!showBackOfficeNotification}
                                sx={{
                                    width: '100%',
                                    '& .MuiBadge-badge': {
                                        animation: showBackOfficeNotification ? 'pulse 1.5s infinite' : 'none',
                                        '@keyframes pulse': {
                                            '0%': { transform: 'scale(1)' },
                                            '50%': { transform: 'scale(1.3)' },
                                            '100%': { transform: 'scale(1)' },
                                        },
                                    },
                                }}
                            >
                                <Button
                                    onClick={() => {
                                        setShowBackOfficeNotification(false);
                                        toggleDrawer(false)();
                                        setTimeout(() => navigate("/backoffice"), 300);
                                    }}
                                    size="small"
                                    style={cardStyles.enterButton}
                                    fullWidth

                                >
                                    Back Office
                                </Button>
                            </Badge>
                        </Tooltip>
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
                            }}
                            size="small"
                            style={cardStyles.enterButton}
                        >
                            Exit
                        </Button>
                    </ListItem>
                    <ListItem>
                        <Typography>
                            Some data is currently hardcoded
                            <br /> while the backend is being updated.
                            <br />Certain features may be limited.
                            <br />
                            <br />
                            Please visit the Git Repository
                            <br />of the app to learn more about this project.
                        </Typography>

                    </ListItem>
                    <ListItem>
                        <Button
                            component="a"
                            href="https://github.com/DFelipePatino/inventario_simba_front.git"
                            target="_blank"
                            rel="noopener noreferrer"
                            size="small"
                            style={cardStyles.enterButton}
                        >
                            Git Repo
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
                        <Badge
                            variant="dot"
                            color="error"
                            invisible={!showMenuNotification}
                            sx={{
                                '& .MuiBadge-badge': {
                                    animation: showMenuNotification ? 'pulse 1.5s infinite' : 'none',
                                    '@keyframes pulse': {
                                        '0%': { transform: 'scale(1)' },
                                        '50%': { transform: 'scale(1.3)' },
                                        '100%': { transform: 'scale(1)' },
                                    },
                                },
                            }}
                        >
                            <MenuIcon />
                        </Badge>
                    </IconButton>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'none', sm: 'block' },
                            cursor: 'pointer'
                        }}
                        onClick={() => {
                            if (hasSearched) {
                                window.location.reload();
                            } else {
                                navigate("/products");
                            }
                        }}
                    >
                        E-Commerce Portfolio
                    </Typography>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            onSubmit(e);
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
                        anchor="left"
                        open={state}
                        onClose={() => setState(false)}
                        onOpen={() => setState(true)}
                    >
                        {list}
                    </SwipeableDrawer>



                </React.Fragment>
            </div>
        </Box>
    );
}
