import React, { Component, Fragment } from 'react'
import "./top.css"
import LinearProgress from '@material-ui/core/LinearProgress';
import { Link } from "react-router-dom";
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { rdn } from "./utility.js"
import { Image } from 'react-bootstrap';

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
        fetch("https://corona-api.com/countries")
          .then(res => res.json())
          .then(json => {
              this.setState({
                items: json.data,
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
                            <th onClick = {() => this.sortCountry("name")} style = {{textAlign: "left"}}> Land <i className="fa fa-sort" aria-hidden="true"> </i> </th>
                            <th onClick = {() => this.sortBy("today.confirmed")}> Nya <br/> bekräftade <i className="fa fa-sort" aria-hidden="true"> </i></th>
                            <th onClick = {() => this.sortBy("latest_data.confirmed")}> Totala <br/> bekräftade <i className="fa fa-sort" aria-hidden="true"> </i></th>
                            <th onClick = {() => this.sortBy("today.deaths")}> Nya <br/>döda <i className="fa fa-sort" aria-hidden="true"> </i> </th>
                            <th onClick = {() => this.sortBy("latest_data.deaths")}> Totala <br/> döda <i className="fa fa-sort" aria-hidden="true"> </i></th>
                            <th onClick = {() => this.sortBy("latest_data.recovered")}> Totala <br/> återhämtade <i className="fa fa-sort" aria-hidden="true"> </i> </th>
                            <th onClick = {() => this.sortBy("latest_data.critical")}> Totala <br/> kritiskt <i className="fa fa-sort" aria-hidden="true"> </i> </th>
                            <th onClick = {() => this.sortBy("latest_data.calculated.cases_per_million_population")}> Fall / <br/> 1 miljon <i className="fa fa-sort" aria-hidden="true"> </i> </th>
                            <th onClick = {() => this.sortBy("Math.round((row.latest_data.deaths) / (row.population / 1000000))")}> Döda / <br/> 1 miljon <i className="fa fa-sort" aria-hidden="true"> </i> </th>
                        </tr>
                        
                    </thead>
                    <tbody>
                        

                            {
                                (items).map((row, index) => {
                                    let flag = "https://www.countryflags.io/" + row.code + "/flat/64.png"

                                    if ((items[index].latest_data.deaths > 10))
                                        return <tr key = {row.name} style = {{}}> 
                                        <td style = {{overflow: "hidden",}}> 
                                          

                                          <Link to = {{
                                            pathname: `/land/${row.name}-${row.code}`, 
                                            }}> 
                                            <span style = {{}}> { row.name } </span> 
                                          </Link>
                                        </td>
                                        
                                        <td style = {{background: noDisplay(row.today.confirmed) ? '#FFEEAA' : 'transparent' }}> { rdn(row.today.confirmed, ny) } </td>
                                        <td> { rdn(row.latest_data.confirmed) } </td>
                                        <td style = {{color: "white", background: noDisplay(row.today.deaths) ? 'red' : 'transparent' }}> { rdn(row.today.deaths, ny) } </td>
                                        <td> { rdn(row.latest_data.deaths, ) } </td>
                                        <td> { rdn(row.latest_data.recovered) }</td>
                                        <td> { rdn(row.latest_data.critical) }</td>
                                        <td> { rdn(row.latest_data.calculated.cases_per_million_population) } </td>
                                        <td> { rdn(Math.round((row.latest_data.deaths) / (row.population / 1000000))) }</td>

                                </tr>
                                })
                            }

                    </tbody>
                </table>
            </div>
        );

        
    }
   }