import React, { Component, Fragment } from 'react'
import "./top.css"
import LinearProgress from '@material-ui/core/LinearProgress';
import { Link } from "react-router-dom";
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { Image } from 'react-bootstrap';

import { rdn } from "./utility.js"
import { isoCountries } from "./utility.js"
import { getCountryName } from "./utility.js"

// https://coronavirus-19-api.herokuapp.com/countries


function noDisplay(number) {
    if (number === 0 ) {
        return false;
    } else {
        return true;
    }
}

export default class NewTable extends React.Component {
    constructor(props) {
        super(props);
        this.sortBy = this.sortBy.bind(this);
        this.sortCountry = this.sortCountry.bind(this);
        this.state = {
            items: [],
            direction: {
                name: "asc",
                today_cases: "asc",
                cases: "asc",
                todayDeaths: "asc",
                deaths: "asc",
                recovered: "asc",
              }
        }
    }

    sortBy(key) {
        let temp = this.state.items;
        this.setState({
          items: temp.sort( (a, b) => (
            this.state.direction[key] === "asc"
            ? parseFloat(eval("b." + key)) < parseFloat(eval("a." + key)) 
            :parseFloat(eval("a." + key)) < parseFloat(eval("b." + key)) 
          )),
          direction: {
            
            [key]: this.state.direction[key] === "asc"
            ? "desc"
            : "asc"
          },
        })
    }
    
    sortCountry(key) {
        let temp = this.state.items;
        
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

    componentDidMount() {
        fetch("https://coronavirus-19-api.herokuapp.com/countries")
          .then(res => res.json())
          .then(json => {
              this.setState({
                items: json,
              })
          });
     }


    render() {

        let items = this.state.items;
        let ny = true;
        

        return (
            <div>
                <table className = "world-table">
                    <thead className = "world-head">
                        <tr>
                            <th onClick = {() => this.sortCountry("country")} style = {{textAlign: "left"}}> Land <i className="fa fa-sort" aria-hidden="true"> </i> </th>
                            <th onClick = {() => this.sortBy("todayCases")}> Nya <br/> bekräftade <i className="fa fa-sort" aria-hidden="true"> </i></th>
                            <th onClick = {() => this.sortBy("cases")}> Totala <br/> bekräftade <i className="fa fa-sort" aria-hidden="true"> </i></th>
                            <th onClick = {() => this.sortBy("todayDeaths")}> Nya <br/>döda <i className="fa fa-sort" aria-hidden="true"> </i> </th>
                            <th onClick = {() => this.sortBy("deaths")}> Totala <br/> döda <i className="fa fa-sort" aria-hidden="true"> </i></th>
                            <th onClick = {() => this.sortBy("recovered")}> Totala <br/> återhämtade <i className="fa fa-sort" aria-hidden="true"> </i> </th>
                            <th onClick = {() => this.sortBy("casesPerOneMillion")}> Sjukdomsfall / <br/> 1 miljon <i className="fa fa-sort" aria-hidden="true"> </i> </th>
                            <th onClick = {() => this.sortBy("deathsPerOneMillion")}> Dödsfall / <br/> 1 miljon <i className="fa fa-sort" aria-hidden="true"> </i> </th>
                            <th onClick = {() => this.sortBy("totalTests")}> Totala <br/> Tester<i className="fa fa-sort" aria-hidden="true"> </i> </th>
                            <th onClick = {() => this.sortBy("testsPerOneMillion")}> Tester / <br/> 1 miljon <i className="fa fa-sort" aria-hidden="true"> </i> </th>
                        </tr>
                        
                    </thead>
                    <tbody>
                        

                            {
                                (items).map((row, index) => {
                                    let flag = "https://www.countryflags.io/" + row.code + "/flat/64.png"

                                    if ((items[index].deaths > 10))
                                      return <tr key = {row.country} style = {{}}> 
                                      <td style = {{overflow: "hidden",}}> 
                                      <Link to = {{
                                            pathname: `/land/${row.country}-${getCountryName(row.country)}`, 
                                            }}> 
                                            <span style = {{}}> { row.country } </span> 
                                          </Link>
                                      </td>

                                      <td style = {{background: noDisplay(row.todayCases) ? '#FFEEAA' : 'transparent' }}> { rdn(row.todayCases, ny) } </td>
                                      <td> { rdn(row.cases) } </td>
                                      <td style = {{color: "white", background: noDisplay(row.todayDeaths) ? 'red' : 'transparent' }}> { rdn(row.todayDeaths, ny) } </td>
                                      <td> { rdn(row.deaths, ) } </td>
                                      <td> { rdn(row.recovered) }</td>
                                      <td> { rdn(row.casesPerOneMillion) } </td>
                                      <td> { rdn(row.deathsPerOneMillion) }</td>
                                      <td> { rdn(row.totalTests) } </td>
                                      <td style = {{ background: noDisplay(row.testsPerOneMillion) ? '#deeff5' : 'transparent'  }}> { rdn(row.testsPerOneMillion) }</td>

                                </tr>
                                })
                            }

                    </tbody>
                </table>
            </div>
        );

        
    }
   }
   

//  let flag = "https://www.countryflags.io/" + row.CountryCode + "/flat/64.png"
//  if ((items[index].deaths > 10))
//      return <tr key = {row.country} style = {{}}> 
//      <td style = {{overflow: "hidden",}}> 
//      <Link to = {`/land/${row.country}`}> <span style = {{}}> { row.country } </span> </Link>
//      </td>
//      
//      <td style = {{background: noDisplay(row.todayCases) ? '#FFEEAA' : 'transparent' }}> { rdn(row.todayCases, ny) } </td>
//      <td> { rdn(row.cases) } </td>
//      <td style = {{color: "white", background: noDisplay(row.todayDeaths) ? 'red' : 'transparent' }}> { rdn(row.todayDeaths, ny) } </td>
//      <td> { rdn(row.deaths, ) } </td>
//      <td> { rdn(row.recovered) }</td>
//      <td> { rdn(row.casesPerOneMillion) } </td>
//      <td> { rdn(row.deathsPerOneMillion) }</td>
//      <td> { rdn(row.totalTests) } </td>
//      <td style = {{ background: noDisplay(row.testsPerOneMillion) ? '#deeff5' : 'transparent'  }}> { rdn(row.testsPerOneMillion) }</td>

//sortBy(key) {
//  let temp = this.state.items;
//
//  this.setState({
//    items: temp.sort( (a, b) => (
//      this.state.direction[key] === "asc"
//      ? parseFloat(b[key]) <= parseFloat(a[key]) 
//      :parseFloat(a[key]) <= parseFloat(b[key]) 
//       
//    )),
//    direction: {
//      [key]: this.state.direction[key] === "asc"
//      ? "desc"
//      : "asc"
//    },
//  })
//}
//
//sortCountry(key) {
//  let temp = this.state.items;
//  console.log(temp);
//
//  this.setState({
//    items: temp.sort( (a, b) => (
//      this.state.direction[key] === "asc"
//      ? (a[key]) <= (b[key]) 
//      : (b[key]) <= (a[key]) 
//    )),
//    direction: {
//      [key]: this.state.direction[key] === "asc"
//      ? "desc"
//      : "asc"
//    },
//  })
//}

//https://covid19-server.chrismichael.now.sh/api/v1/
// https://coronavirus-19-api.herokuapp.com/countries (WORLDOMETER)
//https://corona-api.com/countries