import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { Document, Page } from 'react-pdf';
import ReactDOM from 'react-dom';
import _ from 'lodash';


import './PdfNotes.css';
import '../../shared/shared.css';

import HighlightZone from './HighlightZone';
import Highlight from './Highlight';

export default class PdfNotes extends React.Component {

  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.showHighlight = this.showHighlight.bind(this);
    this.onChange = this.onChange.bind(this);
    this.addHighlight = this.addHighlight.bind(this);

    this.state = {
      pdfPath: "",
      numPages: null,
      pageNumber: 2,
      highlightZoneSize: null,
      highlightZoneHide: true,
      userHighlights: []
    };
  }

  onDocumentLoad = (res) => {
    setTimeout(function() {
      var headerHeight = document.getElementsByClassName("navbar")[0].clientHeight;
      var pdfControlersHeight = document.getElementsByClassName("pdfControlers")[0].clientHeight;

      document.getElementById("pdfViewerContainer").style.height = window.innerHeight -headerHeight - pdfControlersHeight -20;

      var pdfHeight = document.getElementById("pdfViewerContainer").clientHeight;
      var pdfWidth = document.getElementById("pdfViewerContainer").clientWidth;
      this.setState({numPages: res.numPages, highlightZoneSize: [pdfHeight, pdfWidth]});



    }.bind(this), 1000);
  }

  render() {
    return (
      <Grid className="RomanNumerals">
        <Row>
          <Col className='sidePdfNotes text-center' sm={4}>
            {this.state.userHighlights.map(function(highlight, index){
              return <div key={index}>
                {highlight.page} <br/>
                {highlight.textToAdd}
              </div>
            })}
            {this.state.highlightZoneHide?
              <button onClick={()=>this.showHighlight(false)}> Add highlight </button>
            :null}
            {this.state.highlightZoneHide? null:
              <textarea value={this.state.textToAdd} className='highlightNote' placeholder='add highlight note'/>
            }

          </Col>
          <Col sm={6}>
            <Row className='text-center pdfControlers'>
              <Col xsOffset={4} sm={2} md={2}> <button onClick={this.previousPage}> previous </button> </Col>
              <Col sm={3} md={3} className='text-center'> Page {this.state.pageNumber} of {this.state.numPages} </Col>
              <Col sm={2} md={2}> <button onClick={this.nextPage}> next </button> </Col>
            </Row>
            <Row className='pdfContainer'>
              {this.state.highlightZone}
              {this.state.highlightZoneHide? null :
              <HighlightZone highlightZoneSize={this.state.highlightZoneSize}
                             showHighlight={this.showHighlight}
                             addHighlight={this.addHighlight} />}
              <div className="pdfViewerContainer" id="pdfViewerContainer">
                <Document
                  file="relativity.pdf"
                  onLoadSuccess={this.onDocumentLoad}>
                  <Page pageNumber={this.state.pageNumber} />
                </Document>
              </div>
            </Row>
          </Col>
        </Row>
      </Grid>
    );
  }

  showHighlight(value){
    this.setState({highlightZoneHide: value})

  }
  nextPage(){
    console.log("the state here", this.state);
    if(this.state.pageNumber < this.state.numPages){
      var newPage = this.state.pageNumber;
      this.setState({pageNumber: ++newPage});
    }
  }

  previousPage(){
    if(this.state.pageNumber > 1){
      var newPage = this.state.pageNumber;
      this.setState({pageNumber: --newPage});
    }
  }

  addHighlight(finalStyle){
    var pdfContainer = document.getElementsByClassName("react-pdf__Page__textContent")[0];
    ReactDOM.render(<Highlight styleToPass= {finalStyle} />, pdfContainer);
    var highlights = _.cloneDeep(this.state.userHighlights);
    var newHighlight = {page: this.state.pageNumber,
                        highlight: finalStyle,
                        note: this.state.textToAdd};

    highlights.push(newHighlight);
    this.setState({userHighlights: highlights});
  }
  onChange (e) {
    this.setState({textToAdd : e.target.value});
  }



}
