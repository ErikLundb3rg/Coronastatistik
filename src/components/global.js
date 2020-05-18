import React, { Component, Fragment } from 'react'
import ReactDOM from "react-dom"
import LinearProgress from '@material-ui/core/LinearProgress';

function readableNumber (para) {
  let temp = (("" + para).split("")).reverse();
  let newnumb = [];
  for (let i = 0; i < temp.length; i++) {
    newnumb.push(temp[i]);
    if ((i + 1) % 3 == 0) {
      newnumb.push(" ");
    }
  }
  let product = (newnumb.reverse()).join("")
  return (newnumb);
}

class Global extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
    }

    this.requestOptions = {
      method: "GET",
      redirect: "follow"
    }

    this.today = {
      confirmed: 0,
      dead: 0,
      recovered: 0,
    }

  }

  componentDidMount() {
    fetch("https://coronavirus-19-api.herokuapp.com/all", this.requestOptions)
      .then(res => res.json())
      .then(json => {
          this.setState({
            isLoaded: true, 
            items: json,
          })
      });
      
  }

  render () {    
    
    this.today.confirmed = readableNumber(this.state.items.cases);
    this.today.dead = readableNumber(this.state.items.deaths);
    this.today.recovered = readableNumber(this.state.items.recovered);

    var { isLoaded, items } = this.state;

    if (!isLoaded) {
      return <div style = {{margin: "10px", width: "40%"}}> <LinearProgress /> </div>
    } 

    return (
        <div>
              <Fragment>
                <div className = "sweden-summary"> 
                    <h3 style = {{fontSize: "30px", margin: "10px"}}> Världen </h3>
                    <hr style = {{borderTop: "2px solid gray", marginBottom: "20px", width: "80%", marginLeft: "auto"}} />
                    <ul>
                      <li> Bekräftade fall: </li>
                      <li> <h4 style = {{color: "#aaa"}}> {this.today.confirmed} st </h4> </li>
                      <li> Döda: </li>
                      <li> <h4 style = {{color: "#303030"}}> {this.today.dead} st </h4> </li>
                      <li> Återhämtade: </li>
                      <li> <h4 style = {{color: "#8ACA2B"}}> {this.today.recovered} st </h4> </li>
                    </ul>
                  </div>
              </Fragment>
        </div>
        
      )
    
  }
}

export default Global;