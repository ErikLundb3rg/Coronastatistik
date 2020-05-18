import React, { Component, Fragment } from 'react'
import ReactDOM from "react-dom";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import NordicChart from "./nordicchart.js"
import NordicSummary from "./nordicsummary.js"
import { FormLabel, FormControl, FormGroup, FormControlLabel, FormHelperText, Switch } from '@material-ui/core';
// #05386B
// #379683
// #5CDb95
// #8EE4AF
// #EDF5E1
//

export default class Nordic extends React.Component {
    constructor(props) {
        super(props); 

    }
        

 
        
    render() {
        return ( 
           <div style = {{width: "100%", textAlign: "center"}}>

                <NordicChart
                />
                <NordicSummary/>
            </div>
               

        );
    }
}


