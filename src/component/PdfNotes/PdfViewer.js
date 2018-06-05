import React from 'react';
import { Document, Page } from 'react-pdf';
import { Grid, Row, Col } from 'react-bootstrap';

import './PdfViewer.css';
import '../../shared/shared.css';

import HighlightZone from './HighlightZone';

export default class PdfNotes extends React.Component {

  constructor(props) {
    super(props);

    this.previousPage = this.previousPage.bind(this);
    this.nextPage = this.nextPage.bind(this);

    this.state = {
      pdfPath: "",
      pageNumber: 2,
      highlightZoneSize: null,
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
            <Row className='text-center pdfControlers'>
              <Col xsOffset={1} sm={1} md={1}> <button onClick={this.previousPage}> previous </button> </Col>
              <Col sm={2} md={2} className='text-center'> Page {this.state.pageNumber} of {this.state.numPages} </Col>
              <Col sm={1} md={1}> <button onClick={this.nextPage}> next </button> </Col>
            </Row>
            <Row className='pdfContainer'>
              {this.props.displayHighlightZone?
                <HighlightZone highlightZoneSize={this.state.highlightZoneSize}
                               showHighlight={this.props.showHighlight}
                               addHighlight={this.props.addHighlight}
                               pageNumber={this.state.pageNumber}/>
              :null}
              <div className="pdfViewerContainer" id="pdfViewerContainer">
                <Document
                  file="relativity.pdf"
                  onLoadSuccess={this.onDocumentLoad}>
                  <Page pageNumber={this.state.pageNumber} />
                </Document>
              </div>
            </Row>
      </Grid>
    );
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
}
