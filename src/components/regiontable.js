import React, { Component, Fragment } from 'react'

import { Link } from "react-router-dom"
import "./top.css"
import LinearProgress from '@material-ui/core/LinearProgress';
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "./extsweden.css"
import Statistics from "./json/dataSverige.json";
import GoToRegion from "./goto/gotoregion.js"
import { rdn } from "./utility.js"

// https://coronavirus-19-api.herokuapp.com/countries



function noDisplay(number) {
    if (number === 0) {
        return false;
    } else {
        return true;
    }
}

export default class RegionTable extends React.Component {
    constructor(props) {
        super(props);
        this.sortBy = this.sortBy.bind(this);
        this.sortCountry = this.sortCountry.bind(this);
        this.state = {
            items: Statistics,
            direction: {
                Region: "asc",
                Totalt_antal_fall: "asc",
                Fall_per_100000_inv: "asc",
                Totalt_antal_intensivvårdade: "asc",
                Totalt_antal_avlidna: "asc",
              }
        }
    }

    sortBy(key) {
        let x = Statistics;
        let temp = x["Totalt antal per region"];
        
        this.setState({
          items: temp.sort( (a, b) => (
            this.state.direction[key] === "asc"
            ? parseFloat(b[key]) <= parseFloat(a[key]) 
            :parseFloat(a[key]) <= parseFloat(b[key]) 
             
          )),
          direction: {
            [key]: this.state.direction[key] === "asc"
            ? "desc"
            : "asc"
          },
        })
    }
    
    sortCountry(key) {
        let x = Statistics;
        let temp = x["Totalt antal per region"];

        this.setState({
          items: temp.sort( (a, b) => (
            this.state.direction[key] === "asc"
            ? (a[key]) <= (b[key]) 
            : (b[key]) <= (a[key]) 
          )),
          direction: {
            [key]: this.state.direction[key] === "asc"
            ? "desc"
            : "asc"
          },
        })
      }

    render() {

        let x = Statistics;
        
        let items = x["Totalt antal per region"];
        return (
            <div className = "region-container">
                <table className = "region-table">
                    <thead className = "region-head">
                        <tr>
                            <th onClick = {() => this.sortCountry("Region")} style = {{textAlign: "left"}}> Region <i className="fa fa-sort" aria-hidden="true"> </i> </th>
                            <th onClick = {() => this.sortBy("Totalt_antal_fall")}> Antal <br/> fall <i className="fa fa-sort" aria-hidden="true"> </i></th>
                            <th onClick = {() => this.sortBy("Fall_per_100000_inv")}> Fall / 100k<br/>  invånare <i className="fa fa-sort" aria-hidden="true"> </i></th>
                            <th onClick = {() => this.sortBy("Totalt_antal_intensivvårdade")}> Antal på <br/> IVA <i className="fa fa-sort" aria-hidden="true"> </i> </th>
                            <th onClick = {() => this.sortBy("Totalt_antal_avlidna")}> Antal <br/> döda <i className="fa fa-sort" aria-hidden="true"> </i></th>

                        </tr>             
                    </thead>
                    <tbody>
                            {
                                (items).map((row, index) => {
                                        return <tr key = {row["Region"]}> 
                                        <td> <Link to = {`/region/${row["Region"]}`} style = {{textDecoration: "underline"}}> { row["Region"] } </Link> </td>

                                        <td> { rdn(row["Totalt_antal_fall"]) }</td>
                                        <td> { rdn(row["Fall_per_100000_inv"]) } </td>
                                        <td> { rdn(row["Totalt_antal_intensivvårdade"]) }</td>
                                        <td> { rdn(row["Totalt_antal_avlidna"]) }</td>
                                        </tr>
                                })
                            }
                    </tbody>
                </table>
            </div>

        );
    }
   }
   