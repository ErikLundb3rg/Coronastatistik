import React, { Component, useState, useEffect } from "react"
import { render } from "react-dom"
import Statistics from "../json/dataSverige.json"
import { Row, Container, Col } from 'react-bootstrap';
import { rdn } from "../utility.js"
import { withRouter } from "react-router";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import CountryLine from "./countryline.js"

const chartStyle = {
  dot: false,
  activeDot: {r: 6},
  strokeWidth: 3,

}


// NYHETER http://api.krisinformation.se/v1/feed?format=json 
export default class GoToCountry extends React.Component {
    constructor(props, match) {
        super(props);
        this.temp = [];

        
        this.getCountryAndCode = this.getCountryAndCode.bind(this)

        this.state = {
            summaryData: [],
            isLoaded: false,
            fetchedTimeline: [],
            timelineIsFetched: false,
            timelineData: [],
        };
        
    }

    getCountryAndCode(param) {
        this.temp = param.split("-");
        this.country = this.temp[0];
        this.code = this.temp[1];
    }

    checkHasCountryCode() {
        let code = this.code.split("");
        if (code.length === 2) {
          return true;
        } else {
          return false;
        }
    }

    componentWillMount() {
        window.scrollTo(0, 0)
        this.getCountryAndCode(this.props.match.params.id);
    }

    componentDidMount() {
        
        fetch("https://coronavirus-19-api.herokuapp.com/countries/" + this.country)
          .then(res => res.json())
          .then(json => {
              this.setState({
                summaryData: json,
                isLoaded: true,
              })
          });
        if (this.checkHasCountryCode()) {
          fetch("https://corona-api.com/countries/" + this.code)
          .then(res => res.json())
          .then(json => {
              this.setState({
                fetchedTimeline: (json.data.timeline).reverse(),
                timelineIsFetched: true,
              })
          });
        }
    }

    displayToday(todayCases) {
      if (todayCases === 0) {
        return "";
      }
      else {
        return "Idag: " + rdn(todayCases);
      }
    }

    render () {

        let data = this.state.summaryData;
        let flag = "https://www.countryflags.io/" + this.code + "/flat/64.png"
        // <img src = {flag}/>

        return(
            <div style = {{textAlign: "center"}}> 
                {this.state.isLoaded && 
                <div>
                    
                    <h2 style = {{textAlign: "center", margin: "0", marginTop: "15px", padding: "0"}}> 
                        {this.country} 
                    </h2>

                    <Container fluid className = "summary-container" style = {{width: "50%", padding: "30px", textAlign: "center"}}>
                    <Row>
                      <Col>
                        <h3> Sjukdomsfall </h3>
                        <h2 style = {{color: "#bf372d"}} > {rdn(data.cases)} </h2>
                        <div style = {{fontSize: "18px"}}> {(this.displayToday(data.todayCases))} </div>
                      </Col>
                      <Col>
                        <h3> Avlidna</h3>
                        <h2 style = {{color: " #303030" }}> {rdn(data.deaths)} </h2>
                        <div style = {{fontSize: "18px"}}> {(this.displayToday(data.todayDeaths))} </div>

                      </Col>
                      <Col>
                        <h3> Återhämtade </h3>
                        <h2 style = {{color: "rgb(59, 125, 154)"}}> {rdn(data.recovered)} </h2>
                      </Col>
                      
                    </Row>
                  </Container>
                </div>
                }
                
                { this.state.timelineIsFetched && 
                <div>

                  <h3 style = {{margin: "15px"}}> Sjukdomsfall </h3>
                  <CountryLine 
                    data = {this.state.fetchedTimeline}
                    country = {this.country}
                    countryCode = {this.code}
                    typeOfCase = "confirmed"
                    type = "line"
                  />       

                  <h3 style = {{margin: "15px"}}> Nya bekräftade Sjukdomsfall </h3>
                  <CountryLine 
                    data = {this.state.fetchedTimeline}
                    country = {this.country}
                    countryCode = {this.code}
                    typeOfCase = "new_confirmed"
                    type = "bar"
                  /> 

                  <h3 style = {{margin: "15px"}}> Dödsfall </h3>
                  <CountryLine 
                    data = {this.state.fetchedTimeline}
                    country = {this.country}
                    countryCode = {this.code}
                    typeOfCase = "deaths"
                    type = "line"
                  /> 

                  <h3 style = {{margin: "15px"}}> Nya bekräftade dödsfall </h3>
                  <CountryLine 
                    data = {this.state.fetchedTimeline}
                    country = {this.country}
                    countryCode = {this.code}
                    typeOfCase = "new_deaths"
                    type = "bar"
                  /> 
                </div>
            }
            </div>
        )   
    }
}

// SammanfattningsData: https://coronavirus-19-api.herokuapp.com/countries/USA
// Tidslinje: https://corona-api.com/countries/se