import React, { Component, Fragment } from 'react'
import LinearProgress from '@material-ui/core/LinearProgress';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Statistics from "./json/dataSverige.json";
import ReactDOM from "react-dom";
import "./extsweden.css"
import MapSweden from "./mapsweden.js"
import RegionTable from "./regiontable"
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import AgeBarSwe from "./ageBarSwe";
import NewCaseBar from "./newCaseBar";
// #05386B
// #379683
// #5CDb95
// #8EE4AF
// #EDF5E1
//

export default class ExtSweden extends React.Component {
    constructor(props) {
        super(props); 
        
    }
 
        
    render() {
        return ( 
           <div>
                <div className = "container-ext">
                    <div className = "ageBars"> 
                        <AgeBarSwe
                            description = "Sjukdomsfall per åldersgrupp"
                            toSortBy = "Totalt_antal_fall"
                        />
                        
                        <AgeBarSwe
                            description = "Dödsfall per åldersgrupp"
                            toSortBy = "Totalt_antal_avlidna"
                        />
                        <NewCaseBar/>
                    </div>
                    <RegionTable/>
                    <MapSweden/> 
                    
                </div>
                    
            </div>
               

        );
    }
}


