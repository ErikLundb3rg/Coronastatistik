import React, { Component, Fragment } from 'react'
import ReactDOM from "react-dom"
import LinearProgress from '@material-ui/core/LinearProgress';
import Statistics from "./json/dataSverige.json"
import './extsweden.css'
import { Row, Container, Col } from 'react-bootstrap';
import { HorizontalBar, Bar } from "react-chartjs-2"



class AgeBarSwe extends React.Component {

    constructor(props) {
      super(props);
      this.description = props.description;
      

      this.state = {
          chartData: {
              labels: ["0 - 9", "10 - 19", "20 - 29", "30 - 39", "40 - 49", "50 - 59", "60 - 69", "70 - 79", "80 - 89", "90+"],
              datasets: [{
                  label: "Bekräftade fall",
                  data: this.getStatistics(),
                  backgroundColor: "#009f80",
              }]
          }
      }

    }

    getStatistics() {
        let toReturn = [];
        (Statistics["Totalt antal per åldersgrupp"]).map((row, index) => {
          toReturn.push(row[this.props.toSortBy]);
        })
        toReturn.pop();  // Ta bort uppgift saknas
        return toReturn;
      }

    render () {
      return (
          <div style = {{height: "400px", width: "380px", marginTop: "0"}} className = "ageBarSwe" >
              <h5 style = {{marginLeft: "50px"}}> { this.props.description } </h5>
              <HorizontalBar 
                data = {this.state.chartData}
                options = {{
                    maintainAspectRatio: false,
                    title:{
                        display: false, 
                        text: this.description,
                        fontSize: "12",
                    },
                    legend: {
                        display: false,
                        position: "right"
                    },
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true,
                                fontSize: 14,
                            }
                        }],
                        xAxes: [{
                            barPercentage: 0.6,
                            ticks: {
                                maxTicksLimit: 5,
                                fontSize: 14
                            }
                        }]
                    }
                }}
              />
          </div>
        )
    }
}

export default AgeBarSwe;