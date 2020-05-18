import React, { Component, Fragment } from 'react'
import ReactDOM from "react-dom"
import LinearProgress from '@material-ui/core/LinearProgress';
import Statistics from "./json/dataSverige.json"
import './extsweden.css'
import { Row, Container, Col } from 'react-bootstrap';
import { rdn } from "./utility.js"

class SummarySweden extends React.Component {

    constructor(props) {
      super(props);

      this.data = {
        confirmed: 0,
        dead: 0, 
        intensive: 0,
        maleConfirmed: 0,
        maleDead: 0, 
        maleIntensive: 0,
        femaleConfirmed: 0,
        femaleDead: 0, 
        femaleIntensive: 0,
      }

      this.getStatistics();
    }

    getStatistics() {
      (Statistics["Totalt antal per kön"]).map((row, index) => {
        this.data.confirmed += parseInt(row["Totalt_antal_fall"]);
        this.data.dead += parseInt(row["Totalt_antal_avlidna"]);
        this.data.intensive += parseInt(row["Totalt_antal_intensivvårdade"]);
        if (row["Kön"] === "Man") {
          this.data.maleConfirmed = parseInt(row["Totalt_antal_fall"]);
          this.data.maleDead = parseInt(row["Totalt_antal_avlidna"]);
          this.data.maleIntensive = parseInt(row["Totalt_antal_intensivvårdade"]);
        } else if (row["Kön"] === "Kvinna") {
          this.data.femaleConfirmed = parseInt(row["Totalt_antal_fall"]);
          this.data.femaleDead = parseInt(row["Totalt_antal_avlidna"]);
          this.data.femaleIntensive = parseInt(row["Totalt_antal_intensivvårdade"]);
        }
      })
      

    }
    
    

    render () {
      
      return (
          <div>
              <Container fluid className = "summary-container" style = {{width: "50%", padding: "30px", textAlign: "center"}}>
                <Row>
                  <Col>
                    <h3> Sjukdomsfall </h3>
                    <h2 style = {{color: "#bf372d"}} > {rdn(this.data.confirmed)} </h2>
                    <div style = {{fontSize: "18px"}}> Kvinnor: {rdn(this.data.femaleConfirmed)} | Män: {rdn(this.data.maleConfirmed)} </div>
                  </Col>
                  <Col>
                    <h3> Avlidna</h3>
                    <h2 style = {{color: " #303030" }}> {rdn(this.data.dead)} </h2>
                    <div style = {{fontSize: "18px"}}> Kvinnor: {rdn(this.data.femaleDead)} | Män: {rdn(this.data.maleDead)} </div>
                  </Col>
                  <Col>
                    <h3> Intensivvårdade </h3>
                    <h2 style = {{color: "rgb(59, 125, 154)"}}> {rdn(this.data.intensive)} </h2>
                    <div style = {{fontSize: "18px"}}> Kvinnor: {rdn(this.data.femaleIntensive)} | Män: {rdn(this.data.maleIntensive)} </div>
                  </Col>
                  
                </Row>
              </Container>
          </div>
          
        )
      
    }
}

export default SummarySweden;