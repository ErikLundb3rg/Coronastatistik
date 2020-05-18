import React, { Component, useState, useEffect } from "react"
import { render } from "react-dom"
import { Line, Bar } from "react-chartjs-2"
import Statistics from "./json/dataSverige.json"

export default class NewCaseBar extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            data: {
                labels: this.getStatistics("Datum_avliden"),
                datasets: [{
                    label: "Dödsfall ",
                    backgroundColor: "#009f80",
                    data: this.getStatistics("Antal_avlidna"),
                    pointRadius: 0,
                    pointHoverRadius: 10,
                    fill: true,
                }]
            }
        }
    }

    getStatistics(toSortBy) {
        let toReturn = [];
        (Statistics["Antal avlidna per dag"]).map((row, index) => {
            if (toSortBy === "Datum_avliden") {
                let date = row[toSortBy].split("");
                if (date[3] === "/") {
                    date.splice(2, 0, "0");
                    toReturn.push(date.join("").substring(0, 4));
                } else {      
                    toReturn.push(row[toSortBy].substring(0, 4));
                }                
            } else {
                toReturn.push(row[toSortBy]);
            }
            
            
        })
        
        toReturn.pop();
        return toReturn;
    }

    render () {
        return(
            <div style = {{position: "relative", width: "100%", padding: "0 0px", paddingTop: "30px", }}>
                <h5> Nya dödsfall över tid </h5>
                <Bar 
                    options = {{
                        responsive: true, 
                        legend: {
                            display: false
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
                                    maxTicksLimit: 20,
                                    fontSize: 14
                                }
                            }]
                        }
                    }}
                    data = {this.state.data}
                />
            </div>
        )
    }
}