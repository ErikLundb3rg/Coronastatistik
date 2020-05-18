import React, { Component, useState, useEffect } from "react"
import { render } from "react-dom"
import Statistics from "../json/dataSverige.json"
import { Row, Container, Col } from 'react-bootstrap';
import { rdn } from "../utility.js"
import { withRouter } from "react-router";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const chartStyle = {
  dot: false,
  activeDot: {r: 6},
  strokeWidth: 3,

}


// NYHETER http://api.krisinformation.se/v1/feed?format=json 
export default class CountryLine extends React.Component {
    constructor(props, match) {
        super(props);
        this.temp = [];

        this.code = props.countryCode;
        this.country = props.country;
        this.typeOfCase = props.typeOfCase;
        this.timeline = props.data;
        this.type = props.type;
        
        this.chartWidth = 800;
        this.chartHeight = 400;

        this.state = {
            timelineData: [],
        };
        
    }


    componentDidMount() {
        this.displayTimeline(this.timeline, this.typeOfCase);
    }

    displayTimeline(timeline, toSortBy) {
        var cases = [];
        var dates = [];
        var toGive = [];

        timeline.map((row, index) => {
            let template = {
              Fall: (row[toSortBy]),
              datum: (row.date).substring(5, 10),
            }
            toGive.push(template);
        })

        this.setState({ timelineData: toGive })
        

        // Skapa rad av objekt för att trycka in som data för användning 

        
    }

    displayToday(todayCases) {
      if (todayCases === 0) {
        return "";
      }
      else {
        return "Idag: " + rdn(todayCases);
      }
    }

    displayData() {
        if (this.type === "line") {
            return <LineChart style = {{margin: "0 auto"}} 
            width={this.chartWidth} 
            height={this.chartHeight} 
            data={this.state.timelineData}
            >

            <Legend layout="horizontal" verticalAlign="top" align="center"  />

            <XAxis dataKey="datum"/>
            <YAxis/>
            <CartesianGrid strokeDasharray="3 3"/>
            <Tooltip/>

            <Line type = "monotone" 
                dataKey = "Fall" 
                stroke = "#009f80" 
                activeDot =  {chartStyle.activeDot}
                strokeWidth = {chartStyle.strokeWidth}
                dot = {chartStyle.dot}
            />
          </LineChart>  

        } else if (this.type === "bar") {
            return <BarChart style = {{margin: "0 auto"}} 
            width = {this.chartWidth}
            height = {this.chartHeight}
            data = {this.state.timelineData}
            >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey = "datum" />
            <YAxis />
            <Tooltip />
            <Legend layout="horizontal" verticalAlign="top" align="center"  />
            <Bar 
              dataKey="Fall" 
              fill="#009f80" 
            
            />
          </BarChart>  
        }

    }

    render () {

        return(
            <div style = {{textAlign: "center"}}> 

                     {this.displayData()}
            </div>
        )   
    }
}
