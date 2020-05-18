import React, { Component, Fragment } from 'react'
import ReactDOM from "react-dom"
import LinearProgress from '@material-ui/core/LinearProgress';
import './top.css'
import SummarySweden from "./SummarySweden.js"
import Global from "./global.js"
import NewTable from "./newtable.js"
import ExtSweden from "./extsweden.js"
import Nordic from "./nordics/nordic.js"

class Top extends React.Component {
    constructor(props) {
      super(props);
      
      this.state = {
        items: [],
        isLoaded: false,
      }
    }
    render () {

      return(
        <div>
          <Fragment>

          <h2 style = {{textAlign: "center", margin: "0", marginTop: "15px", padding: "0"}}> Statistik Sverige </h2>
          <SummarySweden/>
          <hr style = {{borderTop: "3px solid #009f80", width: "80%", marginBottom: "40px"}}/>
          <ExtSweden/>

          <h2 style = {{textAlign: "center", margin: "20px"}}>  Norden </h2>
          <Nordic />
          
          <h2 style = {{textAlign: "center", margin: "30px"}}>  Världen </h2>
          <NewTable/>
          
          </Fragment>
        </div>
        
      )
    }
}

export default Top;

