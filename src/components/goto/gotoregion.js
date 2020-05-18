import React, { Component, useState, useEffect } from "react"
import { render } from "react-dom"
import Statistics from "../json/dataSverige.json"
import { Row, Container, Col } from 'react-bootstrap';
import { rdn } from "../utility.js"
import { Bar, BarChart, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export default class GoToRegion extends React.Component {
    constructor(props, match) {
        super(props)

        this.region = this.props.match.params.id.split(' ').join('_'); // byt mellanslag mot _ för att de fukkar
        this.displayRegion = this.props.match.params.id.split('_').join(' ');
        this.daysToSkip = 20;

        this.chartWidth = 900;
        this.chartHeight = 450;

        this.timelineNew = {
            cases: [],
            date: []
        }


        this.rechart = {
            newData: [],
            totalData: []
        }

        this.getStatistics();
    }

    componentWillMount() {
        window.scrollTo(0, 0);
    }

    getStatistics() {
        let toSortBy = Statistics["Antal per dag region"];
        let allNewCases = this.getChartCases(this.region, "new");
        let allTotalCases = this.getChartCases(this.region, "total");
        let allDates = this.getChartData("Statistikdatum");

        toSortBy.map((row, index) => {
            this.timelineNew.cases.push(row[this.region]);
            this.timelineNew.date.push(row["Statistikdatum"]);
        })

        toSortBy.map((row, index) => {
            if (index >= this.daysToSkip) {
                let template1 = {
                    name: allDates[index],
                    fall: allNewCases[index],
                }
                this.rechart.newData.push(template1);

                let template2 = {
                    name: allDates[index],
                    fall: parseInt(allTotalCases[index]),
                }
                console.log(allTotalCases[index]);
                this.rechart.totalData.push(template2);
            }
            
        })
        
    }

    getChartData(toSortBy) {
        let toReturn = [];
        let perDayRegion = [];
        let totalCases = [];

        (Statistics["Antal per dag region"]).map((row, index) => {
            if (toSortBy === "Statistikdatum") {
                let date = row[toSortBy].split("");
                if (date[3] === "/") {
                    date.splice(2, 0, "0");
                    toReturn.push(date.join("").substring(0, 4));
                } else {      
                    toReturn.push(row[toSortBy].substring(0, 4));
                }                
            } 
        })
        return toReturn;
    }

    getChartCases(toSortBy, requestType) {
        let perDayRegion = [];
        let totalCases = [];

        (Statistics["Antal per dag region"]).map((row, index) => {
            perDayRegion.push(row[toSortBy]);
        })

        for (let i = 0; i < perDayRegion.length; i++) {
            let totalCaseAtDate = 0; 
            for (let j = 0; j <= i; j++) {
                totalCaseAtDate += parseInt(perDayRegion[j]);
            }
            totalCases.push(totalCaseAtDate);
        }

        if (requestType === "new") {
            return totalCases;  
        } else if (requestType === "total") {
            return perDayRegion;
        }
        
    }

    render () {
        let toSortBy = Statistics["Totalt antal per region"];

        return(
            <div> 
                <h2 style = {{textAlign: "center", margin: "0", marginTop: "15px", padding: "0"}}>  {this.displayRegion} </h2>
                {
                    (toSortBy).map((row, index) => {
                        if (row["Region"] === this.displayRegion)
                            return <Container key = {row[this.region]} fluid className = "summary-container" style = {{width: "50%", padding: "30px", textAlign: "center"}}>
                            <Row>
                              <Col>
                                <h3> Sjukdomsfall </h3>
                                <h2 style = {{color: "#bf372d"}} > { rdn(row["Totalt_antal_fall"]) } </h2>
                              </Col>

                              <Col>
                                <h3> Avlidna</h3>
                                <h2 style = {{color: " #303030" }}> { rdn(row["Totalt_antal_avlidna"]) }</h2>
                              </Col>
                              <Col>
                                <h3> Intensivvårdade </h3>
                                <h2 style = {{color: "rgb(59, 125, 154)"}}> { rdn(row["Totalt_antal_intensivvårdade"]) } </h2>
                              </Col>
                              
                              
                            </Row>
                          </Container>
                    })
                }
                
                <div style = {{position: "relative",  textAlign: "center"}}>
                
                <div style = {{display: "inline-block"}}>
                    <h3> Sjukdomsfall  </h3>

                    <LineChart style = {{margin: "0 auto"}} 
                        width={this.chartWidth} 
                        height={this.chartHeight} 
                        data={this.rechart.newData}
                        margin={{top: 5, right: 30, left: 20, bottom: 5}}
                    >
                        <XAxis dataKey="name"/>
                        <YAxis/>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <Tooltip/>
                        <Legend layout="horizontal" verticalAlign="top" align="center"  />
                        <Line type="monotone" 
                            dataKey="fall" 
                            stroke="#8884d8" 
                            activeDot={{r: 8}}
                            strokeWidth = {4}
                            dot = {false}

                        />
                    </LineChart>
                </div>
                
                
                <div style = {{display: "inline-block"}}>
                    <h3 style = {{margin: "15px"}}> Nya sjukdomsfall </h3>

                    <BarChart style = {{margin: "0 auto"}} 
                       width = {this.chartWidth}
                       height = {this.chartHeight}
                       data = {this.rechart.totalData}
                       margin={{top: 5, right: 30, left: 20, bottom: 5}}
                       >
                       <CartesianGrid strokeDasharray="3 3" />
                       <XAxis dataKey = "name" />
                       <YAxis />
                       <Tooltip />
                       <Legend layout="horizontal" verticalAlign="top" align="center"  />
                       <Bar 
                         dataKey="fall" 
                         fill="#8884d8" 
                                
                       />
                    </BarChart>  
                </div>
                
            </div>
            </div>
        )
    }
}

//<Line 
//                    options = {{
//                        responsive: true, 
//                        legend: {
//                            display: false
//                        },
//                        scales: {
//                            yAxes: [{
//                                ticks: {
//                                    beginAtZero: true,
//                                    fontSize: 14,
//                                   
//                                }
//                            }],
//                            xAxes: [{
//                                barPercentage: 0.6,
//                                ticks: {
//                                    maxTicksLimit: 20,
//                                    fontSize: 14
//                                }
//                            }]
//                        }
//                    }}
//                    data = {this.state.data}
//                />