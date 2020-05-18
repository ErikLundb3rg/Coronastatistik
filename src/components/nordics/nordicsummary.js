import React, { Component, Fragment } from 'react'
import ReactDOM from "react-dom";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Row, Container, Col } from 'react-bootstrap';
import { rdn } from "../utility.js"
import "./nordic.css"
// #05386B
// #379683
// #5CDb95
// #8EE4AF
// #EDF5E1
//

export default class NordicSummary extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
          data: {},
          isLoaded: false,
        }
        this.data = {};
    }

    componentWillMount() {
        Promise.all([
            fetch("https://corona-api.com/countries/se").then(value => value.json()),
            fetch("https://corona-api.com/countries/no").then(value => value.json()),
            fetch("https://corona-api.com/countries/dk").then(value => value.json()),
            fetch("https://corona-api.com/countries/fi").then(value => value.json()),
          ]).then(allResponses => {
            
            const countryNames = ["Sverige", "Norge", "Danmark", "Finland"];
            for (let j = 0; j < allResponses.length; j++) {
                let response = allResponses[j].data["latest_data"]; 

                this.state.data[countryNames[j]] = response;
                
            }
            this.setState({isLoaded: true})
          })
    }

    displayData(data, countryName) {
      return(
   
            <tr key = {countryName}> 
              <td> { countryName }  </td>
              <td> { rdn(data.confirmed) } </td>
              <td> { rdn(data.deaths) } </td>
              <td> { rdn(data.recovered) } </td>
              <td> { rdn(data.critical) } </td>
            </tr>
      )
    }

 
        
    render() {
        return ( 
          <div style = {{}}>
              <h3 style = {{marginBottom: "20px"}}>  </h3>
              {this.state.isLoaded && 
              <div> 
                <table className = "nordictable" style = {{margin: "0 auto", textAlign: "left"}}>
                  <thead>
                    <tr style = {{}}>
                      <th>  Land   </th>
                      <th>  Sjukdomsfall  </th>
                      <th>  Dödsfall   </th>
                      <th>  Återhämtade  </th>
                      <th>  Kritiskt   </th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.displayData(this.state.data["Sverige"], "Sverige")}
                    {this.displayData(this.state.data["Norge"], "Norge")}  
                    {this.displayData(this.state.data["Danmark"], "Danmark")}
                    {this.displayData(this.state.data["Finland"], "Finland")}
                  </tbody>
                </table>
                
                
              </div>
                
              }
          </div>
        )
    }
}


