import * as React from 'react';
import {useState} from "react";
import {Link, NavLink, useLocation} from "react-router-dom";

import {AppBar, IconButton, List, ListItemButton, Menu, MenuItem, Toolbar} from "@mui/material";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import MenuIcon from '@mui/icons-material/Menu';
import { Divider } from '@mui/material';

import Logo from "./components/Logo/Logo";
import ContainedButton from "./components/ContaintedButton/ContainedButton";

import './Header.css';

const pages = [
    {
        label: 'Home',
        link: '/'
    },
    {
        label: 'Self-Test',
        link: '/selftest'
    },
    {
        label: 'Therapy',
        link: '/'
    },
    {
        label: 'Trainings',
        link: '/'
    },
]

function Header() {

    const [isAuth, setIsAuth] = useState(false);
    const location = useLocation();

    const [anchorElNav, setAnchorElNav] = useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const getNavButtons = (isAuth) => {
        if( isAuth ) {
            return <ContainedButton content={'Profile'} link={'/profile'}/>
        }

        return (
            <>
                <Button
                    style={{ textTransform: 'none', color: "rgba(0, 0, 0, 0.75)", fontWeight: 600 }}
                    sx={{ p: 0, fontSize: { sm: 14, md: 18}}}
                    component={Link}
                    to="/login"
                >
                    LOGIN
                </Button>
                <Divider orientation='vertical' flexItem={true} style={{background: "rgba(0, 0, 0, 0.25)"}}/>
                <ContainedButton content={'REGISTER'} link={'/registration'}/>
            </>
        )
    }



    const navButtons = getNavButtons(isAuth);

    return (
        <AppBar
            style={{ background: "transparent", boxShadow: "none"}}
            sx={{ py: 2 }}
        >
            <Container maxWidth="lg">
                <Toolbar disableGutters>
                    <Box
                        sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}
                    >
                        <Logo />
                    </Box>
                    <Typography
                        variant="h6"
                        noWrap
                        component={Link}
                        to="/"
                        sx={{
                            mr: 4,
                            fontSize: 36,
                            display: { xs: 'none', md: 'flex' },
                            fontWeight: 500,
                            color: '#000000',
                            textDecoration: 'none',
                        }}
                    >
                        Medical
                    </Typography>

                    { isAuth &&
                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon style={{ color: "#000000"}}/>
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                }}
                            >
                                {pages.map((page) => (
                                    <MenuItem key={page.label} onClick={handleCloseNavMenu}>
                                        <Button
                                            style={{color: "#000000", textTransform: "none"}}
                                            component={Link}
                                            to={page.link}
                                        >
                                            {page.label}
                                        </Button>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                    }

                    <Box
                        sx={{
                            display: { xs: 'none', sm: "flex", md: 'none' },
                            height: { xs: "2em", sm: "3em", md: "4em"},
                            mr: 1
                        }}
                    >
                        <Logo />
                    </Box>

                    <Typography
                        variant="h5"
                        noWrap
                        component={Link}
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', sm: "flex", md: 'none' },
                            flexGrow: 1,
                            fontSize: { xs: 24, md: 36},
                            fontWeight: 500,
                            color: 'rgba(0, 0, 0, 0.75)',
                            textDecoration: 'none',
                        }}
                    >
                        Medical
                    </Typography>

                    { isAuth &&
                        <List sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, gap: 3 }}>
                            {pages.map((page) => (
                                <ListItemButton
                                    className="menu-item"
                                    style={{textTransform: 'none', color: "rgba(0, 0, 0, 0.75)", fontWeight: 600, flexGrow: 0}}
                                    key={page.label}
                                    component={NavLink}
                                    to={page.link}
                                    onClick={handleCloseNavMenu}
                                    sx={{ color: 'white', display: 'block', fontSize: { sm: 14, md: 18}, p: 0 }}
                                    selected={page.link === location.pathname}
                                >
                                    {page.label}
                                </ListItemButton>
                            ))}
                        </List>
                    }

                    <Box sx={{ marginLeft: 'auto', display: 'flex', gap: '1em' }}>
                        {navButtons}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default Header;
