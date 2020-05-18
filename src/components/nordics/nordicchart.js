import React, { Component, useState, useEffect } from "react"
import { render } from "react-dom"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { FormLabel, FormControl, FormGroup, FormControlLabel, FormHelperText, Switch } from '@material-ui/core';

const chartStyle = {
  dot: false,
  activeDot: {r: 6},
  strokeWidth: 3,

}


export default class NordicChart extends React.Component {
  constructor(props, match) {
      super(props);

      this.daysToShow = 60;
      this.checkNum = 0;
      this.fetchedData = [];
      this.hasFetched = false;

      this.state = {
        data: [],
        isLoaded: false,
        checked: true,
        toSortBy: "confirmed"
      };
  }
 
  componentDidMount() {
            Promise.all([
              fetch("https://corona-api.com/countries/se").then(value => value.json()),
              fetch("https://corona-api.com/countries/no").then(value => value.json()),
              fetch("https://corona-api.com/countries/dk").then(value => value.json()),
              fetch("https://corona-api.com/countries/fi").then(value => value.json()),
            ]).then(allResponses => {
                this.getCleanData(allResponses);
                this.fetchedData = allResponses;
                this.hasFetched = true;
            })
  }


  getCleanData(allResponses) {
    let dates = [];
    let cases = [];
    for (let j = 0; j < allResponses.length; j++) {
      let response = allResponses[j];
      let tempCaseArr = new Array();
      
        (response.data.timeline).map((row, index) => {
            if (index < this.daysToShow) {
                if (j === 1) {
                    dates.push(row.date.substring(5, 10));
                }
                tempCaseArr.push(row[this.state.toSortBy]);
            }
        })
      cases.push(tempCaseArr);
    }
    this.getData(cases, dates);
  }

  getData(cases, dates) {
    dates.reverse();  
    for (let i = 0; i < 4; i++) {
      cases[i].reverse();
    }

    let theData = [];

    for (let j = 0; j < this.daysToShow; j++) {
      let template = {
        date: dates[j],
        Sverige: cases[0][j], 
        Norge: cases[1][j], 
        Danmark: cases[2][j], 
        Finland: cases[3][j], 
      }
      theData.push(template);
    }
    this.setState({
      data: theData,
      isLoaded: true
    })

  }

  handleChange = event => {

    this.checkNum++;
    if (this.checkNum % 2 === 0) {
      this.setState({ toSortBy: "confirmed"}, () => {
        this.getCleanData(this.fetchedData)
      });
    } else {
      this.setState({ toSortBy: "deaths"}, () => {
        this.getCleanData(this.fetchedData)
      });
      this.checkNum = 1;
    }
    
    this.setState({ checked: event.target.checked});
  };

  render () {
      return(
        <div style = {{}}>

        <FormControlLabel
            control={
              <Switch
                checked={this.state.checked}
                tosort = {this.state.toSortBy}
                onChange={this.handleChange}
                value="checked"
                color="primary"
              />
            }
            labelPlacement = "top"
            label={this.state.checked ? "Sjukdomsfall" : "Dödsfall"}
        />
          
        <div className = "chart-container"> 
          <LineChart style = {{margin: "0 auto"}} 
              width={1000} 
              height={500} 
              data={this.state.data}
            >
              
              <Legend layout="horizontal" verticalAlign="top" align="center"  />
              
              <XAxis dataKey="date"/>
              <YAxis/>
              <CartesianGrid strokeDasharray="3 3"/>
              <Tooltip/>
              
              <Line type = "monotone" 
                  dataKey = "Sverige" 
                  stroke = "#009f80" 
                  activeDot =  {chartStyle.activeDot}
                  strokeWidth = {chartStyle.strokeWidth}
                  dot = {chartStyle.dot}
              />
              <Line type = "monotone" 
                  dataKey = "Norge" 
                  stroke = "#9f001f" 
                  activeDot =  {chartStyle.activeDot}
                  strokeWidth = {chartStyle.strokeWidth}
                  dot = {chartStyle.dot}
              />
              <Line type = "monotone" 
                  dataKey = "Danmark" 
                  stroke = "#8884d8" 
                  activeDot = {chartStyle.activeDot}
                  strokeWidth = {chartStyle.strokeWidth}
                  dot = {chartStyle.dot}
              />
              <Line type = "monotone" 
                  dataKey = "Finland" 
                  stroke = "#009f31" 
                  activeDot = {chartStyle.activeDot}
                  strokeWidth = {chartStyle.strokeWidth}
                  dot = {chartStyle.dot}
              />
          </LineChart>          
        </div>
            
      </div>
      )
  }
}