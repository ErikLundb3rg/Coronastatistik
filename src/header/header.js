import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Navbar, Nav, Form, FormControl } from 'react-bootstrap'
import "./header.css"

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));

export default function Header () {
    
        const classes = useStyles();

        return(
            <div className={classes.root}>
             <Navbar bg = "#009f80" variant = "dark" className = "header-container">
              <Navbar.Brand href = "/" className = "link-left"> Coronasverige.org </Navbar.Brand>
              <Nav className="ml-auto" id = "link-container">
                <div> <Nav.Link className = "nav-links" href = "/nyheter"> Nyheter </Nav.Link> </div>
                <div> <Nav.Link className = "nav-links" href = "/jämför"> Jämför </Nav.Link> </div>
                <div> <Nav.Link className = "nav-links" href = "/om"> Om </Nav.Link> </div>
              </Nav>
            </Navbar>
    </div>
    );
}


