import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { Document, Page } from 'react-pdf';
import ReactDOM from 'react-dom';
import './PdfNotes.css';
import '../../shared/shared.css';

import HighlightZone from './HighlightZone';


export default class PdfNotes extends React.Component {

  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.addAHighlight = this.addAHighlight.bind(this);

    this.state = {
      pdfPath: "",
      numPages: null,
      pageNumber: 2,
      highlightZoneSize: null,
      highlightZoneHide: true
    };
  }

  onDocumentLoad = (res) => {
    setTimeout(function() {
      var pdfHeight = document.getElementsByClassName("react-pdf__Page__textContent")[0].clientHeight;
      var pdfWidth = document.getElementsByClassName("react-pdf__Page__textContent")[0].clientWidth;
      this.setState({numPages: res.numPages, highlightZoneSize: [pdfHeight, pdfWidth]});
    }.bind(this), 1000);
  }

  render() {
    return (
      <Grid className="RomanNumerals">
        <Row>
          <Col className='sidePdfNotes' sm={4}>
            this is the menu
            <button onClick={this.addAHighlight}> Add highlight </button>
          </Col>
          <Col sm={6}>
            <Row className='text-center pdfControlers'>
              <Col xsOffset={4} sm={2} md={2}> <button onClick={this.previousPage}> previous </button> </Col>
              <Col sm={3} md={3} className='text-center'> Page {this.state.pageNumber} of {this.state.numPages} </Col>
              <Col sm={2} md={2}> <button onClick={this.nextPage}> next </button> </Col>
            </Row>
            <Row className='pdfContainer'>
              {this.state.highlightZone}
              {this.state.highlightZoneHide? null :<HighlightZone highlightZoneSize={this.state.highlightZoneSize} />}
              <Document
                file="relativity.pdf"
                onLoadSuccess={this.onDocumentLoad}>
                <Page pageNumber={this.state.pageNumber} />
              </Document>
            </Row>
          </Col>
        </Row>
      </Grid>
    );
  }

  addAHighlight(){
    this.setState({highlightZoneHide: false})

  }
  nextPage(){
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

  onChange (e){
    this.setState({textToConvert : e.target.value, message: null});
  }
}
