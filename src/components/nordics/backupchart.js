import React, { Component, useState, useEffect } from "react"
import { render } from "react-dom"
import { Line, Bar } from "react-chartjs-2"
import Statistics from "../json/dataSverige.json"

const NordicChart = () => {
        const [chartData, setChartData] = useState({});

        const chart = () => {
            let dates = [];
            let cases = [];
            Promise.all([
              fetch("https://corona-api.com/countries/se").then(value => value.json()),
              fetch("https://corona-api.com/countries/no").then(value => value.json()),
              fetch("https://corona-api.com/countries/dk").then(value => value.json()),
              fetch("https://corona-api.com/countries/fi").then(value => value.json()),
            ]).then(allResponses => {
              
              for (let j = 0; j < allResponses.length; j++) {
                let response = allResponses[j];
                let tempCaseArr = new Array();
                
                  (response.data.timeline).map((row, index) => {
                      if (index < 60) {
                          if (j === 1) {
                              dates.push(row.date.substring(5, 10));
                          }
                          tempCaseArr.push(row.confirmed);
                      }
                  })
                cases.push(tempCaseArr);
              }
              getData(cases, dates);
            })
        }

        const getData = function (cases, dates) {
          dates.reverse();  
          let d = [];
          let template;
          let colors = ["#009f80", "#9f001f", "#9f3100", "#009f31"];
          let countryNames = ["Sverige", "Norge", "Danmark", "Finland"];
          for (let i = 0; i < 4; i++) {
              cases[i].reverse();
              template = {
                  label: countryNames[i],
                  data: cases[i],
                  backgroundColor: colors[i],
                  borderWidth: 3,
                  fill: false,
                  borderColor: colors[i],
                  pointRadius: 2,
                  pointHoverRadius: 4,
              }
              d.push(template);
          }
            

            setChartData({
                labels: dates,
                datasets: d,
            })
        }

        useEffect(() => {
            chart();
        }, [])

        return(
            <div style = {{position: "relative", width: 1000, display: "block", textAlign: "center", verticalAlign: "top", margin: "0 auto"}}>
              <h4> Bekräftade fall Norden </h4>
                <Line 
                    data = {chartData}
                    options={{
                        responsive: true,
                        legend:{ 
                          display: true,
                          labels:{
                            fontSize: 12,
                            fontFamily: "Roboto"
                          }
                        },
                        title: { text: "BLANK", display: false },
                        scales: {
                          yAxes: [
                            {
                              ticks: {
                                autoSkip: true,
                                maxTicksLimit: 10,
                                beginAtZero: true,
                                fontSize: 14
                              },
                              gridLines: {
                                display: true
                              },
                            }
                          ],
                          xAxes: [
                            {
                              ticks: {
                                autoSkip: true,
                                maxTicksLimit: 10,
                                beginAtZero: true,
                                fontSize: 14
                              },
                              gridLines: {
                                display: true
                              }
                            }
                          ]
                        }
                    }}
                />
            </div>
        )
}

export default NordicChart;








import React, { Component, useState, useEffect } from "react"
import { render } from "react-dom"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import Statistics from "../json/dataSverige.json"

const NordicChart = () => {
        const [chartData, setChartData] = useState({});
        
        let myData = [];
        let myDataIs = false;

        let daysToShow = 60;

        const chart = () => {
            let dates = [];
            let cases = [];
            Promise.all([
              fetch("https://corona-api.com/countries/se").then(value => value.json()),
              fetch("https://corona-api.com/countries/no").then(value => value.json()),
              fetch("https://corona-api.com/countries/dk").then(value => value.json()),
              fetch("https://corona-api.com/countries/fi").then(value => value.json()),
            ]).then(allResponses => {
              
              for (let j = 0; j < allResponses.length; j++) {
                let response = allResponses[j];
                let tempCaseArr = new Array();
                
                  (response.data.timeline).map((row, index) => {
                      if (index < daysToShow) {
                          if (j === 1) {
                              dates.push(row.date.substring(5, 10));
                          }
                          tempCaseArr.push(row.confirmed);
                      }
                  })
                cases.push(tempCaseArr);
              }
              getData(cases, dates);
            })
        }

        const getData = function (cases, dates) {
          dates.reverse();  
          let d = [];
          let template;
          let colors = ["#009f80", "#9f001f", "#9f3100", "#009f31"];
          let countryNames = ["Sverige", "Norge", "Danmark", "Finland"];
          for (let i = 0; i < 4; i++) {
              cases[i].reverse();
              template = {
                  label: countryNames[i],
                  data: cases[i],
                  backgroundColor: colors[i],
                  borderWidth: 3,
                  fill: false,
                  borderColor: colors[i],
                  pointRadius: 2,
                  pointHoverRadius: 4,
              }
              d.push(template);
          }

          console.log("cases", cases);
          console.log("dates", dates);

          for (let j = 0; j < daysToShow; j++) {

            let template = {
              date: dates[j],
              caseSwe: cases[0][j], 
              caseNor: cases[1][j], 
              caseDen: cases[2][j], 
              caseFin: cases[3][j], 
            }
            myData.push(template);
          }

          myDataIs = true;
          

            setChartData({
                labels: dates,
                datasets: d,
            })
        }

        useEffect(() => {
            chart();
        }, [])

        console.log("mydata", myData);
        return(
            <div style = {{position: "relative", width: 1000, display: "block", textAlign: "center", verticalAlign: "top", margin: "0 auto"}}>
              <h4> Bekräftade fall Norden </h4>
                {myDataIs &&
                  <LineChart style = {{margin: "0 auto"}} 
                    width={1000} 
                    height={600} 
                    data={myData}
                    margin={{top: 5, right: 30, left: 20, bottom: 5}}
                >
                    <XAxis dataKey="date"/>
                    <YAxis/>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <Tooltip/>
                    <Legend />
                    <Line type="monotone" 
                        dataKey="caseSwe" 
                        stroke="red" 
                    />
                    <Line type="monotone" 
                        dataKey="caseNor" 
                        stroke="blue" 
                    />
                    <Line type="monotone" 
                        dataKey="caseDen" 
                        stroke="yellow" 
                    />
                    <Line type="monotone" 
                        dataKey="caseFin" 
                        stroke="#8884d8" 
                    />
                </LineChart>
                
                }
                
            </div>
        )
}

export default NordicChart;